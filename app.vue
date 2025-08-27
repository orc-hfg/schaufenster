<template>
  <NuxtPage
    class="page"
    :class="{
    'page-in': !isNoClip && isShowPageIn,
    'page-out': !isNoClip && !isShowPageIn,
    'fade': isNoClip}" />
    
</template>
<script setup lang="ts">
import '~/assets/vars.css'
import '~/assets/highcontrast.css'
import '~/assets/base.css'


const {
    font_list,
    font_selected,
    selectRandomFont,
    //initPageFonts,
} = DynFonts()

import '~/assets/dynfonts.css'

//const { error_msg, ok_msg, reset_error } = errorHelper();

const {
  //apiH,
  MATCH_PROJECTS,
  MATCH_DIPLOM,
  initApi,
  initTree,
  initForest,
  initKioskForest
} = treeHelper();

const route = useRoute();
const router = useRouter();
const useTree = useState('tree');
//const useAppSettings = useState('appSettings')

const showMenu = ref(false)

//const isMobile = ref(true);
const isMobile = useState('mobile', () => { return false})

const { orientation } = useOrientation()

// no-mobile-overlay im dev-Modus nicht anzeigen
// interne Vite/Nuxt Variable, die automatisch zur Build-Zeit gesetzt wird:
// npm run dev → import.meta.dev = true
// npm run build → import.meta.dev = false
const isDev = import.meta.dev

const {
    locale,
    defaultLocale
} = useI18n()

const APP_DEFAULT_LOCAL = 'de'

import fs from 'fs'
const TREE_DATA_FILE = '/tmp/tree_data.json'


if (import.meta.server) { 
  console.log("import meta server")
  const config = useRuntimeConfig()
  initApi(config.public.apiBaseUrl, config.public.userToken)
  if (config.public.useCachedData) {
      const filePath = config.public.useCacheFile || TREE_DATA_FILE
      try {
        const data = await fs.promises.readFile(filePath, 'utf-8')
        console.log("read cached tree data from: " + filePath)
        useTree.value = JSON.parse(data)

      } catch(error) {
        console.error('Cloud not load cached tree data from ' + filePath, error)
      }
      console.log("loaded cached tree data")
  }
  
  
  if (!useTree.value) {
    console.log("build new tree data")
  
    if (config.public.kioskForestSetId) {
      console.log("init root set")
      const treesData = await initKioskForest(config.public.kioskForestSetId)
      useTree.value = treesData
    }
    else if (config.public.kioskSetId) {
      console.log("init kiosk set")
      const treesData = await initTree(MATCH_PROJECTS, config.public.kioskSetId)
      //useTree.value = treesData
    } else {
      console.log("init root set")
      const treesData = await initForest(config.public.rootSetId)
      useTree.value = treesData
    }
    if (config.public.useCachedData) {
      const treeSource = JSON.stringify(useTree.value)
      const filePath = config.public.useCacheFile || TREE_DATA_FILE
      fs.writeFile(filePath, treeSource,'utf-8', (err) => {
        //if (err) console.error('Could not write tree data', err)
        console.log('Written tree to disk: ' + filePath)
      })
  
    }
  }
  
}

const setlistLastSlideState = useState("setlistLastSlideState",() => { return -1})

if (import.meta.client) {
  console.log(" is client ")
  selectRandomFont()
  
}


router.beforeEach((to, from, next) => {
  const ts = to.name?.toString() || ''
  const fs = from.name?.toString() || ''
  console.log("router beforeEach: from: " + fs + " -> to: " + ts)

  if (fs === 'index' && ts.indexOf('setlist') > -1) {
    isShowPageIn.value = true
  }
  if (ts === 'index') {
    isShowPageIn.value = false
    //updateTheme('dark')
  }
  if (ts.indexOf('setview') > -1 || fs.indexOf('setview') > -1) {
    isNoClip.value = true;
  } else {
    isNoClip.value = false;
  }
  //if (ts.indexOf('setlist') > -1) {
    //updateTheme('light');
  //}

  const config = useRuntimeConfig()
  if (!config.public.kioskSetId) {
    next()
  }
  else {
    const kioskId = config.public.kioskSetId
    const path = '/setview/projekt/' 
      + kioskId
      + '/' 
    if (to.fullPath.startsWith(path) ) {
      next()
    }
    else {
      console.error("not a kiosk path: ignore route change")
      next(false)
      /*next({
        path: path + kioskId + '/' ,
        replace: true
      })*/
      
    }
  }
})

const isShowPageIn = ref(false)
const isNoClip = ref(false)
watch(() => route.fullPath, () => {
  const config = useRuntimeConfig()
  if (config.public.kioskSetId) {
    const kioskId = config.public.kioskSetId
    const path = '/setview/projekt/' 
      + kioskId
      + '/' 
      //+ kioskId
    if (! route.fullPath.startsWith(path)) {
      console.error("invalid kiosk path: "  + route.fullPath)

      setTimeout(() => {
        router.push(path)
      }, 2000)
    }
  }
  console.log("APP: changed route: " + JSON.stringify(route.fullPath));
});

