import type { FacilityRecord, ISODate, ParkRecord, PriceSnapshotRecord } from './database'

export interface ParkPriceSearch {
  arrivalDate: ISODate
  departureDate: ISODate
  adultCount: number
  childCount: number
}

export interface ParkCardViewModel {
  park: ParkRecord
  regionName: string
  facilities: FacilityRecord[]
  priceSnapshot: PriceSnapshotRecord | null
  priceLabel: string
  priceContext: string
  detailPath: string
  affiliateUrl: string
  visualClassName: string
  visualImageUrl: string
  visualAltText: string
}

export interface ParkResultCardProps {
  card: ParkCardViewModel
}
