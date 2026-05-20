export type UUID = string
export type ISODate = string
export type ISODateTime = string
export type CountryCode = 'NL'
export type CurrencyCode = 'EUR'
export type AffiliateLinkStatus = 'placeholder' | 'active' | 'disabled'
export type ClickConsentState = 'unknown' | 'accepted' | 'rejected'
export type TrackingScope = 'anonymous_functional' | 'full_consent'
export type ImportSourceType = 'api_feed' | 'scraper' | 'mock'
export type ImportRunStatus = 'pending' | 'running' | 'success' | 'failed' | 'blocked'

export interface RegionRecord {
  id: UUID
  slug: string
  name: string
  countryCode: CountryCode
  seoTitle: string | null
  seoDescription: string | null
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export interface FacilityRecord {
  id: UUID
  slug: string
  name: string
  sourceKey: string | null
}

export interface ParkRecord {
  id: UUID
  slug: string
  name: string
  locationName: string
  regionId: UUID
  countryCode: CountryCode
  description: string | null
  highlights: string[]
  visualPlaceholderKey: string | null
  sourceUrl: string
  landalParkCode: string | null
  lastImportedAt: ISODateTime | null
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export interface AccommodationRecord {
  id: UUID
  parkId: UUID
  code: string
  name: string
  personCount: number | null
  areaText: string | null
  construction: string | null
  bedroomCount: number | null
  bathroomCount: number | null
  imageUrl: string | null
  sourceUrl: string
  arrivalDate: ISODate | null
  departureDate: ISODate | null
  numberOfNights: number | null
  currency: CurrencyCode
  priceAmount: number | null
  rentalPriceAmount: number | null
  totalPriceInCents: number | null
  priceDisclaimer: string | null
  sourceCapturedAt: ISODateTime
  expiresAt: ISODateTime | null
  createdAt: ISODateTime
}

export interface ParkFacilityRecord {
  parkId: UUID
  facilityId: UUID
}

export interface PriceSnapshotRecord {
  id: UUID
  parkId: UUID
  arrivalDate: ISODate
  departureDate: ISODate
  adultCount: number
  childCount: number
  currency: CurrencyCode
  priceAmount: number | null
  priceLabel: string | null
  sourceCapturedAt: ISODateTime
  expiresAt: ISODateTime | null
  createdAt: ISODateTime
}

export interface AffiliateLinkTemplateRecord {
  id: UUID
  parkId: UUID
  baseUrl: string
  trackingTemplate: string | null
  status: AffiliateLinkStatus
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export interface OutboundClickInsert {
  parkId: UUID
  destinationUrlKey: string
  pagePath: string
  consentState: ClickConsentState
  trackingScope: TrackingScope
  utmContext: Record<string, string>
  clickedAt: ISODateTime
}

export interface ImportRunRecord {
  id: UUID
  sourceType: ImportSourceType
  startedAt: ISODateTime
  completedAt: ISODateTime | null
  status: ImportRunStatus
  message: string | null
  recordsImported: number
}

export interface ScrapingComplianceReviewRecord {
  id: UUID
  targetDomain: string
  robotsCheckedAt: ISODateTime | null
  termsCheckedAt: ISODateTime | null
  termsPermitCommercialUse: boolean
  rateLimitPolicy: string | null
  approvedForRun: boolean
  approvedAt: ISODateTime | null
  notes: string | null
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export interface CatalogDataSet {
  regions: RegionRecord[]
  facilities: FacilityRecord[]
  parks: ParkRecord[]
  accommodations: AccommodationRecord[]
  parkFacilities: ParkFacilityRecord[]
  priceSnapshots: PriceSnapshotRecord[]
  affiliateLinkTemplates: AffiliateLinkTemplateRecord[]
}
