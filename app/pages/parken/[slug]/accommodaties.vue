<script setup lang="ts">
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  ChevronRight,
  Euro,
  Filter,
  Home,
  Maximize2,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import {
  accommodationSortOptions,
  createMaxPriceOptions,
  createNightOptions,
  createPersonCountOptions,
  defaultAccommodationFilterState,
  filterAccommodationCards,
} from '~~/shared/domain/accommodationFilters'
import { createAccommodationCardViewModels } from '~~/shared/domain/accommodationPresentation'
import { getParkBySlug } from '~~/shared/domain/catalogRepository'
import { createParkDetailPath } from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type {
  AccommodationCardViewModel,
  AccommodationFilterOption,
  AccommodationFilterState,
  AccommodationSearchSelection,
  AccommodationSortMode,
} from '~~/shared/types/accommodation'
import type { ParkRecord } from '~~/shared/types/database'
import type { LocationQueryValue } from 'vue-router'

function getRouteQueryTextValue(value: LocationQueryValue | LocationQueryValue[] | undefined): string {
  if (Array.isArray(value) === true) {
    const firstValue: LocationQueryValue | undefined = value[0]

    if (firstValue === null || firstValue === undefined) {
      return ''
    }

    return firstValue
  }

  if (value === null || value === undefined) {
    return ''
  }

  return value
}

function getRouteQueryCountValue(value: LocationQueryValue | LocationQueryValue[] | undefined, fallbackValue: string): string {
  const routeQueryValue: string = getRouteQueryTextValue(value)

  if (routeQueryValue.length === 0) {
    return fallbackValue
  }

  return routeQueryValue
}

// Definitions
const route = useRoute()
const router = useRouter()
const requestUrl = useRequestURL()
const runtimeConfig = useRuntimeConfig()
const { consentState } = useConsentState()
const { trackOutboundClick } = useOutboundClickTracking()
const defaultAdultCountInput = '2'
const defaultChildCountInput = '0'
const minimumTravelDate = '2026-05-20'
const arrivalDateInput = ref<string>('')
const departureDateInput = ref<string>('')
const adultCountInput = ref<string>(defaultAdultCountInput)
const childCountInput = ref<string>(defaultChildCountInput)
const personCountFilter = ref<string>(defaultAccommodationFilterState.personCount)
const numberOfNightsFilter = ref<string>(defaultAccommodationFilterState.numberOfNights)
const maxPriceAmountFilter = ref<string>(defaultAccommodationFilterState.maxPriceAmount)
const sortMode = ref<AccommodationSortMode>(defaultAccommodationFilterState.sortMode)

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

const parkDetailPath = computed<string>(() => {
  if (park.value === null) {
    return '/parken'
  }

  return createParkDetailPath(park.value)
})

const departureMinimumDate = computed<string>(() => {
  if (arrivalDateInput.value.length === 0) {
    return minimumTravelDate
  }

  return arrivalDateInput.value
})

const hasInvalidDateRange = computed<boolean>(() => {
  if (arrivalDateInput.value.length === 0) {
    return false
  }

  if (departureDateInput.value.length === 0) {
    return false
  }

  return departureDateInput.value <= arrivalDateInput.value
})

const adultCountValue = computed<number>(() => parseTravellerCount(adultCountInput.value, Number(defaultAdultCountInput)))
const childCountValue = computed<number>(() => parseTravellerCount(childCountInput.value, Number(defaultChildCountInput)))

const selectedDateSearch = computed<AccommodationSearchSelection | null>(() => {
  if (arrivalDateInput.value.length === 0 || departureDateInput.value.length === 0) {
    return null
  }

  if (hasInvalidDateRange.value === true) {
    return null
  }

  if (adultCountValue.value < 1 || childCountValue.value < 0) {
    return null
  }

  return {
    arrivalDate: arrivalDateInput.value,
    departureDate: departureDateInput.value,
    adultCount: adultCountValue.value,
    childCount: childCountValue.value,
  }
})

const hasSelectedDateSearch = computed<boolean>(() => selectedDateSearch.value !== null)

const dateSearchSummary = computed<string>(() => {
  if (selectedDateSearch.value === null) {
    return 'Kies je aankomst- en vertrekdatum.'
  }

  const travellerCount: number = selectedDateSearch.value.adultCount + selectedDateSearch.value.childCount

  if (travellerCount === 1) {
    return `${selectedDateSearch.value.arrivalDate} tot ${selectedDateSearch.value.departureDate}, 1 reiziger`
  }

  return `${selectedDateSearch.value.arrivalDate} tot ${selectedDateSearch.value.departureDate}, ${travellerCount} reizigers`
})

