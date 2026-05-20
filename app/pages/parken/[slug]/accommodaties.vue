<script setup lang="ts">
import { computed } from 'vue'
import { mockCatalog } from '~~/shared/data/mockCatalog'
import { createAccommodationCardViewModels } from '~~/shared/domain/accommodationPresentation'
import { getParkBySlug } from '~~/shared/domain/catalogRepository'
import { createParkDetailPath } from '~~/shared/domain/parkPresentation'
import { createCanonicalUrl } from '~~/shared/domain/seo'
import { resolveSiteOrigin } from '~~/shared/domain/siteOrigin'
import type { AccommodationCardViewModel } from '~~/shared/types/accommodation'
import type { ParkRecord } from '~~/shared/types/database'

// Definitions
const route = useRoute()
const requestUrl = useRequestURL()
const runtimeConfig = useRuntimeConfig()
const { consentState } = useConsentState()
const { trackOutboundClick } = useOutboundClickTracking()

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

const accommodationCards = computed<AccommodationCardViewModel[]>(() => {
  if (park.value === null) {
    return []
  }

  return createAccommodationCardViewModels(mockCatalog, park.value, route.path)
})

const hasAccommodations = computed<boolean>(() => accommodationCards.value.length > 0)
const shouldShowAccommodationList = computed<boolean>(() => hasPark.value === true && hasAccommodations.value === true)
const shouldShowEmptyState = computed<boolean>(() => hasPark.value === true && hasAccommodations.value === false)
const shouldShowMissingPark = computed<boolean>(() => hasPark.value === false)

const accommodationCountLabel = computed<string>(() => {
  if (accommodationCards.value.length === 1) {
    return '1 accommodatie gevonden'
  }

  return `${accommodationCards.value.length} accommodaties gevonden`
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
const handleAccommodationClick = (card: AccommodationCardViewModel): void => {
  if (park.value === null) {
    return
  }

  trackOutboundClick({
    parkId: park.value.id,
    destinationUrlKey: card.affiliateDestinationUrlKey,
    pagePath: route.path,
    consentState: consentState.value,
    utmContext: {
      source: 'accommodation-overview',
      campaign: 'landal-tradetracker',
      park: park.value.slug,
      accommodation: card.accommodation.code,
    },
  })
}

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
        class="w-fit rounded-md bg-[#f5c84c] px-3 py-2 text-sm font-black text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
      >
        Terug naar park
      </NuxtLink>
      <div class="grid max-w-[58rem] gap-3">
        <p class="text-sm font-black uppercase tracking-normal text-[#f5c84c]">Accommodaties</p>
        <h1
          id="accommodations-title"
          class="text-4xl font-black leading-tight tracking-normal md:text-6xl"
        >
          {{ parkName }}
        </h1>
        <p class="text-lg font-semibold text-[#fdfaf2] md:text-xl">
          {{ accommodationCountLabel }}. Prijzen zijn momentopnames en worden definitief bij Landal.
        </p>
        <p class="text-sm font-semibold text-[#dcebe7]">Laatst opgehaald: {{ sourceCapturedAtLabel }}</p>
      </div>
    </section>

    <section
      v-if="shouldShowAccommodationList"
      class="grid gap-5 px-4 py-10 md:px-16 md:py-14"
      aria-label="Accommodatielijst"
    >
      <article
        v-for="card in accommodationCards"
        :key="card.accommodation.id"
        class="grid overflow-hidden rounded-lg bg-[#fffdf7] shadow-[0_18px_40px_rgba(21,63,58,0.12)] md:grid-cols-[minmax(12rem,18rem)_minmax(0,1fr)_minmax(12rem,16rem)]"
      >
        <div class="min-h-56 bg-[#e7efe8] md:min-h-full">
          <img
            v-if="card.accommodation.imageUrl !== null"
            :alt="card.imageAltText"
            :src="card.accommodation.imageUrl"
            class="h-full min-h-56 w-full object-cover md:min-h-full"
            loading="lazy"
          />
        </div>
        <div class="grid gap-3 p-5">
          <div class="grid gap-1">
            <p class="text-sm font-black uppercase text-[#c94936]">{{ card.accommodation.code }}</p>
            <h2 class="text-2xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-3xl">{{ card.accommodation.name }}</h2>
            <p class="font-semibold text-[#455b56]">{{ card.specificationLabel }}</p>
          </div>
          <p class="text-[#455b56]">{{ card.stayContext }}</p>
          <p class="text-sm font-semibold text-[#5b6a66]">{{ card.accommodation.priceDisclaimer }}</p>
        </div>
        <div class="grid content-center gap-3 bg-[#f7f4ec] p-5">
          <p class="text-sm font-black uppercase text-[#28665e]">Prijsvoorbeeld</p>
          <p class="text-3xl font-black text-[#153f3a]">{{ card.priceLabel }}</p>
          <a
            :href="card.affiliateUrl"
            class="inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-[#c94936] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            rel="nofollow sponsored noopener"
            @click="handleAccommodationClick(card)"
          >
            Bekijk bij Landal
          </a>
        </div>
      </article>
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
