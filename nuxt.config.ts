// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "@pinia/nuxt"],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/schaufenster',
    head: {
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1, maximum-scale=2, minimum-scale=1"
          // interactive-widget 
        },
        {
          "charset": "utf-8"
        }
      ],
    },
    pageTransition: { name: 'page', mode: 'in-out'}
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/impressum': { prerender: true },
    '/setlist/*': { swr: 7200 },
    '/setview/*/*': { swr: 7200 },
    '/setview/*/*/*': { swr: 7200 },
  },
  i18n: {
    vueI18n: 'i18n.config.ts'
  },
  $production: {
    app: {
      baseURL: process.env.NUXT_APP_BASE_URL || '/schaufenster',
      head: {
        "meta": [
          {
            "name": "viewport",
            "content": "width=device-width, initial-scale=1, maximum-scale=2, minimum-scale=1"
          },
          {
            "charset": "utf-8"
          }
        ],
      }
      //pageTransition: { name: 'page', mode: 'out-in'}
    },
  },
  runtimeConfig: {
    public: {
      SET_VIEW_PROJECT_TITLE_MAX_LENGTH: 50,
      ROOT_SET: process.env.NUXT_APP_ROOT_SET || '75a2d948-fefa-405f-b8c4-40d7de7c0ddf'
    }
  },
  vite: {
    base: process.env.NUXT_APP_BASE_URL || '/schaufenster'
  }

  //swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  //}
})