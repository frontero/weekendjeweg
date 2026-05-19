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
  <article class="park-card">
    <div
      :class="props.card.visualClassName"
      class="park-card__visual"
      aria-hidden="true"
    ></div>
    <div class="park-card__content">
      <p class="eyebrow">{{ props.card.regionName }}</p>
      <h2>{{ props.card.park.name }}</h2>
      <p>{{ props.card.park.description }}</p>
      <ul
        :aria-label="facilityListLabel"
        class="park-card__facility-list"
      >
        <li
          v-for="facility in props.card.facilities"
          :key="facility.id"
        >
          {{ facility.name }}
        </li>
      </ul>
      <p class="price-line">{{ props.card.priceLabel }}</p>
      <p class="price-note">{{ props.card.priceContext }}. Geen beschikbaarheidsclaim.</p>
      <NuxtLink
        class="text-action"
        :to="props.card.detailPath"
      >
        Bekijk {{ props.card.park.name }}
      </NuxtLink>
    </div>
  </article>
</template>
