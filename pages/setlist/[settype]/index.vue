<template>
  <div class="setlist_page">
    <header>
      <nav class="nav">
        <NuxtLink @click="showMenu()">
          <IconsNavIconORC />
        </NuxtLink>

        <NuxtLink class="navbar_link"
          :to="'/setlist/' + MATCH_PROJECTS">Index</NuxtLink>
        <NuxtLink class="navbar_link"
          :to="'/setlist/' + MATCH_DIPLOM">Diplom</NuxtLink>

        <NuxtLink class="navbar_link"
          :class="{active:showFilterView}"
          @click="showFilter()">
          Filter
        </NuxtLink>

        <NuxtLink class="navbar_link">
          FC {{ filterCount }}
        </NuxtLink>

        <NuxtLink class="navbar_link"
          @click="resetFilter()"
          >
          Reset
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
       -->
      <div v-if="!slideList || !slideList.length">
        No data yet!
      </div>
    <swiper
      v-else
      :modules="swiper_modules"
      class="swiper_main"
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
      :mousewheel="{forceToAxis:false,
        
        }"
      :pagination="{clickable: true}"
      
      
      :style="{
        '--swiper-navigation-color': '#000',
        '--swiper-pagination-color': '#000',
      }"
      
    >

      
    <swiper-slide
        class="main_slide"
        v-for="slide in slideList"
        >
        
        <div class="sub_slide"
          v-for="el in slide.trees"
          :onMouseover="() => setTreeInfo(el)"
          :style="{'width': (100 / colCount)-1 + '%'}">

          <div class="set_preview"
            
            :title="'Title: ' + el.colTitlesMap[el.col_id] + 
            ' | Authors: ' + el.cols_authors[el.col_id]"
            @click="switch2set(el.col_id)"
            :style="{ 'background-image': 'url(\'' + previewUrl(el.col_id) + '\')' }">
          </div>
          
        </div>
        
      </swiper-slide>

    </swiper>

    <div class="tree_info" v-if="treeInfo && treeInfo.col_id">
        | Title: {{ treeInfo.colTitlesMap[treeInfo.col_id] }}
        | Author {{ treeInfo.cols_authors[treeInfo.col_id] }}
        | Year {{ treeInfo.year }}
    </div>
    <div class="year_info" v-if="currentYear">{{ currentYear }}</div>

    <hr />
    
    <br />
    <div v-if="showMenuView" class="dialog_menu">
      <div class="menu_panel">
        <h1>Menu</h1>
        
        <h1>
        DE / EN
        </h1>
        <h1>
          <NuxtLink to="/">About</NuxtLink>
        </h1>
        <h1>
          <NuxtLink to="/">Impressum</NuxtLink>
        </h1>
        <h1>
          <NuxtLink to="/">Fonts</NuxtLink>
        </h1>
        <h1>
        <NuxtLink to="/">Intro</NuxtLink>
        </h1>
        <h1>
          <NuxtLink to="/">Datenschutz</NuxtLink>
        </h1>
      </div>
      
    </div>
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
        :on-closed="onFilterViewClosed"
        @closed="onFilterViewClosed" />
      <h3>Filter</h3>      
      
    </div>
  </div>
</template>
<script setup lang="ts">

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

const { apiConfig } = apiHelper();
const apiBaseUrl = apiConfig.baseUrl + "/api-v2/";
const route = useRoute();
const router = useRouter();
const settype = ref();
const useTree = useState("tree");
const colCount = ref(3)


export interface iTreeSlide {
  year:number,
  trees: iTree[]
}
const slideList = ref([] as iTreeSlide[])
const treeInfo = ref({} as iTree)
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

const currentYear = ref('')
let currentTimeout = undefined

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex
    console.log("swiperMain changed slide: " + activeSlide)
    currentYear.value = slideList.value[activeSlide].year
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
  treeInfo.value = el;
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
  const url = "/setview/" + settype.value + "/" + setid;
  router.push(url);
};


const updateFilteredTrees2Slides = (trees_map: {[key:string]:iTree}) => {
  const sortedTrees = [] as iTree[]
  for (const treeId in trees_map) {
    const tree = trees_map[treeId]
    sortedTrees.push(tree)
  }
  sortedTrees.sort((a,b) => { 
    const adate = a.cols_meta_data[a.col_id]['madek_core:title'].meta_data_updated_at
    const bdate = b.cols_meta_data[b.col_id]['madek_core:title'].meta_data_updated_at

    const ayear = new Date(Date.parse(adate)).getFullYear()
    const byear = new Date(Date.parse(bdate)).getFullYear()
    return byear - ayear
  })
  slideList.value = []
  let ti = 0;
  let tl:iTree[] = []
  let pdate: number
  //for (const treeId in filteredTreeList.value) {
    //const tree = filteredTreeList.value[treeId]
  sortedTrees.forEach((tree) => {
    const cdate = tree.cols_meta_data[tree.col_id]['madek_core:title'].meta_data_updated_at
    pdate = new Date(Date.parse(cdate)).getFullYear()
    console.log(" last update " + cdate + ":" + pdate);
    tree.year = pdate
    tl.push(tree)
    ti++
    if (ti >= colCount.value) {
      slideList.value.push({
        year: pdate,
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
  //myTree.value = useTree.value;

  console.error("use Tree state value: " + useTree.value[settype.value]);

  treeList.value = useTree.value[settype.value];
  

  filteredTreeList.value = treeList.value;

  console.log(" filtered list")
  //console.dir(filteredTreeList.value);

  updateFilteredTrees2Slides(filteredTreeList.value)
  
  filterCount.value = 0;
  filtersMap.value = {};
};


const showFilter = () => {
  if (showFilterView.value) {
    showFilterView.value = false;
  } else {
    showFilterView.value = true;
  }
};

const showMenu = () => {
  if (showMenuView.value) {
    showMenuView.value = false;
  } else {
    showMenuView.value = true;
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
  border: 1px solid red;
  position: absolute;
  top: 8rem;
  left: 2rem;
  width: calc(100vw - 4rem);
  height: 80vh;

}
.main_slide {
  border: 1px solid blue;
  height: 40vh;
  width: calc(100vw - 4rem);
  
  cursor: pointer;

}
.sub_slide {
  border: 3px solid green;
  width: 30vw;
  height: 100%;
  float: left;
  
}
.set_preview {
  width: 100%; height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.nav-logo-orc path {
  stroke: var(--Colors-nav-bar-button-outline);
  fill: var(--Colors-nav-bar-info-button-fill);
}
.tree_info {
  position: fixed;
  bottom: 2vh;
  height: 3rem;
  border: 1px solid black;
  font-size: 20px;
}

.year_info {
  position: fixed;
  top: 40vh;
  font-size: 10vh;
  width: 80vw;
  text-align: center;
  z-index: 1010;
}

.navbar_link {
  font-size: 20px;
  padding: 12px;
  border: 1px solid black;
  background-color: var(--Colors-nav-bar-toggle-on);
}
.navbar_set_link.active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
}
.dialog_filter {
  
}
</style>
