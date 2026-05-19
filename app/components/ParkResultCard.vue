<script setup lang="ts">
import { computed } from 'vue'
import type { ParkResultCardProps } from '~~/shared/types/parkSearch'

// Definitions
const props = defineProps<ParkResultCardProps>()

// Computed
const facilityNames = computed<string>(() => {
  return props.card.facilities.map((facility): string => facility.name).join(', ')
})

const facilityListLabel = computed<string>(() => {
  return `Voorzieningen van ${props.card.park.name}: ${facilityNames.value}`
})
</script>

<template>
  <article class="grid overflow-hidden rounded-lg border border-[#d8d2c2] bg-[#fffdf7] md:grid-cols-[minmax(12rem,0.85fr)_minmax(0,1.15fr)]">
    <div
      :class="props.card.visualClassName"
      class="min-h-64 md:min-h-full"
      aria-hidden="true"
    ></div>
    <div class="grid content-center gap-3 p-4">
      <p class="text-[0.82rem] font-extrabold uppercase tracking-normal text-[#28665e]">{{ props.card.regionName }}</p>
      <h2 class="text-3xl font-bold leading-tight tracking-normal text-[#1b2f2c] md:text-4xl">{{ props.card.park.name }}</h2>
      <p class="text-[#22322f]">{{ props.card.park.description }}</p>
      <ul
        :aria-label="facilityListLabel"
        class="flex flex-wrap gap-2"
      >
        <li
          v-for="facility in props.card.facilities"
          :key="facility.id"
          class="rounded-md bg-[#e7efe8] px-2 py-1 text-sm font-bold text-[#153f3a]"
        >
          {{ facility.name }}
        </li>
      </ul>
      <p class="font-extrabold text-[#28665e]">{{ props.card.priceLabel }}</p>
      <p class="text-sm text-[#5b6a66]">{{ props.card.priceContext }}. Geen beschikbaarheidsclaim.</p>
      <NuxtLink
        :to="props.card.detailPath"
        class="inline-flex min-h-11 w-fit items-center justify-center rounded-md font-bold text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
      >
        Bekijk {{ props.card.park.name }}
      </NuxtLink>
    </div>
  </article>
</template>