const accommodationCards = computed<AccommodationCardViewModel[]>(() => {
  if (park.value === null) {
    return []
  }

  return createAccommodationCardViewModels(mockCatalog, park.value, route.path, selectedDateSearch.value)
})

const accommodationFilters = computed<AccommodationFilterState>(() => {
  return {
    personCount: personCountFilter.value,
    numberOfNights: numberOfNightsFilter.value,
    maxPriceAmount: maxPriceAmountFilter.value,
    sortMode: sortMode.value,
  }
})

const filteredAccommodationCards = computed<AccommodationCardViewModel[]>(() => {
  return filterAccommodationCards(accommodationCards.value, accommodationFilters.value)
})

const personCountOptions = computed<AccommodationFilterOption[]>(() => createPersonCountOptions(accommodationCards.value))
const numberOfNightsOptions = computed<AccommodationFilterOption[]>(() => createNightOptions(accommodationCards.value))
const maxPriceAmountOptions = computed<AccommodationFilterOption[]>(() => createMaxPriceOptions(accommodationCards.value))
const sortOptions = computed<AccommodationFilterOption[]>(() => accommodationSortOptions)
const hasAccommodations = computed<boolean>(() => accommodationCards.value.length > 0)
const hasAccommodationMatches = computed<boolean>(() => filteredAccommodationCards.value.length > 0)
const shouldShowAccommodationList = computed<boolean>(() => hasPark.value === true && hasAccommodations.value === true)
const shouldShowNoFilterResults = computed<boolean>(() => shouldShowAccommodationList.value === true && hasAccommodationMatches.value === false)
const shouldShowEmptyState = computed<boolean>(() => hasPark.value === true && hasAccommodations.value === false)
const shouldShowMissingPark = computed<boolean>(() => hasPark.value === false)

const hasActiveFilters = computed<boolean>(() => {
  return personCountFilter.value !== defaultAccommodationFilterState.personCount
    || numberOfNightsFilter.value !== defaultAccommodationFilterState.numberOfNights
    || maxPriceAmountFilter.value !== defaultAccommodationFilterState.maxPriceAmount
    || sortMode.value !== defaultAccommodationFilterState.sortMode
})

const hasActiveDateSearch = computed<boolean>(() => {
  return arrivalDateInput.value.length > 0
    || departureDateInput.value.length > 0
    || adultCountInput.value !== defaultAdultCountInput
    || childCountInput.value !== defaultChildCountInput
})

const accommodationCountLabel = computed<string>(() => {
  if (accommodationCards.value.length === 1) {
    return '1 accommodatie gevonden'
  }

  return `${accommodationCards.value.length} accommodaties gevonden`
})

const filteredAccommodationCountLabel = computed<string>(() => {
  if (filteredAccommodationCards.value.length === accommodationCards.value.length) {
    return accommodationCountLabel.value
  }

  if (filteredAccommodationCards.value.length === 1) {
    return `1 van ${accommodationCards.value.length} accommodaties zichtbaar`
  }

  return `${filteredAccommodationCards.value.length} van ${accommodationCards.value.length} accommodaties zichtbaar`
})

const sourceCapturedAtLabel = computed<string>(() => {
  const firstCard: AccommodationCardViewModel | undefined = accommodationCards.value[0]

  if (firstCard === undefined) {
    return 'Nog niet opgehaald'
  }

  return firstCard.accommodation.sourceCapturedAt.slice(0, 10)
})

const canonicalUrl = computed<string>(() => createCanonicalUrl(siteOrigin.value, route.path))

const metaDescription = computed<string>(() => {
  if (park.value === null) {
    return 'Accommodatie-overzicht niet gevonden.'
  }

  return `Bekijk accommodaties en prijsvoorbeelden voor ${park.value.name}.`
})

// Functions
const parseTravellerCount = (value: string, fallbackValue: number): number => {
  const parsedValue: number = Number(value)

  if (Number.isFinite(parsedValue) === false) {
    return fallbackValue
  }

  return parsedValue
}

const setAdultCount = (nextValue: number): void => {
  adultCountInput.value = String(Math.min(8, Math.max(1, nextValue)))
}

const setChildCount = (nextValue: number): void => {
  childCountInput.value = String(Math.min(4, Math.max(0, nextValue)))
}

const decreaseAdultCount = (): void => {
  setAdultCount(adultCountValue.value - 1)
}

