// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  debug: false,
  modules: [
    "@nuxtjs/i18n",
    "nuxt-swiper",
    "@pinia/nuxt",
    '@plutotcool/nuxt-password-protect'],
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
      "link": [
        // Favicon
{ rel: 'icon',type:'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
{ rel: 'icon',type:'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
{ rel: 'icon',type:'icon', type: 'image/png', sizes:'16x16', href: '/favicon-16x16.png'},
{ rel: 'icon',type:'manifest', href: '/site.webmanifest'},
      ],
    },
    pageTransition: { name: 'page', mode: 'in-out'}
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/impressum': { prerender: true },
    '/setlist/*': { swr: Number.parseInt(process.env.NUXT_APP_SWR_TTL || '7200') }, //7200 },
    '/setview/*/*': { swr: Number.parseInt(process.env.NUXT_APP_SWR_TTL || '7200') }, //7200 },
    '/setview/*/*/*': { swr: Number.parseInt(process.env.NUXT_APP_SWR_TTL || '7200') }, //7200 },
  },
  i18n: {
    vueI18n: 'i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: false,
    }
  },
   
  passwordProtect: {
    password: process.env.PASSWORD_PROTECT || undefined, // || 'Nominierungen2025',
    secret: process.env.PASSWORD_PROTECT_SECRET || 'pFPfKk9+uSF3Ub33MxKn894vcVA1bvXW6QngOQvUFe7T1wm+/+kzZg==',
    //include: ['setlist', 'setview'],
    exclude: [
      //'public',
      //'/public',
      //'/nominierungen/public',
      //'nominierungen/public',
      'error', 
      //'hfg-logo.svg',
      'public/hfg-logo_dashes.svg'
    ],
    template: {
      lang: 'de',
      title: 'Anmeldung',
      message: '',
      errorMessage: 'Zugangsdaten nicht korrekt.',
      loadingMessage: 'Bitte warten...',
      inputLabel: 'Passwort',
      submitLabel: 'Anmelden',
      logo: 'public/favicon-32x32.png',
      icon: 'public/favicon-32x32.png'
    }
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
      useCachedData: process.env.NUXT_APP_USE_CACHED_DATA || undefined,
      userToken: process.env.NUXT_APP_USER_TOKEN || undefined, //'9MGMWSKV72E5KMB4HCSPYAAJYBFZ18A9',
      rootSetId: process.env.NUXT_APP_ROOT_SET_ID || '75a2d948-fefa-405f-b8c4-40d7de7c0ddf',
      kioskForestSetId: process.env.NUXT_APP_KIOSK_SET_LIST_ID || 
        //'f9519557-5a60-4f5e-8fb4-a39e7ef3f6fb',
        undefined, 
      kioskSetId: process.env.NUXT_APP_KIOSK_SET_ID || 
        //'f9519557-5a60-4f5e-8fb4-a39e7ef3f6fb',
        undefined, 
        // '389b9eae-6a69-4578-a0b8-b3ef1027317c',
      kioskIntroTextLines: process.env.NUXT_APP_KIOSK_INTRO_TEXT_LINES?.split('::') || [
        'Nominierungen',
        'der',
        'Förder-',
        'gesellschaft',
        'ZKM/HfG',
        
      ],
      kiosk: {
        infoH1: process.env.NUXT_APP_KIOSK_INFO_H_1,
        infoP1: process.env.NUXT_APP_KIOSK_INFO_P_1,
        infoH2: process.env.NUXT_APP_KIOSK_INFO_H_2,
        infoP2: process.env.NUXT_APP_KIOSK_INFO_P_2,
        infoH3: process.env.NUXT_APP_KIOSK_INFO_H_3,
        infoP3: process.env.NUXT_APP_KIOSK_INFO_P_3,
      },
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