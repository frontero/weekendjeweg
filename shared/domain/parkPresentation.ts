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

const getVisualClassName = (park: ParkRecord): string => {
  const visualKey: string = park.visualPlaceholderKey ?? 'default'

  return `park-card__visual--${visualKey}`
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

  return {
    park,
    regionName: getRegionNameForPark(catalog, park),
    facilities: listFacilitiesForPark(catalog, park.id),
    priceSnapshot,
    priceLabel: formatPriceSnapshot(priceSnapshot),
    priceContext: createPriceContext(priceSearch),
    detailPath: createParkDetailPath(park),
    affiliateUrl: getAffiliateUrl(catalog, park),
    visualClassName: getVisualClassName(park),
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
