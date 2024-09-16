<template>
  <div class="setlist_page">
    <SetListHeader
      :settype="settype"
      :hide-nav-btns="showMenuView"
      :toggle-btn-set-type="toggleBtnSetType"
      :show-filter-view="showFilterView"
      @show-menu="showMenu()"
      @reset-filter="resetFilter()"
      @show-filter="showFilter()"
      @switch2settype="switch2settype"
    />
    
    <Transition :name="settype == MATCH_DIPLOM ? 'clipin' : 'clipout'"
      >
      <SetListView
      class="setlistview"
      v-if="settype == MATCH_PROJECTS"
      :col-count="colCount"
      :settype="settype"
      :slide-list="slideList"
      :use-tree="useTree"
      :filtered-sorted-trees="filteredSortedTrees"
      :show-menu-view="showMenuView"
      :intro-info="intro_info"
      :intro-info2="intro_info2"
      :next-year-list="nextYearList"
      />
    <SetListView
      class="setlistview"
      v-else-if="settype == MATCH_DIPLOM"
      :col-count="colCount"
      :settype="settype"
      :slide-list="slideList"
      :use-tree="useTree"
      :filtered-sorted-trees="filteredSortedTrees"
      :show-menu-view="showMenuView"
      :intro-info="intro_info"
      :intro-info2="intro_info2"
      :next-year-list="nextYearList"
      />
      
    </Transition>
<!--
    <Transition name="clipout">
    <SetListView
      v-if="settype == MATCH_PROJECTS"
      :col-count="colCount"
      :settype="settype"
      :slide-list="slideList"
      :use-tree="useTree"
      :filtered-sorted-trees="filteredSortedTrees"
      :show-menu-view="showMenuView"
      :intro-info="intro_info"
      :next-year-list="nextYearList"
      />
    </Transition>
-->
    
      
      
  <!--

    <swiper
      v-if="slideList && slideList.length"
      :modules="swiper_modules"
      class="swiper_main"
      :class="{filter_blured: showMenuView || showFilterView || showFontsView,
        button_pad_left: settype == MATCH_DIPLOM}"
      @scroll="setSwiperMoving()"
      @swiper="setMainSwiper"
      @onAny="onSwiperEvent"
      :keyboard="true"      
      :slidesPerView="'auto'"
      :spaceBetween="20"
      
      :direction="'vertical'"
      
      :freeMode="{
        momentum:true,
        momentumBounce: true,
        sticky: false
      }"
      :scrollbar="false"
      :mousewheel="{forceToAxis:false}"
      >

      
    <swiper-slide
        class="main_slide"
        v-for="slide in slideList"
        >
        
        <div class="sub_slide"
          v-for="el in slide.trees"
          :onMouseover="() => setTreeInfo(el)"
          :style="{'width': 'calc(' + ((100 / colCount)) + 'vw - ' + (colCount * 20) + 'px)'}">
          <div class="set_preview"
            :class="[el.previewDirection, el.previewPlacement]"
            :style="el.previewstyle"
            @click="switch2set(el.col_id)">
            <div class="img"
              :class="{swiper_moving: swiperMoving}"
              :style="{ 'background-image': 'url(\'' + previewLargeUrl(el.col_id) + '\')' }">
            </div>
          </div>
          
        </div>
        
      </swiper-slide>

    </swiper>
  -->
   <!-- 
  <Transition name="fade">
    <SetListTreeInfo
      @scroll.prevent="scrollEvent"
      @wheel.prevent="wheelEvent"
      v-if="filteredSortedTrees && (!showMenuView && !showAboutView)"
      :sorted-trees="filteredSortedTrees"
      :settype="settype"
      :tree-info-idx="treeInfoIdx"
      />
    </Transition>
-->
<!--
    <Transition name="fade">
      <div class="intro_info"
        :style="intro_info_style"
        v-if="intro_info">
        {{ intro_info }}
        <br/>
        {{ intro_info2 }}
      </div>
    </Transition>
    -->
<!--
    <Transition name="fade">
      <div class="year_info"
        @scroll="scrollEvent"
        @wheel="wheelEvent"
        :style="year_info_style"
        v-show="currentYear && !intro_info">
        {{ currentYear }}
      </div>
    </Transition>
