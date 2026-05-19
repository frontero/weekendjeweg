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
const heroImageUrl = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=45'

// Computed
const siteOrigin = computed<string>(() => resolveSiteOrigin(runtimeConfig.public.siteUrl, requestUrl.origin))
const canonicalUrl = computed<string>(() => createCanonicalUrl(siteOrigin.value, '/'))
const websiteStructuredData = computed<string>(() => {
  return serialiseStructuredData(createWebsiteStructuredData(siteOrigin.value))
})

const featuredCards = computed<ParkCardViewModel[]>(() => {
  return createParkCardViewModels(mockCatalog, {}, homePriceSearch).slice(0, 3)
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
      rel: 'preconnect',
      href: 'https://images.unsplash.com',
    },
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
      class="relative isolate grid min-h-[76vh] overflow-hidden px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="home-title"
    >
      <img
        :src="heroImageUrl"
        alt="Bosrijk vakantiegevoel voor een weekendje weg"
        class="absolute inset-0 -z-20 h-full w-full object-cover"
        decoding="async"
        fetchpriority="high"
        height="900"
        sizes="100vw"
        width="1600"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#153f3a]/95 via-[#153f3a]/72 to-[#153f3a]/18"></div>
      <div class="grid max-w-[72rem] content-center gap-7 text-white">
        <p class="w-fit rounded-md bg-[#f5c84c] px-3 py-2 text-sm font-black uppercase tracking-normal text-[#153f3a]">Landal prijsvoorbeelden</p>
        <div class="grid max-w-[44rem] gap-4">
          <h1
            id="home-title"
            class="text-5xl font-black leading-[1.02] tracking-normal md:text-7xl lg:text-8xl"
          >
            Weekendjeweg
          </h1>
          <p class="max-w-[40rem] text-xl font-semibold text-[#fdfaf2] md:text-2xl">
            Snel parken vergelijken op regio, reisgezelschap en prijscontext. Jij kiest de sfeer, wij sturen je netjes door naar Landal.
          </p>
        </div>
        <div class="grid gap-3 rounded-lg bg-[#fffdf7] p-3 text-[#1b2f2c] shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:p-4">
          <div class="grid gap-1 rounded-md bg-[#f7f4ec] p-3">
            <span class="text-xs font-black uppercase text-[#28665e]">Waarheen</span>
            <span class="text-lg font-black">Nederland</span>
            <span class="text-sm text-[#5b6a66]">Veluwe, kust of Limburg</span>
          </div>
          <div class="grid gap-1 rounded-md bg-[#f7f4ec] p-3">
            <span class="text-xs font-black uppercase text-[#28665e]">Wanneer</span>
            <span class="text-lg font-black">Weekend in juni</span>
            <span class="text-sm text-[#5b6a66]">Prijsvoorbeeld per periode</span>
          </div>
          <div class="grid gap-1 rounded-md bg-[#f7f4ec] p-3">
            <span class="text-xs font-black uppercase text-[#28665e]">Wie</span>
            <span class="text-lg font-black">2 volwassenen</span>
            <span class="text-sm text-[#5b6a66]">Kinderen optioneel</span>
          </div>
          <NuxtLink
            class="inline-flex min-h-14 items-center justify-center rounded-md bg-[#c94936] px-5 py-3 text-center font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            to="/parken"
          >
            Zoek parken
          </NuxtLink>
        </div>
      </div>
    </section>

    <section
      class="grid gap-4 px-4 py-8 md:grid-cols-4 md:px-16"
      aria-label="Vakantie-thema's"
    >
      <div class="rounded-lg bg-[#fffdf7] p-4 shadow-[0_1px_0_rgba(21,63,58,0.12)]">
        <p class="text-sm font-black uppercase text-[#28665e]">Aan de kust</p>
        <p class="mt-2 font-bold text-[#1b2f2c]">Duinen, strand en frisse ochtenden.</p>
      </div>
      <div class="rounded-lg bg-[#fffdf7] p-4 shadow-[0_1px_0_rgba(21,63,58,0.12)]">
        <p class="text-sm font-black uppercase text-[#28665e]">In het bos</p>
        <p class="mt-2 font-bold text-[#1b2f2c]">Rustige parken met natuur dichtbij.</p>
      </div>
      <div class="rounded-lg bg-[#fffdf7] p-4 shadow-[0_1px_0_rgba(21,63,58,0.12)]">
        <p class="text-sm font-black uppercase text-[#28665e]">Met de hond</p>
        <p class="mt-2 font-bold text-[#1b2f2c]">Selecteer parken waar je hond welkom is.</p>
      </div>
      <div class="rounded-lg bg-[#fffdf7] p-4 shadow-[0_1px_0_rgba(21,63,58,0.12)]">
        <p class="text-sm font-black uppercase text-[#28665e]">Wellness</p>
        <p class="mt-2 font-bold text-[#1b2f2c]">Voor een weekend met extra ontspanning.</p>
      </div>
    </section>

    <section
      class="max-w-[78rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="home-next-title"
    >
      <div class="mb-6 grid gap-2">
        <p class="text-[0.82rem] font-black uppercase tracking-normal text-[#28665e]">Eerlijk vergelijken</p>
        <h2
          id="home-next-title"
          class="max-w-[20ch] text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-5xl"
        >
          Snel zoeken, rustig kiezen
        </h2>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-lg bg-[#e7efe8] p-5">
          <p class="text-3xl font-black text-[#153f3a]">1</p>
          <h3 class="mt-2 text-xl font-black text-[#1b2f2c]">Kies je regio</h3>
          <p class="mt-2 text-[#455b56]">Start met kust, Veluwe of Limburg en verfijn daarna op voorzieningen.</p>
        </div>
        <div class="rounded-lg bg-[#fffdf7] p-5 shadow-[0_1px_0_rgba(21,63,58,0.12)]">
          <p class="text-3xl font-black text-[#c94936]">2</p>
          <h3 class="mt-2 text-xl font-black text-[#1b2f2c]">Vergelijk prijscontext</h3>
          <p class="mt-2 text-[#455b56]">We tonen alleen prijsvoorbeelden en geen beschikbaarheidsclaim.</p>
        </div>
        <div class="rounded-lg bg-[#f5c84c] p-5">
          <p class="text-3xl font-black text-[#153f3a]">3</p>
          <h3 class="mt-2 text-xl font-black text-[#1b2f2c]">Ga naar Landal</h3>
          <p class="mt-2 text-[#455b56]">Boeken en actuele voorwaarden controleer je altijd bij de aanbieder.</p>
        </div>
      </div>
    </section>

    <section
      class="max-w-[78rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="featured-parks-title"
    >
      <div class="mb-6 grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p class="text-[0.82rem] font-black uppercase tracking-normal text-[#28665e]">Populaire startpunten</p>
          <h2
            id="featured-parks-title"
            class="mt-2 text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-5xl"
          >
            Parken om mee te beginnen
          </h2>
        </div>
        <NuxtLink
          class="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-[#153f3a] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
          to="/parken"
        >
          Alle parken
        </NuxtLink>
      </div>
      <div class="grid gap-5">
        <ParkResultCard
          v-for="card in featuredCards"
          :key="card.park.id"
          :card="card"
        />
      </div>
    </section>
  </div>
</template>
