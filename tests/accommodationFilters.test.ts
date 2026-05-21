import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import {
  createMaxPriceOptions,
  createNightOptions,
  createPersonCountOptions,
  filterAccommodationCards,
} from '../shared/domain/accommodationFilters'
import {
  createAccommodationCardViewModels,
  createParkAccommodationOverviewPath,
} from '../shared/domain/accommodationPresentation'
import { getParkBySlug } from '../shared/domain/catalogRepository'
import type { AccommodationCardViewModel, AccommodationFilterOption } from '../shared/types/accommodation'
import type { ParkRecord } from '../shared/types/database'

const createDeVersCards = (): AccommodationCardViewModel[] => {
  const park: ParkRecord | null = getParkBySlug(mockCatalog, 'landal-de-vers')

  if (park === null) {
    throw new Error('Expected scraped De Vers park')
  }

  return createAccommodationCardViewModels(mockCatalog, park, createParkAccommodationOverviewPath(park))
}

test('creates useful accommodation filter options from scraped De Vers cards', () => {
  const cards: AccommodationCardViewModel[] = createDeVersCards()
  const personOptions: AccommodationFilterOption[] = createPersonCountOptions(cards)
  const nightOptions: AccommodationFilterOption[] = createNightOptions(cards)
  const priceOptions: AccommodationFilterOption[] = createMaxPriceOptions(cards)

  assert.deepEqual(
    personOptions.map((option: AccommodationFilterOption): string => option.label),
    [
      'Alle gezelschappen',
      '2+ personen',
      '4+ personen',
      '6+ personen',
      '8+ personen',
      '10+ personen',
      '12+ personen',
      '16+ personen',
    ],
  )
  assert.deepEqual(
    nightOptions.map((option: AccommodationFilterOption): string => option.label),
    ['Alle verblijfsduren', '3 nachten', '4 nachten'],
  )
  assert.equal(priceOptions.some((option: AccommodationFilterOption): boolean => option.label === 'Tot € 600'), true)
})

test('includes the public De Vers accommodation types', () => {
  const cards: AccommodationCardViewModel[] = createDeVersCards()
  const accommodationCodes: string[] = cards
    .map((card: AccommodationCardViewModel): string => card.accommodation.code)
    .sort((leftCode: string, rightCode: string): number => leftCode.localeCompare(rightCode, 'nl'))

  assert.deepEqual(accommodationCodes, [
    '10L',
    '12C',
    '16C',
    '2C',
    '2L',
    '4B',
    '4C1',
    '4C2',
    '4C3',
    '4CT',
    '4L',
    '6C1',
    '6C2',
    '6C3',
    '6C4',
    '6CK',
    '6L',
    '8C1',
    '8C2',
    '8C3',
    '8L',
  ])
})

test('filters accommodation cards by group size and max price', () => {
  const cards: AccommodationCardViewModel[] = createDeVersCards()
  const filteredCards: AccommodationCardViewModel[] = filterAccommodationCards(cards, {
    personCount: '6',
    numberOfNights: 'all',
    maxPriceAmount: '600',
    sortMode: 'price-asc',
  })
  const accommodationCodes: string[] = filteredCards.map((card: AccommodationCardViewModel): string => {
    return card.accommodation.code
  })

  assert.deepEqual(accommodationCodes, ['6C3', '6C4'])
})

test('sorts accommodation cards by descending price', () => {
  const cards: AccommodationCardViewModel[] = createDeVersCards()
  const filteredCards: AccommodationCardViewModel[] = filterAccommodationCards(cards, {
    personCount: 'all',
    numberOfNights: 'all',
    maxPriceAmount: 'all',
    sortMode: 'price-desc',
  })
  const firstCard: AccommodationCardViewModel | undefined = filteredCards[0]

  if (firstCard === undefined) {
    throw new Error('Expected sorted accommodation card')
  }

  assert.equal(firstCard.accommodation.code, '6L')
  assert.equal(firstCard.accommodation.priceAmount, 716)
})
