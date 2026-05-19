<template>
  <div>
    <a
      class="skip-link"
      href="#main-content"
    >
      Naar hoofdinhoud
    </a>

    <header class="site-header">
      <NuxtLink
        class="brand-link"
        to="/"
      >
        Weekendjeweg
      </NuxtLink>

      <nav
        class="site-nav"
        aria-label="Hoofdnavigatie"
      >
        <NuxtLink
          class="site-nav__link"
          to="/parken"
        >
          Parken
        </NuxtLink>
        <NuxtLink
          class="site-nav__link"
          to="/regio/nederland"
        >
          Regio's
        </NuxtLink>
      </nav>
    </header>

    <main
      id="main-content"
      tabindex="-1"
    >
      <NuxtPage />
    </main>
  </div>
</template>
