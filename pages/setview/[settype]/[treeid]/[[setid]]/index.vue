<template>
  <div class="setview_page">
    <header>
        <nav class="nav">
            <NuxtLink to="/" class="header_nav_logo">
              
                <IconsNavIconORC/>
              
            </NuxtLink>
    
    
            <NuxtLink
              v-for="colid in path2root"
              class="navbar_set_link"
              :to="'/setview/'+settype+'/'+treeid+'/'+ colid">
              {{ getColTitle(colid) }}
            </NuxtLink>
            <NuxtLink
              v-if="activeSetId !== setid"
              class="navbar_set_link"
              :to="'/setview/'+settype+'/'+treeid+'/'+ activeSetId">
              {{ getColTitle(activeSetId) }}
            </NuxtLink>
            
        </nav>
    </header>

    <h3>SetView</h3>
    <p>
    <!-- RP: {{ route.params }}<br/> -->
    <!-- ST: {{ settype }}<br/> -->
    SID: {{ setid }}<br/>
    PID: {{ parent_id }}<br/>
    TID: {{ treeid }} <span> {{ getColTitle(treeid) }}</span><br/>
    
    <span> {{ getColTitle(setid) }}</span>
    <br/>
    P2R: {{ path2root }}
    <span v-for="colid in path2root">
        | {{ getColTitle(colid) }}
    </span> |
    <br/>
    </p>
    <hr/>


    <swiper
      :modules="modules"
      class="swiper_main"
      :zoom="true"
      :navigation="true"
      @swiper="setMainSwiper"
      :keyboard="true"      
      :slides-per-view="1"
      :virtual="true"
      :centered-slides="true"
      :pagination="false"
      :style="{
        '--swiper-navigation-color': '#000',
        '--swiper-pagination-color': '#000',
      }"
      
    >
      <swiper-slide class="main_slide" v-for="(el,eindedx) in entries" :key="el.id" :virtualIndex="eindedx">
        <!-- Entry: {{ el.id }} -->
        <p>Entry: {{ el.id }} C: {{ el.collection_id }} </p>
        <div
          class="main_preview"
          :style="{ 'background-image': 'url(\'' + previewLargeUrl(el.id) + '\')' }"
        ></div>
      </swiper-slide>

    </swiper>
    
    <!-- thumb-swiper=".swiper_main" -->
    <!-- :controller="{ control: swiperMain }" -->
    <!-- @swiperslidechange="onSlideChange" -->
    <!-- :nested="true" 
    :space-between="spaceBetween"
    :centeredSlides="true"
    -->
    <swiper
      :modules="modules"
      class="swiper_nav"
      @swiper="setNavSwiper"
      :freeMode="true"
      :spaceBetween="4"
      :centeredSlides="true"
      :slides-per-view="'auto'"
      :navigation="true"
    >
    
      <!-- v-show="index < getShowCount(showTreeId)" -->
      <swiper-slide
        class="nav_slide"        
        v-for="(el, eindex) in navSlider.slides"
        :key="el.entry_id"
        :virtualIndex="eindex"
        :class="{set_highlight: activeSetId == el.collection_id}"
        >
        <div
          v-if="el.type === NavSlideType.Entry"
          class="nav_preview"
          
          :style="{ 'background-image': 'url(\'' + previewUrl(el.entry_id) + '\')' }"
        ></div>
        <div
          v-if="el.type === NavSlideType.Set"
          class="nav_preview">
          <div class="nav_preview_subset"
            v-for="ceId in el.cover_entry_ids" :key="ceId"
            :style="{ 'background-image': 'url(\'' + previewUrl(ceId) + '\')' }"
            @click="switch2Set(el.collection_id)"
            >
            

          </div>
        </div>
        <div
          v-if="el.type === NavSlideType.Button"
          class="nav_preview">
          
          <IconWrap :large="true" :inv="true"><IconsPlus/></IconWrap>
          <IconWrap :inv="true"><IconsMinus/></IconWrap>
            

        </div>
        <div class="entry_highlight"
          v-if="el.entry_id == activeEntryId">
          <IconWrap :inv="true"><IconsCircle/></IconWrap>
        </div>

      </swiper-slide>
    
    </swiper>



