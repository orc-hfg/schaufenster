// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  debug: false,
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "@pinia/nuxt"],
  appConfig: {
    apiBaseUrl: process.env.NUXT_APP_API_BASE_URL || 'https://staging.madek.hfg-karlsruhe.de',
    apiPath: process.env.NUXT_APP_API_PATH || '/api-v2/',
  },
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
    runtimeConfig: {
      public: {
        MAX_PROJECT_COUNT: 512,
      }
    }
  },
  $development: {
    runtimeConfig: {
      public: {
        MAX_PROJECT_COUNT: 20,
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_APP_API_BASE_URL || 'https://staging.madek.hfg-karlsruhe.de',
      apiPath: process.env.NUXT_APP_API_PATH || '/api-v2/',
      rootSetId: process.env.NUXT_APP_ROOT_SET_ID || '75a2d948-fefa-405f-b8c4-40d7de7c0ddf',
      kioskSetId: process.env.NUXT_APP_KIOSK_SET_ID || 
        'f9519557-5a60-4f5e-8fb4-a39e7ef3f6fb',
        //undefined, 
        // '389b9eae-6a69-4578-a0b8-b3ef1027317c',
      MAX_PROJECT_COUNT: 1024,
      SET_VIEW_PROJECT_TITLE_MAX_LENGTH: 50
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