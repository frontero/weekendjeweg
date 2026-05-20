import type { AccommodationRecord } from './database'

export interface AccommodationCardViewModel {
  accommodation: AccommodationRecord
  affiliateUrl: string
  affiliateDestinationUrlKey: string
  imageAltText: string
  priceLabel: string
  stayContext: string
  specificationLabel: string
}
