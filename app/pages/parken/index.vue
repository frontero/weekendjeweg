<script setup lang="ts">
import { computed, ref } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { listFacilities, listRegions } from '~~/shared/domain/catalogRepository'
import { createParkCardViewModels } from '~~/shared/domain/parkPresentation'
import type { FacilityRecord, RegionRecord } from '~~/shared/types/database'
import type { ParkCardViewModel, ParkPriceSearch } from '~~/shared/types/parkSearch'

// Definitions
const defaultArrivalDate = '2026-06-05'
const defaultDepartureDate = '2026-06-08'
const defaultAdultCount = 2
const defaultChildCount = 0

const selectedRegionSlug = ref<string>('')
const selectedFacilitySlugs = ref<string[]>([])
const arrivalDate = ref<string>(defaultArrivalDate)
const departureDate = ref<string>(defaultDepartureDate)
const adultCount = ref<number>(defaultAdultCount)
const childCount = ref<number>(defaultChildCount)

// Computed
const regions = computed<RegionRecord[]>(() => listRegions(mockCatalog))
const facilities = computed<FacilityRecord[]>(() => listFacilities(mockCatalog))

const priceSearch = computed<ParkPriceSearch>(() => {
  return {
    arrivalDate: arrivalDate.value,
    departureDate: departureDate.value,
    adultCount: adultCount.value,
    childCount: childCount.value,
  }
})

const parkCards = computed<ParkCardViewModel[]>(() => {
  return createParkCardViewModels(
    mockCatalog,
    {
      regionSlug: selectedRegionSlug.value,
      facilitySlugs: selectedFacilitySlugs.value,
    },
    priceSearch.value,
  )
})

const hasResults = computed<boolean>(() => parkCards.value.length > 0)

const resultCountLabel = computed<string>(() => {
  if (parkCards.value.length === 1) {
    return '1 park gevonden'
  }

  return `${parkCards.value.length} parken gevonden`
})

// Functions
const getFacilityInputId = (facility: FacilityRecord): string => {
  return `facility-${facility.slug}`
}

const handleSubmit = (): void => {}

const resetFilters = (): void => {
  selectedRegionSlug.value = ''
  selectedFacilitySlugs.value = []
  arrivalDate.value = defaultArrivalDate
  departureDate.value = defaultDepartureDate
  adultCount.value = defaultAdultCount
  childCount.value = defaultChildCount
}

useHead({
  title: 'Parken zoeken | Weekendjeweg',
  meta: [
    {
      name: 'description',
      content: 'Zoek Landal-parken in Nederland op regio, periode, reisgezelschap en voorzieningen.',
    },
  ],
})
</script>

<template>
  <div>
    <section
      class="page-intro"
      aria-labelledby="parks-title"
    >
      <p class="eyebrow">Parken zoeken</p>
      <h1 id="parks-title">Vergelijk Landal-parken</h1>
      <p class="measure-text">
        Filter op regio, periode, reisgezelschap en voorzieningen. Prijzen zijn voorbeelden uit de mock-catalogus en zeggen niets over beschikbaarheid.
      </p>
    </section>

    <section
      class="search-layout"
      aria-label="Parkfilters en resultaten"
    >
      <form
        class="filter-panel"
        @submit.prevent="handleSubmit"
      >
        <div class="field-group">
          <label for="region">Regio</label>
          <select
            v-model="selectedRegionSlug"
            id="region"
            name="region"
          >
            <option value="">Alle regio's</option>
            <option
              v-for="region in regions"
              :key="region.id"
              :value="region.slug"
            >
              {{ region.name }}
            </option>
          </select>
        </div>

        <div class="date-grid">
          <div class="field-group">
            <label for="arrival-date">Aankomst</label>
            <input
              v-model="arrivalDate"
              id="arrival-date"
              name="arrivalDate"
              type="date"
            />
          </div>
          <div class="field-group">
            <label for="departure-date">Vertrek</label>
            <input
              v-model="departureDate"
              id="departure-date"
              name="departureDate"
              type="date"
            />
          </div>
        </div>

        <div class="date-grid">
          <div class="field-group">
            <label for="adults">Volwassenen</label>
            <input
              v-model.number="adultCount"
              id="adults"
              min="1"
              name="adults"
              type="number"
            />
          </div>
          <div class="field-group">
            <label for="children">Kinderen</label>
            <input
              v-model.number="childCount"
              id="children"
              min="0"
              name="children"
              type="number"
            />
          </div>
        </div>

        <fieldset class="facility-fieldset">
          <legend>Voorzieningen</legend>
          <label
            v-for="facility in facilities"
            :key="facility.id"
            :for="getFacilityInputId(facility)"
            class="checkbox-row"
          >
            <input
              v-model="selectedFacilitySlugs"
              :id="getFacilityInputId(facility)"
              :value="facility.slug"
              name="facilities"
              type="checkbox"
            />
            {{ facility.name }}
          </label>
        </fieldset>

        <div class="filter-actions">
          <button
            class="secondary-action"
            type="button"
            @click="resetFilters"
          >
            Reset filters
          </button>
        </div>
      </form>

      <div
        class="result-list"
        aria-live="polite"
      >
        <p class="result-count">{{ resultCountLabel }}</p>
        <ParkResultCard
          v-for="card in parkCards"
          v-if="hasResults"
          :key="card.park.id"
          :card="card"
        />
        <div
          v-if="hasResults === false"
          class="empty-state"
        >
          <h2>Geen parken gevonden</h2>
          <p>Pas je filters aan of reset de selectie.</p>
          <button
            class="secondary-action"
            type="button"
            @click="resetFilters"
          >
            Reset filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
