<script setup lang="ts">
useHead({
  title: 'Regio | Weekendjeweg',
  meta: [
    {
      name: 'description',
      content: 'Route voor toekomstige regio-overzichten van Landal-parken in Nederland.',
    },
  ],
})
</script>

<template>
  <div>
    <section
      class="page-intro"
      aria-labelledby="region-title"
    >
      <p class="eyebrow">Regio</p>
      <h1 id="region-title">Regio-overzicht</h1>
      <p class="measure-text">
        Deze route bestaat alvast voor de latere regio-uitbreiding. Rijke regio-SEO blijft buiten de eerste release.
      </p>
      <NuxtLink
        class="text-action"
        to="/parken"
      >
        Terug naar parken
      </NuxtLink>
    </section>
  </div>
</template>
