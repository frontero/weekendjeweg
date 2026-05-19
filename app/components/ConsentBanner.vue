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
    class="consent-banner"
    role="region"
    aria-labelledby="consent-title"
  >
    <div class="consent-banner__content">
      <h2 id="consent-title">Cookiekeuze</h2>
      <p class="consent-banner__copy">
        We gebruiken noodzakelijke opslag voor je keuze. Analytics laden we pas als je toestemming geeft. Uitgaande Landal-kliks meten we functioneel en anoniem.
      </p>
    </div>
    <div class="consent-banner__actions">
      <button
        class="secondary-action"
        type="button"
        @click="rejectAnalytics"
      >
        Alleen noodzakelijk
      </button>
      <button
        class="primary-action"
        type="button"
        @click="acceptAnalytics"
      >
        Analytics toestaan
      </button>
    </div>
  </section>
</template>
