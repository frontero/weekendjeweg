<script setup lang="ts">
// Definitions
const reviewedAtLabel: string = '20 mei 2026'
const githubIssuesUrl: string = 'https://github.com/frontero/weekendjeweg/issues'

useHead(() => ({
  title: 'Toegankelijkheid | Weekendjeweg',
  meta: [
    {
      name: 'description',
      content: 'Toegankelijkheidsverklaring voor Weekendjeweg met EAA 2025, EN 301 549 en WCAG AA als norm.',
    },
  ],
}))
</script>

<template>
  <div>
    <section
      class="bg-[#153f3a] px-4 py-12 text-white md:px-16 md:py-16"
      aria-labelledby="accessibility-title"
    >
      <p class="mb-3 w-fit rounded-md bg-[#f5c84c] px-3 py-2 text-sm font-black uppercase tracking-normal text-[#153f3a]">
        EAA 2025
      </p>
      <h1
        id="accessibility-title"
        class="max-w-[14ch] text-5xl font-black leading-[1.03] tracking-normal md:text-7xl"
      >
        Toegankelijkheid
      </h1>
      <p class="mt-6 max-w-[46rem] text-lg font-semibold leading-relaxed text-[#fdfaf2]">
        Weekendjeweg moet bruikbaar zijn voor iedereen. Daarom behandelen we toegankelijkheid als harde release-eis, niet als latere optimalisatie.
      </p>
    </section>

    <section
      class="grid max-w-[72rem] gap-8 px-4 py-10 md:px-16 md:py-14"
      aria-label="Toegankelijkheidsverklaring"
    >
      <div class="grid gap-3 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.10)]">
        <h2 class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c]">
          Onze norm
        </h2>
        <p class="leading-relaxed text-[#455b56]">
          Deze site wordt gebouwd tegen EN 301 549 met WCAG 2.1 Level AA als minimum. Voor nieuwe onderdelen gebruiken we WCAG 2.2 Level AA als ontwikkelbaseline, zodat de site strenger wordt getest dan de minimale basis.
        </p>
        <p class="leading-relaxed text-[#455b56]">
          Laatste interne controle: {{ reviewedAtLabel }}.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <article class="grid gap-3 rounded-lg bg-[#e7efe8] p-5">
          <h2 class="text-2xl font-black leading-tight tracking-normal text-[#1b2f2c]">
            Bedienbaar
          </h2>
          <p class="leading-relaxed text-[#455b56]">
            Navigatie, filters, carousels en datumkeuzes moeten met toetsenbord, duidelijke focus en tekstlabels werken.
          </p>
        </article>
        <article class="grid gap-3 rounded-lg bg-[#fffdf7] p-5 shadow-[0_1px_0_rgba(21,63,58,0.12)]">
          <h2 class="text-2xl font-black leading-tight tracking-normal text-[#1b2f2c]">
            Begrijpelijk
          </h2>
          <p class="leading-relaxed text-[#455b56]">
            Links en knoppen krijgen duidelijke namen, foutmeldingen zijn tekstueel en prijzen worden niet alleen visueel uitgelegd.
          </p>
        </article>
        <article class="grid gap-3 rounded-lg bg-[#f5c84c] p-5">
          <h2 class="text-2xl font-black leading-tight tracking-normal text-[#153f3a]">
            Robuust
          </h2>
          <p class="leading-relaxed text-[#2f4d48]">
            De code gebruikt semantische HTML, automatische axe-controles en handmatige reviewcriteria voor nieuwe onderdelen.
          </p>
        </article>
      </div>

      <div class="grid gap-3 rounded-lg bg-[#fffdf7] p-5 shadow-[0_18px_40px_rgba(21,63,58,0.10)]">
        <h2 class="text-3xl font-black leading-tight tracking-normal text-[#1b2f2c]">
          Bekende grenzen
        </h2>
        <ul class="grid gap-2 leading-relaxed text-[#455b56]">
          <li>Actuele boeking, betaling en definitieve beschikbaarheid verlopen op externe Landal-pagina's.</li>
          <li>Afbeeldingen en productgegevens kunnen uit externe bronnen komen, maar krijgen op Weekendjeweg tekstalternatieven en duidelijke context.</li>
          <li>Automatische tests bewijzen niet alles; toetsenbord- en screenreader-review blijven verplicht bij UI-wijzigingen.</li>
        </ul>
      </div>

      <div class="grid gap-3 rounded-lg bg-[#153f3a] p-5 text-white shadow-[0_18px_40px_rgba(21,63,58,0.16)]">
        <h2 class="text-3xl font-black leading-tight tracking-normal">
          Probleem melden
        </h2>
        <p class="max-w-[48rem] leading-relaxed text-[#fdfaf2]">
          Loop je tegen een toegankelijkheidsprobleem aan, meld het dan in de publieke repository. Beschrijf de pagina, het apparaat, de browser en wat er niet werkt.
        </p>
        <a
          :href="githubIssuesUrl"
          class="inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-[#f5c84c] px-4 py-3 font-black text-[#153f3a] no-underline hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
          rel="noopener"
        >
          Meld toegankelijkheidsprobleem
        </a>
      </div>
    </section>
  </div>
</template>
