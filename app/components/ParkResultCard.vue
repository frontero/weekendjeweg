<script setup lang="ts">
import { computed } from 'vue'
import type { ParkResultCardProps } from '~~/shared/types/parkSearch'

// Definitions
const props = defineProps<ParkResultCardProps>()
const route = useRoute()
const { consentState } = useConsentState()
const { trackOutboundClick } = useOutboundClickTracking()

// Computed
const facilityNames = computed<string>(() => {
  return props.card.facilities.map((facility): string => facility.name).join(', ')
})

const facilityListLabel = computed<string>(() => {
  return `Voorzieningen van ${props.card.park.name}: ${facilityNames.value}`
})

const priceAffiliateLabel = computed<string>(() => {
  return `Bekijk actuele prijs voor ${props.card.park.name} via Landal`
})

const parkDetailLabel = computed<string>(() => {
  return `Bekijk park ${props.card.park.name}`
})

// Functions
const handleAffiliateClick = (): void => {
  trackOutboundClick({
    parkId: props.card.park.id,
    destinationUrlKey: props.card.affiliateDestinationUrlKey,
    pagePath: route.path,
    consentState: consentState.value,
    utmContext: {
      source: 'park-card',
      campaign: 'landal-tradetracker',
      park: props.card.park.slug,
    },
  })
}
</script>

<template>
  <article class="grid overflow-hidden rounded-lg bg-[#fffdf7] shadow-[0_18px_40px_rgba(21,63,58,0.12)] md:grid-cols-[minmax(14rem,0.9fr)_minmax(0,1.1fr)]">
    <div
      :class="props.card.visualClassName"
      class="relative min-h-72 overflow-hidden md:min-h-full"
    >
      <img
        :alt="props.card.visualAltText"
        :src="props.card.visualImageUrl"
        class="h-full min-h-72 w-full object-cover transition-transform duration-500 hover:scale-105 md:min-h-full"
        loading="lazy"
      />
      <div class="absolute left-3 top-3 rounded-md bg-[#fffdf7] px-3 py-2 text-sm font-black uppercase text-[#153f3a] shadow-lg">
        {{ props.card.regionName }}
      </div>
    </div>
    <div class="grid content-center gap-4 p-5 md:p-6">
      <div class="grid gap-2">
        <p class="text-sm font-black uppercase tracking-normal text-[#b33b2f]">Prijsvoorbeeld</p>
        <h2 class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">{{ props.card.park.name }}</h2>
        <p class="font-semibold text-[#455b56]">{{ props.card.park.locationName }}</p>
      </div>
      <p class="text-[#22322f]">{{ props.card.park.description }}</p>
      <ul
        :aria-label="facilityListLabel"
        class="flex flex-wrap gap-2"
      >
        <li
          v-for="facility in props.card.facilities"
          :key="facility.id"
          class="rounded-md bg-[#e7efe8] px-3 py-2 text-sm font-black text-[#153f3a]"
        >
          {{ facility.name }}
        </li>
      </ul>
      <a
        :href="props.card.affiliateUrl"
        :aria-label="priceAffiliateLabel"
        class="grid gap-1 rounded-lg bg-[#f7f4ec] p-4 no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        rel="nofollow sponsored noopener"
        @click="handleAffiliateClick"
      >
        <p class="text-2xl font-black text-[#153f3a]">{{ props.card.priceLabel }}</p>
        <p class="text-sm font-semibold text-[#5b6a66]">{{ props.card.priceContext }}. Klik door voor de actuele prijs bij Landal.</p>
      </a>
      <NuxtLink
        :aria-label="parkDetailLabel"
        :to="props.card.detailPath"
        class="inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-[#c94936] px-4 py-3 font-black text-white no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
      >
        Bekijk park
      </NuxtLink>
    </div>
  </article>
</template>
