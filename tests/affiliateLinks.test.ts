import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import { buildAffiliateUrl } from '../shared/domain/affiliateLinks'
import { getAffiliateTemplateForPark, getParkBySlug } from '../shared/domain/catalogRepository'
import {
  assertAnonymousClickIsSafe,
  createConsentAwareOutboundClick,
  getTrackingScopeForConsent,
} from '../shared/domain/clickTracking'
import type { AffiliateLinkTemplateRecord, OutboundClickInsert, ParkRecord, TrackingScope } from '../shared/types/database'

test('builds TradeTracker deeplink with a Landal destination path', () => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-miggelenberg')

  if (park === null) {
    throw new Error('Expected mock park')
  }

  const template: AffiliateLinkTemplateRecord | null = getAffiliateTemplateForPark(mockCatalog, park.id)
  const result = buildAffiliateUrl({
    park,
    template,
    pagePath: '/parken/landal-miggelenberg',
    trackingParameters: {
      source: 'park-detail',
      medium: 'affiliate',
      campaign: 'landal-tradetracker',
      content: park.slug,
    },
  })
  const url: URL = new URL(result.url)

  assert.equal(url.hostname, 'tc.tradetracker.net')
  assert.equal(url.searchParams.get('c'), '20132')
  assert.equal(url.searchParams.get('m'), '12')
  assert.equal(url.searchParams.get('a'), '302167')
  assert.equal(url.searchParams.get('r'), `weekendjeweg-${park.slug}`)
  assert.equal(url.searchParams.get('u'), '/parken/miggelenberg')
  assert.equal(url.searchParams.get('wjw_source'), 'park-detail')
  assert.equal(url.searchParams.get('wjw_campaign'), 'landal-tradetracker')
  assert.equal(url.searchParams.get('wjw_content'), park.slug)
  assert.equal(result.status, 'placeholder')
  assert.match(result.destinationUrlKey, /placeholder/)
})

test('builds TradeTracker deeplink with an accommodation destination override', () => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-de-vers')

  if (park === null) {
    throw new Error('Expected scraped De Vers park')
  }

  const template: AffiliateLinkTemplateRecord | null = getAffiliateTemplateForPark(mockCatalog, park.id)
  const result = buildAffiliateUrl({
    park,
    template,
    destinationUrl: 'https://www.landal.nl/parken/de-vers/accommodaties/2l',
    pagePath: '/parken/landal-de-vers/accommodaties',
    trackingParameters: {
      source: 'accommodation-overview',
      medium: 'affiliate',
      campaign: 'landal-tradetracker',
      content: 'landal-de-vers-2l',
    },
  })
  const url: URL = new URL(result.url)

  assert.equal(url.hostname, 'tc.tradetracker.net')
  assert.equal(url.searchParams.get('u'), '/parken/de-vers/accommodaties/2l')
  assert.equal(url.searchParams.get('wjw_source'), 'accommodation-overview')
  assert.equal(url.searchParams.get('wjw_content'), 'landal-de-vers-2l')
  assert.equal(result.destinationUrlKey.endsWith(':/parken/de-vers/accommodaties/2l'), true)
})

test('keeps rejected or unknown consent in anonymous functional scope', () => {
  const rejectedScope: TrackingScope = getTrackingScopeForConsent('rejected')
  const unknownScope: TrackingScope = getTrackingScopeForConsent('unknown')

  assert.equal(rejectedScope, 'anonymous_functional')
  assert.equal(unknownScope, 'anonymous_functional')
})

test('creates anonymous outbound click without blocked identifier context', () => {
  const click: OutboundClickInsert = createConsentAwareOutboundClick({
    parkId: '44444444-4444-4444-8444-444444444444',
    destinationUrlKey: 'landal-placeholder',
    pagePath: '/parken/landal-miggelenberg',
    consentState: 'rejected',
    clickedAt: '2026-05-19T12:00:00.000Z',
    utmContext: {
      source: 'park-detail',
      cookie_id: 'blocked',
    },
  })

  assert.equal(click.trackingScope, 'anonymous_functional')
  assert.equal(Object.hasOwn(click.utmContext, 'cookie_id'), false)
  assert.doesNotThrow((): void => assertAnonymousClickIsSafe(click))
})

test('uses full consent tracking scope only after analytics acceptance', () => {
  const click: OutboundClickInsert = createConsentAwareOutboundClick({
    parkId: '44444444-4444-4444-8444-444444444444',
    destinationUrlKey: 'landal-placeholder',
    pagePath: '/parken/landal-miggelenberg',
    consentState: 'accepted',
    clickedAt: '2026-05-19T12:00:00.000Z',
    utmContext: {
      source: 'park-detail',
    },
  })

  assert.equal(click.trackingScope, 'full_consent')
  assert.equal(click.utmContext.source, 'park-detail')
})
