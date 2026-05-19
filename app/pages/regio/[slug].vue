<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { listRegions } from '~~/shared/domain/catalogRepository'
import { createParkCardViewModels } from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type { RegionRecord } from '~~/shared/types/database'
import type { ParkCardViewModel, ParkPriceSearch } from '~~/shared/types/parkSearch'

// Definitions
const route = useRoute()
const requestUrl = useRequestURL()
const runtimeConfig = useRuntimeConfig()
const defaultPriceSearch: ParkPriceSearch = {
  arrivalDate: '2026-06-05',
  departureDate: '2026-06-08',
  adultCount: 2,
  childCount: 0,
}

// Computed
const siteOrigin = computed<string>(() => resolveSiteOrigin(runtimeConfig.public.siteUrl, requestUrl.origin))
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
      class="px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="region-title"
    >
      <p class="mb-3 text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">Regio</p>
      <h1
        id="region-title"
        class="max-w-[14ch] text-5xl font-bold leading-[1.08] tracking-normal text-[#1b2f2c] md:text-7xl"
      >
        {{ regionName }}
      </h1>
      <p class="mt-6 max-w-[44rem] text-lg text-[#455b56]">
        Deze route ondersteunt alvast regio-overzichten. Rijke regio-SEO blijft buiten de eerste release.
      </p>
      <NuxtLink
        class="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-md font-bold text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>

    <section
      v-if="hasRegionCards"
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-label="Parken in deze regio"
    >
      <div class="grid gap-4">
        <ParkResultCard
          v-for="card in regionCards"
          :key="card.park.id"
          :card="card"
        />
      </div>
    </section>
  </div>
</template>
