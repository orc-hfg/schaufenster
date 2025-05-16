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
import '~/assets/base.css'

const {
    font_list,
    font_selected,
    selectRandomFont,
    //initPageFonts,
} = DynFonts()

import '~/assets/dynfonts.css'
//import type { AppSettingsListData } from './generated/data-contracts';

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

const isMobile = ref(true);


const {
    locale,
    defaultLocale
} = useI18n()

const APP_DEFAULT_LOCAL = 'de'



const initMadek = async () => {
  console.log("initMadek")
  const config = useRuntimeConfig()
  /*const url = config.public.apiBaseUrl + config.public.apiPath + 'app-settings'
  const onOk = (appSettings: Ref<AppSettingsListData>) => {
    console.log("initMadek: fetch: onOk: madek appsettings loaded: ")
    useAppSettings.value = {
      locale: appSettings.value.default_locale,
      locales: appSettings.value.available_locales
    }
       
    locale.value = appSettings.value.default_locale || APP_DEFAULT_LOCAL
    console.error(" detected locale: " + locale.value);
  }

  useFetch(url).then(resp => onOk(resp.data))
  */

  /*
  const madek_store = useMadekStore()  
  madek_store.initApi(config.public.apiBaseUrl)
  madek_store.initPublic().then(() => {
      console.log("initMadek: madek appsettings loaded")
      
      useAppSettings.value = {
        locale: madek_store.appSettings.default_locale,
        locales: madek_store.appSettings.available_locales
      }
       
      locale.value = madek_store.appSettings.default_locale || APP_DEFAULT_LOCAL
      console.log("initMadek: detected locale: " + locale.value);
  })
  .catch(error => {
    console.error("initMadek: Could not get madek appsettings.", error)
  })*/

  
  
}

if (import.meta.server) { 
  console.log("import meta server")
  initMadek() 
  const config = useRuntimeConfig()
  initApi(config.public.apiBaseUrl)
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
  
}

if (import.meta.client) {
  console.log(" is client ")
  selectRandomFont()
}


router.beforeEach((to, from, next) => {
  const ts = to.name?.toString() || ''
  const fs = from.name?.toString() || ''
  console.log("router beforeEach: from " + fs + " -> to:" + ts)
  const config = useRuntimeConfig()
  if (!config.public.kioskSetId) {
    if (ts.indexOf('setview') > -1 || fs.indexOf('setview') > -1) {
      isNoClip.value = true;
    } else {
      isNoClip.value = false;
    }
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
  // dont confuse running animation
  setTimeout(() => {
    console.error(" switch anim mode " + isShowPageIn.value)
    isShowPageIn.value = !isShowPageIn.value
  },3000)

  //console.log("APP: changed route: " + JSON.stringify(route.fullPath));

});


const onkeyupEv = (ev:KeyboardEvent) => {
  console.log(" onkeyup " + ev.code)
  if ((ev.altKey || ev.ctrlKey) && ev.code == 'KeyL') {
    
    isMobile.value = !isMobile.value
    document.documentElement.setAttribute('data-layout', (isMobile.value ? 'mobile' : ''))
    //console.log('switched to mobile: ' + isMobile.value)
  }
}

const updateMobileStateByWinWidth = () => {
  if (window.innerWidth < 1024) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
  console.log("updateMobileStateByWinWidth: " + window.innerWidth + ":" + isMobile.value)
}

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "light");
  updateMobileStateByWinWidth()
  window.addEventListener("resize", (ev) => {
    updateMobileStateByWinWidth()
    document.documentElement.setAttribute('data-layout', (isMobile.value ? 'mobile' : ''))
  })
  document.documentElement.setAttribute('data-layout', (isMobile.value ? 'mobile' : ''))
  document.addEventListener('keyup', onkeyupEv, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onkeyupEv,true)
})

</script>
<style>

.page {
  opacity: 1;
}

/* clip circle page out ani */
.page-out.page-enter-active {
  z-index: 5;
  transition: all 0ms;
}
.page-out.page-leave-active {
  /*max(100vw, 100vh) */
  clip-path: circle(calc(sqrt( pow(100vw) + pow(100vh))) at 50vw 50vh) !important;
  transition: clip-path 800ms ease-out;
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
  transition: clip-path 800ms ease-out;
  z-index: 10;
}
.page-in.page-leave-active {
  z-index: 5;
  transition: all 0ms;
}
.page-in.page-leave-to {
}
.page-in.page-enter-to {
  clip-path: circle(150vw at 50vw 50vh) !important;
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