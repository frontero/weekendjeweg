import { deVersAdditionalAccommodations } from '../data/deVersAdditionalAccommodations'
import { deVersCurrentPricesByCode } from '../data/deVersCurrentPrices'
import type {
  AccommodationRecord,
  AffiliateLinkTemplateRecord,
  CatalogDataSet,
  FacilityRecord,
  ISODate,
  ParkRecord,
  PriceSnapshotRecord,
  RegionRecord,
  UUID,
} from '../types/database'

export interface ParkSearchFilters {
  regionSlug?: string
  facilitySlugs?: string[]
}

export interface PriceSnapshotQuery {
  parkId: UUID
  arrivalDate: ISODate
  departureDate: ISODate
  adultCount: number
  childCount: number
}

const sortByName = <RecordType extends { name: string }>(items: RecordType[]): RecordType[] => {
  return [...items].sort((leftItem: RecordType, rightItem: RecordType): number => {
    return leftItem.name.localeCompare(rightItem.name, 'nl')
  })
}

const sortAccommodations = (items: AccommodationRecord[]): AccommodationRecord[] => {
  return [...items].sort((leftItem: AccommodationRecord, rightItem: AccommodationRecord): number => {
    const leftPrice: number = leftItem.totalPriceInCents ?? Number.MAX_SAFE_INTEGER
    const rightPrice: number = rightItem.totalPriceInCents ?? Number.MAX_SAFE_INTEGER

    if (leftPrice !== rightPrice) {
      return leftPrice - rightPrice
    }

    return leftItem.code.localeCompare(rightItem.code, 'nl')
  })
}

const getAccommodationKey = (accommodation: AccommodationRecord): string => {
  return `${accommodation.parkId}:${accommodation.code}`
}

const applyCurrentDeVersPrice = (accommodation: AccommodationRecord): AccommodationRecord => {
  const currentPrice = deVersCurrentPricesByCode[accommodation.code]

  if (currentPrice === undefined) {
    return accommodation
  }

  return {
    ...accommodation,
    ...currentPrice,
  }
}

const listCatalogAccommodations = (catalog: CatalogDataSet): AccommodationRecord[] => {
  const accommodationByKey: Map<string, AccommodationRecord> = new Map()

  catalog.accommodations.forEach((accommodation: AccommodationRecord): void => {
    accommodationByKey.set(getAccommodationKey(accommodation), accommodation)
  })

  deVersAdditionalAccommodations.forEach((accommodation: AccommodationRecord): void => {
    const accommodationKey: string = getAccommodationKey(accommodation)

    if (accommodationByKey.has(accommodationKey) === true) {
      return
    }

    accommodationByKey.set(accommodationKey, accommodation)
  })

  return [...accommodationByKey.values()].map((accommodation: AccommodationRecord): AccommodationRecord => {
    return applyCurrentDeVersPrice(accommodation)
  })
}

const getRegionIdBySlug = (catalog: CatalogDataSet, regionSlug: string): UUID | null => {
  const region: RegionRecord | undefined = catalog.regions.find(
    (regionRecord: RegionRecord): boolean => regionRecord.slug === regionSlug,
  )

  if (region === undefined) {
    return null
  }

  return region.id
}

const getFacilityIdsBySlug = (catalog: CatalogDataSet, facilitySlugs: string[]): Set<UUID> => {
  const facilityIds: UUID[] = catalog.facilities
    .filter((facility: FacilityRecord): boolean => facilitySlugs.includes(facility.slug) === true)
    .map((facility: FacilityRecord): UUID => facility.id)

  return new Set(facilityIds)
}

const matchesRegion = (catalog: CatalogDataSet, park: ParkRecord, filters: ParkSearchFilters): boolean => {
  if (filters.regionSlug === undefined || filters.regionSlug === '') {
    return true
  }

  const regionId: UUID | null = getRegionIdBySlug(catalog, filters.regionSlug)

  if (regionId === null) {
    return false
  }

  return park.regionId === regionId
}

