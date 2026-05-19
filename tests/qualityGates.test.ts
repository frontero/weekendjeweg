import assert from 'node:assert/strict'
import test from 'node:test'

import { normaliseParkIdentity, normaliseSlug } from '../shared/domain/catalogNormalization'
import { evaluateScrapingComplianceGate } from '../shared/domain/scrapingCompliance'
import type { ScrapingComplianceReviewRecord } from '../shared/types/database'

const approvedReview: ScrapingComplianceReviewRecord = {
  id: '23232323-2323-4232-8232-232323232323',
  targetDomain: 'landal.nl',
  robotsCheckedAt: '2026-05-19T12:00:00.000Z',
  termsCheckedAt: '2026-05-19T12:05:00.000Z',
  termsPermitCommercialUse: true,
  rateLimitPolicy: 'Maximaal 1 request per 5 seconden; stop bij blokkade.',
  approvedForRun: true,
  approvedAt: '2026-05-19T12:10:00.000Z',
  notes: 'Alleen uitvoeren na handmatige akkoordcheck.',
  createdAt: '2026-05-19T12:00:00.000Z',
  updatedAt: '2026-05-19T12:10:00.000Z',
}

test('normalises park identity for imported Landal data', () => {
  const normalizedIdentity = normaliseParkIdentity({
    name: 'Landal Hoog Vaals',
    sourceUrl: 'http://www.landal.nl/parken/hoog-vaals',
    landalParkCode: 'Hoog Vaals',
  })

  assert.equal(normalizedIdentity.slug, 'landal-hoog-vaals')
  assert.equal(normalizedIdentity.sourceUrl, 'https://www.landal.nl/parken/hoog-vaals')
  assert.equal(normalizedIdentity.landalParkCode, 'hoog-vaals')
})

test('normalises accented names into stable slugs', () => {
  const slug: string = normaliseSlug('Landal Café aan Zee')

  assert.equal(slug, 'landal-cafe-aan-zee')
})

test('blocks scraping when compliance review is missing', () => {
  const result = evaluateScrapingComplianceGate(null)

  assert.equal(result.approved, false)
  assert.equal(result.reasons.includes('Scraping compliance review ontbreekt.'), true)
})

test('blocks scraping when robots, terms, or rate limit checks are incomplete', () => {
  const incompleteReview: ScrapingComplianceReviewRecord = {
    ...approvedReview,
    robotsCheckedAt: null,
    termsCheckedAt: null,
    termsPermitCommercialUse: false,
    rateLimitPolicy: null,
    approvedForRun: false,
  }
  const result = evaluateScrapingComplianceGate(incompleteReview)

  assert.equal(result.approved, false)
  assert.equal(result.reasons.length, 5)
})

test('blocks scraping when terms do not explicitly permit commercial use', () => {
  const termsBlockedReview: ScrapingComplianceReviewRecord = {
    ...approvedReview,
    termsPermitCommercialUse: false,
  }
  const result = evaluateScrapingComplianceGate(termsBlockedReview)

  assert.equal(result.approved, false)
  assert.equal(result.reasons.includes('Voorwaarden staan commercieel gebruik niet expliciet toe.'), true)
})

test('allows scraper orchestration only after full compliance approval', () => {
  const result = evaluateScrapingComplianceGate(approvedReview)

  assert.equal(result.approved, true)
  assert.deepEqual(result.reasons, [])
})