const increaseAdultCount = (): void => {
  setAdultCount(adultCountValue.value + 1)
}

const decreaseChildCount = (): void => {
  setChildCount(childCountValue.value - 1)
}

const increaseChildCount = (): void => {
  setChildCount(childCountValue.value + 1)
}

const syncDateInputsFromRoute = (): void => {
  arrivalDateInput.value = getRouteQueryTextValue(route.query.arrival)
  departureDateInput.value = getRouteQueryTextValue(route.query.departure)
  adultCountInput.value = getRouteQueryCountValue(route.query.adults, defaultAdultCountInput)
  childCountInput.value = getRouteQueryCountValue(route.query.children, defaultChildCountInput)
}

const shouldPersistTravellerCounts = (): boolean => {
  if (arrivalDateInput.value.length > 0 || departureDateInput.value.length > 0) {
    return true
  }

  if (adultCountInput.value !== defaultAdultCountInput || childCountInput.value !== defaultChildCountInput) {
    return true
  }

  return false
}

const getDateSearchQuery = (): Record<string, string> => {
  const query: Record<string, string> = {}

  if (arrivalDateInput.value.length > 0) {
    query.arrival = arrivalDateInput.value
  }

  if (departureDateInput.value.length > 0) {
    query.departure = departureDateInput.value
  }

  if (shouldPersistTravellerCounts() === true) {
    query.adults = adultCountInput.value
    query.children = childCountInput.value
  }

  return query
}

const applyDateSearch = (): void => {
  void router.replace({
    path: route.path,
    query: getDateSearchQuery(),
  })
}

const clearDateSearch = (): void => {
  arrivalDateInput.value = ''
  departureDateInput.value = ''
  adultCountInput.value = defaultAdultCountInput
  childCountInput.value = defaultChildCountInput

  void router.replace({
    path: route.path,
    query: {},
  })
}

const resetAccommodationFilters = (): void => {
  personCountFilter.value = defaultAccommodationFilterState.personCount
  numberOfNightsFilter.value = defaultAccommodationFilterState.numberOfNights
  maxPriceAmountFilter.value = defaultAccommodationFilterState.maxPriceAmount
  sortMode.value = defaultAccommodationFilterState.sortMode
}

const createAccommodationClickContext = (
  parkRecord: ParkRecord,
  card: AccommodationCardViewModel,
): Record<string, string> => {
  const trackingContext: Record<string, string> = {
    source: 'accommodation-overview',
    campaign: 'landal-tradetracker',
    park: parkRecord.slug,
    accommodation: card.accommodation.code,
  }

  if (selectedDateSearch.value === null) {
    return trackingContext
  }

  trackingContext.arrivalDate = selectedDateSearch.value.arrivalDate
  trackingContext.departureDate = selectedDateSearch.value.departureDate
  trackingContext.adultCount = String(selectedDateSearch.value.adultCount)
  trackingContext.childCount = String(selectedDateSearch.value.childCount)

  return trackingContext
}

const handleAccommodationClick = (card: AccommodationCardViewModel): void => {
  if (park.value === null) {
    return
  }

  trackOutboundClick({
    parkId: park.value.id,
    destinationUrlKey: card.affiliateDestinationUrlKey,
    pagePath: route.path,
    consentState: consentState.value,
    utmContext: createAccommodationClickContext(park.value, card),
  })
}

watch(
  () => route.query,
  (): void => {
    syncDateInputsFromRoute()
  },
  { immediate: true },
)

useHead(() => ({
  title: `Accommodaties ${parkName.value} | Weekendjeweg`,
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
}))
</script>

