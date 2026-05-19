<template>
  <div>
    <section class="view-section" aria-labelledby="favorites-title">
      <p class="view-section__eyebrow">Bewaard</p>
      <h1 id="favorites-title">Favorieten komen eraan</h1>
      <p class="view-section__intro">
        In Bolt 004 voegen we favoriete verblijven toe met toegankelijke toggles en duidelijke status.
      </p>

      <RouterLink
        :to="{ name: 'browse' }"
        class="text-link"
      >
        Bekijk verblijven
      </RouterLink>
    </section>
  </div>
</template>
