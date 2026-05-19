import type {
  AffiliateLinkStatus,
  AffiliateLinkTemplateRecord,
  ClickConsentState,
  ISODateTime,
  ParkRecord,
  TrackingScope,
  UUID,
} from './database'

export type AffiliateUrlStatus = AffiliateLinkStatus | 'source_fallback'

export interface AffiliateTrackingParameters {
  source: string
  medium?: string
  campaign?: string
  content?: string
}

export interface BuildAffiliateUrlInput {
  park: ParkRecord
  template: AffiliateLinkTemplateRecord | null
  pagePath: string
  trackingParameters?: AffiliateTrackingParameters
}

export interface AffiliateUrlResult {
  url: string
  destinationUrlKey: string
  status: AffiliateUrlStatus
}

export interface OutboundClickTrackInput {
  parkId: UUID
  destinationUrlKey: string
  pagePath: string
  consentState: ClickConsentState
  clickedAt?: ISODateTime
  utmContext?: Record<string, string>
}

export interface OutboundClickRequestBody {
  parkId: UUID
  destinationUrlKey: string
  pagePath: string
  consentState: ClickConsentState
  clickedAt: ISODateTime
  utmContext?: Record<string, string>
}

export interface OutboundClickResponseBody {
  stored: boolean
  trackingScope: TrackingScope
}
