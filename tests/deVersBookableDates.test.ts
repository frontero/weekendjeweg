import assert from 'node:assert/strict'
import test from 'node:test'

import {
  deVersBookableArrivalDates,
  deVersBookableDateCapturedAt,
  deVersBookableDepartureDates,
  deVersBookableStayDates,
  findDeVersBookableStayByArrivalDate,
  isDeVersBookableStay,
} from '../shared/data/deVersBookableDates'
import type { BookableStayDate } from '../shared/types/accommodation'

test('exposes Landal De Vers bookable dates for the date picker', () => {
  const firstStayDate: BookableStayDate | undefined = deVersBookableStayDates[0]

  if (firstStayDate === undefined) {
    throw new Error('Expected a bookable stay date')
  }

  assert.equal(deVersBookableDateCapturedAt, '2026-05-22T09:45:00.000Z')
  assert.equal(firstStayDate.arrivalDate, '2026-05-22')
  assert.equal(firstStayDate.departureDate, '2026-05-26')
  assert.equal(firstStayDate.accommodationCount, 9)
  assert.equal(firstStayDate.lowestPriceAmount, 538)
  assert.equal(deVersBookableArrivalDates.includes('2026-05-23'), false)
  assert.equal(deVersBookableArrivalDates.includes('2026-05-26'), true)
  assert.equal(deVersBookableDepartureDates.includes('2026-05-26'), true)
})

test('matches arrival and departure combinations from the Landal availability snapshot', () => {
  const stayDate: BookableStayDate | null = findDeVersBookableStayByArrivalDate('2026-06-11')

  assert.equal(stayDate?.departureDate, '2026-06-15')
  assert.equal(stayDate?.lowestPriceAmount, 1017)
  assert.equal(isDeVersBookableStay('2026-06-11', '2026-06-15'), true)
  assert.equal(isDeVersBookableStay('2026-06-11', '2026-06-12'), false)
  assert.equal(isDeVersBookableStay('2026-05-23', '2026-05-26'), false)
})
