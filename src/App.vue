<template>
  <div>
    <div class="app-shell">
      <a
        class="skip-link"
        href="#main-content"
      >
        Naar inhoud
      </a>

      <header class="app-shell__header">
        <RouterLink
          :to="{ name: 'browse' }"
          class="app-shell__brand"
        >
          Weekendjeweg
        </RouterLink>

        <nav
          class="app-shell__nav"
          aria-label="Hoofdnavigatie"
        >
          <RouterLink
            :to="{ name: 'browse' }"
            class="app-shell__nav-link"
          >
            Ontdekken
          </RouterLink>
          <RouterLink
            :to="{ name: 'favorites' }"
            class="app-shell__nav-link"
          >
            Favorieten
          </RouterLink>
        </nav>
      </header>

      <main
        id="main-content"
        class="app-shell__main"
        tabindex="-1"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>
