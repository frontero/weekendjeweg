import { render, screen } from '@testing-library/vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from '@/App.vue'
import { routes } from '@/router'

const renderApp = async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  router.push('/')
  await router.isReady()

  return render(App, {
    global: {
      plugins: [router],
    },
  })
}

describe('App shell', () => {
  it('renders the primary navigation', async () => {
    await renderApp()

    expect(screen.getByRole('navigation', { name: 'Hoofdnavigatie' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Weekendjeweg' })).toBeInTheDocument()
  })
})
