<script setup lang="ts">
import { computed } from 'vue'

// Definitions
const { acceptAnalytics, hasConsentChoice, rejectAnalytics } = useConsentState()

// Computed
const shouldShowBanner = computed<boolean>(() => {
  return hasConsentChoice.value === false
})
</script>

<template>
  <section
    v-if="shouldShowBanner"
    class="fixed bottom-4 left-4 right-4 z-40 grid max-w-[44rem] gap-4 rounded-lg border border-[#79b7a5] bg-[#1b2f2c] p-4 text-[#fdfaf2] shadow-2xl md:left-auto md:bottom-12 md:right-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
    role="region"
    aria-labelledby="consent-title"
  >
    <div class="grid gap-2">
      <h2
        id="consent-title"
        class="text-lg font-extrabold leading-tight text-white"
      >
        Cookiekeuze
      </h2>
      <p class="text-[#dce8e4]">
        We gebruiken noodzakelijke opslag voor je keuze. Analytics laden we pas als je toestemming geeft. Uitgaande Landal-kliks meten we functioneel en anoniem.
      </p>
    </div>
    <div class="grid gap-2 md:grid-cols-2">
      <button
        class="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md border-0 bg-[#f5c84c] px-4 py-3 font-bold text-[#153f3a] hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#153f3a] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#153f3a]"
        type="button"
        @click="rejectAnalytics"
      >
        Alleen noodzakelijk
      </button>
      <button
        class="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md border-0 bg-[#c94936] px-4 py-3 font-bold text-white hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        type="button"
        @click="acceptAnalytics"
      >
        Analytics toestaan
      </button>
    </div>
  </section>
</template>
