<template>
  <div class="setview_page">
    <header>
        <nav class="nav">
            <NuxtLink to="/" class="header_nav_logo">
              
                <IconsNavIconORC/>
              
            </NuxtLink>
            <NuxtLink
              v-if="!path2root.length"
              class="navbar_set_link"
              :to="'/setview/'+settype+'/'+treeid+'/'">
              {{ getColTitle(treeid) }}
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
            <NuxtLink>|</NuxtLink>
            <NuxtLink
              @click="toggleShowInfo()"
              class="navbar_set_link"
              :class="{info_active: showInfo}"
              >Info
            </NuxtLink>
            <NuxtLink>DE</NuxtLink>
            <NuxtLink>EN</NuxtLink>

        </nav>
    </header>

    <!--<h3>SetView</h3>-->
    
    <!-- RP: {{ route.params }}<br/> -->
    <!-- ST: {{ settype }}<br/> -->
    <!-- SID: {{ setid }}<br/> -->
    <!-- PID: {{ parent_id }}<br/> -->
    <!-- TID: {{ treeid }} <span> {{ getColTitle(treeid) }}</span><br/> -->
    
    <!-- <span> {{ getColTitle(setid) }}</span><br/> -->
    <!-- P2R: {{ path2root }} -->
    <!-- <span v-for="colid in path2root">
        | {{ getColTitle(colid) }}
    </span> |
    <br/> -->
    
    


    <swiper
      :modules="modules"
      class="swiper_main"
      :class="{info_active: showInfo}"
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
      <swiper-slide class="main_slide" v-for="(el,index) in entries" :key="el.id" :virtualIndex="index">
        <!-- Entry: {{ el.id }} 
        <p>Entry: {{ el.id }} C: {{ el.collection_id }} eIdx: {{ index }} mt: {{ currentTree.previewsLarge[el.id].media_type }} </p>
