<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { buildAffiliateUrl } from '~~/shared/domain/affiliateLinks'
import {
  getAffiliateTemplateForPark,
  getParkBySlug,
  listFacilitiesForPark,
  selectPriceSnapshot,
} from '~~/shared/domain/catalogRepository'
import {
  createParkDetailPath,
  createParkMetaDescription,
  formatPriceSnapshot,
  getParkVisualAltText,
  getParkVisualImageUrl,
  getRegionNameForPark,
} from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl, createParkBreadcrumbStructuredData, serialiseStructuredData } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type { AffiliateUrlResult } from '~~/shared/types/affiliate'
import type { AffiliateLinkTemplateRecord, FacilityRecord, ParkRecord, PriceSnapshotRecord } from '~~/shared/types/database'

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

const facilities = computed<FacilityRecord[]>(() => {
  if (park.value === null) {
    return []
  }

  return listFacilitiesForPark(mockCatalog, park.value.id)
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

const metaDescription = computed<string>(() => {
  if (park.value === null) {
    return 'Park niet gevonden in de Weekendjeweg catalogus.'
  }

  return createParkMetaDescription(park.value, regionName.value)
})

const structuredDataJson = computed<string | null>(() => {
  if (park.value === null) {
    return null
  }

  return serialiseStructuredData(createParkBreadcrumbStructuredData(siteOrigin.value, park.value))
})

// Functions
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
  title: `${parkName.value} | Weekendjeweg`,
  meta: [
    {
      name: 'description',
      content: metaDescription.value,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: structuredDataJson.value === null
    ? []
    : [
        {
          type: 'application/ld+json',
          innerHTML: structuredDataJson.value,
        },
      ],
}))
</script>

<template>
  <div>
    <section
      class="relative isolate grid min-h-[54vh] overflow-hidden px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="park-title"
    >
      <img
        :alt="parkImageAltText"
        :src="parkImageUrl"
        class="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#153f3a]/95 via-[#153f3a]/72 to-[#153f3a]/20"></div>
      <div class="grid max-w-[72rem] content-center gap-4 text-white">
        <p class="w-fit rounded-md bg-[#f5c84c] px-3 py-2 text-sm font-black uppercase tracking-normal text-[#153f3a]">{{ regionName }}</p>
        <h1
          id="park-title"
          class="max-w-[14ch] text-5xl font-black leading-[1.03] tracking-normal md:text-7xl"
        >
          {{ parkName }}
        </h1>
        <p class="max-w-[44rem] text-lg font-semibold text-[#fdfaf2] md:text-xl">{{ parkDescription }}</p>
      </div>
    </section>

    <section
      v-if="hasPark"
      class="grid items-start gap-5 px-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] md:px-16 md:py-14"
      aria-label="Parkinformatie"
    >
      <div class="grid gap-5">
        <div class="rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.12)]">
          <h2 class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">Waarom dit park bekijken?</h2>
          <p class="mt-3 text-[#455b56]">{{ parkDescription }}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="facility in facilities"
              :key="facility.id"
              class="rounded-md bg-[#e7efe8] px-3 py-2 text-sm font-black text-[#153f3a]"
            >
              {{ facility.name }}
            </li>
          </ul>
        </div>
        <div class="rounded-lg bg-[#e7efe8] p-5">
          <h2 class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">Eerlijke prijscontext</h2>
          <p class="mt-3 text-[#455b56]">Weekendjeweg toont prijsvoorbeelden voor vergelijking. De actuele prijs en boekbaarheid controleer je altijd bij Landal.</p>
        </div>
      </div>

      <aside class="grid gap-4 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.12)]">
        <p class="text-sm font-black uppercase text-[#c94936]">Prijsvoorbeeld</p>
        <p class="text-3xl font-black text-[#153f3a]">{{ priceLabel }}</p>
        <p class="font-semibold text-[#455b56]">
          Voor {{ defaultArrivalDate }} tot {{ defaultDepartureDate }}, {{ defaultAdultCount }} volwassenen en {{ defaultChildCount }} kinderen.
        </p>
        <a
          :href="affiliateUrl"
          class="inline-flex min-h-12 w-fit items-center justify-center rounded-md border-0 bg-[#c94936] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
          rel="nofollow sponsored noopener"
          @click="handleAffiliateClick"
        >
          Bekijk bij Landal
        </a>
        <p class="text-sm font-semibold text-[#5b6a66]">Geen beschikbaarheidsclaim. Externe boeking via Landal.</p>
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
