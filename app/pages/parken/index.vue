<script setup lang="ts">
import { computed, ref } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { listFacilities, listParks, listRegions } from '~~/shared/domain/catalogRepository'
import { createParkCardViewModels } from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl, createParkItemListStructuredData, serialiseStructuredData } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type { FacilityRecord, ParkRecord, RegionRecord } from '~~/shared/types/database'
import type { ParkCardViewModel, ParkPriceSearch } from '~~/shared/types/parkSearch'

// Definitions
const requestUrl = useRequestURL()
const runtimeConfig = useRuntimeConfig()
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
const siteOrigin = computed<string>(() => resolveSiteOrigin(runtimeConfig.public.siteUrl, requestUrl.origin))
const canonicalUrl = computed<string>(() => createCanonicalUrl(siteOrigin.value, '/parken'))
const regions = computed<RegionRecord[]>(() => listRegions(mockCatalog))
const facilities = computed<FacilityRecord[]>(() => listFacilities(mockCatalog))
const allParks = computed<ParkRecord[]>(() => listParks(mockCatalog))
const parkListStructuredData = computed<string>(() => {
  return serialiseStructuredData(createParkItemListStructuredData(siteOrigin.value, allParks.value))
})

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

useHead(() => ({
  title: 'Parken zoeken | Weekendjeweg',
  meta: [
    {
      name: 'description',
      content: 'Zoek Landal-parken in Nederland op regio, periode, reisgezelschap en voorzieningen met prijsvoorbeelden zonder beschikbaarheidsclaim.',
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
      innerHTML: parkListStructuredData.value,
    },
  ],
}))
</script>

<template>
  <div>
    <section
      class="px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="parks-title"
    >
      <p class="mb-3 text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">Parken zoeken</p>
      <h1
        id="parks-title"
        class="max-w-[14ch] text-5xl font-bold leading-[1.08] tracking-normal text-[#1b2f2c] md:text-7xl"
      >
        Vergelijk Landal-parken
      </h1>
      <p class="mt-6 max-w-[44rem] text-lg text-[#455b56]">
        Filter op regio, periode, reisgezelschap en voorzieningen. Prijzen zijn voorbeelden uit de mock-catalogus en zeggen niets over beschikbaarheid.
      </p>
    </section>

    <section
      class="grid items-start gap-8 px-4 py-12 md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] md:px-16 md:py-16"
      aria-label="Parkfilters en resultaten"
    >
      <form
        class="grid gap-4 rounded-lg border border-[#d8d2c2] bg-[#fffdf7] p-4"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-2">
          <label
            class="font-extrabold text-[#22322f]"
            for="region"
          >
            Regio
          </label>
          <select
            v-model="selectedRegionSlug"
            class="min-h-11 w-full rounded-md border border-[#a7b5ae] bg-white px-3 py-3 text-[#22322f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#f5c84c]"
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

        <div class="grid gap-3 md:grid-cols-2">
          <div class="grid gap-2">
            <label
              class="font-extrabold text-[#22322f]"
              for="arrival-date"
            >
              Aankomst
            </label>
            <input
              v-model="arrivalDate"
              class="min-h-11 w-full rounded-md border border-[#a7b5ae] bg-white px-3 py-3 text-[#22322f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#f5c84c]"
              id="arrival-date"
              name="arrivalDate"
              type="date"
            />
          </div>
          <div class="grid gap-2">
            <label
              class="font-extrabold text-[#22322f]"
              for="departure-date"
            >
              Vertrek
            </label>
            <input
              v-model="departureDate"
              class="min-h-11 w-full rounded-md border border-[#a7b5ae] bg-white px-3 py-3 text-[#22322f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#f5c84c]"
              id="departure-date"
              name="departureDate"
              type="date"
            />
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-2">
          <div class="grid gap-2">
            <label
              class="font-extrabold text-[#22322f]"
              for="adults"
            >
              Volwassenen
            </label>
            <input
              v-model.number="adultCount"
              class="min-h-11 w-full rounded-md border border-[#a7b5ae] bg-white px-3 py-3 text-[#22322f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#f5c84c]"
              id="adults"
              min="1"
              name="adults"
              type="number"
            />
          </div>
          <div class="grid gap-2">
            <label
              class="font-extrabold text-[#22322f]"
              for="children"
            >
              Kinderen
            </label>
            <input
              v-model.number="childCount"
              class="min-h-11 w-full rounded-md border border-[#a7b5ae] bg-white px-3 py-3 text-[#22322f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#f5c84c]"
              id="children"
              min="0"
              name="children"
              type="number"
            />
          </div>
        </div>

        <fieldset class="grid gap-2">
          <legend class="font-extrabold text-[#22322f]">Voorzieningen</legend>
          <label
            v-for="facility in facilities"
            :key="facility.id"
            :for="getFacilityInputId(facility)"
            class="flex items-center gap-2"
          >
            <input
              v-model="selectedFacilitySlugs"
              :id="getFacilityInputId(facility)"
              :value="facility.slug"
              class="h-4 w-4 rounded border-[#a7b5ae]"
              name="facilities"
              type="checkbox"
            />
            {{ facility.name }}
          </label>
        </fieldset>

        <div class="flex justify-start">
          <button
            class="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-md border-0 bg-[#f5c84c] px-4 py-3 font-bold text-[#153f3a] hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#153f3a] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#153f3a]"
            type="button"
            @click="resetFilters"
          >
            Reset filters
          </button>
        </div>
      </form>

      <div
        class="grid gap-4"
        aria-live="polite"
      >
        <p class="font-extrabold text-[#28665e]">{{ resultCountLabel }}</p>
        <template v-if="hasResults">
          <ParkResultCard
            v-for="card in parkCards"
            :key="card.park.id"
            :card="card"
          />
        </template>
        <div
          v-if="hasResults === false"
          class="grid content-center gap-3 rounded-lg border border-[#d8d2c2] bg-[#fffdf7] p-4"
        >
          <h2 class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">Geen parken gevonden</h2>
          <p>Pas je filters aan of reset de selectie.</p>
          <button
            class="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-md border-0 bg-[#f5c84c] px-4 py-3 font-bold text-[#153f3a] hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#153f3a] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#153f3a]"
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
