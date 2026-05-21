import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import {
  createAccommodationCardViewModels,
  createParkAccommodationOverviewPath,
} from '../shared/domain/accommodationPresentation'
import { getParkBySlug } from '../shared/domain/catalogRepository'
import type {
  AccommodationCardViewModel,
  AccommodationImageSlide,
  AccommodationSearchSelection,
} from '../shared/types/accommodation'
import type { ParkRecord } from '../shared/types/database'

const getDeVersPark = (): ParkRecord => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-de-vers')

  if (park === null) {
    throw new Error('Expected scraped De Vers park')
  }

  return park
}

const getAccommodationCards = (
  searchSelection: AccommodationSearchSelection | null = null,
): AccommodationCardViewModel[] => {
  const park: ParkRecord = getDeVersPark()
  const pagePath: string = createParkAccommodationOverviewPath(park)

  return createAccommodationCardViewModels(mockCatalog, park, pagePath, searchSelection)
}

const getAccommodationCardByCode = (
  accommodationCode: string,
  searchSelection: AccommodationSearchSelection | null = null,
): AccommodationCardViewModel => {
  const cards: AccommodationCardViewModel[] = getAccommodationCards(searchSelection)
  const card: AccommodationCardViewModel | undefined = cards.find((accommodationCard: AccommodationCardViewModel): boolean => {
    return accommodationCard.accommodation.code === accommodationCode
  })

  if (card === undefined) {
    throw new Error(`Expected accommodation card ${accommodationCode}`)
  }

  return card
}

test('creates De Vers accommodation cards with price and affiliate deeplink data', () => {
  const park: ParkRecord = getDeVersPark()
  const pagePath: string = createParkAccommodationOverviewPath(park)
  const cards: AccommodationCardViewModel[] = getAccommodationCards()
  const firstCard: AccommodationCardViewModel = getAccommodationCardByCode('2C')
  const firstSlide: AccommodationImageSlide | undefined = firstCard.imageSlides[0]

  if (firstSlide === undefined) {
    throw new Error('Expected accommodation image slide')
  }

  const affiliateUrl: URL = new URL(firstCard.affiliateUrl)

  assert.equal(pagePath, '/parken/landal-de-vers/accommodaties')
  assert.equal(cards.length, 21)
  assert.equal(firstCard.accommodation.code, '2C')
  assert.equal(firstCard.accommodation.name, '2-persoons bungalow')
  assert.equal(firstCard.priceLabel.includes('366'), true)
  assert.equal(firstCard.priceFootnote.includes('Prijsvoorbeeld voor 2026-05-29'), true)
  assert.equal(firstCard.priceStatus, 'default_price')
  assert.equal(firstCard.stayContext.includes('2026-05-29'), true)
  assert.equal(firstCard.specificationLabel.includes('48'), true)
  assert.equal(firstCard.imageAltText.includes('Landal De Vers'), true)
  assert.equal(firstCard.imageSlides.length, 5)
  assert.equal(firstSlide.url, 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/5626268-3x2?t=w960')
  assert.equal(firstSlide.altText.includes('foto 1'), true)
  assert.equal(affiliateUrl.hostname, 'tc.tradetracker.net')
  assert.equal(affiliateUrl.searchParams.get('u'), '/parken/de-vers/accommodaties/2c')
  assert.equal(affiliateUrl.searchParams.get('wjw_source'), 'accommodation-overview')
  assert.equal(affiliateUrl.searchParams.get('wjw_content'), 'landal-de-vers-2c')
})

test('keeps cached prices when selected dates match the scraped stay', () => {
  const searchSelection: AccommodationSearchSelection = {
    arrivalDate: '2026-05-26',
    departureDate: '2026-05-29',
    adultCount: 2,
    childCount: 0,
  }
  const card: AccommodationCardViewModel = getAccommodationCardByCode('4C3', searchSelection)
  const affiliateUrl: URL = new URL(card.affiliateUrl)
  const landalPath: string | null = affiliateUrl.searchParams.get('u')

  assert.equal(card.priceLabel.includes('371'), true)
  assert.equal(card.priceFootnote, 'Prijsvoorbeeld opgehaald voor je gekozen data.')
  assert.equal(card.priceStatus, 'selected_date_match')
  assert.equal(card.stayContext, '2026-05-26 tot 2026-05-29, gekozen data')
  assert.equal(landalPath?.includes('arrivalDate=2026-05-26'), true)
  assert.equal(landalPath?.includes('departureDate=2026-05-29'), true)
  assert.equal(landalPath?.includes('adults=2'), true)
  assert.equal(landalPath?.includes('children=0'), true)
})

test('keeps accommodation cards clickable when selected dates need a live Landal price', () => {
  const searchSelection: AccommodationSearchSelection = {
    arrivalDate: '2026-06-12',
    departureDate: '2026-06-15',
    adultCount: 2,
    childCount: 1,
  }
  const card: AccommodationCardViewModel = getAccommodationCardByCode('4C3', searchSelection)
  const affiliateUrl: URL = new URL(card.affiliateUrl)
  const landalPath: string | null = affiliateUrl.searchParams.get('u')

  assert.equal(card.priceLabel, 'Controleer prijs bij Landal')
  assert.equal(card.priceFootnote, 'Nog geen prijsvoorbeeld voor deze data; Landal toont de actuele prijs.')
  assert.equal(card.priceStatus, 'selected_date_missing')
  assert.equal(card.stayContext, '2026-06-12 tot 2026-06-15, gekozen data')
  assert.equal(landalPath?.includes('arrivalDate=2026-06-12'), true)
  assert.equal(landalPath?.includes('departureDate=2026-06-15'), true)
  assert.equal(landalPath?.includes('adults=2'), true)
  assert.equal(landalPath?.includes('children=1'), true)
})
