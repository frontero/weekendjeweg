import type { AccommodationRecord } from './database'

export type AccommodationSortMode = 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc'
export type AccommodationPriceStatus = 'default_price' | 'selected_date_match' | 'selected_date_missing'

export interface AccommodationSearchSelection {
  arrivalDate: string
  departureDate: string
  adultCount: number
  childCount: number
}

export interface AccommodationImageSlide {
  url: string
  altText: string
}

export interface AccommodationCardViewModel {
  accommodation: AccommodationRecord
  affiliateUrl: string
  affiliateDestinationUrlKey: string
  imageAltText: string
  imageSlides: AccommodationImageSlide[]
  priceFootnote: string
  priceLabel: string
  priceStatus: AccommodationPriceStatus
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
