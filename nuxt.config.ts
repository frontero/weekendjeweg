import tailwindcss from '@tailwindcss/vite'

const appBaseUrl = process.env.NUXT_APP_BASE_URL ?? '/'
const nitroPreset = process.env.NITRO_PRESET ?? 'vercel'

export default defineNuxtConfig({
  app: {
    baseURL: appBaseUrl,
    head: {
      htmlAttrs: {
        lang: 'nl',
      },
      title: 'Weekendjeweg',
      meta: [
        {
          name: 'description',
          content: 'Vergelijk Landal-parken voor een weekendje weg in Nederland.',
        },
      ],
    },
  },
  compatibilityDate: '2026-05-19',
  css: ['~/assets/styles/main.css'],
  devtools: {
    enabled: false,
  },
  nitro: {
    preset: nitroPreset,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/parken',
        '/parken/landal-de-vers',
        '/parken/landal-miggelenberg',
        '/parken/landal-strand-resort-ouddorp-duin',
        '/parken/landal-hoog-vaals',
        '/regio/nederland',
        '/sitemap.xml',
        '/robots.txt',
      ],
    },
  },
  runtimeConfig: {
    importCronSecret: '',
    supabaseServiceRoleKey: '',
    supabaseUrl: '',
    tradeTrackerAccessKey: '',
    tradeTrackerAffiliateSiteId: '',
    tradeTrackerCampaignId: '',
    tradeTrackerCustomerId: '',
    public: {
      ga4MeasurementId: '',
      siteUrl: '',
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