</div>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const {
    RID,
    MATCH_DIPLOM,
    MATCH_PROJECTS,
    treeMapper,
    treeList,
    filteredTreeList,
    getParent,
    getPath2Root,
} = treeHelper()

const { apiConfig } = apiHelper()
const apiBaseUrl = apiConfig.baseUrl + '/api-v2/'
const settype = ref((route.params.settype || MATCH_PROJECTS) as string)
const treeid = ref(route.params.treeid as string)
const setid = ref(route.params.setid as string)
const parent_id = ref(treeid.value as string)
const path2root = ref([] as string[])
const useTree = useState('tree')

const currentTree = ref({} as iTree)

const showCount = ref({} as { [key:string]: number})


const previewUrl = (eId: string): string => {
  const pid = currentTree.value.previews[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const previewLargeUrl = (eId: string): string => {
  const pid = currentTree.value.previewsLarge[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}

const switch2Set = (setId: string) => {
  const url = '/setview/' 
    + settype.value
    + '/'
    + treeid.value
    + '/'
    + setId;
  console.log("switch2Set: " + setId + ":" + url)
  router.push(url)
}

const getShowCount = (treeId:string) => {
    return showCount.value[treeId] = showCount.value[treeId] || 5
}
const resetShowCount = (treeId:string) => {
    showCount.value[treeId] = 5;
}
const addShowCount = (treeId:string) => {
    return showCount.value[treeId] = showCount.value[treeId] + 5
}
const getColTitle = (id: string): string => {
    let result = ""
    if (currentTree.value
        && currentTree.value.colTitlesMap) {
            result = currentTree.value.colTitlesMap[id]
        }
    return result
}

const reload = () => {
    window && window.location && window.location.reload()
}

interface iSlideElement {
  entries: [];
  collection_id: {};
  coverId: string;
  collections: iSlideElement[];
  showEntries: boolean;
  
}
enum NavSlideType {
  Entry,
  Set,
  Button
}
interface iNavSlide {
  type: NavSlideType,
  entry: iMediaEntry,
  entry_id: string,
  cover_id: string,
  cover_entry_ids: string[],
  index: number,
  collection_id: string,
}
interface iNavSlider {
  slides: iNavSlide[]
  entryId2Idx: {
    [key:string]: number
  }
}


const modules = ref([
  SwiperKeyboard,
  SwiperNavigation,
  SwiperPagination,
  SwiperScrollbar,
  SwiperController,
  SwiperZoom,
  SwiperVirtual,
]);

const entries = ref([]);
const slides = ref({} as iSlideElement);

const navSlider = ref({} as iNavSlider)
const swiperMain = ref({} as typeof Swiper);
const swiperNav = ref(null );
const swiperColNav = ref({});
const activeEntryId = ref('' as string)
const activeSetId = ref('' as string)

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex
    /* console.log("swiperMain changed slide: " + activeSlide) */
    const entry = entries.value[activeSlide]
    const colId = entry.collection_id
    activeEntryId.value = entry.id
    activeSetId.value = colId
    /* console.log("swiperMain changed slide: " + activeSlide
      + " entry " + JSON.stringify(entry)
      + " colId " + colId) */
    const navIdx = navSlider.value.entryId2Idx[entry.id];


    // console.log("swiperMain changed slide: " + activeSlide
    //  // + " entry " + JSON.stringify(entry)
    //   + " colId " + colId
    //   + " nav Idx: " + navIdx )
    
    if (colId == treeid.value) {
      //const idx = navSlider.value.entryId2Idx[entry.id]
      swiperNav.value?.slideTo(navIdx)
      
    } else {
      const navIdx = navSlider.value.entryId2Idx[entry.id];
      swiperNav.value.update();
      swiperNav.value.slideTo(navIdx)
      
    }
  }

const setMainSwiper = (swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
};
const setNavSwiper = (swiper) => {
  swiperNav.value = swiper;
};

const initSubTree = (rootId:string, treeId: string) => {
  console.log("initSubTree: " + treeId);
  showCount.value[treeId] = 4;

  // get root entries
  const rels = currentTree.value.edges[rootId][treeId].entries;
  for (const eId in rels) {
    const rel = rels[eId]
    rel.collection_id = treeId;
    entries.value.push(rel);
    
    const newSlide = {
      type:NavSlideType.Entry,
      entry: rel,
      entry_id: eId,
      collection_id: treeId,
      index: navSlider.value.slides.length
    } as iNavSlide;
    navSlider.value.slides.push(newSlide)
    navSlider.value.entryId2Idx[eId] = newSlide.index
  }

  // testing: the set itself
  /*
  const newSubSlide = {
    type:NavSlideType.Set,
    entry: undefined as unknown as iMediaEntry,
    entry_id: "" + currentTree.value.edges[rootId][treeId].coverId,
    cover_id: "" + currentTree.value.edges[rootId][treeId].coverId,
    cover_entry_ids: [] as string[],
    collection_id: treeId,
    index: navSlider.value.slides.length
  } as iNavSlide

  let sec = 0;
  for (const subEntryId in rels) {
    newSubSlide.cover_entry_ids.push(subEntryId)
    sec++
    if (sec > 3) {
      break
    }
  
  }
  navSlider.value.slides.push(newSubSlide)
  */

  // button
  navSlider.value.slides.push({
    type:NavSlideType.Button,
    collection_id: rootId,
  } as iNavSlide)



  // get child set entries
  for (const childId in currentTree.value.edges[treeId]) {
    const els = currentTree.value.edges[treeId][childId].entries;

    
    // set elements
    for (const eId in els) {
      els[eId].collection_id = childId;
      entries.value.push(els[eId]);
      //subSlide.entries.push(els[eId]);

      const newSlide = {
        type:NavSlideType.Entry,
        entry: els[eId],
        entry_id: eId,
        cover_id: currentTree.value.edges[treeId][childId].coverId,
        collection_id: childId,
        index: navSlider.value.slides.length
      } as iNavSlide;
      navSlider.value.slides.push(newSlide)
      navSlider.value.entryId2Idx[eId] = newSlide.index
    }

    // testing: the set itself
    const newSubSlide = {
      type:NavSlideType.Set,
      entry: undefined as unknown as iMediaEntry,
      entry_id: "" + currentTree.value.edges[treeId][childId].coverId,
      cover_id: "" + currentTree.value.edges[treeId][childId].coverId,
      cover_entry_ids: [] as string[],
      collection_id: childId,
      index: navSlider.value.slides.length
    } as iNavSlide

    let sec = 0;
    for (const subEntryId in els) {
      newSubSlide.cover_entry_ids.push(subEntryId)
      sec++
      if (sec > 3) {
        break
      }
    
    }
    navSlider.value.slides.push(newSubSlide)

    

    // set subset
    for (const subChildId in currentTree.value.edges[childId]) {
      const subEntries = currentTree.value.edges[childId][subChildId].entries;
      
      const newSubSlide = {
        type:NavSlideType.Set,
        entry: undefined as unknown as iMediaEntry,
        entry_id: "" + currentTree.value.edges[childId][subChildId].coverId,
        cover_id: "" + currentTree.value.edges[childId][subChildId].coverId,
        cover_entry_ids: [] as string[],
        collection_id: subChildId,
        index: navSlider.value.slides.length
      } as iNavSlide

      let sec = 0;
      for (const subEntryId in subEntries) {
        newSubSlide.cover_entry_ids.push(subEntryId)
        sec++
        if (sec > 3) {
          break
        }
      
      }
      navSlider.value.slides.push(newSubSlide)
  
    }
    navSlider.value.slides.push({
      type:NavSlideType.Button,
      collection_id: childId,
    } as iNavSlide)


    console.log(
      "initSubTree: " +
        " Rid: " + 
        rootId + 
        " Tid: " +
        treeId +
        " Cid: " +
        childId +
        
        " after sub tree build"
    );
    //console.dir(navSlider.value);
  }
};

const initData = () => {

    
    console.log("initData: " 
        + route.params.settype
        + ":" + settype.value
        + ":" + treeid.value
        + ":" + setid.value
    )
    
    if (!useTree
        || !useTree.value 
        || !useTree.value[settype.value]
        || !useTree.value[settype.value][treeid.value]) {

        setTimeout(() => {
            console.error("no useTree yet, retry later")
            initData()
            //reload()
        },20000)
        return
    }
    
    if (useTree 
        && useTree.value
        && useTree.value[settype.value]
        && useTree.value[settype.value][treeid.value]) {
        console.log("use Tree state")
        currentTree.value = useTree.value[settype.value][treeid.value]
    } else {
        console.error("no use Tree state yet")
        
    }


    navSlider.value.entryId2Idx = {}
    navSlider.value.slides = []
    entries.value = [];

    //filteredTreeList.value = treeList.value;
    //filterCount.value = 0;
    //filtersMap.value = {}
    if (setid.value) {
        parent_id.value = currentTree.value.up[setid.value]

        path2root.value = []
        let colid = setid.value
        while(currentTree.value.up[colid]) {
            path2root.value.push(colid)
            colid = currentTree.value.up[colid]
        }
        path2root.value = path2root.value.reverse()
        
        console.log(" got path2root for set: " + path2root.value)
        console.log(" got parent_id for set: " + parent_id.value)
        initSubTree(parent_id.value, setid.value)
    } else {
        initSubTree(RID, treeid.value)
    }
}



//initData();


onMounted(() => {
    initData();
})


</script>
<style>
.slider_view {
  width: 100vw;
  height: 100vh;
  padding: 8rem 2rem;
}
.swiper_main {
  /* border: 1px solid red; */
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 72px;
  left: 0px;
  /* z-index: -100; */
}
.main_slide {
  /* border: 1px solid blue; */
}
.main_preview {
  width: 100%;
  height: 90vh;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}


.swiper_nav {
  /* z-index: 100; */
  background-color: darkgray;
  width: 100%;
  height: 6rem;
  position: fixed;
  top: 85vh;
  left: 0px;
}

.nav_slide {
  
  width: fit-content !important;
  
  margin: -0.75rem -4px;
  border-top: 1.5rem solid #777;
  border-bottom: 1.5em solid #777;
  border-left: 4px solid #777;
}
.set_highlight {
  margin: -0.75rem -4px;
  border-top: 1.5rem solid #333;
  border-bottom: 1.5em solid #333;
  border-left: 4px solid #333;
}

.entry_highlight {
  position: absolute;
  top: 1.25rem; left: 0.75rem;

}


.nav_preview {
  margin: 0 0;
  width: 3rem;
  height: 4rem;
  border: 1px solid black;
  background-color: var(--Colors-btm-bar-background);
  background-size: 120% 100%;
  background-position: center;
  background-repeat: no-repeat;
}



.nav_preview_col_entry {
  width: 6rem;
  height: 100%;
  background-color: transparent;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}


.nav_slide_collection {
  /* width: fit-content !important; */
}
.nav_slide_collection .hide_btn {
  position: absolute;
  top: 0.5rem; left: 0.5rem;
  width: 2rem; height: 2rem;
  z-index: 250;
}

.swiper_nav .swiper-slide-active {
  /* border: 1px solid green; */
  /* background-color: green !important; */
}


.nav_preview_subset {
  cursor: pointer;
  float: left;
  position: relative;
  top: 0.5rem; 
  width: 22px; height: 22px;
  margin: 2px 0.5px;
  background-size: 120% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
}

/*
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  } 
}*/
.navbar_set_link {
  font-size: 20px;
  padding: 12px;
  border: 1px solid black;
}

.setview_page {
  
}
</style>

