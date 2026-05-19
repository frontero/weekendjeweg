export default defineNuxtConfig({
  app: {
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
  css: ['~/app/assets/styles/main.css'],
  devtools: {
    enabled: false,
  },
  nitro: {
    preset: 'vercel',
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
