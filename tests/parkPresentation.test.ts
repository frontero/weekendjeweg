import assert from 'node:assert/strict'
import test from 'node:test'

import { mockCatalog } from '../shared/data/mockCatalog'
import {
  createParkCardViewModels,
  createPriceContext,
  formatPriceSnapshot,
} from '../shared/domain/parkPresentation'
import type { ParkCardViewModel, ParkPriceSearch } from '../shared/types/parkSearch'

const defaultPriceSearch: ParkPriceSearch = {
  arrivalDate: '2026-06-05',
  departureDate: '2026-06-08',
  adultCount: 2,
  childCount: 0,
}

test('creates park card view models from the mock catalog', () => {
  const cards: ParkCardViewModel[] = createParkCardViewModels(mockCatalog, {}, defaultPriceSearch)

  assert.equal(cards.length, 3)
  assert.equal(cards[0]?.detailPath.startsWith('/parken/'), true)
  assert.equal(cards[0]?.visualImageUrl.startsWith('https://images.unsplash.com/'), true)
  assert.match(cards[0]?.visualAltText ?? '', /Sfeerbeeld/)
})

test('formats matching price snapshot without availability wording', () => {
  const cards: ParkCardViewModel[] = createParkCardViewModels(
    mockCatalog,
    {
      regionSlug: 'veluwe',
    },
    defaultPriceSearch,
  )

  assert.equal(cards[0]?.priceLabel, 'Prijsvoorbeeld: vanaf € 399')
  assert.equal(cards[0]?.priceLabel.includes('beschikbaar'), false)
})

test('returns honest copy when no price snapshot matches the selected trip', () => {
  const priceLabel: string = formatPriceSnapshot(null)

  assert.equal(priceLabel, 'Geen prijsvoorbeeld voor deze selectie')
})

test('describes the selected trip context', () => {
  const context: string = createPriceContext(defaultPriceSearch)

  assert.equal(context, '2026-06-05 tot 2026-06-08, 2 volwassenen en 0 kinderen')
})