-->
    <Transition name="fade">
      <MenuView v-if="showMenuView"
                  :settype="settype"
        @onShowFonts="showFontsView = true"
        @onShowAbout="showAboutView = true"
        @onShowImpressum="showImpressumView = true"
        @onShowDSA="showDSAView = true"
        @on-close-menu="showMenuView = false"/>
    </Transition>
    <Transition name="fade">
      <FontsView v-if="showFontsView"
        @on-close="showFontsView = false"/>
    </Transition>
    <Transition name="fade">
      <AboutView v-if="showAboutView"
        @on-close="showAboutView = false"/>
    </Transition>
    <Transition name="fade">
      <ImpressumView v-if="showImpressumView"
        @on-close="showImpressumView = false"/>
    </Transition>
    <Transition name="fade">
      <ImpressumView v-if="showDSAView"
        @on-close="showDSAView = false"/>
    </Transition>

    <Transition name="fade">
      <div v-if="showFilterView" class="dialog_filter">
        <FilterView
          :trees_map="useTree[settype]"
          :tree_type="settype"
          @closed="onFilterViewClosed"
          />
      </div>

    </Transition>

  </div>
</template>
<script setup lang="ts">

const {
  font_list, font_selected,
  getPixelSizedStyle,
  getViewSizedStyle,
  mergeSetTypeColor
} = DynFonts()
const intro_info_style = ref(getPixelSizedStyle(240,210))
//const year_info_style = ref(getPixelSizedStyle(240,210))
const showFontsView = ref(false)
const showAboutView = ref(false)
const showDSAView = ref(false)
const showImpressumView = ref(false)


const {
  loading,
  RID,
  MATCH_DIPLOM,
  MATCH_PROJECTS,

  treeList,
  filterCount,
  filtersMap,
  filteredTreeList,

  updateFilters,
} = treeHelper();

// TODO move to env / config
//const { apiConfig } = apiHelper();
//const apiBaseUrl = apiConfig.baseUrl + "/api-v2/";

const route = useRoute();
//const router = useRouter();
const settype = ref();
const useTree = useState("tree");
const COL_COUNT_INDEX = 3
const COL_COUNT_DIPLOM = 2
const colCount = ref(COL_COUNT_INDEX)

const intro_info = ref('')
const intro_info2 = ref('')
const HIDE_INTRO_INFO_DELAY = 2000


export interface iTreeSlide {
  year:string,
  trees: iTree[]
}
const slideList = ref([] as iTreeSlide[])

const showFilterView = ref(false);
const showMenuView = ref(false)
/*
const swiperMain = ref({} as typeof Swiper);
const activeSetId = ref('' as string)
const swiper_modules = ref([
  SwiperKeyboard,
  SwiperNavigation,
  SwiperPagination,
  SwiperEffectCreative,
  SwiperFreeMode,
  SwiperGrid,
  SwiperScrollbar,
  SwiperEffectCreative,
  SwiperMousewheel,
  
  SwiperVirtual,
]);
*/
const toggleBtnSetType = ref(route.params.settype)
/*
const swiperMoving = ref(false)

const SWPIPER_MOVING_DELAY = 200;

const setSwiperMoving = () => {
  swiperMoving.value = true;
  setTimeout(() => {
    swiperMoving.value = false;
  },SWPIPER_MOVING_DELAY)
}

const scrollEvent = (ev) => {
  const current = swiperMain.value.getTranslate()
  console.log("got scroll event" + ev.deltaY + ":" + current)
  swiperMain.value.translateTo(current - 20 * ev.deltaY)
}
const wheelEvent = (ev) => {
  const current = swiperMain.value.getTranslate()
  console.log("got wheel event" + ev.deltaY + ":" + current)
  swiperMain.value.translateTo(current - 2 * ev.deltaY)
}
*/
const SWITCH_TYPE_PAGE_DELAY = 50;

const switch2settype = (type:string) => {
  
  
  route.params.settype = type
  settype.value = type;
  updateSetType()
  toggleBtnSetType.value = type
  setTimeout(() => {
    //router.push('/setlist/' + type)
    //route.params.settype = type
    //settype.value = type;
    //updateSetType()
    //router.replace('/setlist/' + type)
  },SWITCH_TYPE_PAGE_DELAY)
}