const updateTheme = (defaultTheme:string|undefined) => {
  const curr = defaultTheme || document.documentElement.getAttribute('data-theme') || 'light'
  const isLight = curr.indexOf('light') > -1
    
  const newTheme = 
      (highContrastState.value ? 'hc_' : '') + 
      (isLight ? 'light' : 'dark')
   
  document.documentElement.setAttribute('data-theme', newTheme)
}

const onkeyupEv = (ev:KeyboardEvent) => {
  console.log(" onkeyup " + ev.code)
  if ((ev.altKey || ev.ctrlKey) && ev.shiftKey && ev.code == 'KeyM') {
    
    isMobile.value = !isMobile.value
    document.documentElement.setAttribute('data-layout', (isMobile.value ? 'mobile' : ''))
    //console.log('switched to mobile: ' + isMobile.value)
  }

  if ((ev.altKey || ev.ctrlKey) && !ev.shiftKey && ev.code == 'KeyM') {
    highContrastState.value = !highContrastState.value
    updateTheme()
    console.log('switched to high contrast: ' + highContrastState.value)
  }
  if (ev.altKey && ev.ctrlKey && ev.code == 'KeyI') {
    router.push('/')
  }
}
const MOBILE_SWITCH_RESOLUTION = 768
const updateMobileStateByWinWidth = () => {

  // CSS Media Query für Landscape + Höhe prüfen
  const isLandscapeLowHeight = window.matchMedia('(orientation: landscape) and (max-height: 439px)').matches;
  // if (window.innerWidth < MOBILE_SWITCH_RESOLUTION) {
  if (window.innerWidth < MOBILE_SWITCH_RESOLUTION || isLandscapeLowHeight) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
  document.documentElement.setAttribute('data-layout', (isMobile.value ? 'mobile' : ''))
  console.log("updateMobileStateByWinWidth: " + window.innerWidth + ":" + isMobile.value)
}

const highContrastState = useState('isHighContrast')

onMounted(() => {
  highContrastState.value = 
    window.getComputedStyle(document.body).getPropertyValue('--high-contrast-enabled') == '1000'
  updateTheme('light')
  updateMobileStateByWinWidth()
  window.addEventListener("resize", (ev) => {
    updateMobileStateByWinWidth()
  })
  document.addEventListener('keyup', onkeyupEv, true)

  const bUrl = useRuntimeConfig().app.baseURL
  useHead({
    "link": [
      // Favicon
      { rel: 'icon', type: 'apple-touch-icon', sizes: '180x180', href: bUrl + '/apple-touch-icon.png'},
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: bUrl + '/favicon-32x32.png'},
      { rel: 'icon', type: 'image/png', sizes:'16x16', href: bUrl + '/favicon-16x16.png'},
      { rel: 'icon', type:'manifest', href: bUrl + '/site.webmanifest'},
  ]})
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onkeyupEv,true)
})

</script>
<style>

:root {
--clip-anim-ms: 800ms;
--clip-radius: calc(sqrt( pow(100vw) + pow(100vh)));
--clip-radius: max(100vw,100vh)
}


.page {
  opacity: 1;
}

/* clip circle page out ani */
.page-out.page-enter-active {
  z-index: 5;
  opacity: 0.99;
  transition: all var(--clip-anim-ms);
}
.page-out.page-leave-active {
  clip-path: circle(var(--clip-radius) at 50vw 50vh) !important;
  transition: clip-path var(--clip-anim-ms) ease-out;
  z-index: 10;
}
.page-out.page-leave-to {
  clip-path: circle(0vw at 50vw 50vh) !important;
}
.page-out.page-enter-to {
  opacity: 1;
}

/* clip circle page in ani */
.page-in.page-enter-active {
  clip-path: circle(0vw at 50vw 50vh) !important;
  transition: clip-path var(--clip-anim-ms) ease-out;
  z-index: 10;
}
.page-in.page-leave-active {
  z-index: 5;
  transition: all var(--clip-anim-ms);
}
.page-in.page-leave-to {
  opacity: 0.99;
}
.page-in.page-enter-to {
  clip-path: circle(var(--clip-radius) at 50vw 50vh) !important;
}

/* fade page io ani */
.fade.page-enter-active {
  opacity: 0;
  transition: all 150ms ease-out;
  z-index: 10;
}
.fade.page-leave-active {
  z-index: 5;
  transition: all 150ms ease-out;
}
.fade.page-leave-to {
  opacity: 0;
}
.fade.page-enter-to {
  opacity: 1;
}

</style>