import assert from 'node:assert/strict'
import test from 'node:test'

import { createLandalImportPlan, runLandalTradeTrackerImport, validateImportAccess } from '../shared/domain/tradeTrackerImport'
import { fetchTradeTrackerFeedProducts, parseTradeTrackerFeedProducts, type TradeTrackerSoapFetcher } from '../shared/domain/tradeTrackerSoapClient'
import type { LandalImportResponseBody, TradeTrackerFeedImportResult, TradeTrackerFeedProduct, TradeTrackerImportConfig } from '../shared/types/importPipeline'

const configuredImport: TradeTrackerImportConfig = {
  accessKey: 'access-key',
  affiliateSiteId: '12345',
  campaignId: '20132',
  customerId: 'customer-id',
  importCronSecret: 'cron-secret',
}

const feedProductsSoapResponse = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Body>
    <ns1:getFeedProductsResponse xmlns:ns1="http://ws.tradetracker.com/soap/affiliate">
      <feedProducts>
        <item>
          <identifier>LANDAL-MIGGELENBERG</identifier>
          <name>Landal Miggelenberg</name>
          <productCategoryName>Vakantiepark</productCategoryName>
          <description>Prijsrecord voor een verblijf.</description>
          <price>249.50</price>
          <productURL>https://www.landal.nl/parken/miggelenberg</productURL>
          <imageURL>https://example.test/miggelenberg.jpg</imageURL>
          <additional>
            <item>
              <name>arrivalDate</name>
              <value>2026-06-12</value>
            </item>
          </additional>
        </item>
      </feedProducts>
    </ns1:getFeedProductsResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`

const createSuccessfulTradeTrackerFetcher = (): { calls: string[], fetcher: TradeTrackerSoapFetcher } => {
  const calls: string[] = []

  const fetcher: TradeTrackerSoapFetcher = async (_input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const requestBody: string = typeof init?.body === 'string' ? init.body : ''

    calls.push(requestBody)

    if (requestBody.includes('authenticate') === true) {
      return new Response('<Envelope><Body><authenticateResponse /></Body></Envelope>', {
        headers: {
          'set-cookie': 'TradeTrackerSession=test-session; Path=/; HttpOnly',
        },
        status: 200,
      })
    }

    return new Response(feedProductsSoapResponse, {
      status: 200,
    })
  }

  return {
    calls,
    fetcher,
  }
}

test('rejects import requests when configured secret is missing', () => {
  const result = validateImportAccess('', 'cron-secret')

  assert.equal(result.allowed, false)
  assert.equal(result.message, 'Import secret ontbreekt in runtime-config.')
})

test('rejects import requests with invalid secret', () => {
  const result = validateImportAccess('cron-secret', 'wrong-secret')

  assert.equal(result.allowed, false)
  assert.equal(result.message, 'Import secret is ongeldig.')
})

test('allows import request when secret matches', () => {
  const result = validateImportAccess('cron-secret', 'cron-secret')

  assert.equal(result.allowed, true)
})

test('blocks Landal import when TradeTracker credentials are incomplete', () => {
  const incompleteImport: TradeTrackerImportConfig = {
    ...configuredImport,
    accessKey: '',
    affiliateSiteId: '',
  }
  const result: LandalImportResponseBody = createLandalImportPlan(incompleteImport)

  assert.equal(result.status, 'blocked')
  assert.equal(result.credentialStatus, 'missing')
  assert.equal(result.recordsImported, 0)
  assert.match(result.message, /TRADETRACKER_ACCESS_KEY/)
  assert.match(result.message, /TRADETRACKER_AFFILIATE_SITE_ID/)
})

test('marks configured TradeTracker imports as ready to run', () => {
  const result: LandalImportResponseBody = createLandalImportPlan(configuredImport)

  assert.equal(result.status, 'pending')
  assert.equal(result.credentialStatus, 'configured')
  assert.equal(result.recordsImported, 0)
  assert.equal(result.sourceType, 'api_feed')
})

test('parses TradeTracker feed products from SOAP responses', () => {
  const products: TradeTrackerFeedProduct[] = parseTradeTrackerFeedProducts(feedProductsSoapResponse)

  assert.equal(products.length, 1)
  assert.equal(products[0]?.identifier, 'LANDAL-MIGGELENBERG')
  assert.equal(products[0]?.name, 'Landal Miggelenberg')
  assert.equal(products[0]?.priceAmount, 249.5)
  assert.equal(products[0]?.productUrl, 'https://www.landal.nl/parken/miggelenberg')
  assert.equal(products[0]?.additional[0]?.name, 'arrivalDate')
})

test('fetches TradeTracker feed products through authenticated SOAP calls', async () => {
  const { calls, fetcher }: { calls: string[], fetcher: TradeTrackerSoapFetcher } = createSuccessfulTradeTrackerFetcher()
  const result: TradeTrackerFeedImportResult = await fetchTradeTrackerFeedProducts(configuredImport, fetcher)

  assert.equal(calls.length, 2)
  assert.match(calls[0] ?? '', /authenticate/)
  assert.match(calls[1] ?? '', /getFeedProducts/)
  assert.match(calls[1] ?? '', /20132/)
  assert.equal(result.recordsImported, 1)
  assert.equal(result.products[0]?.priceAmount, 249.5)
})

test('runs Landal TradeTracker import with parsed feed records', async () => {
  const { fetcher }: { calls: string[], fetcher: TradeTrackerSoapFetcher } = createSuccessfulTradeTrackerFetcher()
  const result: LandalImportResponseBody = await runLandalTradeTrackerImport(configuredImport, fetcher)

  assert.equal(result.status, 'success')
  assert.equal(result.credentialStatus, 'configured')
  assert.equal(result.recordsImported, 1)
  assert.match(result.message, /1 productrecords/)
})

test('returns failed import response when TradeTracker authentication fails', async () => {
  const fetcher: TradeTrackerSoapFetcher = async (): Promise<Response> => {
    return new Response('<Envelope><Body><Fault /></Body></Envelope>', {
      status: 403,
    })
  }
  const result: LandalImportResponseBody = await runLandalTradeTrackerImport(configuredImport, fetcher)

  assert.equal(result.status, 'failed')
  assert.equal(result.credentialStatus, 'configured')
  assert.equal(result.recordsImported, 0)
  assert.match(result.message, /authenticatie faalde/)
})
