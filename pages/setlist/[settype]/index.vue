<template>
  <div class="setlist_page">
    <header >
      <nav class="nav">
        <NuxtLink @click="showMenu()" class="header_nav_logo">
          <IconsNavIconORC />
        </NuxtLink>

        <Transition name="move-ur30">
          <div class="settype_toggle"
            v-if="!showMenuView"
            :class="{diplom: settype == MATCH_DIPLOM,
              projects: settype == MATCH_PROJECTS}">
            <NuxtLink class="navbar_link navbar_link_projects"
              :class="{active: settype == MATCH_PROJECTS}"
              @click="switch2settype(MATCH_PROJECTS)"
              >
              Projekte
            </NuxtLink>
            <NuxtLink class="navbar_link navbar_link_diplom"
              :class="{active: settype == MATCH_DIPLOM}"
              @click="switch2settype(MATCH_DIPLOM)"
              >
              Abschluss
              <!-- Abschlussarbeiten -->
            </NuxtLink>
          </div>
        </Transition>

        <Transition name="move-ur45">
         <NuxtLink class="navbar_link"
          v-if="!showMenuView"
          :class="{active:showFilterView}"
          @click="showFilter()">
          Filter
        </NuxtLink>
      </Transition>

        <NuxtLink class="navbar_link"
          v-if="!showMenuView">
          FC {{ filterCount }}
        </NuxtLink>

        <NuxtLink class="navbar_link"
          v-if="!showMenuView"
          @click="resetFilter()"
          >
          Reset
        </NuxtLink>

        <NuxtLink class="navbar_link"
          :class="{disabled: isEnabledYearBack()}"
          v-if="!showMenuView && settype == MATCH_DIPLOM"
          @click="clickedYearBack()">
          Up
        </NuxtLink>
        <NuxtLink class="navbar_link"
          :class="{disabled: isEnabledYearForward()}"
          v-if="!showMenuView && settype == MATCH_DIPLOM"
          @click="clickedYearForward()"
          >
          Down
        </NuxtLink>
        
        
        <!-- <h1>Set List</h1> -->
        <!-- <p>
          RP: {{ route.params }}
          ST/MT: {{ settype }}
          <br/>
          
        </p> -->
        

      </nav>
    </header>
    
    <!--
     :slidesPerView="2"
    :slidesPerGroup="2"
    :breakpoints="{
        '769': {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }"
      :grid="{ fill: 'column', rows: 1 }"  
      :pagination="{clickable: true}"
      :navigation="false"
       -->
      <div v-if="!slideList || !slideList.length">
        No data yet!
      </div>
    <swiper
      v-else
      :modules="swiper_modules"
      class="swiper_main"
      :class="{filter_blured: showMenuView || showFilterView || showFontsView}"
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
      :scrollbar="true"
      :mousewheel="{forceToAxis:false}"
      >

      
    <swiper-slide
        class="main_slide"
        v-for="slide in slideList"
        >
        
        <div class="sub_slide"
          v-for="el in slide.trees"
          :onMouseover="() => setTreeInfo(el)"
          :style="{'width': 'calc(' + ((100 / colCount)-1) + '% - ' + (colCount * 20) + 'px)'}">

          <div class="set_preview"
            :class="[el.previewDirection, el.previewPlacement]"
            
            :title="'Title: ' + el.colTitlesMap[el.col_id] + 
            ' | Authors: ' + el.cols_authors[el.col_id]"
            @click="switch2set(el.col_id)">
            <div class="img"
              :style="{ 'background-image': 'url(\'' + previewUrl(el.col_id) + '\')' }">
            </div>
          </div>
          
        </div>
        
      </swiper-slide>

    </swiper>

    <div class="tree_info" v-if="filteredSortedTrees && (!showMenuView || !showAboutView)">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div v-for="treeInfo in filteredSortedTrees" :id="'treeInfo_' + treeInfo.col_id">
        <span>
          {{ treeInfo.colTitlesMap[treeInfo.col_id] }}
          &nbsp;
        </span>
        <span v-for="author in treeInfo.cols_authors[treeInfo.col_id]">
          {{ author }}
          &nbsp;
        </span>
        
        <!-- | Year {{ treeInfo.year }} -->
      </div>
      <div class="tree_info_blur"></div>
    </div>

    <div class="intro_info"
      :style="intro_info_style"
      v-if="intro_info">
      {{ intro_info }}
    </div>
    <div class="year_info"
      :style="year_info_style"
      v-if="currentYear">
      {{ currentYear }}
    </div>

    
    <br />
    <Transition name="fade">
      <MenuView v-if="showMenuView"
                  :settype="settype"
        @onShowFonts="showFontsView = true"
        @onShowAbout="showAboutView = true"
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
      <div v-if="showFilterView" class="dialog_filter">
        <FilterView
          :trees_map="useTree[settype]"
          :tree_type="settype"
          @closed="onFilterViewClosed"
          />
      </div>

    </Transition>

    
    <!--
    <div v-if="showFilterView" class="dialog_filter">
      <NuxtLink @click="onFilterViewClosed()">
        <IconWrap>
          <IconsMinusSquare/>
        </IconWrap>
        Close
      </NuxtLink>
      <button @click="onFilterViewClosed()">Close</button>
      <NuxtLink @click="applyFilter()">
        <IconWrap>
          <IconsMinusSquare/>
        </IconWrap>
        Apply
      </NuxtLink>
      <button @click="applyFilter">Close</button>

      <FilterView
        :trees_map="useTree[settype]"
        :tree_type="settype"
        @closed="onFilterViewClosed"
         />
      <h3>Filter</h3>      
      
    </div>
    -->
  </div>