-->
        <div v-if="getMediaType(el.id) == 'image'"
          class="main_preview"
          :style="{ 'background-image': 'url(\'' + previewLargeUrl(el.id) + '\')' }"
        ></div>
        <div v-else-if="currentTree.previewsLarge[el.id].media_type == 'audio'"
          class="main_preview">
          <audio :id="'slide-audio-'+ el.id"
            class="audio-slide"
            controls style="width: 100%; height:80%; margin: auto;">
            <source :src="previewLargeUrl(el.id)">
          </audio>
        </div>
        <div v-else-if="currentTree.previewsLarge[el.id].media_type == 'video'"
          class="main_preview">
          <video :id="'slide-video-'+ el.id"
            class="video-slide"
            controls style="width: 100%; height:80%; margin: auto;  position:relative">
            <!-- z-index: -2; -->
            <source :src="previewLargeUrl(el.id)">
          </video>
        </div>
        <div v-else-if="currentTree.previewsLarge[el.id].media_type == 'document'">
          TODO docs
        </div>
      </swiper-slide>

    </swiper>
    
    <div class="entry_info"
      :class="{hidden: !showInfo}">
      <div v-if="!activeEntryId || !currentTree || !currentTree.entries_meta_data">
        No entry meta data yet.
      </div>
      <div v-else>
        Entry {{ activeEntryId }} Meta Data:<br/>
        
        <!-- Title:
        {{ currentTree.entries_meta_data[activeEntryId]['madek_core:title'].string }} -->
        <br/>

        <div v-for="(md,meta_key) in currentTree.entries_meta_data[activeEntryId]">
          <span>K:{{meta_key}}:&nbsp;</span><br/><br/>
          
          <!-- <span>K:{{md.meta_key_id}}:&nbsp;</span> -->
          <span v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">{{md.string}}</span>
          
          <div v-else-if="md.type == MD_TYPE_KEYWORDS">
            <span v-for="kw in md.selectedKeywords">
              <NuxtLink class="navbar_set_link">
                {{ kw.term }}
              </NuxtLink>
            </span>
            
          </div>
          <div v-else-if="md.type == MD_TYPE_PEOPLE">
            
            <span v-for="p in md.selectedPeople">
              <NuxtLink class="navbar_set_link">
                {{ p.first_name }}&nbsp;{{ p.last_name }}
              </NuxtLink>
            </span>
          </div>
          <div v-else-if="md.type == MD_TYPE_ROLES">
            ROLES
          </div>
          
          <br/>
          <hr/>
        </div>
        <hr>
        <textarea>{{ currentTree.entries_meta_data[activeEntryId] }}</textarea>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
    <!-- thumb-swiper=".swiper_main" -->
    <!-- :controller="{ control: swiperMain }" -->
    <!-- @swiperslidechange="onSlideChange" -->
    <!-- :nested="true" 
    :space-between="spaceBetween"
    :centeredSlides="true"
    -->
    <div class="bottom_nav" >
      <div>
        <NuxtLink @click="showBottomNav = !showBottomNav" class="navbar_set_link">
          <IconWrap>
            <IconsMinus v-if="showBottomNav"/>
            <IconsPlus v-if="!showBottomNav"/>
          </IconWrap>
        </NuxtLink>
      </div>
      <swiper
        :modules="modules"
        class="swiper_nav"
        :class="{hidden: !showBottomNav}"
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
          :class="{set_highlight: activeSetId == el.collection_id, nav_slide_btns: el.type == NavSlideType.Button}"
          v-show="el.setIdx < getShowCount(el.collection_id)
            || el.type === NavSlideType.Set
            || el.type === NavSlideType.Button"    
          >
          
          <div
            v-if="el.type === NavSlideType.Entry"
            class="nav_preview"
            @click="nav2Element(el)"
            :title="'E: ' + JSON.stringify(el) + '\n' + el.setIdx + ':' + getShowCount(el.collection_id) + ':' + (el.setIdx < getShowCount(el.collection_id))"
            :style="{ 'background-image': 'url(\'' + previewUrl(el.entry_id) + '\')' }"
          ></div>
          <div
            v-if="el.type === NavSlideType.Set"
            :title="'E: ' + JSON.stringify(el)"
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
            :title="'E: ' + JSON.stringify(el) + '\n' + el.setIdx + ':' + getShowCount(el.collection_id) + ':' + (el.setIdx < getShowCount(el.collection_id))"
            class="nav_preview ">
            
            <IconWrap :large="true" :inv="true"
              v-if="showCount[el.collection_id] < maxCount[el.collection_id]"
              @click="addShowCount(el.collection_id)">
              <IconsPlus/>
            </IconWrap>
            <IconWrap :inv="true"
              @click="resetShowCount(el.collection_id)">
              <IconsMinus/>
            </IconWrap>
              

          </div>

          <div class="entry_highlight"
            v-if="el.entry_id == activeEntryId">
            <IconWrap :inv="true"><IconsCircle/></IconWrap>
          </div>

        </swiper-slide>
      
      </swiper>
  </div>
  <div class="av_control" v-if="show_av_control">
    <div>
      <NuxtLink class="navbar_set_link">
        <IconWrap>
          <IconsPlus/>
        </IconWrap>
        <span>Play</span>
      </NuxtLink>
      <NuxtLink class="navbar_set_link">
        <IconWrap>
          <IconsMinus/>
        </IconWrap>
        Stop
      </NuxtLink>
      <NuxtLink class="navbar_set_link">
        | Scrollbar
      </NuxtLink>
      <NuxtLink class="navbar_set_link">
        | VolBar
      </NuxtLink>
    </div>
  </div>


