<script setup lang="ts">
useHead({
  title: 'Parken zoeken | Weekendjeweg',
  meta: [
    {
      name: 'description',
      content: 'Zoek Landal-parken in Nederland op regio, periode, reisgezelschap en voorzieningen.',
    },
  ],
})
</script>

<template>
  <div>
    <section
      class="page-intro"
      aria-labelledby="parks-title"
    >
      <p class="eyebrow">Parken zoeken</p>
      <h1 id="parks-title">Vergelijk Landal-parken</h1>
      <p class="measure-text">
        Deze foundation toont alvast de route, filters en prijscontext. De echte data-koppeling volgt in de Supabase- en import-units.
      </p>
    </section>

    <section
      class="search-layout"
      aria-label="Parkfilters en resultaten"
    >
      <form class="filter-panel">
        <div class="field-group">
          <label for="region">Regio</label>
          <select id="region" name="region">
            <option value="">Alle regio's</option>
            <option value="veluwe">Veluwe</option>
            <option value="kust">Kust</option>
            <option value="limburg">Limburg</option>
          </select>
        </div>

        <div class="date-grid">
          <div class="field-group">
            <label for="arrival-date">Aankomst</label>
            <input
              id="arrival-date"
              name="arrivalDate"
              type="date"
            />
          </div>
          <div class="field-group">
            <label for="departure-date">Vertrek</label>
            <input
              id="departure-date"
              name="departureDate"
              type="date"
            />
          </div>
        </div>

        <div class="date-grid">
          <div class="field-group">
            <label for="adults">Volwassenen</label>
            <input
              id="adults"
              min="1"
              name="adults"
              type="number"
              value="2"
            />
          </div>
          <div class="field-group">
            <label for="children">Kinderen</label>
            <input
              id="children"
              min="0"
              name="children"
              type="number"
              value="0"
            />
          </div>
        </div>

        <fieldset class="facility-fieldset">
          <legend>Voorzieningen</legend>
          <label class="checkbox-row" for="pool">
            <input
              id="pool"
              name="facilities"
              type="checkbox"
              value="zwembad"
            />
            Zwembad
          </label>
          <label class="checkbox-row" for="wellness">
            <input
              id="wellness"
              name="facilities"
              type="checkbox"
              value="wellness"
            />
            Wellness
          </label>
        </fieldset>
      </form>

      <div
        class="result-list"
        aria-live="polite"
      >
        <p class="result-count">Voorbeeldresultaat voor de Nuxt-foundation</p>
        <article class="park-card">
          <div
            class="park-card__visual"
            aria-hidden="true"
          ></div>
          <div class="park-card__content">
            <p class="eyebrow">Veluwe</p>
            <h2>Landal Miggelenberg</h2>
            <p>
              Voorbeeldpark met prijscontext. Beschikbaarheid wordt hier niet geclaimd.
            </p>
            <p class="price-line">Prijsvoorbeeld: vanaf EUR 399</p>
            <NuxtLink
              class="text-action"
              to="/parken/landal-miggelenberg"
            >
              Bekijk park
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
