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
import { createParkDetailPath, createParkMetaDescription, formatPriceSnapshot, getRegionNameForPark } from '~~/shared/domain/parkPresentation'
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
    return 'Dit park staat nog niet in de mock-catalogus.'
  }

  return park.value.description
})

const regionName = computed<string>(() => {
  if (park.value === null) {
    return 'Nederland'
  }

  return getRegionNameForPark(mockCatalog, park.value)
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
    return 'Park niet gevonden in de Weekendjeweg mock-catalogus.'
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
      class="px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="park-title"
    >
      <p class="mb-3 text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">{{ regionName }}</p>
      <h1
        id="park-title"
        class="max-w-[14ch] text-5xl font-bold leading-[1.08] tracking-normal text-[#1b2f2c] md:text-7xl"
      >
        {{ parkName }}
      </h1>
      <p class="mt-6 max-w-[44rem] text-lg text-[#455b56]">{{ parkDescription }}</p>
    </section>

    <section
      v-if="hasPark"
      class="grid items-stretch gap-4 px-4 py-12 md:grid-cols-[minmax(12rem,0.85fr)_minmax(0,1.15fr)] md:px-16 md:py-16"
      aria-label="Parkinformatie"
    >
      <div
        class="min-h-64 rounded-t-lg bg-gradient-to-br from-[#c94936] via-[#f5c84c] to-[#79b7a5] md:min-h-full md:rounded-l-lg md:rounded-tr-none"
        aria-hidden="true"
      ></div>
      <div class="grid content-center gap-3 rounded-lg border border-[#d8d2c2] bg-[#fffdf7] p-4">
        <h2 class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">Prijscontext</h2>
        <p class="font-extrabold text-[#28665e]">{{ priceLabel }}</p>
        <p>
          Voor {{ defaultArrivalDate }} tot {{ defaultDepartureDate }}, {{ defaultAdultCount }} volwassenen en {{ defaultChildCount }} kinderen. Weekendjeweg claimt geen beschikbaarheid.
        </p>
        <h2 class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">Voorzieningen</h2>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="facility in facilities"
            :key="facility.id"
            class="rounded-md bg-[#e7efe8] px-2 py-1 text-sm font-bold text-[#153f3a]"
          >
            {{ facility.name }}
          </li>
        </ul>
        <a
          :href="affiliateUrl"
          class="inline-flex min-h-11 w-fit items-center justify-center rounded-md border-0 bg-[#c94936] px-4 py-3 font-bold text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
          rel="nofollow sponsored noopener"
          @click="handleAffiliateClick"
        >
          Bekijk bij Landal
        </a>
      </div>
    </section>

    <section
      v-if="hasPark === false"
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="park-missing-title"
    >
      <h2
        id="park-missing-title"
        class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl"
      >
        Park niet gevonden
      </h2>
      <p class="mt-4 max-w-[44rem] text-lg text-[#455b56]">Ga terug naar het parkoverzicht om een park uit de mock-catalogus te kiezen.</p>
      <NuxtLink
        class="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-md font-bold text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>
  </div>
</template>