const applyFilter = () => {
  console.log("applyFilter")
  showFilterView.value = false
  updateFilteredTrees2Slides(filteredTreeList.value)
}
const onFilterViewClosed = () => {
  console.log("onFilterViewClosed" + Object.keys(filteredTreeList.value).length)
  showFilterView.value = false
  updateFilteredTrees2Slides(filteredTreeList.value)
}
/*
const isEnabledYearBack = () => {
  const activeSlide = swiperMain.value?.activeIndex
  return activeSlide > 0
}
const clickedYearBack = () => {
  const activeSlide = swiperMain.value?.activeIndex
  let last = 0
  last = nextYearList.value.findLastIndex((el) => { 
    return el < activeSlide})
  console.log("clickedYearBack1: " + activeSlide + ":" + last)

  for(let i = 0; i < nextYearList.value.length; i++) {
    if (nextYearList.value[i] < activeSlide) {
      last = nextYearList.value[i]
    }
  }
  
  console.log("clickedYearBack2: " + activeSlide + ":" + last)
  swiperMain.value.slideTo(last)
}
const isEnabledYearForward = () => {
  const activeSlide = swiperMain.value?.activeIndex
  const maxSlides = slideList.value.length
  return activeSlide < maxSlides
}
const clickedYearForward = () => {
  const activeSlide = swiperMain.value?.activeIndex
  const maxSlides = slideList.value.length
  let next = 0
  next = nextYearList.value.findIndex(el => {
    return el > activeSlide
  })
  console.log("clickedYearForward1: " + activeSlide + ":" + next)
  
  for(let i = 0; i < nextYearList.value.length; i++) {
    next = nextYearList.value[i]
    if (next > activeSlide) {
      
      break;
    }
  }
  
  console.log("clickedYearForward2: " + activeSlide + ":" + next)
  swiperMain.value.slideTo(next)
}
const currentYear = ref('')
let currentTimeout = undefined

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex
    let yearVal = slideList.value[activeSlide].year
    if (yearVal && (typeof yearVal == 'string' || yearVal.split)) {
      const sl = yearVal.split(' ')
      yearVal = sl[0] + ' ' + sl[1].slice(0,1) + 'S'
      
    }
    currentYear.value = yearVal
    console.log("swiperMain changed slide: " + activeSlide 
      + ":" + slideList.value[activeSlide].year
      + ":" + currentYear.value)
    
    if (currentTimeout) {
      clearTimeout(currentTimeout)
    }


    currentTimeout = setTimeout(() => {
      currentYear.value = ''
    }, 2000)
    //const set = treeMap.value[activeSlide]
}
const onSwiperEvent = (eventName, ...args) => {
     console.log('Event: ', eventName);
     console.log('Event data: ', args);
}
const onBeforeSlideChange = () => {
  console.log("onBeforeSlideChange")
  swiperMoving.value = true
}
const onAfterSlideChange = () => {
  console.log("onAfterSlideChange")
  swiperMoving.value = false
}

const setMainSwiper = (swiper: Swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
  swiperMain.value.on('transitionStart', onBeforeSlideChange)
  swiperMain.value.on('transitionEnd', onAfterSlideChange)
};
const treeInfoIdx = ref(0)
const setTreeInfo = (el: iTree) => {
  treeInfoIdx.value = filteredSortedTrees.value.findIndex((val) => { return val.col_id == el.col_id})
  const ntop = 8 + treeInfoIdx.value * 48
  console.log("stroll to " + treeInfoIdx.value + ": " + ntop)
  document.getElementsByClassName('project_counter')[0].scrollTo({top: ntop, behavior: "smooth"})
  
}
const previewUrl = (treeId: string): string => {
  const eId = useTree.value[settype.value][treeId]?.edges[RID][treeId].coverId
  const pid = useTree.value[settype.value][treeId]?.previews[eId]?.id;
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const previewLargeUrl = (treeId: string): string => {
  const eId = useTree.value[settype.value][treeId]?.edges[RID][treeId].coverId
  const pid = useTree.value[settype.value][treeId]?.previewsLarge[eId]?.id;
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const switch2set = (setid) => {
  const url = "/setview/" + settype.value + "/" + setid + '/' + setid;
  router.push(url);
};
*/
const nextYearList = ref([])
const filteredSortedTrees = ref([] as iTree[])
const TREE_PLACEMENT_CLASSES = [
  'left_top',
  'left_btm',
  'right_top',
  'right_btm'
]

