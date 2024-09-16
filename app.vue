<template>

    <NuxtPage :class="{'page-in': !isNoClip && isShowPageIn, 'page-out': !isNoClip && !isShowPageIn, 'fade': isNoClip}" />
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

const { error_msg, ok_msg, reset_error } = errorHelper();


const {
  MATCH_DIPLOM,
  MATCH_PROJECTS,
  loading,
  treeMapper,
  treeList,
  filterCount,
  filtersMap,
  filteredTreeList,
  
  updateFilters,
  initTree
} = treeHelper();

const route = useRoute();
const router = useRouter();
const useTree = useState('tree');
const useAppSettings = useState('appSettings')

const showMenu = ref(false)

const {
    locale,
    defaultLocale
} = useI18n()

const initMadek = () => {
  console.log("initMadek")

  const madek_store = useMadekStore()

  madek_store.initPublic().then(() => {
      console.log("initMadek: madek appsettings loaded")
      useAppSettings.value = {
        locale: madek_store.appSettings.default_locale,
        locales: madek_store.appSettings.available_locales
      }
       
      locale.value = madek_store.appSettings.default_locale || 'de'
      //useState('appSettings', () => { return madek_store.appSettings })
      console.log(" detected locale: " + locale.value);
  }).catch(error => {
    console.error("initMadek: Could not get madek appsettings.", error)
  })    
}

if (import.meta.server) { 
  console.log("import meta server")
}

if (process.server) {
  console.log("process server: initTree")
  const treesData = await initTree()
  useTree.value = treesData
  initMadek()
}

if (process.client) {
  console.log(" is client ")
    selectRandomFont()
}


const initApp = async() => {

  //initPageFonts();
  //initMadek();
  //console.log("init server")
};


router.beforeEach((to, from, next) => {
  const ts = to.name?.toString() || ''
  const fs = from.name?.toString() || ''
  console.log("beforeEach: " + fs + " : ->" + ts)
  
  if (ts.indexOf('setview') > -1 || fs.indexOf('setview') > -1) {
    isNoClip.value = true;
  } else {
    isNoClip.value = false;
  }
  next()
})

const isShowPageIn = ref(false)
const isNoClip = ref(false)
watch(() => route.fullPath, () => {

  
  // dont confuse running animation
  setTimeout(() => {
    console.error(" switch anim mode " + isShowPageIn.value)
    isShowPageIn.value = !isShowPageIn.value
  },3000)

  console.log("APP: changed route: " + JSON.stringify(route.fullPath));
  
/*
  if (newVal?.name?.indexOf("diploma") >= 0) {
    showNavDiplom.value = true;
    showFilterView.value = false;
    
  } else {
    showNavDiplom.value = false;
    
  }
  if (newVal?.name?.indexOf("projects") >= 0) {
    showNavProjects.value = true;
    showFilterView.value = false;
  } else {
    showNavProjects.value = false;
  }
  */
  /* setTimeout(() => {
    showHomeHover.value = false;
  }, 1000); */
});


initApp();

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "");
})

</script>
<style>

.page-out.page-enter-active {

  z-index: 5;
}
.page-out.page-leave-active {
  clip-path: circle(100vw at 50vw 50vh) !important;
  /* transition: all 2s; */
  transition: clip-path 800ms;
  
  z-index: 10;
}
.page-out.page-leave-to {
  clip-path: circle(0vw at 50vw 50vh) !important;
  /* filter: blur(1rem); */
}
.page-out.page-enter-to {
/* clip-path: circle(100vw at 50vw 50vh) !important; */
}



.page-in.page-enter-active {
  clip-path: circle(0vw at 50vw 50vh) !important;
  transition: clip-path 800ms ease-out;
  z-index: 10;
}
.page-in.page-leave-active {
  z-index: 5;
  transition: clip-path 800ms ease-out;
  transition: opacity 800ms ease-out;
}
.page-in.page-leave-to {
  filter: blur(1rem);
}
.page-in.page-enter-to {
  clip-path: circle(150vw at 50vw 50vh) !important;
}

.fade.page-enter-active {
  opacity: 0;
  transition: all 400ms ease-out;
  z-index: 10;
}
.fade.page-leave-active {
  z-index: 5;
  transition: all 400ms ease-out;
}
.fade.page-leave-to {
  opacity: 0;
}

.fade.page-enter-to {
  opacity: 1;
  filter: blur(0rem);
}

</style>