<template>
  <div class="setview_page">
    <header>
        <nav class="nav">
            <NuxtLink :to="'/setlist/' + settype" class="header_nav_logo">
                <IconsNavHome/>
                <div class="content">Zurück</div>
            </NuxtLink>
            
            <Transition name="fade_io">
              <NuxtLink class="navbar_set_link"
                v-if="path2root.length >= 1 && showPath2Root == false"
                @mouseover="setShowPath2Root(true)">
                ...
              </NuxtLink>
            </Transition>
            <Transition name="fade_io">
              <div v-if="showPath2Root"
                @mouseleave="setShowPath2Root(false)">
                <NuxtLink
                  v-for="colid in path2root"
                  class="navbar_set_link path_to_root"
                  :to="'/setview/'+settype+'/'+treeid+'/'+ colid">
                  {{ getColTitle(colid) }}
              </NuxtLink>
              </div>
            </Transition>
            <Transition name="fade_io">
              <NuxtLink
                v-if="activeSetId !== setid || !showPath2Root"
                class="navbar_set_link"
                :to="'/setview/'+settype+'/'+treeid+'/'+ activeSetId">
                {{ getColTitle(activeSetId) }}
              </NuxtLink>
            </Transition>
            
            <NuxtLink
              @click="toggleShowInfo()"
              class="navbar_set_link info"
              :class="{info_active: showInfo}"
              >&nbsp;i&nbsp;
            </NuxtLink>
        </nav>
    </header>

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
      <div class="entry_info_panel" v-else>
        <h3>
          Entry {{ activeEntryId }} Meta Data:<br/>
        </h3>
        
        
        <!-- Title:
        {{ currentTree.entries_meta_data[activeEntryId]['madek_core:title'].string }} -->
        <br/>

        <div v-for="(md,meta_key) in currentTree.entries_meta_data[activeEntryId]">
          <div>K:{{meta_key}}:&nbsp;</div><br/>
          
          <div v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">{{md.string}}</div>
          
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_KEYWORDS">
            <div class="filter_tag"
              v-for="kw in md.selectedKeywords">
                {{ kw.term }}
            </div>
            
          </div>
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_PEOPLE">
            
            <div class="filter_tag"
              v-for="p in md.selectedPeople">
                {{ p.first_name }}&nbsp;{{ p.last_name }}
            </div>
          </div>
          <div v-else-if="md.type == MD_TYPE_ROLES">
            ROLES
          </div>
          
          <br/>
          <hr/>
        </div>
        <!-- <hr>
        <textarea>{{ currentTree.entries_meta_data[activeEntryId] }}</textarea>
        <br/>
        <br/>
        <br/> -->
      </div>

      <div v-if="!activeSetId || !currentTree || !currentTree.cols_meta_data">
        No set meta data yet.
      </div>
      <div class="entry_info_panel" v-else>
      <h3>
        Set {{ activeSetId }} Meta Data:<br/>
      </h3>
        
        
        <br/>

        <div v-for="(md,meta_key) in currentTree.cols_meta_data[activeSetId]">
          <div>K:{{meta_key}}:&nbsp;</div><br/>
          
          <div v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">{{md.string}}</div>
          
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_KEYWORDS">
            <div class="filter_tag"
              v-for="kw in md.selectedKeywords">
                {{ kw.term }}
            </div>
            
          </div>
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_PEOPLE">
            
            <div class="filter_tag"
              v-for="p in md.selectedPeople">
                {{ p.first_name }}&nbsp;{{ p.last_name }}
            </div>
          </div>
          <div v-else-if="md.type == MD_TYPE_ROLES">
            ROLES
          </div>
          
          <br/>
          <hr/>
        </div>
        <!-- <hr>
        <textarea>{{ currentTree.cols_meta_data[activeSetId] }}</textarea>
        <br/>
        <br/>
        <br/>
        <br/> -->
      </div>
    </div>
    <!-- thumb-swiper=".swiper_main" -->
    <!-- :controller="{ control: swiperMain }" -->
    <!-- @swiperslidechange="onSlideChange" -->
    <!-- :
    nested="true" 
    :space-between="spaceBetween"
    :centeredSlides="true"
    -->
    <div class="bottom_nav" >
      <div @click="showBottomNav = !showBottomNav" class="btn_bottom_nav_hide">
          <Transition name="rotate">
              <IconsBtmBarFoldMinus v-if="showBottomNav"/>
          </Transition>
          <Transition name="rotate">
              <IconsBtmBarFoldPlus v-if="!showBottomNav"/>
          </Transition>
            
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
          :class="{set_highlight: activeSetId == el.collection_id,
            nav_slide_btns: el.type == NavSlideType.Button,
            nav_slide_btn_add: el.type == NavSlideType.Button && showCount[el.collection_id] < maxCount[el.collection_id],
            nav_slide_btn_reset: el.type == NavSlideType.Button && showCount[el.collection_id] == maxCount[el.collection_id],
          }"
          v-show="el.setIdx < getShowCount(el.collection_id)
            || el.type === NavSlideType.Set
            || el.type === NavSlideType.Button"    
          >
          
          <div
            v-if="el.type === NavSlideType.Entry"
            class="nav_preview"
            @click="nav2Element(el)"
            :title="'E: ' + JSON.stringify(el) + '\n' + el.setIdx + ':' + getShowCount(el.collection_id) + ':' + (el.setIdx < getShowCount(el.collection_id))"
            :style="{ 'background-image': 'url(\'' + previewUrl(el.entry_id) + '\')' }">
            <div v-if="el.setIdx == 0 && activeSetId == el.collection_id" class="nav_preview_col_title">
              {{getColTitle(el.collection_id)}}
            </div>
          </div>
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
            :title="'E: ' + el.setIdx + ':' + getShowCount(el.collection_id) + ':' + (el.setIdx < getShowCount(el.collection_id))"
            class="nav_preview_btn ">
            
            <IconWrap :large="true" 
              v-if="showCount[el.collection_id] < maxCount[el.collection_id]"
              @click="addShowCount(el.collection_id)">
              <IconsChevronRight/>
            </IconWrap>
            <IconWrap :large="true"
              v-if="showCount[el.collection_id] >= maxCount[el.collection_id]"
              @click="resetShowCount(el.collection_id)">
              <IconsChevronLeft/>
            </IconWrap>
              

          </div>

          <div class="entry_highlight"
            v-if="el.entry_id == activeEntryId">
            <!-- <IconWrap :inv="true"><IconsCircle/></IconWrap> -->
            <IconsEntryHighlight />
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
const showPath2Root = ref(false)
const setShowPath2Root = (value) => {
  if (value == true) {
    showPath2Root.value = value
  }
  else {
    setTimeout(() => {
      showPath2Root.value = value
    }, 300)
    
  }
}
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
    showCount.value[treeId] = Math.min( 5, maxCount.value[treeId]);
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
    console.log("swiperMain changed slide: " + activeSlide
      + " entry " + entry.id // JSON.stringify(entry)
      + " colId " + colId) 
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
  swiperNav.value.slideTo(el.index)
}