const getRandom = (min:number, variance:number):number => {
  return min + Math.floor(variance * Math.random())
}
const updateFilteredTrees2Slides = (trees_map: {[key:string]:iTree}) => {
  const sortedTrees = [] as iTree[]
  for (const treeId in trees_map) {
    const tree = trees_map[treeId]
    sortedTrees.push(tree)
  }
  sortedTrees.sort((a,b) => { 
    const kwa = (a.cols_semesters[a.col_id] || '') as string
    const kwb = new String(b.cols_semesters[b.col_id] || '')

    const result = kwb.localeCompare(kwa)
    /* console.log("sort: " 
      + kwa
      + ':'
      + kwb
      + ':'
      + result) */
    return result
    /*
    const adate = a.cols_meta_data[a.col_id]['madek_core:title'].meta_data_updated_at
    const bdate = b.cols_meta_data[b.col_id]['madek_core:title'].meta_data_updated_at

    const ayear = new Date(Date.parse(adate)).getFullYear()
    const byear = new Date(Date.parse(bdate)).getFullYear()
    return byear - ayear
    */
  })
  filteredSortedTrees.value = sortedTrees
  slideList.value = []
  let ti = 0;
  let tl:iTree[] = []
  let pdate: string = ''
  let yearlast: string = ''
  nextYearList.value = []
  sortedTrees.forEach((tree) => {
    
    tree.year = tree.cols_semesters[tree.col_id] as string
    pdate = tree.year
    if (tree.year !== yearlast) {
      yearlast = tree.year
      nextYearList.value.push(slideList.value.length)
    }
    
    const eId = tree.edges[RID][tree.col_id].coverId
    const w = (tree.previews[eId] ? tree.previews[eId].width : 1)
    const h = (tree.previews[eId] ? tree.previews[eId].height : 1)
    const wh = w / h;
    const tpi = Math.floor(Math.random() * TREE_PLACEMENT_CLASSES.length)
    tree.previewPlacement = TREE_PLACEMENT_CLASSES[tpi]
    
    tree.previewstyle = {}

    if (wh > 1) {
      //querformat
      tree.previewDirection = 'hor'
      
      
      tree.previewstyle['width'] = getRandom(80,20) + '%'
        
      if (tree.previewPlacement == 'right_top'
        || tree.previewPlacement == 'right_btm'
      ) {
        const val = getRandom(-20,20)
        tree.previewstyle['width'] = 100 + val + '%'
        tree.previewstyle['right'] = val + '%'
        
      }
      else {

      }
    } else {
      tree.previewDirection = 'ver'

      tree.previewstyle['height'] = getRandom(80,20) + '%'
    }
    
    console.log("preview wh: " + wh 
    + " placement: " + tree.previewPlacement
    + " style " + JSON.stringify(tree.previewstyle))
    
    
    tl.push(tree)
    ti++
    if (ti >= colCount.value) {
      slideList.value.push({
        year: tree.year,
        trees: tl
      } as iTreeSlide)
      
      tl = []
      ti = 0
    }
  
  })
  slideList.value.push({
    year: pdate,
    trees: tl
  } as iTreeSlide)
    
  
  console.log(" trees map: " + Object.keys(trees_map).length)

  console.log(" slide list: " + slideList.value.length)
  console.dir(nextYearList.value)
  //console.dir(slideList.value);

}

//const info_tree_style = ref({})

const updateSetType = () => {
  settype.value = route.params.settype || MATCH_PROJECTS;
  console.log("updateSetType: " + route.params.settype + " : " + settype.value);

  colCount.value = settype.value == MATCH_DIPLOM ? COL_COUNT_DIPLOM : COL_COUNT_INDEX;
  toggleBtnSetType.value = settype.value

  //intro_info_style.value = mergeSetTypeColor(settype.value, intro_info_style.value)
  //year_info_style.value = mergeSetTypeColor(settype.value, year_info_style.value)
  
  if (!useTree || !useTree.value || !useTree.value[settype.value]) {
    setTimeout(() => {
      console.error("no useTree yet, retry later");
      updateSetType();
      //window && window.Location && window.location.reload()
    }, 10000);
    return;
  }

  console.error("use Tree state value: " + useTree.value[settype.value]);

  treeList.value = useTree.value[settype.value];
  

  filteredTreeList.value = treeList.value;

  console.log(" filtered list")
  //console.dir(filteredTreeList.value);

  updateFilteredTrees2Slides(filteredTreeList.value)
  
  filterCount.value = 0;
  filtersMap.value = {};

  //setTimeout(() => {
    if (settype.value == MATCH_DIPLOM) {
      intro_info.value = 'Abschluss-'
      intro_info2.value = ' arbeiten '
    } else {
      intro_info.value = 'Alle'
      intro_info2.value = 'Projekte'
    }
    setTimeout(() => {
      intro_info.value = ''
      intro_info2.value = ''
    }, HIDE_INTRO_INFO_DELAY)
  //}, 200)
};


