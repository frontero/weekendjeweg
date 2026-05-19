<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import {
  getAffiliateTemplateForPark,
  getParkBySlug,
  listFacilitiesForPark,
  selectPriceSnapshot,
} from '~~/shared/domain/catalogRepository'
import { createParkMetaDescription, formatPriceSnapshot, getRegionNameForPark } from '~~/shared/domain/parkPresentation'
import type { AffiliateLinkTemplateRecord, FacilityRecord, ParkRecord, PriceSnapshotRecord } from '~~/shared/types/database'

// Definitions
const route = useRoute()
const defaultArrivalDate = '2026-06-05'
const defaultDepartureDate = '2026-06-08'
const defaultAdultCount = 2
const defaultChildCount = 0

// Computed
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

const affiliateUrl = computed<string>(() => {
  if (park.value === null) {
    return 'https://www.landal.nl/'
  }

  const template: AffiliateLinkTemplateRecord | null = getAffiliateTemplateForPark(mockCatalog, park.value.id)

  if (template === null) {
    return park.value.sourceUrl
  }

  return template.baseUrl
})

useHead(() => ({
  title: `${parkName.value} | Weekendjeweg`,
  meta: [
    {
      name: 'description',
      content: hasPark.value === true
        ? createParkMetaDescription(park.value as ParkRecord, regionName.value)
        : 'Park niet gevonden in de Weekendjeweg mock-catalogus.',
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
          class="primary-action"
          :href="affiliateUrl"
          rel="nofollow sponsored noopener"
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
