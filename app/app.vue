<template>
  <div>
    <a
      class="fixed left-4 top-4 z-50 -translate-y-[150%] rounded-md bg-[#153f3a] px-4 py-3 font-bold text-white transition-transform focus:translate-y-0"
      href="#main-content"
    >
      Naar hoofdinhoud
    </a>

    <header class="bg-[#fffdf7] text-[#1b2f2c] shadow-[0_1px_0_rgba(21,63,58,0.12)]">
      <div class="bg-[#153f3a] px-4 py-2 text-center text-sm font-bold text-[#fffdf7] md:px-16">
        Prijsvoorbeelden voor Landal-parken, helder vergeleken zonder beschikbaarheidsclaim
      </div>
      <div class="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-16">
        <NuxtLink
          class="w-fit rounded-md px-2 py-1 text-xl font-black no-underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
          to="/"
        >
          Weekendjeweg
        </NuxtLink>

        <nav
          class="flex flex-wrap gap-2"
          aria-label="Hoofdnavigatie"
        >
          <NuxtLink
            class="inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 font-bold text-[#1b2f2c] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            to="/parken"
          >
            Parken
          </NuxtLink>
          <NuxtLink
            class="inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 font-bold text-[#1b2f2c] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            to="/regio/nederland"
          >
            Regio's
          </NuxtLink>
          <NuxtLink
            class="inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 font-bold text-[#1b2f2c] no-underline hover:bg-[#e7efe8] focus-visible:bg-[#e7efe8] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
            to="/toegankelijkheid"
          >
            Toegankelijkheid
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main
      id="main-content"
      class="min-h-screen bg-[#f7f4ec] font-sans text-[#22322f] antialiased focus:outline-none"
      tabindex="-1"
    >
      <NuxtPage />
    </main>

    <ConsentBanner />
  </div>
</template>
