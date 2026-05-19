import {
  getAffiliateTemplateForPark,
  listFacilitiesForPark,
  listParks,
  selectPriceSnapshot,
} from './catalogRepository'
import type { AffiliateLinkTemplateRecord, CatalogDataSet, ParkRecord, PriceSnapshotRecord } from '../types/database'
import type { ParkCardViewModel, ParkPriceSearch } from '../types/parkSearch'
import type { ParkSearchFilters } from './catalogRepository'

const euroFormatter = new Intl.NumberFormat('nl-NL', {
  currency: 'EUR',
  maximumFractionDigits: 0,
  style: 'currency',
})

const defaultParkVisualClassName = 'bg-[#153f3a]'
const defaultParkVisualImageUrl = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'

const parkVisualClassNames: Record<string, string> = {
  coast: 'bg-[#28665e]',
  forest: 'bg-[#153f3a]',
  hills: 'bg-[#644a24]',
}

const parkVisualImageUrls: Record<string, string> = {
  coast: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
  hills: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
}

export const createParkDetailPath = (park: ParkRecord): string => {
  return `/parken/${park.slug}`
}

export const getRegionNameForPark = (catalog: CatalogDataSet, park: ParkRecord): string => {
  const region = catalog.regions.find((regionRecord): boolean => regionRecord.id === park.regionId)

  if (region === undefined) {
    return 'Nederland'
  }

  return region.name
}

export const formatPriceSnapshot = (priceSnapshot: PriceSnapshotRecord | null): string => {
  if (priceSnapshot === null || priceSnapshot.priceAmount === null) {
    return 'Geen prijsvoorbeeld voor deze selectie'
  }

  return `${priceSnapshot.priceLabel ?? 'Prijsvoorbeeld'}: vanaf ${euroFormatter.format(priceSnapshot.priceAmount)}`
}

export const createPriceContext = (priceSearch: ParkPriceSearch): string => {
  return `${priceSearch.arrivalDate} tot ${priceSearch.departureDate}, ${priceSearch.adultCount} volwassenen en ${priceSearch.childCount} kinderen`
}

const getAffiliateUrl = (catalog: CatalogDataSet, park: ParkRecord): string => {
  const template: AffiliateLinkTemplateRecord | null = getAffiliateTemplateForPark(catalog, park.id)

  if (template === null) {
    return park.sourceUrl
  }

  return template.baseUrl
}

const getVisualKey = (park: ParkRecord): string => {
  return park.visualPlaceholderKey ?? 'default'
}

const getVisualClassName = (park: ParkRecord): string => {
  const visualClassName: string | undefined = parkVisualClassNames[getVisualKey(park)]

  if (visualClassName === undefined) {
    return defaultParkVisualClassName
  }

  return visualClassName
}

export const getParkVisualImageUrl = (park: ParkRecord): string => {
  const visualImageUrl: string | undefined = parkVisualImageUrls[getVisualKey(park)]

  if (visualImageUrl === undefined) {
    return defaultParkVisualImageUrl
  }

  return visualImageUrl
}

export const getParkVisualAltText = (park: ParkRecord, regionName: string): string => {
  return `Sfeerbeeld voor ${park.name} in ${regionName}`
}

export const createParkCardViewModel = (
  catalog: CatalogDataSet,
  park: ParkRecord,
  priceSearch: ParkPriceSearch,
): ParkCardViewModel => {
  const priceSnapshot: PriceSnapshotRecord | null = selectPriceSnapshot(catalog, {
    parkId: park.id,
    ...priceSearch,
  })
  const regionName: string = getRegionNameForPark(catalog, park)

  return {
    park,
    regionName,
    facilities: listFacilitiesForPark(catalog, park.id),
    priceSnapshot,
    priceLabel: formatPriceSnapshot(priceSnapshot),
    priceContext: createPriceContext(priceSearch),
    detailPath: createParkDetailPath(park),
    affiliateUrl: getAffiliateUrl(catalog, park),
    visualClassName: getVisualClassName(park),
    visualImageUrl: getParkVisualImageUrl(park),
    visualAltText: getParkVisualAltText(park, regionName),
  }
}

export const createParkCardViewModels = (
  catalog: CatalogDataSet,
  filters: ParkSearchFilters,
  priceSearch: ParkPriceSearch,
): ParkCardViewModel[] => {
  return listParks(catalog, filters).map((park: ParkRecord): ParkCardViewModel => {
    return createParkCardViewModel(catalog, park, priceSearch)
  })
}

export const createParkMetaDescription = (park: ParkRecord, regionName: string): string => {
  return `Bekijk ${park.name} in ${regionName} en vergelijk prijsinformatie zonder beschikbaarheidsclaim.`
}
