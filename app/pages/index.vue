<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { createParkCardViewModels } from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl, createWebsiteStructuredData, serialiseStructuredData } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type { ParkCardViewModel, ParkPriceSearch } from '~~/shared/types/parkSearch'

// Definitions
const requestUrl = useRequestURL()
const runtimeConfig = useRuntimeConfig()
const homePriceSearch: ParkPriceSearch = {
  arrivalDate: '2026-06-05',
  departureDate: '2026-06-08',
  adultCount: 2,
  childCount: 0,
}

// Computed
const siteOrigin = computed<string>(() => resolveSiteOrigin(runtimeConfig.public.siteUrl, requestUrl.origin))
const canonicalUrl = computed<string>(() => createCanonicalUrl(siteOrigin.value, '/'))
const websiteStructuredData = computed<string>(() => {
  return serialiseStructuredData(createWebsiteStructuredData(siteOrigin.value))
})

const featuredCards = computed<ParkCardViewModel[]>(() => {
  return createParkCardViewModels(mockCatalog, {}, homePriceSearch).slice(0, 2)
})

useHead(() => ({
  title: 'Weekendjeweg | Landal-parken vergelijken',
  meta: [
    {
      name: 'description',
      content: 'Vergelijk Landal-parken in Nederland op regio, voorzieningen en prijsvoorbeelden zonder beschikbaarheidsclaim.',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: websiteStructuredData.value,
    },
  ],
}))
</script>

<template>
  <div>
    <section
      class="grid min-h-[72vh] gap-8 bg-[#f7f4ec] px-4 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] md:px-16 md:py-20"
      aria-labelledby="home-title"
    >
      <div class="max-w-[72rem] self-center">
        <p class="mb-3 text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">Landal-parken in Nederland</p>
        <h1
          id="home-title"
          class="max-w-[14ch] text-5xl font-bold leading-[1.08] tracking-normal text-[#1b2f2c] md:text-7xl lg:text-8xl"
        >
          Vind je volgende weekendje weg
        </h1>
        <p class="mt-6 max-w-[44rem] text-lg text-[#455b56]">
          Vergelijk parken op regio, reisgezelschap, periode en voorzieningen. Weekendjeweg stuurt je daarna helder door naar Landal.
        </p>
        <NuxtLink
          class="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-md border-0 bg-[#c94936] px-4 py-3 font-bold text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
          to="/parken"
        >
          Bekijk parken
        </NuxtLink>
      </div>
      <div
        class="grid min-h-88 content-end gap-3 rounded-lg border border-[#d8d2c2] bg-gradient-to-br from-[#153f3a] via-[#28665e] to-[#79b7a5] p-4"
        aria-hidden="true"
      >
        <span class="w-fit rounded-md bg-[#fdfaf2] px-3 py-2 font-extrabold text-[#153f3a]">Veluwe</span>
        <span class="w-fit rounded-md bg-[#fdfaf2] px-3 py-2 font-extrabold text-[#153f3a]">Kust</span>
        <span class="w-fit rounded-md bg-[#fdfaf2] px-3 py-2 font-extrabold text-[#153f3a]">Limburg</span>
      </div>
    </section>

    <section
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="home-next-title"
    >
      <div class="mb-4 grid gap-1">
        <p class="text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">Eerste release</p>
        <h2
          id="home-next-title"
          class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl"
        >
          Prijsinformatie zonder boekingsclaim
        </h2>
      </div>
      <p class="max-w-[44rem] text-lg text-[#455b56]">
        We tonen prijscontext voor gekozen data en reisgezelschap, maar maken geen beschikbaarheidsclaim. Boeken gebeurt altijd bij Landal.
      </p>
    </section>

    <section
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="featured-parks-title"
    >
      <div class="mb-4 grid gap-1">
        <p class="text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">Voorbeeldselectie</p>
        <h2
          id="featured-parks-title"
          class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl"
        >
          Populaire startpunten
        </h2>
      </div>
      <div class="grid gap-4">
        <ParkResultCard
          v-for="card in featuredCards"
          :key="card.park.id"
          :card="card"
        />
      </div>
    </section>
  </div>
</template>
