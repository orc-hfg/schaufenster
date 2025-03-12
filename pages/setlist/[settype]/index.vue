<template>
  <div class="setlist_page">
    <SetListHeader
      :settype="settype"
      :hide-nav-btns="showMenuView || animateSwitch2Set || showFilterView"
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
      :class="{hidden: animateSwitch2Set}"
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
      @switch2setview="switch2setview"
      />
    <SetListView
      class="setlistview"
      :class="{hidden: animateSwitch2Set}"
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
      @switch2setview="switch2setview"
      />
      
    </Transition>


    <MenuView v-if="showMenuView"
      :settype="settype"
      @onShowFonts="showFontsView = true"
      @onShowAbout="showAboutView = true"
      @onShowImpressum="showImpressumView = true"
      @onShowDSA="showDSAView = true"
      @on-close-menu="showMenuView = false"
      @on-switch-lang="onSwitchLang"/>
    
    <Transition name="fade">
      <FontsView v-if="showFontsView"
        :set-type="settype"
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
      <DatenschutzView v-if="showDSAView"
        @on-close="showDSAView = false"/>
    </Transition>

    <!-- <Transition name="fade"> -->
      <!-- <div  class="dialog_filter"> -->
        <FilterView
          v-if="showFilterView"
          :use-clean-filters="true"
          :use-current-filters="true"
          :trees_map="useTree[settype]"
          :tree_type="settype"
          @closed="onFilterViewClosed"
          @applied="onFilterViewApplied"
          />
      <!-- </div> -->

    <!-- </Transition> -->

  </div>
</template>
<script setup lang="ts">

const { t, setLocale } = useI18n()

const showFontsView = ref(false)
const showAboutView = ref(false)
const showDSAView = ref(false)
const showImpressumView = ref(false)

const router = useRouter()

const {
  loading,
  RID,
  MATCH_DIPLOM,
  MATCH_PROJECTS,

  treeList,
  filterCount,
  filtersTitle,
  filtersMap,
  filteredTreeList,

  newFiltersMap,
  newFiltersTitle,
  getMapCount,
  getFilterCount,
  updateFilters,
} = treeHelper();

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

const toggleBtnSetType = ref(route.params.settype)

const switch2settype = (type:string) => {
  route.params.settype = type
  settype.value = type;
  updateSetType()
  toggleBtnSetType.value = type
  
  const path = //useRuntimeConfig().app.baseURL + 
  '/setlist/' + type
  router.replace(path)
  history.pushState({}, "", path)
  
}
const animateSwitch2Set = ref(true)
const switch2setview = (setid: string) => {
  animateSwitch2Set.value = true
    const url = "/setview/" + settype.value + "/" + setid + '/' + setid;
    //console.log("switch2set: " + setid + " : " + url)
    router.push(url);
}

const DELAY_SWITCH_LOCALE = 500
const onSwitchLang = (loc) => {
  setTimeout(() => {
    setLocale(loc)
    console.log("onSwitchLang: switch lang " + loc)
  }, DELAY_SWITCH_LOCALE)
  
}
const onFilterViewApplied = () => {
  console.log("onFilterViewApplied")
  showFilterView.value = false

  filtersTitle.value = newFiltersTitle.value
  
  // set new filters
  for (const type in newFiltersMap.value) {
    filtersMap.value[type] = {}
    for (const fid in newFiltersMap.value[type]) {
      filtersMap.value[type][fid] = newFiltersMap.value[type][fid]
    }
  }

  //console.error("cloned back filter map: new: " + JSON.stringify(newFiltersMap.value))
  //console.error("cloned back filter map: old: " + JSON.stringify(filtersMap.value))
  
  

  filteredTreeList.value = updateFilters(treeList.value, filtersTitle.value, filtersMap.value)
  updateFilteredTrees2Slides(filteredTreeList.value)
}
const onFilterViewClosed = () => {
  
  console.log("onFilterViewClosed" + Object.keys(filteredTreeList.value).length)
  showFilterView.value = false
  newFiltersMap.value = {}
  newFiltersTitle.value = ''
  //console.error("ignore new filter map: " + JSON.stringify(newFiltersMap.value))
  //console.error("use old filter map: " + JSON.stringify(filtersMap.value))
  
  filteredTreeList.value = updateFilters(treeList.value, filtersTitle.value, filtersMap.value)
  filterCount.value = getFilterCount(filtersTitle.value, filtersMap.value)
  updateFilteredTrees2Slides(filteredTreeList.value)
}

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
    
    /*
    console.log("preview wh: " + wh 
    + " placement: " + tree.previewPlacement
    + " style " + JSON.stringify(tree.previewstyle))
    */
    
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
  /*
  slideList.value.push({
    year: pdate,
    trees: tl
  } as iTreeSlide)
*/
/*
  slideList.value.push({
    year: pdate,
    trees: []
  } as iTreeSlide)
  */
  console.log(" trees map: " + Object.keys(trees_map).length)

  console.log(" slide list: " + slideList.value.length)
  console.dir(nextYearList.value)
  //console.dir(slideList.value);

}



