import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import {
  getAffiliateTemplateForPark,
  getParkBySlug,
  listFacilitiesForPark,
  listParks,
  selectPriceSnapshot,
} from '../shared/domain/catalogRepository'
import { assertAnonymousClickIsSafe, createAnonymousFunctionalClick } from '../shared/domain/clickTracking'
import type { ParkRecord, PriceSnapshotRecord } from '../shared/types/database'

test('filters parks by region and facility slug', () => {
  const parks: ParkRecord[] = listParks(mockCatalog, {
    regionSlug: 'veluwe',
    facilitySlugs: ['zwembad'],
  })

  assert.equal(parks.length, 1)
  assert.equal(parks[0]?.slug, 'landal-miggelenberg')
})

test('returns dynamic facilities for a park', () => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-hoog-vaals')

  if (park === null) {
    throw new Error('Expected mock park')
  }

  const facilities = listFacilitiesForPark(mockCatalog, park.id)
  const facilitySlugs: string[] = facilities.map((facility): string => facility.slug)

  assert.deepEqual(facilitySlugs, ['wellness', 'zwembad'])
})

test('selects price snapshot by date and travel party', () => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-miggelenberg')

  if (park === null) {
    throw new Error('Expected mock park')
  }

  const snapshot: PriceSnapshotRecord | null = selectPriceSnapshot(mockCatalog, {
    parkId: park.id,
    arrivalDate: '2026-06-05',
    departureDate: '2026-06-08',
    adultCount: 2,
    childCount: 0,
  })

  assert.equal(snapshot?.priceAmount, 399)
  assert.equal(snapshot?.currency, 'EUR')
})

test('keeps affiliate template separate from final network approval', () => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-miggelenberg')

  if (park === null) {
    throw new Error('Expected mock park')
  }

  const template = getAffiliateTemplateForPark(mockCatalog, park.id)

  assert.equal(template?.status, 'placeholder')
  assert.equal(template?.baseUrl.startsWith('https://tc.tradetracker.net/'), true)
  assert.equal(template?.trackingTemplate, 'r=weekendjeweg-{parkSlug}&u={landalPath}')
})

test('creates anonymous functional click without user or cookie identifiers', () => {
  const click = createAnonymousFunctionalClick({
    parkId: '44444444-4444-4444-8444-444444444444',
    destinationUrlKey: 'landal-placeholder',
    pagePath: '/parken/landal-miggelenberg',
    consentState: 'rejected',
    clickedAt: '2026-05-19T12:00:00.000Z',
    utmContext: {
      source: 'park-detail',
    },
  })

  assert.equal(click.trackingScope, 'anonymous_functional')
  assert.equal(Object.hasOwn(click, 'userId'), false)
  assert.equal(Object.hasOwn(click, 'cookieId'), false)
  assert.doesNotThrow((): void => assertAnonymousClickIsSafe(click))
})