</div>
</template>
<script setup lang="ts">
const {
  MD_TYPE_TEXT,
  MD_TYPE_TEXT_DATE,
  MD_TYPE_JSON,
  MD_TYPE_KEYWORDS,
  MD_TYPE_PEOPLE,
  MD_TYPE_ROLES
} = madekHelper()

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
const maxCount = ref({} as { [key:string]: number})
const showBottomNav = ref(true)
const show_av_control = ref(false)
const showInfo = ref(false)
const toggleShowInfo = () => {
  showInfo.value = !showInfo.value
  setTimeout(() => {
    swiperMain.value.update()
  }, 3000)
  
}
const previewUrl = (eId: string): string => {
  const pid = currentTree.value.previews[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const previewLargeUrl = (eId: string): string => {
  const pid = currentTree.value.previewsLarge[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const getMediaType = (eId: string): string => {
  return currentTree.value.previewsLarge[eId].media_type || ''
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
    showCount.value[treeId] = showCount.value[treeId] || 5
    return showCount.value[treeId]
}
const resetShowCount = (treeId:string) => {
    showCount.value[treeId] = 5;
}
const addShowCount = (treeId:string) => {
    showCount.value[treeId] = Math.min( showCount.value[treeId] + 5, maxCount.value[treeId])
    return showCount.value[treeId]
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
  setIdx: number,
  mainIdx: number,
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
  SwiperFreeMode,
  SwiperZoom,
  SwiperVirtual,
]);

const entries = ref([]);
//const slides = ref({} as iSlideElement);

const navSlider = ref({} as iNavSlider)
const swiperMain = ref({} as typeof Swiper);
const swiperNav = ref({} as typeof Swiper);

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


    
    const oael = document.getElementsByClassName('audio-slide')
    for (let i=0; i < oael.length; i++) {
      const ael = oael[i]
      //console.dir(vel)
      ael.pause()
    }
    const ovel = document.getElementsByClassName('video-slide')
    for (let i=0; i < ovel.length; i++) {
      const vel = ovel[i]
      //console.dir(vel)
      vel.pause()
    }

    const ael = document.getElementById('slide-audio-'+ entry.id)
    const vel = document.getElementById('slide-video-'+ entry.id)
    if (ael) {
      ael.play()
      showBottomNav.value = false
      show_av_control.value = true
    } else if (vel) {
      vel.play()
      showBottomNav.value = false
      show_av_control.value = true
    } else {
      showBottomNav.value = true
      show_av_control.value = false
    }
    

    // console.log("swiperMain changed slide: " + activeSlide
    //  // + " entry " + JSON.stringify(entry)
    //   + " colId " + colId
    //   + " nav Idx: " + navIdx )
    
    const sidx = navSlider.value.slides[navIdx].setIdx
    const sc = showCount.value[colId]
    const msc = maxCount.value[colId]
    if (sidx  >= (sc - 3)) {
      showCount.value[colId] = Math.min(sidx + 5,msc + 2)
    } else if (sidx < (sc-5)) {
      showCount.value[colId] = Math.max(sidx +5, 5)
    }
    swiperNav.value.update();
    swiperNav.value?.slideTo(navIdx)
    
  }

const nav2Element = (el: iNavSlide) => {
  swiperMain.value.slideTo(el.mainIdx)
  //const navIdx = navSlider.value.entryId2Idx[entry.id];
  //swiperNav.value.update();
  swiperNav.value.slideTo(el.index)
}

const setMainSwiper = (swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
};

const setNavSwiper = (swiper) => {
  swiperNav.value = swiper;
};

const initSubSetPreview = (childId:string, subChildId:string) => {
  const subEntries = currentTree.value.edges[childId][subChildId].entries;
      
      const newSubSlide = {
        type:NavSlideType.Set,
        entry: undefined as unknown as iMediaEntry,
        entry_id: "" + currentTree.value.edges[childId][subChildId].coverId,
        cover_id: "" + currentTree.value.edges[childId][subChildId].coverId,
        cover_entry_ids: [] as string[],
        collection_id: subChildId,
        index: navSlider.value.slides.length,
        setIdx: 0,
        mainIdx: 0
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

const initSetBtns = (treeId:string, setIdx: number) => {
  const btn_id = 'btns_' + treeId;
  navSlider.value.slides.push({
    entry: { id: btn_id},
    entry_id: btn_id,
    type:NavSlideType.Button,
    collection_id: treeId,
    index: navSlider.value.slides.length,
    setIdx: setIdx,
    mainIdx: 0,
  } as iNavSlide)
}

const initSetEntries = (parentId:string, setId:string, els):number => {
    let setIdx = 0
    // set elements
    for (const eId in els) {
      els[eId].collection_id = setId;
      

      const newSlide = {
        type:NavSlideType.Entry,
        entry: els[eId],
        entry_id: eId,
        cover_id: currentTree.value.edges[parentId][setId].coverId,
        collection_id: setId,
        index: navSlider.value.slides.length,
        setIdx: setIdx++,
        mainIdx: entries.value.length
      } as iNavSlide;
      entries.value.push(els[eId]);
      navSlider.value.slides.push(newSlide)
      navSlider.value.entryId2Idx[eId] = newSlide.index
    }
    maxCount.value[setId] = setIdx
    return setIdx
}
const initSubTree = (rootId:string, treeId: string) => {
  console.log("initSubTree: " + treeId);
  showCount.value[rootId] = 5;
  showCount.value[treeId] = 5;

  // get root entries
  const rels = currentTree.value.edges[rootId][treeId].entries;
  const rels_count = initSetEntries(rootId, treeId, rels)
  
  // button
  if (Object.keys(rels).length) {
    // testing: the set itself
    initSubSetPreview(rootId, treeId)
    initSetBtns(treeId, rels_count)
  }


  // get child set entries
  for (const childId in currentTree.value.edges[treeId]) {
    const els = currentTree.value.edges[treeId][childId].entries;
    const els_count = initSetEntries(treeId, childId, els)

    // testing: the set itself
    //initSubSetPreview(treeId, childId)

    // set subset
    for (const subChildId in currentTree.value.edges[childId]) {
      initSubSetPreview(childId, subChildId)
    }
    
    if (Object.keys(els).length) {
      initSetBtns(childId, els_count)
    }
    
    


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
<style scoped>
.slider_view {
  width: 100vw;
  height: 100vh;
  padding: 8rem 2rem;
}
.swiper_main {
  border: 1px solid red;
  position: fixed;
  top: 72px;
  left: 0px;

  width: 100%;
  height: 100vh;
  
  
  /* z-index: -100; */
  transition: all 0.5s 1s;
}
.swiper_main.info_active {
  width: 50%;
}
.main_slide {
  /* border: 1px solid blue; */
}
.main_preview {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.entry_info {
  border: 1px solid blue;
  position: fixed;
  top: 72px; left: 50%;
  width: 50%; height: 80vh;
  overflow-y: auto;
  
  visibility: visible;
  /** hidden state */
  
  transition: all 1s 1s;
}
.entry_info.hidden {
  left: 100%;
  visibility: hidden;
}

.bottom_nav {
  border: 1px solid blue;
  position: fixed;
  left: 0px;
  width: 100vw;
  top: 85vh;
  height: 6rem;
  z-index: 100;
}
.av_control {
  border: 1px solid green;
  position: fixed;
  left: 0px;
  width: 100vw;
  top: 85vh;
  height: 6rem;
  z-index: 100;
  background-color: var(--Colors-btm-bar-playerView-background);
  color: var(--Colors-btm-bar-playerView-button);
}
.av_control .navbar_set_link {
  float: left;
}

.swiper_nav {
  /* z-index: 100; */
  border: 1px solid red;
  background-color: darkgray;
  width: 100%;
  height: 6rem;
  position: absolute;
  top: 0px;
  left: 6rem;
  transition: all 0.5s 1s;
}
.swiper_nav.hidden {
  visibility: hidden;
  top: 20rem;
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

.nav_btns {
  
  height: 100%;
}
.nav_slide_btns {
  width: 1.5rem !important;
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
  background-color: var(--Colors-nav-bar-toggle-on);
}
.navbar_set_link.info_active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
}

.setview_page {
  
}
</style>