const matchesFacilities = (catalog: CatalogDataSet, park: ParkRecord, filters: ParkSearchFilters): boolean => {
  const facilitySlugs: string[] = filters.facilitySlugs ?? []

  if (facilitySlugs.length === 0) {
    return true
  }

  const requiredFacilityIds: Set<UUID> = getFacilityIdsBySlug(catalog, facilitySlugs)

  if (requiredFacilityIds.size !== facilitySlugs.length) {
    return false
  }

  const parkFacilityIds: Set<UUID> = new Set(
    catalog.parkFacilities
      .filter((parkFacility): boolean => parkFacility.parkId === park.id)
      .map((parkFacility): UUID => parkFacility.facilityId),
  )

  return [...requiredFacilityIds].every((facilityId: UUID): boolean => parkFacilityIds.has(facilityId) === true)
}

export const listRegions = (catalog: CatalogDataSet): RegionRecord[] => {
  return sortByName(catalog.regions)
}

export const listFacilities = (catalog: CatalogDataSet): FacilityRecord[] => {
  return sortByName(catalog.facilities)
}

export const listParks = (catalog: CatalogDataSet, filters: ParkSearchFilters = {}): ParkRecord[] => {
  return sortByName(
    catalog.parks
      .filter((park: ParkRecord): boolean => matchesRegion(catalog, park, filters) === true)
      .filter((park: ParkRecord): boolean => matchesFacilities(catalog, park, filters) === true),
  )
}

export const getParkBySlug = (catalog: CatalogDataSet, slug: string): ParkRecord | null => {
  const park: ParkRecord | undefined = catalog.parks.find((parkRecord: ParkRecord): boolean => parkRecord.slug === slug)

  if (park === undefined) {
    return null
  }

  return park
}

export const listFacilitiesForPark = (catalog: CatalogDataSet, parkId: UUID): FacilityRecord[] => {
  const facilityIds: UUID[] = catalog.parkFacilities
    .filter((parkFacility): boolean => parkFacility.parkId === parkId)
    .map((parkFacility): UUID => parkFacility.facilityId)

  return sortByName(
    catalog.facilities.filter((facility: FacilityRecord): boolean => facilityIds.includes(facility.id) === true),
  )
}

export const listAccommodationsForPark = (catalog: CatalogDataSet, parkId: UUID): AccommodationRecord[] => {
  return sortAccommodations(
    listCatalogAccommodations(catalog).filter((accommodation: AccommodationRecord): boolean => accommodation.parkId === parkId),
  )
}

export const selectPriceSnapshot = (catalog: CatalogDataSet, query: PriceSnapshotQuery): PriceSnapshotRecord | null => {
  const matchingSnapshots: PriceSnapshotRecord[] = catalog.priceSnapshots.filter((snapshot: PriceSnapshotRecord): boolean => {
    return snapshot.parkId === query.parkId
      && snapshot.arrivalDate === query.arrivalDate
      && snapshot.departureDate === query.departureDate
      && snapshot.adultCount === query.adultCount
      && snapshot.childCount === query.childCount
  })

  const sortedSnapshots: PriceSnapshotRecord[] = [...matchingSnapshots].sort(
    (leftSnapshot: PriceSnapshotRecord, rightSnapshot: PriceSnapshotRecord): number => {
      return rightSnapshot.sourceCapturedAt.localeCompare(leftSnapshot.sourceCapturedAt)
    },
  )

  return sortedSnapshots[0] ?? null
}

export const getAffiliateTemplateForPark = (
  catalog: CatalogDataSet,
  parkId: UUID,
): AffiliateLinkTemplateRecord | null => {
  const template: AffiliateLinkTemplateRecord | undefined = catalog.affiliateLinkTemplates.find(
    (linkTemplate: AffiliateLinkTemplateRecord): boolean => linkTemplate.parkId === parkId,
  )

  if (template === undefined) {
    return null
  }

  return template
}
