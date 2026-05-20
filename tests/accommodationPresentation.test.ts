import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import {
  createAccommodationCardViewModels,
  createParkAccommodationOverviewPath,
} from '../shared/domain/accommodationPresentation'
import { getParkBySlug } from '../shared/domain/catalogRepository'
import type { AccommodationCardViewModel } from '../shared/types/accommodation'
import type { ParkRecord } from '../shared/types/database'

test('creates De Vers accommodation cards with price and affiliate deeplink data', () => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-de-vers')

  if (park === null) {
    throw new Error('Expected scraped De Vers park')
  }

  const pagePath: string = createParkAccommodationOverviewPath(park)
  const cards: AccommodationCardViewModel[] = createAccommodationCardViewModels(mockCatalog, park, pagePath)
  const firstCard: AccommodationCardViewModel | undefined = cards[0]

  if (firstCard === undefined) {
    throw new Error('Expected scraped accommodation card')
  }

  const affiliateUrl: URL = new URL(firstCard.affiliateUrl)

  assert.equal(pagePath, '/parken/landal-de-vers/accommodaties')
  assert.equal(cards.length, 10)
  assert.equal(firstCard.accommodation.code, '2L')
  assert.equal(firstCard.accommodation.name, '2-persoons bungalow')
  assert.equal(firstCard.priceLabel.includes('296'), true)
  assert.equal(firstCard.stayContext.includes('2026-05-26'), true)
  assert.equal(firstCard.specificationLabel.includes('48'), true)
  assert.equal(firstCard.imageAltText.includes('Landal De Vers'), true)
  assert.equal(affiliateUrl.hostname, 'tc.tradetracker.net')
  assert.equal(affiliateUrl.searchParams.get('u'), '/parken/de-vers/accommodaties/2l')
  assert.equal(affiliateUrl.searchParams.get('wjw_source'), 'accommodation-overview')
  assert.equal(affiliateUrl.searchParams.get('wjw_content'), 'landal-de-vers-2l')
})
