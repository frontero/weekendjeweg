import { buildAffiliateUrl } from './affiliateLinks'
import { getAffiliateTemplateForPark, listAccommodationsForPark } from './catalogRepository'
import type { AccommodationCardViewModel, AccommodationImageSlide } from '../types/accommodation'
import type { AccommodationRecord, AffiliateLinkTemplateRecord, CatalogDataSet, ParkRecord } from '../types/database'
import type { AffiliateUrlResult } from '../types/affiliate'

const euroFormatter = new Intl.NumberFormat('nl-NL', {
  currency: 'EUR',
  maximumFractionDigits: 0,
  style: 'currency',
})

export const createParkAccommodationOverviewPath = (park: ParkRecord): string => {
  return `/parken/${park.slug}/accommodaties`
}

export const formatAccommodationPrice = (accommodation: AccommodationRecord): string => {
  if (accommodation.priceAmount === null) {
    return 'Prijs onbekend'
  }

  return `vanaf ${euroFormatter.format(accommodation.priceAmount)}`
}

export const createAccommodationStayContext = (accommodation: AccommodationRecord): string => {
  if (accommodation.arrivalDate === null || accommodation.departureDate === null || accommodation.numberOfNights === null) {
    return 'Controleer actuele beschikbaarheid bij Landal'
  }

  return `${accommodation.arrivalDate} tot ${accommodation.departureDate}, ${accommodation.numberOfNights} nachten`
}

const createSpecificationLabel = (accommodation: AccommodationRecord): string => {
  const details: string[] = [
    accommodation.areaText,
    accommodation.construction,
    accommodation.bedroomCount === null ? null : `${accommodation.bedroomCount} slaapkamers`,
    accommodation.bathroomCount === null ? null : `${accommodation.bathroomCount} badkamers`,
  ].filter((detail: string | null): detail is string => detail !== null && detail.length > 0)

  if (details.length === 0) {
    return accommodation.code
  }

  return details.join(' · ')
}

const createImageAltText = (park: ParkRecord, accommodation: AccommodationRecord): string => {
  return `${accommodation.name} ${accommodation.code} op ${park.name}`
}

const deduplicateImageUrls = (imageUrls: string[]): string[] => {
  const uniqueImageUrls: string[] = []

  imageUrls.forEach((imageUrl: string): void => {
    if (uniqueImageUrls.includes(imageUrl) === true) {
      return
    }

    uniqueImageUrls.push(imageUrl)
  })

  return uniqueImageUrls
}

const getAccommodationImageUrls = (accommodation: AccommodationRecord): string[] => {
  if (accommodation.imageUrls.length > 0) {
    return deduplicateImageUrls(accommodation.imageUrls)
  }

  if (accommodation.imageUrl === null) {
    return []
  }

  return [accommodation.imageUrl]
}

const createAccommodationImageSlides = (
  park: ParkRecord,
  accommodation: AccommodationRecord,
): AccommodationImageSlide[] => {
  const imageAltText: string = createImageAltText(park, accommodation)
  const imageUrls: string[] = getAccommodationImageUrls(accommodation)

  return imageUrls.map((imageUrl: string, index: number): AccommodationImageSlide => {
    return {
      url: imageUrl,
      altText: `${imageAltText} - foto ${index + 1}`,
    }
  })
}

const createAccommodationAffiliateLink = (
  park: ParkRecord,
  template: AffiliateLinkTemplateRecord | null,
  accommodation: AccommodationRecord,
  pagePath: string,
): AffiliateUrlResult => {
  return buildAffiliateUrl({
    park,
    template,
    pagePath,
    destinationUrl: accommodation.sourceUrl,
    trackingParameters: {
      source: 'accommodation-overview',
      medium: 'affiliate',
      campaign: 'landal-tradetracker',
      content: `${park.slug}-${accommodation.code.toLowerCase()}`,
    },
  })
}

export const createAccommodationCardViewModels = (
  catalog: CatalogDataSet,
  park: ParkRecord,
  pagePath: string,
): AccommodationCardViewModel[] => {
  const template: AffiliateLinkTemplateRecord | null = getAffiliateTemplateForPark(catalog, park.id)

  return listAccommodationsForPark(catalog, park.id).map((accommodation: AccommodationRecord): AccommodationCardViewModel => {
    const affiliateLink: AffiliateUrlResult = createAccommodationAffiliateLink(park, template, accommodation, pagePath)
    const imageAltText: string = createImageAltText(park, accommodation)

    return {
      accommodation,
      affiliateUrl: affiliateLink.url,
      affiliateDestinationUrlKey: affiliateLink.destinationUrlKey,
      imageAltText,
      imageSlides: createAccommodationImageSlides(park, accommodation),
      priceLabel: formatAccommodationPrice(accommodation),
      stayContext: createAccommodationStayContext(accommodation),
      specificationLabel: createSpecificationLabel(accommodation),
    }
  })
}
