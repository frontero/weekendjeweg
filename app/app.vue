<template>
  <div>
    <a
      class="fixed left-4 top-4 z-50 -translate-y-[150%] rounded-md bg-[#153f3a] px-4 py-3 font-bold text-white transition-transform focus:translate-y-0"
      href="#main-content"
    >
      Naar hoofdinhoud
    </a>

    <header class="flex flex-col gap-4 bg-[#153f3a] px-4 py-4 text-[#fdfaf2] md:flex-row md:items-center md:justify-between md:px-16">
      <NuxtLink
        class="text-lg font-extrabold no-underline"
        to="/"
      >
        Weekendjeweg
      </NuxtLink>

      <nav
        class="flex flex-wrap gap-2"
        aria-label="Hoofdnavigatie"
      >
        <NuxtLink
          class="inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 font-bold text-[#fdfaf2] no-underline hover:bg-[#28665e] focus-visible:bg-[#28665e]"
          to="/parken"
        >
          Parken
        </NuxtLink>
        <NuxtLink
          class="inline-flex min-h-11 items-center justify-center rounded-md px-3 py-2 font-bold text-[#fdfaf2] no-underline hover:bg-[#28665e] focus-visible:bg-[#28665e]"
          to="/regio/nederland"
        >
          Regio's
        </NuxtLink>
      </nav>
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
