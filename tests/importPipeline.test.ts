import assert from 'node:assert/strict'
import test from 'node:test'

import { createLandalImportPlan, validateImportAccess } from '../shared/domain/tradeTrackerImport'
import type { LandalImportResponseBody, TradeTrackerImportConfig } from '../shared/types/importPipeline'

const configuredImport: TradeTrackerImportConfig = {
  accessKey: 'access-key',
  affiliateSiteId: '12345',
  campaignId: '20132',
  customerId: 'customer-id',
  importCronSecret: 'cron-secret',
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

test('keeps real TradeTracker feed fetch blocked in the skeleton', () => {
  const result: LandalImportResponseBody = createLandalImportPlan(configuredImport)

  assert.equal(result.status, 'blocked')
  assert.equal(result.credentialStatus, 'configured')
  assert.equal(result.recordsImported, 0)
  assert.equal(result.sourceType, 'api_feed')
})
