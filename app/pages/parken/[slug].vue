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
import type { AffiliateUrlResult } from '~~/shared/types/affiliate'
import type { AffiliateLinkTemplateRecord, FacilityRecord, ParkRecord, PriceSnapshotRecord } from '~~/shared/types/database'

// Definitions
const route = useRoute()
const requestUrl = useRequestURL()
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
const siteOrigin = computed<string>(() => requestUrl.origin)
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
      class="page-intro"
      aria-labelledby="park-title"
    >
      <p class="eyebrow">{{ regionName }}</p>
      <h1 id="park-title">{{ parkName }}</h1>
      <p class="measure-text">{{ parkDescription }}</p>
    </section>

    <section
      v-if="hasPark"
      class="detail-layout"
      aria-label="Parkinformatie"
    >
      <div
        class="detail-visual"
        aria-hidden="true"
      ></div>
      <div class="detail-panel">
        <h2>Prijscontext</h2>
        <p class="price-line">{{ priceLabel }}</p>
        <p>
          Voor {{ defaultArrivalDate }} tot {{ defaultDepartureDate }}, {{ defaultAdultCount }} volwassenen en {{ defaultChildCount }} kinderen. Weekendjeweg claimt geen beschikbaarheid.
        </p>
        <h2>Voorzieningen</h2>
        <ul class="detail-list">
          <li
            v-for="facility in facilities"
            :key="facility.id"
          >
            {{ facility.name }}
          </li>
        </ul>
        <a
          :href="affiliateUrl"
          class="primary-action"
          rel="nofollow sponsored noopener"
          @click="handleAffiliateClick"
        >
          Bekijk bij Landal
        </a>
      </div>
    </section>

    <section
      v-if="hasPark === false"
      class="content-band"
      aria-labelledby="park-missing-title"
    >
      <h2 id="park-missing-title">Park niet gevonden</h2>
      <p class="measure-text">Ga terug naar het parkoverzicht om een park uit de mock-catalogus te kiezen.</p>
      <NuxtLink
        class="text-action"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>
  </div>
</template>