<template>
  <div>
    <section
      class="grid gap-5 bg-[#153f3a] px-4 py-12 text-white md:px-16 md:py-16"
      aria-labelledby="accommodations-title"
    >
      <NuxtLink
        :to="parkDetailPath"
        class="inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-[#f5c84c] px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
      >
        <ArrowLeft
          :size="18"
          aria-hidden="true"
        />
        Terug naar park
      </NuxtLink>
      <div class="grid max-w-[58rem] gap-3">
        <p class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-[#f5c84c]">
          <Home
            :size="18"
            aria-hidden="true"
          />
          Accommodaties
        </p>
        <h1
          id="accommodations-title"
          class="text-4xl font-black leading-tight tracking-normal md:text-6xl"
        >
          {{ parkName }}
        </h1>
        <p class="text-lg font-semibold text-[#fdfaf2] md:text-xl">
          {{ accommodationCountLabel }}. Prijzen zijn momentopnames en worden definitief bij Landal.
        </p>
        <p class="inline-flex items-center gap-2 text-sm font-semibold text-[#dcebe7]">
          <CalendarDays
            :size="17"
            aria-hidden="true"
          />
          Laatst opgehaald: {{ sourceCapturedAtLabel }}
        </p>
      </div>
    </section>

    <section
      v-if="shouldShowAccommodationList"
      class="px-4 py-10 md:px-16 md:py-14"
      aria-label="Accommodatielijst"
    >
      <div class="grid gap-6 lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:items-start">
        <aside
          class="relative z-40 grid gap-4 rounded-lg bg-[#fffdf7] p-4 shadow-[0_18px_40px_rgba(21,63,58,0.12)] lg:sticky lg:top-6"
          aria-label="Accommodaties filteren"
        >
          <div class="grid gap-1">
            <h2 class="inline-flex items-center gap-2 text-2xl font-black leading-tight tracking-normal text-[#1b2f2c]">
              <SlidersHorizontal
                :size="24"
                aria-hidden="true"
              />
              Zoek je verblijf
            </h2>
            <p class="inline-flex items-center gap-2 font-semibold text-[#455b56]">
              <Filter
                :size="17"
                aria-hidden="true"
              />
              {{ filteredAccommodationCountLabel }}
            </p>
          </div>

          <form
            class="grid gap-3 rounded-lg border border-[#d8e4df] bg-white p-3"
            @submit.prevent="applyDateSearch"
          >
            <h3 class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#28665e]">
              <CalendarDays
                :size="17"
                aria-hidden="true"
              />
              Reisdata
            </h3>
            <div class="grid gap-3">
              <TravelDatePicker
                v-model="arrivalDateInput"
                :min-date="minimumTravelDate"
                label="Aankomst"
              />
              <TravelDatePicker
                v-model="departureDateInput"
                :min-date="departureMinimumDate"
                label="Vertrek"
              />
            </div>

            <fieldset class="grid gap-3 rounded-lg bg-[#f7f4ec] p-3">
              <legend class="sr-only">Reizigers</legend>
              <div class="grid gap-2">
                <span
                  id="adult-count-label"
                  class="text-sm font-black uppercase text-[#28665e]"
                >
                  Volwassenen
                </span>
                <div class="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2">
                  <button
                    :disabled="adultCountValue <= 1"
                    aria-label="Minder volwassenen"
                    class="grid size-11 place-items-center rounded-md border border-[#a9beb7] bg-white text-[#153f3a] hover:bg-[#edf7f4] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c] disabled:cursor-not-allowed disabled:text-[#b8c3bf]"
                    type="button"
                    @click="decreaseAdultCount"
                  >
                    <Minus
                      :size="17"
                      aria-hidden="true"
                    />
                  </button>
                  <output
                    aria-labelledby="adult-count-label"
                    class="grid min-h-11 place-items-center rounded-md bg-white px-3 text-lg font-black text-[#1b2f2c]"
                  >
                    {{ adultCountValue }}
                  </output>
                  <button
                    :disabled="adultCountValue >= 8"
                    aria-label="Meer volwassenen"
                    class="grid size-11 place-items-center rounded-md border border-[#a9beb7] bg-white text-[#153f3a] hover:bg-[#edf7f4] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c] disabled:cursor-not-allowed disabled:text-[#b8c3bf]"
                    type="button"
                    @click="increaseAdultCount"
                  >
                    <Plus
                      :size="17"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div class="grid gap-2">
                <span
                  id="child-count-label"
                  class="text-sm font-black uppercase text-[#28665e]"
                >
                  Kinderen
                </span>
                <div class="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2">
                  <button
                    :disabled="childCountValue <= 0"
                    aria-label="Minder kinderen"
                    class="grid size-11 place-items-center rounded-md border border-[#a9beb7] bg-white text-[#153f3a] hover:bg-[#edf7f4] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c] disabled:cursor-not-allowed disabled:text-[#b8c3bf]"
                    type="button"
                    @click="decreaseChildCount"
                  >
                    <Minus
                      :size="17"
                      aria-hidden="true"
                    />
                  </button>
                  <output
                    aria-labelledby="child-count-label"
                    class="grid min-h-11 place-items-center rounded-md bg-white px-3 text-lg font-black text-[#1b2f2c]"
                  >
                    {{ childCountValue }}
                  </output>
                  <button
                    :disabled="childCountValue >= 4"
                    aria-label="Meer kinderen"
                    class="grid size-11 place-items-center rounded-md border border-[#a9beb7] bg-white text-[#153f3a] hover:bg-[#edf7f4] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c] disabled:cursor-not-allowed disabled:text-[#b8c3bf]"
                    type="button"
                    @click="increaseChildCount"
                  >
                    <Plus
                      :size="17"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </fieldset>

            <p
              v-if="hasInvalidDateRange"
              class="rounded-md bg-[#fde9e4] px-3 py-2 text-sm font-bold text-[#9b2f20]"
            >
              Vertrekdatum moet na aankomstdatum liggen.
            </p>
            <p
              v-if="hasSelectedDateSearch"
              class="rounded-md bg-[#edf7f4] px-3 py-2 text-sm font-bold text-[#28665e]"
            >
              {{ dateSearchSummary }}
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                :disabled="hasInvalidDateRange"
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#153f3a] px-3 py-2 text-sm font-black text-white hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c] disabled:cursor-not-allowed disabled:bg-[#8aa09b]"
                type="submit"
              >
                <Search
                  :size="16"
                  aria-hidden="true"
                />
                Pas toe
              </button>
              <button
                v-if="hasActiveDateSearch"
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#153f3a] bg-white px-3 py-2 text-sm font-black text-[#153f3a] hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
                type="button"
                @click="clearDateSearch"
              >
                <X
                  :size="16"
                  aria-hidden="true"
                />
                Wis data
              </button>
            </div>
          </form>

          <div class="grid gap-4">
            <div class="grid gap-2">
              <label
                class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#28665e]"
                for="person-count-filter"
              >
                <Users
                  :size="17"
                  aria-hidden="true"
                />
                Personen
              </label>
              <select
                v-model="personCountFilter"
                class="min-h-12 rounded-md border border-[#b7c6bf] bg-white px-3 py-2 font-semibold text-[#1b2f2c]"
                id="person-count-filter"
              >
                <option
                  v-for="option in personCountOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="grid gap-2">
              <label
                class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#28665e]"
                for="nights-filter"
              >
                <CalendarDays
                  :size="17"
                  aria-hidden="true"
                />
                Nachten
              </label>
              <select
                v-model="numberOfNightsFilter"
                class="min-h-12 rounded-md border border-[#b7c6bf] bg-white px-3 py-2 font-semibold text-[#1b2f2c]"
                id="nights-filter"
              >
                <option
                  v-for="option in numberOfNightsOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="grid gap-2">
              <label
                class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#28665e]"
                for="max-price-filter"
              >
                <Euro
                  :size="17"
                  aria-hidden="true"
                />
                Max prijs
              </label>
              <select
                v-model="maxPriceAmountFilter"
                class="min-h-12 rounded-md border border-[#b7c6bf] bg-white px-3 py-2 font-semibold text-[#1b2f2c]"
                id="max-price-filter"
              >
                <option
                  v-for="option in maxPriceAmountOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="grid gap-2">
              <label
                class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#28665e]"
                for="sort-mode-filter"
              >
                <SlidersHorizontal
                  :size="17"
                  aria-hidden="true"
                />
                Sorteren
              </label>
              <select
                v-model="sortMode"
                class="min-h-12 rounded-md border border-[#b7c6bf] bg-white px-3 py-2 font-semibold text-[#1b2f2c]"
                id="sort-mode-filter"
              >
                <option
                  v-for="option in sortOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <button
            v-if="hasActiveFilters"
            class="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md border border-[#153f3a] bg-white px-4 py-3 font-black text-[#153f3a] hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            type="button"
            @click="resetAccommodationFilters"
          >
            <Filter
              :size="17"
              aria-hidden="true"
            />
            Wis filters
          </button>
        </aside>

        <div class="grid gap-5">
          <article
            v-for="card in filteredAccommodationCards"
            :key="card.accommodation.id"
            class="grid overflow-hidden rounded-lg bg-[#fffdf7] shadow-[0_18px_40px_rgba(21,63,58,0.12)] md:grid-cols-[minmax(12rem,18rem)_minmax(0,1fr)_minmax(12rem,16rem)]"
          >
            <AccommodationImageCarousel
              :fallback-alt-text="card.imageAltText"
              :slides="card.imageSlides"
            />
            <div class="grid gap-4 p-5">
              <div class="grid gap-1">
                <p class="text-sm font-black uppercase text-[#c94936]">{{ card.accommodation.code }}</p>
                <h2 class="text-2xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-3xl">{{ card.accommodation.name }}</h2>
              </div>
              <dl class="grid gap-2 text-sm font-semibold text-[#455b56] sm:grid-cols-2">
                <div
                  v-if="card.accommodation.personCount !== null"
                  class="inline-flex items-center gap-2"
                >
                  <Users
                    :size="17"
                    aria-hidden="true"
                  />
                  <dt class="sr-only">Personen</dt>
                  <dd>{{ card.accommodation.personCount }} personen</dd>
                </div>
                <div
                  v-if="card.accommodation.areaText !== null"
                  class="inline-flex items-center gap-2"
                >
                  <Maximize2
                    :size="17"
                    aria-hidden="true"
                  />
                  <dt class="sr-only">Oppervlakte</dt>
                  <dd>{{ card.accommodation.areaText }}</dd>
                </div>
                <div
                  v-if="card.accommodation.bedroomCount !== null"
                  class="inline-flex items-center gap-2"
                >
                  <BedDouble
                    :size="17"
                    aria-hidden="true"
                  />
                  <dt class="sr-only">Slaapkamers</dt>
                  <dd>{{ card.accommodation.bedroomCount }} slaapkamers</dd>
                </div>
                <div
                  v-if="card.accommodation.bathroomCount !== null"
                  class="inline-flex items-center gap-2"
                >
                  <Bath
                    :size="17"
                    aria-hidden="true"
                  />
                  <dt class="sr-only">Badkamers</dt>
                  <dd>{{ card.accommodation.bathroomCount }} badkamers</dd>
                </div>
                <div
                  v-if="card.accommodation.construction !== null"
                  class="inline-flex items-center gap-2"
                >
                  <Home
                    :size="17"
                    aria-hidden="true"
                  />
                  <dt class="sr-only">Ligging</dt>
                  <dd>{{ card.accommodation.construction }}</dd>
                </div>
              </dl>
              <p class="inline-flex items-center gap-2 text-[#455b56]">
                <CalendarDays
                  :size="18"
                  aria-hidden="true"
                />
                {{ card.stayContext }}
              </p>
              <p class="text-sm font-semibold text-[#5b6a66]">{{ card.accommodation.priceDisclaimer }}</p>
            </div>
            <div class="grid content-center gap-3 bg-[#f7f4ec] p-5">
              <p class="inline-flex items-center gap-2 text-sm font-black uppercase text-[#28665e]">
                <Euro
                  :size="17"
                  aria-hidden="true"
                />
                Prijs
              </p>
              <p class="text-3xl font-black text-[#153f3a]">{{ card.priceLabel }}</p>
              <p class="text-sm font-semibold text-[#5b6a66]">{{ card.priceFootnote }}</p>
              <a
                :href="card.affiliateUrl"
                class="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-[#c94936] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
                rel="nofollow sponsored noopener"
                @click="handleAccommodationClick(card)"
              >
                Bekijk bij Landal
                <ChevronRight
                  :size="18"
                  aria-hidden="true"
                />
              </a>
            </div>
          </article>

          <div
            v-if="shouldShowNoFilterResults"
            class="rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.12)]"
          >
            <h2 class="text-2xl font-black leading-tight tracking-normal text-[#1b2f2c]">Geen accommodaties gevonden</h2>
            <p class="mt-2 text-[#455b56]">Verbreed je filters om weer prijsvoorbeelden te zien.</p>
            <button
              class="mt-4 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-[#153f3a] px-4 py-3 font-black text-white hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
              type="button"
              @click="resetAccommodationFilters"
            >
              <Filter
                :size="17"
                aria-hidden="true"
              />
              Wis filters
            </button>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="shouldShowEmptyState"
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="accommodations-empty-title"
    >
      <h2
        id="accommodations-empty-title"
        class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-4xl"
      >
        Nog geen accommodaties
      </h2>
      <p class="mt-4 max-w-[44rem] text-lg text-[#455b56]">Voor dit park is nog geen accommodatie-overzicht opgehaald.</p>
    </section>

    <section
      v-if="shouldShowMissingPark"
      class="max-w-[72rem] px-4 py-12 md:px-16 md:py-16"
      aria-labelledby="accommodations-missing-title"
    >
      <h2
        id="accommodations-missing-title"
        class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-4xl"
      >
        Park niet gevonden
      </h2>
      <p class="mt-4 max-w-[44rem] text-lg text-[#455b56]">Ga terug naar het parkoverzicht om een park uit de catalogus te kiezen.</p>
      <NuxtLink
        class="mt-4 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-[#153f3a] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>
  </div>
</template>
