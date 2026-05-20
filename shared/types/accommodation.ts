import type { AccommodationRecord } from './database'

export type AccommodationSortMode = 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc'

export interface AccommodationCardViewModel {
  accommodation: AccommodationRecord
  affiliateUrl: string
  affiliateDestinationUrlKey: string
  imageAltText: string
  priceLabel: string
  stayContext: string
  specificationLabel: string
}

export interface AccommodationFilterOption {
  value: string
  label: string
}

export interface AccommodationFilterState {
  personCount: string
  numberOfNights: string
  maxPriceAmount: string
  sortMode: AccommodationSortMode
}