const setMainSwiper = (swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
};

const setNavSwiper = (swiper) => {
  swiperNav.value = swiper;
};

//TODO preview audio ?
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
    //initSubSetPreview(rootId, treeId)
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
        activeSetId.value = setid.value
    } else {
        initSubTree(RID, treeid.value)
    }
    


  setTimeout(() => {
    swiperMain.value.slideTo(0)
  },100)
}




onMounted(() => {
  document.documentElement.setAttribute("data-theme", "");
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
.entry_info_panel {
  padding: var(--spacing__betweenitemsM, 12px) var(--spacing__betweenitemsM,12px);
}
.bottom_nav {
  /* border: 1px solid blue; */
  position: fixed;
  left: 0px;
  width: 100vw;
  bottom: 3vh;
  height: 144px;
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
  /* border: 1px solid red; */
  background-color: #fff;
  width: 100%;
  height: 144px;
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
  height: 95px;
  margin-top: 24px;
  /* margin: var(--padding-item-vertical-M, 12px) 0px; */
  margin-left: -4px;
  
  border-top: var(--padding-item-vertical-M, 12px) solid rgba(0,0,0,0);
  border-left: var(--spacing-between-items-S, 12px) solid rgba(0,0,0,0);
}
.set_highlight {
  background: var(--btm-bar-galleryView-set-hover, #E7E6E1);
  /* padding: var(--padding-item-vertical-M, 12px) -4px; */
  border-top: var(--padding-item-vertical-M, 12px) solid #E7E6E1;
  border-bottom: var(--padding-item-vertical-M, 12px) solid #E7E6E1;
  
  border-left: var(--spacing-between-items-S, 8px) solid #E7E6E1;
}

.entry_highlight {
  position: absolute;
  top: 36px;
  left: 24px;
  fill: var(--btm-bar-thumbnail-active, #FFF);
  
}


.nav_preview {
  margin: 0 0;
  width: 72px;
  height: var(--margin-body-margin,96px);
  /* border: 1px solid black; */
  
  background-color: var(--Colors-btm-bar-background);
  background-size: 120% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.nav_preview_col_title {
  position: relative;
  top: -36px;
  overflow-x: scroll;
  width: 80vw;
}



.nav_slide_collection {
  /* width: fit-content !important; */
}

.nav_btns {
  
  height: 100%;
}
.nav_slide_btns {
  width: 36px !important;
}
.nav_slide_btn_add {
  width: 1px !important;
}
.nav_preview_btn {
  position: relative;
  padding-top: 36px;
}
.nav_slide_btn_add > .nav_preview_btn {
  left: -72px; 
  
  padding-left: 24px;
  height: 96px; width: 64px;
  background: linear-gradient(90deg, rgba(243,242,239,0.0) -10%, #f3f2ef 20%, #f3f2ef 100%);
  /* background: linear-gradient(180deg, #F3F2EF 20%, rgba(243, 242, 239, 0.00) 100%); */
  
}
.nav_preview_btn svg {
  stroke: #222 !important;
}
.nav_slide_btn_reset > .nav_preview_btn {
  position: relative;
  padding-top: 36px;
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
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  padding: var(--spacing__betweenitemsM, 12px);
  border: 1px solid black;
  border-radius: var(--radius__full, 48px);
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: 0 var(--spacing__navbarbetweenitems, 4px);
}
.navbar_set_link.info_active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
}
nav {
  width: calc(100vw - var(--dimension__icon__sizeM, 24px));
}
.header_nav_logo {
  stroke: none;
  fill: #222 !important;
}
.navbar_set_link.info {
  float: right;
  position: relative;
}

.filter_list {
  display: ruby-text;

}
.filter_tag {
  float: left;
  display: block;
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  padding: var(--spacing__betweenitemsM, 12px);
  border: 1px solid black;
  border-radius: var(--radius__full, 48px);
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: var(--spacing__navbarbetweenitems, 4px) var(--spacing__navbarbetweenitems, 4px);
}

.setview_page {
  
}

.btn_bottom_nav_hide {
  position: relative;
  top: 36px;
  left: 24px;
  
}
.btn_bottom_nav_hide * {
  position: absolute;
  top: 0px;
  left: 0px;
  /* transform: rotateZ(45deg) */
}
.rotate-enter-active,
.rotate-leave-active {
  transition: all 1s linear;
}
.rotate-enter-to {
  transform: rotate(90deg);
  opacity: 1;
}
.rotate-leave-to {
  transform: rotate(90deg);
}
.header_nav_logo .content {
  visibility: collapse;
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  position: relative;
  top: -40px; left: 48px;
  text-decoration: none;
}
.header_nav_logo:hover {
  width: 9rem;
}
.header_nav_logo:hover .content {
  visibility: visible;
  
  
}
</style>