const updateSetType = () => {
  settype.value = route.params.settype || MATCH_PROJECTS;
  console.log("updateSetType: " + route.params.settype + " : " + settype.value);

  colCount.value = settype.value == MATCH_DIPLOM ? COL_COUNT_DIPLOM : COL_COUNT_INDEX;
  
  if (window && window.innerWidth) {
    if (window.innerWidth < 1024) {
      colCount.value = 1
    }
    else if (window.innerWidth < 1280) {
      colCount.value = 2
    }
  }

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

  //console.error("use Tree state value: " + useTree.value[settype.value]);

  treeList.value = useTree.value[settype.value];
  
/*
  // set new filters, clean old ones
  for (const type in newFiltersMap.value) {
    filtersMap.value[type] = {}
    for (const fid in newFiltersMap.value[type]) {
      filtersMap.value[type][fid] = newFiltersMap.value[type][fid]
    }
  }
*/
  filteredTreeList.value = updateFilters(treeList.value, filtersTitle.value, filtersMap.value)
  filterCount.value = getFilterCount(filtersTitle.value, filtersMap.value)
  console.log("updateSetType: filtered list: " + getMapCount(filteredTreeList.value) )
  

  updateFilteredTrees2Slides(filteredTreeList.value)
  
  //filterCount.value = 0;
  //filtersMap.value = {};

  //setTimeout(() => {
    if (settype.value == MATCH_DIPLOM) {
      intro_info.value = t('setlist.intro_title_diplom')
      intro_info2.value = t('setlist.intro_title_diplom2')
    } else {
      intro_info.value = t('setlist.intro_title_project')
      intro_info2.value = t('setlist.intro_title_project2')
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

const SHOW_MENU_DELAY = 100;

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
    }, SHOW_MENU_DELAY)
    
  }
};

const resetFilter = () => {
  filtersTitle.value = ''
  filtersMap.value = {}
  
  filteredTreeList.value = updateFilters(treeList.value, filtersTitle.value, filtersMap.value)
  filterCount.value = getFilterCount(filtersTitle.value, filtersMap.value)
  console.log(" after reset ")
  console.dir(filteredTreeList.value)
  updateFilteredTrees2Slides(filteredTreeList.value)
};

updateSetType();

onMounted(() => {
  updateSetType();
  document.documentElement.setAttribute("data-theme", "light");

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

  setTimeout(() => {
    animateSwitch2Set.value = false
  },300)
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




.setlistview {
  position: fixed;
  top: 0px; left: 0px; width: 100vw; height: 100vh;
  clip-path: circle(calc(max(100vw, 100vh)) at 50vw 50vh) !important;
  transition: top 500ms ease-out;
}
.setlistview.hidden {
  transition: top 500ms ease-out;
  top: 50vh;
}

.clipout-enter-active {
  z-index: 5;
  transition: all 0ms;
}
.clipout-leave-active {
  z-index: 10;
  clip-path: circle(calc(max(50vw, 50vh)) at 50vw 50vh) !important;
  transition: clip-path 400ms ease-out;
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
  transition: all 800ms;
}
.clipin-leave-to {
}
.clipin-enter-to {
  clip-path: circle(max(50vw, 50vh) at 50vw 50vh) !important;
}


</style>