const showFilter = () => {
  if (showFilterView.value) {
    showFilterView.value = false;
  } else {
    showFilterView.value = true;
  }
};

const showMenu = () => {
  if (showMenuView.value == true
    || showFilterView.value == true
    || showFontsView.value == true
  ) {
    console.log("hide menu")
    showMenuView.value = false;
    showFilterView.value = false;
    showFontsView.value = false
  } else {
    console.log("show menu")
    setTimeout(() => {
      showMenuView.value = true;
    }, 1000)
    
  }
};
/*
const closedFilterView = () => {
  console.log("closedFilterView");
  showFilterView.value = false;
  updateFilters(settype.value);
};
*/
const resetFilter = () => {
  //filtersTitle.value = ''
  //filtersText.value = ''
  filtersMap.value = {};

  
  filteredTreeList.value = updateFilters(treeList.value);
  console.log(" after reset ")
  console.dir(filteredTreeList.value)
  updateFilteredTrees2Slides(filteredTreeList.value)
};

updateSetType();

onMounted(() => {
  updateSetType();
  document.documentElement.setAttribute("data-theme", "");
  /* if (import.meta.client) {
    setTimeout(() => {

      if (settype.value == MATCH_DIPLOM) {
           document.documentElement.setAttribute("data-theme", "diplom");    
        } else {
            document.documentElement.setAttribute("data-theme", "");
        }
      },100)
    } */

  /*watch(() => useTree.value, () => {
        console.error("SetList: watch changed use tree state: " + useTree.value)
        //updateSetType()
    })*/
  /*watch(() => treeMapper.value, () => {
        console.log("watch changed treeMapper: " + treeMapper.value)
        updateSetType()
    })*/

  watch(
    () => route.path,
    (nv, ov) => {
      console.log("watch changed route: " + route.params.settype);
      updateSetType();
    }
  );

  watch(
    () => loading.value,
    () => {
      console.log("SetList: watch changed loading: " + loading.value);
      updateSetType();
    }
  );
});
</script>
<style scoped>
.setlist_page {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  padding: 8rem 12px;
  color: var(--Colors-text-primary);
  /* background: var(--Colors-text-primary-inverted); */
  background-color: var(--Colors-background-default);
  overflow-y: auto;
  /* clip-path: circle(99vw at 50vw 50vh); */
}

.nav-logo-orc path {
  stroke: var(--Colors-nav-bar-button-outline);
  fill: var(--Colors-nav-bar-platform-logo);
}



.navbar_link {
  font-family: Instrument Sans, sans-serif;
  font-size: 20px;
  padding: 12px;
  border: 1px solid black;
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: 0px 4px;
}

.navbar_set_link.active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
}
.dialog_filter {
  
}




.filter_blured {
  filter: blur(25px);
}

.setlistview {
  position: fixed;
  top: 0px; left: 0px; width: 100vw; height: 100vh;
  clip-path: circle(calc(max(100vw, 100vh)) at 50vw 50vh) !important;
}

.clipout-enter-active {
  z-index: 5;
  transition: all 0ms;
}
.clipout-leave-active {
  z-index: 10;
  clip-path: circle(calc(max(100vw, 100vh)) at 50vw 50vh) !important;
  transition: clip-path 800ms ease-out;
  /* overflow: hidden; */
}
.clipout-leave-to {
  clip-path: circle(0vw at 50vw 50vh) !important;
}

.clipin-enter-active {
  z-index: 10;
  clip-path: circle(0vw at 50vw 50vh) !important;
  transition: clip-path 800ms ease-out;
  /* overflow: hidden; */
}
.clipin-leave-active {
  z-index: 5;
  transition: all 0ms;
}
.clipin-leave-to {
}
.clipin-enter-to {
  clip-path: circle(150vw at 50vw 50vh) !important;
}


</style>
