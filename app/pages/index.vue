<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { createParkCardViewModels } from '~~/shared/domain/parkPresentation'
import type { ParkCardViewModel, ParkPriceSearch } from '~~/shared/types/parkSearch'

// Definitions
const homePriceSearch: ParkPriceSearch = {
  arrivalDate: '2026-06-05',
  departureDate: '2026-06-08',
  adultCount: 2,
  childCount: 0,
}

// Computed
const featuredCards = computed<ParkCardViewModel[]>(() => {
  return createParkCardViewModels(mockCatalog, {}, homePriceSearch).slice(0, 2)
})

useHead({
  title: 'Weekendjeweg | Landal-parken vergelijken',
  meta: [
    {
      name: 'description',
      content: 'Vind een Landal-park voor een weekendje weg in Nederland en vergelijk prijsinformatie.',
    },
  ],
})
</script>

<template>
  <div>
    <section
      class="hero-section"
      aria-labelledby="home-title"
    >
      <div class="hero-section__content">
        <p class="eyebrow">Landal-parken in Nederland</p>
        <h1 id="home-title">Vind je volgende weekendje weg</h1>
        <p class="hero-section__intro">
          Vergelijk parken op regio, reisgezelschap, periode en voorzieningen. Weekendjeweg stuurt je daarna helder door naar Landal.
        </p>
        <NuxtLink
          class="primary-action"
          to="/parken"
        >
          Bekijk parken
        </NuxtLink>
      </div>
      <div
        class="route-preview"
        aria-hidden="true"
      >
        <span class="route-preview__label">Veluwe</span>
        <span class="route-preview__label">Kust</span>
        <span class="route-preview__label">Limburg</span>
      </div>
    </section>

    <section
      class="content-band"
      aria-labelledby="home-next-title"
    >
      <div class="section-heading">
        <p class="eyebrow">Eerste release</p>
        <h2 id="home-next-title">Prijsinformatie zonder boekingsclaim</h2>
      </div>
      <p class="measure-text">
        We tonen prijscontext voor gekozen data en reisgezelschap, maar maken geen beschikbaarheidsclaim. Boeken gebeurt altijd bij Landal.
      </p>
    </section>

    <section
      class="content-band"
      aria-labelledby="featured-parks-title"
    >
      <div class="section-heading">
        <p class="eyebrow">Voorbeeldselectie</p>
        <h2 id="featured-parks-title">Populaire startpunten</h2>
      </div>
      <div class="result-list">
        <ParkResultCard
          v-for="card in featuredCards"
          :key="card.park.id"
          :card="card"
        />
      </div>
    </section>
  </div>
</template>
