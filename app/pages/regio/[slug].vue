<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { listRegions } from '~~/shared/domain/catalogRepository'
import { createParkCardViewModels } from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl } from '~~/shared/domain/seo'
import type { RegionRecord } from '~~/shared/types/database'
import type { ParkCardViewModel, ParkPriceSearch } from '~~/shared/types/parkSearch'

// Definitions
const route = useRoute()
const requestUrl = useRequestURL()
const defaultPriceSearch: ParkPriceSearch = {
  arrivalDate: '2026-06-05',
  departureDate: '2026-06-08',
  adultCount: 2,
  childCount: 0,
}

// Computed
const siteOrigin = computed<string>(() => requestUrl.origin)
const canonicalUrl = computed<string>(() => createCanonicalUrl(siteOrigin.value, route.path))
const routeSlug = computed<string>(() => String(route.params.slug ?? ''))

const region = computed<RegionRecord | null>(() => {
  const matchingRegion: RegionRecord | undefined = listRegions(mockCatalog).find(
    (regionRecord: RegionRecord): boolean => regionRecord.slug === routeSlug.value,
  )

  if (matchingRegion === undefined) {
    return null
  }

  return matchingRegion
})

const regionName = computed<string>(() => {
  if (region.value === null) {
    return 'Regio niet gevonden'
  }

  return region.value.name
})

const regionCards = computed<ParkCardViewModel[]>(() => {
  if (region.value === null) {
    return []
  }

  return createParkCardViewModels(
    mockCatalog,
    {
      regionSlug: region.value.slug,
    },
    defaultPriceSearch,
  )
})

const hasRegionCards = computed<boolean>(() => regionCards.value.length > 0)

useHead(() => ({
  title: `${regionName.value} | Weekendjeweg`,
  meta: [
    {
      name: 'description',
      content: 'Route voor toekomstige regio-overzichten van Landal-parken in Nederland.',
    },
    {
      name: 'robots',
      content: 'noindex,follow',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
}))
</script>

<template>
  <div>
    <section
      class="page-intro"
      aria-labelledby="region-title"
    >
      <p class="eyebrow">Regio</p>
      <h1 id="region-title">{{ regionName }}</h1>
      <p class="measure-text">
        Deze route ondersteunt alvast regio-overzichten. Rijke regio-SEO blijft buiten de eerste release.
      </p>
      <NuxtLink
        class="text-action"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>

    <section
      v-if="hasRegionCards"
      class="content-band"
      aria-label="Parken in deze regio"
    >
      <div class="result-list">
        <ParkResultCard
          v-for="card in regionCards"
          :key="card.park.id"
          :card="card"
        />
      </div>
    </section>
  </div>
</template>