</template>
<script setup lang="ts">
//import type { Swiper } from '#build/components';

const {
  font_list, font_selected,
  getPixelSizedStyle,
  getViewSizedStyle
} = DynFonts()
const intro_info_style = ref(getViewSizedStyle(16,16))
const year_info_style = ref(getPixelSizedStyle(240,240))
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
const { apiConfig } = apiHelper();
const apiBaseUrl = apiConfig.baseUrl + "/api-v2/";

const route = useRoute();
const router = useRouter();
const settype = ref();
const useTree = useState("tree");
const COL_COUNT_INDEX = 3
const COL_COUNT_DIPLOM = 2
const colCount = ref(COL_COUNT_INDEX)

const intro_info = ref('')

export interface iTreeSlide {
  year:string,
  trees: iTree[]
}
const slideList = ref([] as iTreeSlide[])

const showFilterView = ref(false);
const showMenuView = ref(false)
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


const switch2settype = (type:string) => {
  router.replace('/setlist/' + type)
  route.params.settype = type
  settype.value = type;
  updateSetType()
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

const isEnabledYearBack = () => {
  const activeSlide = swiperMain.value?.activeIndex
  return activeSlide > 0
}
const clickedYearBack = () => {
  const activeSlide = swiperMain.value?.activeIndex
  let last = 0
  for(let i = 0; i < nextYearList.value.length; i++) {
    
    if (nextYearList.value[i] < activeSlide) {
      last = nextYearList.value[i]  
      
    }
    
  }
  
  console.log("clickedYearBack: " + activeSlide + ":" + last)
  swiperMain.value.slideTo(last)
  /*if (activeSlide > 0) {
    swiperMain.value.slideTo(activeSlide-1)
  }*/
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
  for(let i = 0; i < nextYearList.value.length; i++) {
    next = nextYearList.value[i]
    if (next > activeSlide) {
      
      break;
    }
  }
  
  console.log("clickedYearForward: " + activeSlide + ":" + next)
  swiperMain.value.slideTo(next)
  /*if (activeSlide < maxSlides) {
    swiperMain.value.slideTo(activeSlide+1)
  }*/
}
const currentYear = ref('')
let currentTimeout = undefined

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex
    currentYear.value = slideList.value[activeSlide].year
    console.log("swiperMain changed slide: " + activeSlide + ":" + currentYear.value)
    
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
const setMainSwiper = (swiper: Swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
  
};
const setTreeInfo = (el: iTree) => {
  const elem = document.getElementById('treeInfo_' + el.col_id)
  elem?.scrollIntoView({block: "end", behavior: "smooth"})
  
}
const previewUrl = (treeId: string): string => {
  const eId = useTree.value[settype.value][treeId]?.edges[RID][treeId].coverId
  const pid = useTree.value[settype.value][treeId]?.previews[eId]?.id;
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const previewLargeUrl = (treeId: string, eId: string): string => {
  const pid = useTree.value[settype.value][treeId].previewsLarge[eId]?.id;
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const switch2set = (setid) => {
  const url = "/setview/" + settype.value + "/" + setid + '/' + setid;
  router.push(url);
};

const nextYearList = ref([])
const filteredSortedTrees = ref([] as iTree[])
const TREE_PLACEMENT_CLASSES = [
  'left_top',
  'left_btm',
  'right_top',
  'right_btm'
]
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
    const wh = tree.previews[eId].width / tree.previews[eId].height;
    console.log("preview wh: " + wh)

    if (wh > 1) {
      //querformat
      tree.previewDirection = 'hor'
      
    } else {
      tree.previewDirection = 'ver'
    }
    const tpi = Math.floor(Math.random() * TREE_PLACEMENT_CLASSES.length)
    tree.previewPlacement = TREE_PLACEMENT_CLASSES[tpi]

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


const updateSetType = () => {
  settype.value = route.params.settype || MATCH_PROJECTS;
  console.log("updateSetType: " + route.params.settype + " : " + settype.value);

  colCount.value = settype.value == MATCH_DIPLOM ? 2 : 3;

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

  if (settype.value == MATCH_DIPLOM) {
    intro_info.value = 'Abschlussarbeiten'
  } else {
    intro_info.value = 'Projekte'
  }
  setTimeout(() => {
    intro_info.value = ''
  }, 3000)
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
  height: 80vh;
  padding: 8rem 2rem;
  color: var(--Colors-text-primary);
  /* background: var(--Colors-text-primary-inverted); */
  background-color: var(--Colors-background-default);
  overflow-y: auto;
  clip-path: circle(99vw at 50vw 50vh);
}
.swiper_main {
  /* border: 1px solid red; */
  position: absolute;
  top: 8rem;
  left: 2rem;
  width: calc(100vw - 4rem);
  height: 80vh;

}
.main_slide {
  /* border: 1px solid blue; */
  height: 600px;
  width: calc(100vw - 4rem);
  cursor: pointer;
}
.sub_slide {
  /* border: 3px solid green; */
  width: 30vw;
  height: 100%;
  float: left;
  padding: 20px;
  
}
.set_preview {
  position: relative;
  /* border: 1px solid red; */
  transition:all 0.25s linear;
}
.set_preview:hover {
  transform: scale(0.95);
}
.set_preview.hor {
  width: 80%; height: 100%;
}
.set_preview.ver {
  width: auto; height: 80%;
}
.set_preview.hor.right_top {
  right:-20%;
}
.set_preview.hor.right_btm {
  right: -20%;
}
.set_preview .img {
  width: 100%; height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.set_preview.left_top .img {
  background-position: left top;
}
.set_preview.left_btm .img {
  background-position: left bottom;
}
.set_preview.right_top .img {
  background-position: right top;
}
.set_preview.right_btm .img {
  background-position: right bottom;
}

.nav-logo-orc path {
  stroke: var(--Colors-nav-bar-button-outline);
  fill: var(--Colors-nav-bar-platform-logo);
}
.tree_info {
  position: fixed;
  bottom: 2vh;
  margin: 2rem;
  height: 6rem;
  width: calc(100vw - 4rem);
  overflow-y: auto;

  font-size: 20px;
  z-index: 980;
  transition: all 1s linear;
}
.tree_info * {
  font-size: 32px;
  line-height: 45px;
  
}
.tree_info_blur {
  position: fixed;
  bottom: 2vh;
  padding: 2rem;
  height: 6rem;
  
  width: calc(100vw - 4rem);

  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%) ;
}

.year_info {
  position: fixed;
  top: 40vh;
  font-size: 10vh;
  left: 0vw;
  width: 100vw;
  text-align: center;
  z-index: 1010;
  user-select: none;
  
}
.intro_info {
  position: fixed;
  top: 40vh;
  font-size: 10vh;
  left: 0vw;
  width: 100vw;
  text-align: center;
  z-index: 1010;
  user-select: none;
}

.header_nav_logo {
  padding: 0px;
  border: 1px solid transparent
}
.navbar_link {
  font-family: Instrument Sans, sans-serif;
  font-size: 20px;
  padding: 12px;
  border: 1px solid black;
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: 0px 4px;
}
.settype_toggle {
  /* background: rgb(20,20,20); */
  /* background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 74px, rgba(255,255,255,1) 75px); */
  float:left;
  background-repeat: no-repeat;
  background-position: 0 0;
  transition: all 0.25s linear;
}
.settype_toggle.projects {
  /* background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 74px, rgba(255,255,255,1) 75px); */
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 6.5rem, rgba(255,255,255,1) 6.5rem);

}
.settype_toggle.diplom {
  /* background: rgb(242,137,6); */
  
  /* background: linear-gradient(90deg, rgba(255,255,255,1) 0,
   rgba(255,255,255,1) 0,
    var(--Colors-nav-bar-info-button-fill) 1px,
    var(--Colors-nav-bar-info-button-fill) 190px,
    rgba(255,255,255,1) 190px  
    ); */

  background: linear-gradient(90deg, rgba(255,255,255,1) 0,
   rgba(255,255,255,1) 0,
    var(--Colors-nav-bar-info-button-fill) 0px,
    var(--Colors-nav-bar-info-button-fill) 7.25rem,
    rgba(255,255,255,1) 7.25rem
    );
  /* background-position: 75px 0; */
  background-position: 7.0rem 0;
  
}
.settype_toggle.diplom .navbar_link_diplom {

}
.navbar_link.navbar_link_projects,
.navbar_link.navbar_link_diplom {
  float: left;
  text-decoration: none;
  color: #222;
}
.navbar_link.navbar_link_projects.active {

  /* background-color: var(--Colors-nav-bar-toggle-on, #222); */
   
  color: #fff;
}
.navbar_link.navbar_link_diplom.active {
  /* background-color: var(--Colors-nav-bar-toggle-on, #f00); */
  color: #fff;
}
.navbar_set_link.active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
}
.dialog_filter {
  
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.move-ur30-enter-active,
.move-ur30-leave-active {
  transition: all 0.5s ease-in;
  /* position: relative; top:0px; left: 0px; */
}

.move-ur30-enter-from,
.move-ur30-leave-to {
  transform: translate(50px, -100px);
  
}

.move-ur45-enter-active,
.move-ur45-leave-active {
  transition: all 0.5s ease-in;
  /* position: relative; top:0px; left: 0px; */
}

.move-ur45-enter-from,
.move-ur45-leave-to {
  transform: translate(100px, -100px);
  
}


.filter_blured {
  filter: blur(25px);
}


</style>
