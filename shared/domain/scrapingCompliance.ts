import type { ScrapingComplianceReviewRecord } from '../types/database'

export interface ScrapingComplianceGateResult {
  approved: boolean
  reasons: string[]
}

const hasText = (value: string | null): boolean => {
  if (value === null) {
    return false
  }

  return value.trim().length > 0
}

export const evaluateScrapingComplianceGate = (
  review: ScrapingComplianceReviewRecord | null,
): ScrapingComplianceGateResult => {
  if (review === null) {
    return {
      approved: false,
      reasons: ['Scraping compliance review ontbreekt.'],
    }
  }

  const reasons: string[] = []

  if (review.approvedForRun === false) {
    reasons.push('Scraping is nog niet expliciet goedgekeurd.')
  }

  if (review.robotsCheckedAt === null) {
    reasons.push('Robots.txt is nog niet gecontroleerd.')
  }

  if (review.termsCheckedAt === null) {
    reasons.push('Voorwaarden zijn nog niet gecontroleerd.')
  }

  if (hasText(review.rateLimitPolicy) === false) {
    reasons.push('Rate-limit beleid ontbreekt.')
  }

  return {
    approved: reasons.length === 0,
    reasons,
  }
}
