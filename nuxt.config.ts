// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "@pinia/nuxt"],
  app: {
    baseURL: '/schaufenster',

    pageTransition: { name: 'page', mode: 'in-out'}
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/impressum': { prerender: true },
    '/setlist/*': { swr: 600 },
    '/setview/*/*': { swr: 600 },
    '/setview/*/*/*': { swr: 600 },
  },
  $production: {
    app: {
      baseURL: '/schaufenster'
      //pageTransition: { name: 'page', mode: 'out-in'}
    },
  }

  //swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  //}
})