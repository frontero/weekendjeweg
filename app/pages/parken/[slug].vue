<script setup lang="ts">
useHead({
  title: 'Parkdetail | Weekendjeweg',
  meta: [
    {
      name: 'description',
      content: 'Bekijk prijscontext en parkdetails voordat je doorgaat naar Landal.',
    },
  ],
})
</script>

<template>
  <div>
    <section
      class="page-intro"
      aria-labelledby="park-title"
    >
      <p class="eyebrow">Parkdetail</p>
      <h1 id="park-title">Landal Miggelenberg</h1>
      <p class="measure-text">
        Deze pagina is de Nuxt-route voor parkdetails. De volgende units vullen dit met Supabase-data, prijsselectie en affiliate links.
      </p>
    </section>

    <section
      class="detail-layout"
      aria-label="Parkinformatie"
    >
      <div
        class="detail-visual"
        aria-hidden="true"
      ></div>
      <div class="detail-panel">
        <h2>Prijscontext</h2>
        <p>
          Prijsvoorbeeld: vanaf EUR 399 voor de gekozen periode en reisgezelschap. Weekendjeweg claimt geen beschikbaarheid.
        </p>
        <a
          class="primary-action"
          href="https://www.landal.nl/"
          rel="nofollow sponsored noopener"
        >
          Bekijk bij Landal
        </a>
      </div>
    </section>
  </div>
</template>
