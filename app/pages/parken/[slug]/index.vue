<script setup lang="ts">
import {
  ArrowRight,
  Bath,
  BedDouble,
  Bike,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Euro,
  Home,
  MapPin,
  PawPrint,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  Users,
  Utensils,
  Waves,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import {
  getParkGalleryImagesForSlug,
  listParkFacilityStoriesForSlug,
  listParkTestimonialsForSlug,
} from '~~/shared/data/parkDetailContent'
import {
  createAccommodationCardViewModels,
  createParkAccommodationOverviewPath,
} from '~~/shared/domain/accommodationPresentation'
import { buildAffiliateUrl } from '~~/shared/domain/affiliateLinks'
import {
  getAffiliateTemplateForPark,
  getParkBySlug,
  listAccommodationsForPark,
  selectPriceSnapshot,
} from '~~/shared/domain/catalogRepository'
import {
  createParkDetailPath,
  formatPriceSnapshot,
  getParkVisualAltText,
  getParkVisualImageUrl,
  getRegionNameForPark,
} from '~~/shared/domain/parkPresentation'
import {
  createCanonicalUrl,
  createParkBreadcrumbStructuredData,
  createParkWebPageStructuredData,
  serialiseStructuredData,
} from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type { AccommodationCardViewModel, AccommodationImageSlide } from '~~/shared/types/accommodation'
import type { AffiliateUrlResult } from '~~/shared/types/affiliate'
import type { AccommodationRecord, AffiliateLinkTemplateRecord, ParkRecord, PriceSnapshotRecord } from '~~/shared/types/database'
import type { ParkFacilityStory, ParkGalleryImage, ParkTestimonial, StructuredDataScript } from '~~/shared/types/parkDetail'

// Definitions
const route = useRoute()
const requestUrl = useRequestURL()
const runtimeConfig = useRuntimeConfig()
const { consentState } = useConsentState()
const { trackOutboundClick } = useOutboundClickTracking()
const defaultArrivalDate = '2026-06-05'
const defaultDepartureDate = '2026-06-08'
const defaultAdultCount = 2
const defaultChildCount = 0
const fallbackParkImageUrl = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'
const fallbackAffiliateLink: AffiliateUrlResult = {
  url: 'https://www.landal.nl/',
  destinationUrlKey: 'landal:fallback',
  status: 'source_fallback',
}
const accommodationCarouselElement = ref<HTMLElement | null>(null)
const euroFormatter = new Intl.NumberFormat('nl-NL', {
  currency: 'EUR',
  maximumFractionDigits: 0,
  style: 'currency',
})

// Computed
const siteOrigin = computed<string>(() => resolveSiteOrigin(runtimeConfig.public.siteUrl, requestUrl.origin))
const routeSlug = computed<string>(() => String(route.params.slug ?? ''))
const park = computed<ParkRecord | null>(() => getParkBySlug(mockCatalog, routeSlug.value))
const hasPark = computed<boolean>(() => park.value !== null)

const parkName = computed<string>(() => {
  if (park.value === null) {
    return 'Park niet gevonden'
  }

  return park.value.name
})

const parkDescription = computed<string>(() => {
  if (park.value === null || park.value.description === null) {
    return 'Dit park staat nog niet in de catalogus.'
  }

  return park.value.description
})

const parkHighlights = computed<string[]>(() => {
  if (park.value === null) {
    return []
  }

  return park.value.highlights
})

const regionName = computed<string>(() => {
  if (park.value === null) {
    return 'Nederland'
  }

  return getRegionNameForPark(mockCatalog, park.value)
})

const parkImageUrl = computed<string>(() => {
  if (park.value === null) {
    return fallbackParkImageUrl
  }

  return getParkVisualImageUrl(park.value)
})

const parkImageAltText = computed<string>(() => {
  if (park.value === null) {
    return 'Sfeerbeeld voor een weekendje weg'
  }

  return getParkVisualAltText(park.value, regionName.value)
})

const fallbackGalleryImage = computed<ParkGalleryImage>(() => {
  return {
    url: parkImageUrl.value,
    altText: parkImageAltText.value,
  }
})

const parkGalleryImages = computed<ParkGalleryImage[]>(() => {
  if (park.value === null) {
    return []
  }

  return getParkGalleryImagesForSlug(park.value.slug, fallbackGalleryImage.value)
})

const primaryGalleryImage = computed<ParkGalleryImage>(() => {
  const image: ParkGalleryImage | undefined = parkGalleryImages.value[0]

  if (image === undefined) {
    return {
      url: fallbackParkImageUrl,
      altText: 'Sfeerbeeld voor een weekendje weg',
    }
  }

  return image
})

const secondaryGalleryImages = computed<ParkGalleryImage[]>(() => parkGalleryImages.value.slice(1, 4))

const featureImage = computed<ParkGalleryImage>(() => {
  const image: ParkGalleryImage | undefined = secondaryGalleryImages.value[0]

  if (image === undefined) {
    return primaryGalleryImage.value
  }

  return image
})

const facilityStories = computed<ParkFacilityStory[]>(() => {
  if (park.value === null) {
    return []
  }

  return listParkFacilityStoriesForSlug(park.value.slug)
})

const hasFacilityStories = computed<boolean>(() => facilityStories.value.length > 0)

const testimonials = computed<ParkTestimonial[]>(() => {
  if (park.value === null) {
    return []
  }

  return listParkTestimonialsForSlug(park.value.slug)
})

const hasTestimonials = computed<boolean>(() => testimonials.value.length > 0)

const accommodations = computed<AccommodationRecord[]>(() => {
  if (park.value === null) {
    return []
  }

  return listAccommodationsForPark(mockCatalog, park.value.id)
})

const accommodationCards = computed<AccommodationCardViewModel[]>(() => {
  if (park.value === null) {
    return []
  }

  return createAccommodationCardViewModels(mockCatalog, park.value, route.path)
})

const accommodationCarouselCards = computed<AccommodationCardViewModel[]>(() => accommodationCards.value)
const hasAccommodations = computed<boolean>(() => accommodations.value.length > 0)
const hasMultipleAccommodationCards = computed<boolean>(() => accommodationCarouselCards.value.length > 1)

const accommodationOverviewPath = computed<string>(() => {
  if (park.value === null) {
    return '/parken'
  }

  return createParkAccommodationOverviewPath(park.value)
})

const accommodationOverviewButtonText = computed<string>(() => {
  if (accommodations.value.length === 1) {
    return 'Bekijk 1 accommodatie'
  }

  return `Bekijk ${accommodations.value.length} accommodaties`
})

const priceSnapshot = computed<PriceSnapshotRecord | null>(() => {
  if (park.value === null) {
    return null
  }

  return selectPriceSnapshot(mockCatalog, {
    parkId: park.value.id,
    arrivalDate: defaultArrivalDate,
    departureDate: defaultDepartureDate,
    adultCount: defaultAdultCount,
    childCount: defaultChildCount,
  })
})

const priceLabel = computed<string>(() => formatPriceSnapshot(priceSnapshot.value))

const compactPriceLabel = computed<string>(() => {
  const snapshot: PriceSnapshotRecord | null = priceSnapshot.value

  if (snapshot === null || snapshot.priceAmount === null) {
    return 'Prijs volgt'
  }

  return `vanaf ${euroFormatter.format(snapshot.priceAmount)}`
})

const sourceCapturedAtLabel = computed<string>(() => {
  if (priceSnapshot.value === null) {
    return 'nog niet opgehaald'
  }

  return priceSnapshot.value.sourceCapturedAt.slice(0, 10)
})

const tripContextLabel = computed<string>(() => {
  return `${defaultArrivalDate} tot ${defaultDepartureDate}, ${defaultAdultCount} volwassenen`
})

const affiliateLink = computed<AffiliateUrlResult>(() => {
  if (park.value === null) {
    return fallbackAffiliateLink
  }

  const template: AffiliateLinkTemplateRecord | null = getAffiliateTemplateForPark(mockCatalog, park.value.id)

  return buildAffiliateUrl({
    park: park.value,
    template,
    pagePath: route.path,
    trackingParameters: {
      source: 'park-detail',
      medium: 'affiliate',
      campaign: 'landal-placeholder',
      content: park.value.slug,
    },
  })
})

const affiliateUrl = computed<string>(() => affiliateLink.value.url)

const canonicalUrl = computed<string>(() => {
  if (park.value === null) {
    return createCanonicalUrl(siteOrigin.value, route.path)
  }

  return createCanonicalUrl(siteOrigin.value, createParkDetailPath(park.value))
})

const seoTitle = computed<string>(() => {
  if (park.value === null) {
    return 'Park niet gevonden | Weekendjeweg'
  }

  return `${park.value.name} in ${park.value.locationName} | prijzen, huisjes en tips`
})

const seoDescription = computed<string>(() => {
  if (park.value === null) {
    return 'Park niet gevonden in de Weekendjeweg catalogus.'
  }

  return `Bekijk ${park.value.name} in ${park.value.locationName}: accommodaties, faciliteiten, sfeerbeelden en prijsvoorbeeld ${compactPriceLabel.value}. Vergelijk rustig en klik door naar Landal.`
})

const structuredDataScripts = computed<StructuredDataScript[]>(() => {
  if (park.value === null) {
    return []
  }

  return [
    {
      type: 'application/ld+json',
      innerHTML: serialiseStructuredData(createParkBreadcrumbStructuredData(siteOrigin.value, park.value)),
    },
    {
      type: 'application/ld+json',
      innerHTML: serialiseStructuredData(createParkWebPageStructuredData({
        canonicalUrl: canonicalUrl.value,
        description: seoDescription.value,
        imageAltText: primaryGalleryImage.value.altText,
        imageUrl: primaryGalleryImage.value.url,
        park: park.value,
        title: seoTitle.value,
      })),
    },
  ]
})

// Functions
const getFeaturedAccommodationImageUrl = (card: AccommodationCardViewModel): string => {
  const firstSlide: AccommodationImageSlide | undefined = card.imageSlides[0]

  if (firstSlide !== undefined) {
    return firstSlide.url
  }

  if (card.accommodation.imageUrl !== null) {
    return card.accommodation.imageUrl
  }

  return parkImageUrl.value
}

const scrollAccommodationCarousel = (scrollDirection: 'previous' | 'next'): void => {
  const carouselElement: HTMLElement | null = accommodationCarouselElement.value

  if (carouselElement === null) {
    return
  }

  const scrollDistance: number = carouselElement.clientWidth * 0.85

  if (scrollDirection === 'previous') {
    carouselElement.scrollBy({ left: scrollDistance * -1, behavior: 'smooth' })
    return
  }

  carouselElement.scrollBy({ left: scrollDistance, behavior: 'smooth' })
}

const handleAffiliateClick = (): void => {
  if (park.value === null) {
    return
  }

  trackOutboundClick({
    parkId: park.value.id,
    destinationUrlKey: affiliateLink.value.destinationUrlKey,
    pagePath: route.path,
    consentState: consentState.value,
    utmContext: {
      source: 'park-detail',
      campaign: 'landal-placeholder',
      park: park.value.slug,
    },
  })
}

useHead(() => ({
  title: seoTitle.value,
  meta: [
    {
      name: 'description',
      content: seoDescription.value,
    },
    {
      property: 'og:title',
      content: seoTitle.value,
    },
    {
      property: 'og:description',
      content: seoDescription.value,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: canonicalUrl.value,
    },
    {
      property: 'og:image',
      content: primaryGalleryImage.value.url,
    },
    {
      property: 'og:image:alt',
      content: primaryGalleryImage.value.altText,
    },
    {
      property: 'og:locale',
      content: 'nl_NL',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: seoTitle.value,
    },
    {
      name: 'twitter:description',
      content: seoDescription.value,
    },
    {
      name: 'twitter:image',
      content: primaryGalleryImage.value.url,
    },
    {
      name: 'twitter:image:alt',
      content: primaryGalleryImage.value.altText,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: structuredDataScripts.value,
}))
</script>

<template>
  <div>
    <section
      class="bg-[#153f3a] px-4 py-8 text-white md:px-16 md:py-12"
      aria-labelledby="park-title"
    >
      <div class="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(24rem,1.05fr)] lg:items-center">
        <div class="grid gap-5">
          <div class="flex flex-wrap items-center gap-2">
            <p class="inline-flex min-h-9 w-fit items-center gap-2 rounded-md bg-[#f5c84c] px-3 py-2 text-sm font-black uppercase tracking-normal text-[#153f3a]">
              <MapPin
                :size="17"
                aria-hidden="true"
              />
              {{ regionName }}
            </p>
            <p class="inline-flex min-h-9 w-fit items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-sm font-black text-white ring-1 ring-white/28">
              <Camera
                :size="17"
                aria-hidden="true"
              />
              Foto's van het park
            </p>
          </div>
          <div class="grid gap-4">
            <h1
              id="park-title"
              class="max-w-[13ch] text-5xl font-black leading-[1.02] tracking-normal md:text-7xl"
            >
              {{ parkName }}
            </h1>
            <p class="max-w-[44rem] text-lg font-semibold leading-relaxed text-[#fdfaf2] md:text-xl">
              {{ parkDescription }}
            </p>
          </div>
          <ul class="grid gap-2 sm:grid-cols-3">
            <li
              v-for="highlight in parkHighlights"
              :key="highlight"
              class="inline-flex min-h-12 items-center gap-2 rounded-md bg-white/10 px-3 py-2 font-black text-white ring-1 ring-white/20"
            >
              <CheckCircle2
                :size="18"
                aria-hidden="true"
              />
              {{ highlight }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-3 pt-1">
            <NuxtLink
              v-if="hasAccommodations"
              :to="accommodationOverviewPath"
              class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#f5c84c] px-5 py-3 font-black text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
            >
              Bekijk accommodaties
              <ArrowRight
                :size="18"
                aria-hidden="true"
              />
            </NuxtLink>
            <a
              :href="affiliateUrl"
              class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#c94936] px-5 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
              rel="nofollow sponsored noopener"
              @click="handleAffiliateClick"
            >
              Naar Landal
              <ChevronRight
                :size="18"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div class="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(10rem,0.9fr)]">
          <img
            :alt="primaryGalleryImage.altText"
            :src="primaryGalleryImage.url"
            class="h-[22rem] w-full rounded-lg object-cover shadow-[0_28px_60px_rgba(0,0,0,0.28)] lg:h-[34rem]"
          />
          <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <img
              v-for="image in secondaryGalleryImages"
              :key="image.url"
              :alt="image.altText"
              :src="image.url"
              class="h-28 w-full rounded-lg object-cover shadow-[0_18px_36px_rgba(0,0,0,0.22)] sm:h-32 lg:h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <nav
      v-if="hasPark"
      class="sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-[#d9ded6] bg-[#fffdf7] px-4 py-3 md:px-16"
      aria-label="Parksecties"
    >
      <a
        class="inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8]"
        href="#waarom"
      >
        Waarom dit park
      </a>
      <a
        v-if="hasFacilityStories"
        class="inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8]"
        href="#faciliteiten"
      >
        Faciliteiten
      </a>
      <a
        class="inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8]"
        href="#accommodaties"
      >
        Accommodaties
      </a>
      <a
        v-if="hasTestimonials"
        class="inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8]"
        href="#reviews"
      >
        Reviews
      </a>
      <a
        class="inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8]"
        href="#prijs"
      >
        Prijsvoorbeeld
      </a>
    </nav>

    <section
      v-if="hasPark"
      class="grid gap-8 px-4 py-10 md:px-16 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,25rem)] lg:items-start"
      aria-label="Parkinformatie"
    >
      <div class="grid gap-8">
        <div
          id="waarom"
          class="grid gap-5"
        >
          <div class="grid gap-2">
            <p class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-[#b33b2f]">
              <Sparkles
                :size="17"
                aria-hidden="true"
              />
              Zin in een paar dagen weg
            </p>
            <h2 class="max-w-[16ch] text-4xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-5xl">
              Bos, spelen en rust zonder lang zoeken
            </h2>
            <p class="max-w-[52rem] text-lg leading-relaxed text-[#455b56]">
              De Vers voelt als een praktisch familiepark: groen genoeg om echt weg te zijn, compact genoeg om snel je plek te vinden en met prijsvoorbeelden die je direct naar de juiste accommodatie sturen.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <article class="grid gap-3 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.10)]">
              <Trees
                :size="30"
                class="text-[#28665e]"
                aria-hidden="true"
              />
              <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">Tussen de bomen</h3>
              <p class="text-[#455b56]">Start je dag rustig, pak de fiets of wandel zo de Brabantse natuur in.</p>
            </article>
            <article class="grid gap-3 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.10)]">
              <Waves
                :size="30"
                class="text-[#28665e]"
                aria-hidden="true"
              />
              <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">Zwemplezier dichtbij</h3>
              <p class="text-[#455b56]">Handig voor gezinnen: op het park is genoeg te doen zonder de auto te pakken.</p>
            </article>
            <article class="grid gap-3 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.10)]">
              <PawPrint
                :size="30"
                class="text-[#28665e]"
                aria-hidden="true"
              />
              <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">Hond welkom</h3>
              <p class="text-[#455b56]">Neem je hond mee en kies een verblijf dat past bij wandelen, buiten zijn en gemak.</p>
            </article>
          </div>
        </div>

        <div class="grid gap-5 rounded-lg bg-[#153f3a] p-5 text-white md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-6">
          <img
            :alt="featureImage.altText"
            :src="featureImage.url"
            class="h-64 w-full rounded-lg object-cover md:h-full"
            loading="lazy"
          />
          <div class="grid content-center gap-4">
            <p class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-[#f5c84c]">
              <Bike
                :size="17"
                aria-hidden="true"
              />
              Overloon en omgeving
            </p>
            <h2 class="text-3xl font-black leading-tight tracking-normal md:text-4xl">Je hoeft niet groots te plannen om veel te doen</h2>
            <p class="text-lg leading-relaxed text-[#fdfaf2]">Denk aan fietsen, wandelen, iets drinken op het park en genoeg ruimte voor kinderen om hun eigen gang te gaan. Precies het soort weekend dat weinig gedoe vraagt.</p>
          </div>
        </div>

        <div
          v-if="hasFacilityStories"
          id="faciliteiten"
          class="grid gap-5"
        >
          <div class="grid gap-2">
            <p class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-[#b33b2f]">
              <Camera
                :size="17"
                aria-hidden="true"
              />
              Sfeer en faciliteiten
            </p>
            <h2 class="max-w-[18ch] text-4xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-5xl">
              Een weekend dat vanzelf gevuld raakt
            </h2>
            <p class="max-w-[52rem] text-lg leading-relaxed text-[#455b56]">
              Voor SEO en voor bezoekers werkt dit beter: concrete faciliteiten, echte sfeerbeelden en korte teksten die laten zien waarom dit park bij een weekendje weg past.
            </p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <article
              v-for="story in facilityStories"
              :key="story.title"
              class="overflow-hidden rounded-lg bg-[#fffdf7] shadow-[0_18px_40px_rgba(21,63,58,0.10)]"
            >
              <img
                :alt="story.imageAltText"
                :src="story.imageUrl"
                class="h-56 w-full object-cover"
                loading="lazy"
              />
              <div class="grid gap-2 p-5">
                <p class="text-sm font-black uppercase tracking-normal text-[#b33b2f]">{{ story.eyebrow }}</p>
                <h3 class="text-2xl font-black leading-tight tracking-normal text-[#1b2f2c]">{{ story.title }}</h3>
                <p class="leading-relaxed text-[#455b56]">{{ story.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <div
          id="accommodaties"
          class="grid gap-5"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div class="grid gap-2">
              <p class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-[#b33b2f]">
                <Home
                  :size="17"
                  aria-hidden="true"
                />
                Accommodaties
              </p>
              <h2 class="text-4xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-5xl">Kies eerst je huisje</h2>
            </div>
            <NuxtLink
              v-if="hasAccommodations"
              :to="accommodationOverviewPath"
              class="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-[#153f3a] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            >
              {{ accommodationOverviewButtonText }}
              <ArrowRight
                :size="18"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>

          <div class="grid gap-3">
            <div
              v-if="hasMultipleAccommodationCards"
              class="flex justify-end gap-2"
              aria-label="Accommodatiecarousel bedienen"
            >
              <button
                aria-label="Vorige accommodaties"
                class="grid size-11 place-items-center rounded-md border border-[#b7c6bf] bg-white text-[#153f3a] shadow-[0_10px_24px_rgba(21,63,58,0.10)] hover:bg-[#e7efe8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
                type="button"
                @click="scrollAccommodationCarousel('previous')"
              >
                <ChevronLeft
                  :size="20"
                  aria-hidden="true"
                />
              </button>
              <button
                aria-label="Volgende accommodaties"
                class="grid size-11 place-items-center rounded-md border border-[#b7c6bf] bg-white text-[#153f3a] shadow-[0_10px_24px_rgba(21,63,58,0.10)] hover:bg-[#e7efe8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
                type="button"
                @click="scrollAccommodationCarousel('next')"
              >
                <ChevronRight
                  :size="20"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div
              ref="accommodationCarouselElement"
              class="-mx-4 flex snap-x gap-4 overflow-x-auto scroll-smooth px-4 pb-3 pt-1 [scrollbar-color:#28665e_#e7efe8] [scrollbar-width:thin] md:-mx-2 md:px-2"
              role="region"
              tabindex="0"
              aria-label="Accommodaties carousel"
            >
              <article
                v-for="card in accommodationCarouselCards"
                :key="card.accommodation.id"
                class="min-w-[17.5rem] snap-start overflow-hidden rounded-lg bg-[#fffdf7] shadow-[0_18px_40px_rgba(21,63,58,0.10)] sm:min-w-[20rem] lg:min-w-[21rem] xl:min-w-[22rem]"
              >
                <img
                  :alt="card.imageAltText"
                  :src="getFeaturedAccommodationImageUrl(card)"
                  class="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div class="grid gap-3 p-4">
                  <div class="grid gap-1">
                    <p class="text-sm font-black uppercase text-[#b33b2f]">{{ card.accommodation.code }}</p>
                    <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">{{ card.accommodation.name }}</h3>
                  </div>
                  <dl class="grid gap-2 text-sm font-semibold text-[#455b56]">
                    <div
                      v-if="card.accommodation.personCount !== null"
                      class="inline-flex items-center gap-2"
                    >
                      <Users
                        :size="16"
                        aria-hidden="true"
                      />
                      <dt class="sr-only">Personen</dt>
                      <dd>{{ card.accommodation.personCount }} personen</dd>
                    </div>
                    <div
                      v-if="card.accommodation.bedroomCount !== null"
                      class="inline-flex items-center gap-2"
                    >
                      <BedDouble
                        :size="16"
                        aria-hidden="true"
                      />
                      <dt class="sr-only">Slaapkamers</dt>
                      <dd>{{ card.accommodation.bedroomCount }} slaapkamers</dd>
                    </div>
                    <div
                      v-if="card.accommodation.bathroomCount !== null"
                      class="inline-flex items-center gap-2"
                    >
                      <Bath
                        :size="16"
                        aria-hidden="true"
                      />
                      <dt class="sr-only">Badkamers</dt>
                      <dd>{{ card.accommodation.bathroomCount }} badkamers</dd>
                    </div>
                  </dl>
                  <p class="text-2xl font-black text-[#153f3a]">{{ card.priceLabel }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="grid gap-4 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.10)] md:grid-cols-3">
          <div class="grid gap-2">
            <Utensils
              :size="26"
              class="text-[#28665e]"
              aria-hidden="true"
            />
            <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">Eten op het park</h3>
            <p class="text-[#455b56]">Fijn voor aankomst of een luie avond: je hoeft niet altijd zelf te koken.</p>
          </div>
          <div class="grid gap-2">
            <Users
              :size="26"
              class="text-[#28665e]"
              aria-hidden="true"
            />
            <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">Voor gezinnen</h3>
            <p class="text-[#455b56]">Speelplekken en activiteiten maken het park makkelijk voor een weekend met kinderen.</p>
          </div>
          <div class="grid gap-2">
            <ShieldCheck
              :size="26"
              class="text-[#28665e]"
              aria-hidden="true"
            />
            <h3 class="text-xl font-black leading-tight tracking-normal text-[#1b2f2c]">Eerlijk vergelijken</h3>
            <p class="text-[#455b56]">Wij tonen prijsvoorbeelden. De boeking en actuele prijs controleer je bij Landal.</p>
          </div>
        </div>

        <div
          v-if="hasTestimonials"
          id="reviews"
          class="grid gap-5 rounded-lg bg-[#f5c84c] p-5 md:p-6"
        >
          <div class="grid gap-2">
            <p class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-[#153f3a]">
              <Quote
                :size="17"
                aria-hidden="true"
              />
              Sfeerreviews
            </p>
            <h2 class="max-w-[18ch] text-4xl font-black leading-tight tracking-normal text-[#153f3a] md:text-5xl">Zo kan een weekend hier voelen</h2>
            <p class="max-w-[52rem] font-semibold leading-relaxed text-[#2f4d48]">Voorbeeldreviews voor de demo; geen geverifieerde bezoekersreviews en daarom niet als review-schema gemarkeerd.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <figure
              v-for="testimonial in testimonials"
              :key="testimonial.author"
              class="grid gap-4 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.14)]"
            >
              <div
                class="flex gap-1 text-[#b33b2f]"
                role="img"
                aria-label="Vijf sterren"
              >
                <Star
                  v-for="starIndex in 5"
                  :key="starIndex"
                  :size="18"
                  class="fill-current"
                  aria-hidden="true"
                />
              </div>
              <blockquote class="text-lg font-semibold leading-relaxed text-[#1b2f2c]">
                {{ testimonial.quote }}
              </blockquote>
              <figcaption class="grid gap-1 text-sm text-[#455b56]">
                <span class="font-black text-[#153f3a]">{{ testimonial.author }}</span>
                <span>{{ testimonial.context }}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <aside
        id="prijs"
        class="grid gap-4 rounded-lg bg-[#fffdf7] p-5 shadow-[0_22px_50px_rgba(21,63,58,0.16)] lg:sticky lg:top-20"
      >
        <div class="grid gap-1">
          <p class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#b33b2f]">
            <Euro
              :size="17"
              aria-hidden="true"
            />
            Prijsvoorbeeld
          </p>
          <p class="text-4xl font-black text-[#153f3a]">{{ compactPriceLabel }}</p>
          <p class="font-semibold text-[#455b56]">{{ tripContextLabel }}</p>
        </div>
        <div class="grid gap-2 rounded-md bg-[#e7efe8] p-3 text-sm font-semibold text-[#1b2f2c]">
          <p class="inline-flex items-center gap-2">
            <CalendarDays
              :size="16"
              aria-hidden="true"
            />
            Laatst opgehaald: {{ sourceCapturedAtLabel }}
          </p>
          <p>{{ priceLabel }}</p>
        </div>
        <a
          :href="affiliateUrl"
          class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-0 bg-[#c94936] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
          rel="nofollow sponsored noopener"
          @click="handleAffiliateClick"
        >
          Bekijk bij Landal
          <ChevronRight
            :size="18"
            aria-hidden="true"
          />
        </a>
        <NuxtLink
          v-if="hasAccommodations"
          :to="accommodationOverviewPath"
          class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[#153f3a] px-4 py-3 font-black text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        >
          {{ accommodationOverviewButtonText }}
          <ArrowRight
            :size="18"
            aria-hidden="true"
          />
        </NuxtLink>
        <div class="grid gap-2 border-t border-[#d9ded6] pt-4 text-sm font-semibold text-[#5b6a66]">
          <p class="inline-flex items-start gap-2">
            <CheckCircle2
              :size="16"
              class="mt-0.5 text-[#28665e]"
              aria-hidden="true"
            />
            Geen beschikbaarheidsclaim; Landal bevestigt de actuele prijs.
          </p>
          <p class="inline-flex items-start gap-2">
            <CheckCircle2
              :size="16"
              class="mt-0.5 text-[#28665e]"
              aria-hidden="true"
            />
            Externe boeking via affiliate-link.
          </p>
        </div>
      </aside>
    </section>

    <section
      v-if="hasPark === false"
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="park-missing-title"
    >
      <h2
        id="park-missing-title"
        class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-4xl"
      >
        Park niet gevonden
      </h2>
      <p class="mt-4 max-w-[44rem] text-lg text-[#455b56]">Ga terug naar het parkoverzicht om een park uit de catalogus te kiezen.</p>
      <NuxtLink
        class="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-[#153f3a] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>
  </div>
</template>
