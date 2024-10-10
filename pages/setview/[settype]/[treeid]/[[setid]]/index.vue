<template>
  <div class="setview_page">
    <SetViewHeader 
      :settype="settype"
      :treeid="treeid"
      :setid="setid"
      :active-set-id="activeSetId"
      :parent-set-id="parent_id"

      :show-info="showInfo"
      :intro-running="showSetTitle"
      :hide-nav="animateSwitch2SetList || showFilterView"
      
      :titles-map="currentTree.colTitlesMap"
      :theme="data_theme"
      @toggle-show-info="toggleShowInfo"
      @parent-clicked="clickedParent"
      @grand-parent-clicked="switch2Set"
      @clicked-back="switch2setlist"
    />

    <div class="entry_info_title"
      :class="{
        move_up_hidden: !showInfo || showFilterView,
        fade_hidden: entry_info_hidden}"
      v-if="currentTree && currentTree.colTitlesMap"
      >
      {{getAbbrevColTitle(setid)}}
    </div>

    
    <swiper
      :modules="modules"
      class="swiper_main"
      :class="{
        hidden: animateSwitch2SetList,
        info_active: showInfo,
        zoom: !showBottomNav
      }"
      
      :navigation="{
        nextEl: '.swiper-main-button-next',
        prevEl: '.swiper-main-button-prev',
      }"
      @swiper="setMainSwiper"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      :keyboard="true"
      :css-mode="false"
      :auto-resize="true"
      :initial-slide="0"
      :slides-per-view="1"
      :virtual="true"
      :centered-slides="true"
      :pagination="false"
      :style="{
        '--swiper-navigation-color': '#000',
        '--swiper-pagination-color': '#000',
      }"
    >
      <swiper-slide
        class="main_slide"
        v-for="(el,index) in entries"
        :key="el.id" :virtualIndex="index">

        <!-- <div class="swiper-slide-transform"> -->
        <div v-if="currentTree.previewsAudio[el.id]"
          class="main_preview">
          <div class="audio_slide"
            @click="toggleStatePlay(!av_state_play)"
            >
            <audio :id="'slide-audio-'+ el.id"
              class="audio_player"
              >
              <source v-for="url in previewAudioUrls(el.id)" :src="url">
            </audio>
            <div class="audio_slide_icon">
              <IconsAudioBack />  
            </div>
            <div class="audio_slide_title">
              {{currentTree.entryTitlesMap[activeEntryId]}}
            </div>
          </div>
        </div>
        <div v-else-if="currentTree.previewsVideo[el.id]"
          class="main_preview">
          <video :id="'slide-video-'+ el.id"
            class="video_slide video_player"
            style=""
            @click="toggleStatePlay(!av_state_play)"
            >
            <source v-for="url in previewVideoUrls(el.id)" :src="url">
          </video>
        </div>
        <div v-else-if="currentTree.previewsLarge[el.id] && currentTree.previewsLarge[el.id].media_type == 'document'">
          TODO docs
        </div>
        <div v-else-if="currentTree.previewsLarge[el.id] && currentTree.previewsLarge[el.id].media_type == 'image'"
          class="main_preview"
          :style="{ 'background-image': 'url(\'' + previewLargeUrl(el.id) + '\')' }">
        </div>
      <!-- </div> -->
        
      </swiper-slide>
      <div class="swiper-main-button-prev"
        :class="{'swiper-button-disabled': swiperNavBtnHoverLeft == false || meta_info_ani}"
        @click.once="swiperMain.slidePrev()">
        <IconsSliderArrowLeft/>
      </div>
      <div class="swiper-main-button-next"
        :class="{'swiper-button-disabled': swiperNavBtnHoverRight == false || meta_info_ani}"
        @click.once="swiperMain.slideNext()">
        <IconsSliderArrowRight/>
      </div>
    </swiper>


    <EntryAndSetInfo
      v-if="currentTree && currentTree.colTitlesMap"
      :class="{hidden: !showInfo}"
      :active-entry-id="activeEntryId"
      :active-set-id="activeSetId"
      :current-tree="currentTree"
      :parent-set-id="setid"
      @scrollPosChanged="entryInfoScrollPosChanged"
      @added-filter="addedFilter"
    />

    <div class="bottom_nav" :class="{hidden: showInfo   }">
      <Transition name="fade">
        <div
          v-if="!showInfo && !animateSwitch2SetList"
          @click="toggleShowBottomNav()"
          class="btn_bottom_nav_hide">
          <IconsBtmBarFoldPlusMinus :show-plus="!showBottomNav || show_av_control" />
              
        </div>
      </Transition>
      <swiper
        :modules="modules"
        class="swiper_nav"
        :class="{hidden: !showBottomNav || showInfo || animateSwitch2SetList || showSetTitle | show_av_control }"
        @swiper="setNavSwiper"
        :freeMode="{
          momentum:true,
          momentumBounce: true,
          sticky: false
        }"
        :css-mode="false"
        :spaceBetween="4"
        :mousewheel="{forceToAxis:false}"
        :centeredSlides="false"
        :slides-per-view="'auto'"
        
      >
    
        <swiper-slide
          class="nav_slide"
          v-for="(el, eindex) in navSlider.slides"
          :key="el.entry_id"
          :virtualIndex="el.index"
          @mouseover="setHoverSetId(el.collection_id)"
          @mouseleave="resetHoverSetId()"
          :class="getNavSlideClass(el)"
          >
          
          <!-- :title="'E: ' + JSON.stringify(el) + '\n' + el.setIdx + ':' + getShowCount(el.collection_id) + ':' + (el.setIdx < getShowCount(el.collection_id))" -->
          <div
            v-if="el.type === NavSlideType.Entry"
            class="nav_preview"
            @click="nav2Element(el)"
            :class="getNavPreviewClass(el)"
            :style="{ 'background-image': 'url(\'' + previewUrl(el.entry_id) + '\')' }">
            
            <div v-if="currentTree.previewsAudio[el.entry_id]"
              class="nav_preview_audio"
              :class="{nav_preview_audio_highlight: el.entry_id == activeEntryId}">
              audio
            </div>
            <!-- TODO get abbrev title, calc title width -->
            <div v-if="el.collection_id !== treeid && el.setIdx == 0 && (activeSetId == el.collection_id || hoverSetId == el.collection_id)"
              class="nav_preview_col_title"
              :style="{width: ((getShowCount(el.collection_id)- 0.3) * 72) + 'px'}">
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
          <!-- :title="'E: ' + el.setIdx + ':' + getShowCount(el.collection_id) + ':' + (el.setIdx < getShowCount(el.collection_id))" -->
          <div
            v-if="el.type === NavSlideType.Button && maxCount[el.collection_id] > MIN_SHOW_COUNT"
           
            class="nav_preview_btn ">
            
            <IconWrap :large="true" 
              v-if="showCount[el.collection_id] < maxCount[el.collection_id]"
              @click="clickedNavShowMore(el.collection_id)"
              >
              <IconsChevronRight/>
            </IconWrap>
            <IconWrap :large="true"
              v-if="showCount[el.collection_id] >= maxCount[el.collection_id] && maxCount[el.collection_id] > MIN_SHOW_COUNT"
              @click="clickedNavShowLess(el.collection_id)"
              >
              <IconsChevronLeft/>
            </IconWrap>
              

          </div>
          <div
            v-if="el.type === NavSlideType.Spacer"
            class="nav_preview_spacer">
          </div>


          <div class="entry_highlight"
            v-if="el.entry_id == activeEntryId">
            <IconsEntryHighlight />
          </div>

        </swiper-slide>
      
      </swiper>
  </div>
  <div class="av_control" 
    :class="{hidden: !show_av_control || showInfo || showSetTitle}">
    <div class="av_playpause"
      @click="toggleStatePlay(!av_state_play)">
      <IconsPlayPause :isPlay="av_state_play"
      />
    </div>
    <div class="av_progress_cont">
      <progress id="av_progress" value="0" min="0" @click="avProgressClicked">
          <!-- <span id="av_progress_bar"></span> -->
      </progress>
    </div>
  </div>

  <SetViewIntroInfo
    v-if="showSetTitle"
    :set-type="settype"
    :set-title="getAbbrevColTitle(setid)"
    @on-close="showSetTitle = false" />


    <FilterView
          v-if="useTree && showFilterView"
          :use-clean-filters="false"
          :use-current-filters="false"
          :trees_map="useTree[settype]"
          :tree_type="settype"
          @closed="onFilterViewClosed"
          @applied="onFilterViewApplied"
          />
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
    
    newFiltersMap,
    filtersMap

} = treeHelper()

const { apiConfig } = apiHelper()
const apiBaseUrl = apiConfig.baseUrl + '/api-v2/'

const useTree = useState("tree");

//TODO watch resolution change

const {
  font_list, font_selected,
  getPixelSizedStyle,
  getViewSizedStyle,
  mergeSetTypeColor
} = DynFonts()

const settype = ref((route.params.settype || MATCH_PROJECTS) as string)
const treeid = ref(route.params.treeid as string)
const setid = ref(route.params.setid as string)
const parent_id = ref(treeid.value as string)
const path2root = ref([] as string[])


const currentTree = ref({} as iTree)

const entry_info_hidden = ref(false)
const entryInfoScrollPosChanged = (pos) => {
  //console.log("entryInfoScrollPosChanged: " + pos)
  if (pos > 50) {
    entry_info_hidden.value = true;
  }
  else {
    entry_info_hidden.value = false;
  }
}

const toggleShowBottomNav = () => {
  const entryId = activeEntryId.value
  const avel = document.getElementById('slide-audio-'+ entryId) || document.getElementById('slide-video-'+ entryId)
  
  if (!showBottomNav.value) {
    if (show_av_control.value == true) {
      show_av_control.value = false
    }
    showBottomNav.value = true
  } else {
    showBottomNav.value = false
    if (avel) {
      show_av_control.value = true
    }
  }
  
}

const clickedParent = (col_id) => {
  
  if (col_id == activeSetId.value) {
    // TODO slide to subslide elem
    swiperMain.value.slideTo(0)
  }
  else if (col_id == setid.value) {
    swiperMain.value.slideTo(0)
  }
  else if (col_id == parent_id.value) {
    switch2Set(col_id)
  }
}
const showFilterView = ref(false)
const addedFilter = (type, data) => {
  showFilterView.value = true;
  newFiltersMap.value = {}
  newFiltersMap.value[type] = {}
  newFiltersMap.value[type][data.id] = {
    id: data.id,
    name: data.term,
    meta_key: data.meta_key_id
  }
  /* setTimeout(() => {
    newFiltersMap.value[type][data.id] = data
    //TODO update filter counts
  }, 100) */
  
}
const onFilterViewApplied = () => {
  console.log("onFilterViewApplied")
  showFilterView.value = false
  // set new filters
  for (const type in newFiltersMap.value) {
    filtersMap.value[type] = {}
    for (const fid in newFiltersMap.value[type]) {
      filtersMap.value[type][fid] = newFiltersMap.value[type][fid]
    }
  }

  console.error("onFilterViewApplied: filter map: new: " + JSON.stringify(newFiltersMap.value))
  console.error("onFilterViewApplied: filter map: old: " + JSON.stringify(filtersMap.value))
  

  switch2setlist()
}

const onFilterViewClosed = () => {
  console.log("onFilterViewClosed" + Object.keys(filteredTreeList.value).length)
  // reset selection
  newFiltersMap.value[settype.value] = {}
  showFilterView.value = false
}

const av_state_play = ref(false)

const toggleStatePlay = (newState:boolean) => {
  //console.log("toggleStatePlay: " + newState)
  //av_state_play.value = !av_state_play.value
  av_state_play.value = newState
  
  const entryId = activeEntryId.value
  const avel = document.getElementById('slide-audio-'+ entryId) || document.getElementById('slide-video-'+ entryId)
  if (avel) {
    if (av_state_play.value) {
      avel.play()
    } else {
      avel.pause()
    }    
  } else {
    console.error("no av element")
  }
}

const avProgressClicked = (ev:PointerEvent) => {
  console.log("avProgressClicked: ")
  
  const entryId = activeEntryId.value
  const avel = document.getElementById('slide-audio-'+ entryId) || document.getElementById('slide-video-'+ entryId)
  const progressEl = document.getElementById('av_progress')

  const pos =
      (ev.pageX - progressEl.offsetLeft - progressEl.offsetParent.offsetLeft) /
    progressEl.offsetWidth;
  avel.currentTime = pos * avel.duration;
}

const MAX_SET_TITLE_LENGTH = 50
const getAbbrevColTitle = (setid: string): string => {
    
    if (!currentTree.value || !currentTree.value.colTitlesMap) {
      return ""
    }
    const title = currentTree.value.colTitlesMap[setid]
         
    if (title.length > MAX_SET_TITLE_LENGTH) {
      return title.substring(0,MAX_SET_TITLE_LENGTH) + '...'
    }
    return title
}

const showCount = ref({} as { [key:string]: number})
const maxCount = ref({} as { [key:string]: number})

const getNavSlideClass = (el:iSlideElement):object => {
  const col_id = el.collection_id
  const max_count = maxCount.value[col_id]
  const show_count = showCount.value[col_id]
  const result = {
    set_highlight: (activeSetId.value == col_id || hoverSetId.value == col_id) && treeid.value !== col_id,
    nav_slide_btns: el.type == NavSlideType.Button && max_count >= MIN_SHOW_COUNT,
    nav_slide_btn_add: el.type == NavSlideType.Button && show_count < max_count && max_count >= MIN_SHOW_COUNT,
    nav_slide_btn_reset: el.type == NavSlideType.Button && show_count == max_count && max_count >= MIN_SHOW_COUNT,
  }
  return result
}
const showBottomNav = ref(true)
const show_av_control = ref(false)

const showInfo = ref(false)

const DELAY_META_INFO_TRIGGER_SWIPER_RESIZE = 600

const meta_info_ani = ref(false)
const toggleShowInfo = () => {
  meta_info_ani.value = true;
  showInfo.value = !showInfo.value
  if (showInfo.value) {
    entry_info_hidden.value = false;
  } else {

  }
  
  setTimeout(() => {
    meta_info_ani.value = false;
  }, DELAY_META_INFO_TRIGGER_SWIPER_RESIZE * 2)

  setTimeout(() => {
    swiperMain.value.updateSize()
    swiperMain.value.update()
    
  }, DELAY_META_INFO_TRIGGER_SWIPER_RESIZE)
  
}

const getNavPreviewClass = (el) => {
  if (!currentTree.value.previews[el.entry_id]
    || !currentTree.value.previews[el.entry_id].width
  ) {
    return {}
  }

  const width = currentTree.value.previews[el.entry_id].width
  const height = currentTree.value.previews[el.entry_id].height
  const factor = width / height
  if (factor < 0.75) {
    return { 'narrow': true }
  }
  return {}
  
}
const hoverSetId = ref('' as string)
let resetHoverSetIdTimeout = undefined

const resetHoverSetId = () => {
  if (resetHoverSetIdTimeout) clearTimeout(resetHoverSetIdTimeout)
  resetHoverSetIdTimeout = setTimeout(( ) => { hoverSetId.value = '' },1000)
}

const setHoverSetId = (val:string) => {
  if (resetHoverSetIdTimeout) clearTimeout(resetHoverSetIdTimeout)
  hoverSetId.value = val
}

const previewUrl = (eId: string): string => {
  const pid = currentTree.value.previews[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const previewLargeUrl = (eId: string): string => {
  const pid = currentTree.value.previewsLarge[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const previewAudioUrls = (eId: string): string[] => {
  const urlList = [] as string[]
  currentTree.value.previewsAudio[eId].forEach(preview => {
    const url = apiBaseUrl + 'previews/' + preview.id + '/data-stream'
    urlList.push(url)
  });
  return urlList;
}
const previewVideoUrls = (eId: string): string[] => {
  const urlList = [] as string[]
  currentTree.value.previewsVideo[eId].forEach(preview => {
    const url = apiBaseUrl + 'previews/' + preview.id + '/data-stream'
    urlList.push(url)
  });
  return urlList;
}

const getMediaType = (eId: string): string => {
  if (currentTree.previewsVideo[eId]) {

  }
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

const animateSwitch2SetList = ref(true)

const switch2setlist = () => {
  animateSwitch2SetList.value = true
  setTimeout(() => {
    const url = '/setlist/' + settype.value
    console.log("switch2setlist: " + settype.value + ":" + url)
    router.push(url)
  },200)
  
}

const getShowCount = (treeId:string) => {
    showCount.value[treeId] = showCount.value[treeId] || Math.min( MIN_SHOW_COUNT, maxCount.value[treeId]);
    return showCount.value[treeId]
}
const clickedNavShowLess = (treeId:string) => {
    const start = showCount.value[treeId]
    const min = Math.min( MIN_SHOW_COUNT, maxCount.value[treeId])
    for (let i = start; i >= min; i--) {
      setTimeout(() => {
        showCount.value[treeId] = i;
        initData()
      }, (start - i) * 50)
      
    }
}

const clickedNavShowMore = (treeId:string) => {
    const start = showCount.value[treeId]
    const max = maxCount.value[treeId]
    for (let i = start; i <= max; i++) {
      setTimeout(() => {
        showCount.value[treeId] = i
        initData()
      }, (i-start) * 50)
      
    }
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

// interface iSlideElement {
//   entries: [];
//   collection_id: {};
//   coverId: string;
//   collections: iSlideElement[];
//   showEntries: boolean;
  
// }
enum NavSlideType {
  Entry,
  Set,
  Button,
  Spacer
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
  SwiperMousewheel,
  SwiperFreeMode,
  SwiperZoom,
  SwiperVirtual,
]);

const entries = ref([] as iMediaEntry[]);
//const slides = ref({} as iSlideElement);

const navSlider = ref({} as iNavSlider)
const swiperMain = ref({} as typeof Swiper);
const swiperNav = ref({} as typeof Swiper);

const activeEntryId = ref('' as string)
const activeSetId = ref('' as string)
//const lastActiveSetId = ref('' as string)
let lastActiveSetId = '' as string;
let lastActiveEntryId = '' as string;

const on_av_time_update = () => {
  
  const entryId = activeEntryId.value
  const avel = document.getElementById('slide-audio-'+ entryId) || document.getElementById('slide-video-'+ entryId)
  const progressEl = document.getElementById('av_progress')
  //console.error("progress for av elem" + avel + ":" + progressEl)
  //const progressBarEl = document.getElementById('progress_bar')
  if (avel && progressEl) {
    //console.error("progress for av elem" + avel.currentTime + ":" + avel.duration)
    progressEl.setAttribute('max', avel.duration)
    progressEl.setAttribute('value', avel.currentTime)
    progressEl.value = avel.currentTime
  } else {
    console.error("no progress or av elem")
  }
  
  //progressBarEl.style.width = Math.floor((avel.currentTime / avel.duration) * 100) + '%'
}

const data_theme = ref('')

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex;
    /* console.log("swiperMain changed slide: " + activeSlide) */
    const entry = entries.value[activeSlide]
    const colId = entry.collection_id
    activeEntryId.value = entry.id
    activeSetId.value = colId
    console.log("swiperMain changed slide: " + activeSlide
      + " entry " + entry.id // JSON.stringify(entry)
      + " colId " + colId) 
    const navIdx = navSlider.value.entryId2Idx[entry.id];


    
    const oael = document.getElementsByClassName('audio_player')
    for (let i=0; i < oael.length; i++) {
      const ael = oael[i]
      console.log("stop audio "+ ael.id)
      ael.pause()
      ael.removeEventListener('timeupdate', on_av_time_update)
    }
    const ovel = document.getElementsByClassName('video_player')
    for (let i=0; i < ovel.length; i++) {
      const vel = ovel[i]
      console.log("stop video "+ vel.id)
      vel.pause()
      vel.removeEventListener('timeupdate', on_av_time_update)
    }


    //const ael = document.getElementById('slide-audio-'+ entry.id)
    const vel = document.getElementById('slide-video-'+ entry.id)
    const avel = document.getElementById('slide-audio-'+ entry.id) || document.getElementById('slide-video-'+ entry.id)
    const progressEl = document.getElementById('av_progress')
    //const progressBarEl = document.getElementById('progress_bar')
    //console.error(" avel " + avel + " pEL: " + progressEl)
    if (avel && progressEl) {
      
      progressEl.setAttribute('max', avel.duration)
      progressEl.setAttribute('value', 0)
      avel.addEventListener('timeupdate', on_av_time_update)
      //showBottomNav.value = false
      if (!showInfo.value) {
        // auto play video
        if (vel && activeSlide !== 0) {
          toggleStatePlay(true)
        }
        show_av_control.value = true
        //showBottomNav.value = false
      }
      document.documentElement.setAttribute("data-theme", "dark");
      data_theme.value="dark"
    }
    else {
      show_av_control.value = false
      document.documentElement.setAttribute("data-theme", "");
      data_theme.value=""
    }
    
    if (lastActiveEntryId) {
      const lavel = document.getElementById('slide-audio-'+ lastActiveEntryId) 
        || document.getElementById('slide-video-'+ lastActiveEntryId)
      if (lavel && !avel && !showInfo.value) {

          console.error("last elem was audio or video, but current is not; info is not shown: show btm nav and hide av_control")
          show_av_control.value = false
          //showBottomNav.value = true
      }
    }

    // console.log("swiperMain changed slide: " + activeSlide
    //  // + " entry " + JSON.stringify(entry)
    //   + " colId " + colId
    //   + " nav Idx: " + navIdx )
    // reset all other showcounts, show all for active set
    if (lastActiveSetId.localeCompare(activeSetId.value) !== 0 ) {

      console.log(" changed active set id " + lastActiveSetId + ':' + activeSetId.value)
      for(const cid in showCount.value) {  
        showCount.value[cid] = Math.min( MIN_SHOW_COUNT, maxCount.value[cid])
      }
      showCount.value[colId] = maxCount.value[colId]
      initData()

    }
    lastActiveEntryId = activeEntryId.value
    lastActiveSetId = activeSetId.value

    setTimeout(() => {
      swiperNav.value.update()
      //swiperNav.value.updateSize()
      swiperNav.value?.slideTo(navIdx)
    },300)

    /*
    const sidx = navSlider.value.slides[navIdx].setIdx
    const sc = showCount.value[colId]
    const msc = maxCount.value[colId]
    if (sidx  >= (sc - 3)) {
      showCount.value[colId] = Math.min(sidx + 5,msc + 2)
    } else if (sidx < (sc-5)) {
      showCount.value[colId] = Math.max(sidx +5, 5)
    }
    */
    //swiperNav.value.update();
    //swiperNav.value?.slideTo(navIdx)
    
  }

const nav2Element = (el: iNavSlide) => {
  swiperMain.value.slideTo(el.mainIdx - 1)
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

  const btn_id2 = 'btns_spacer_' + treeId;
  navSlider.value.slides.push({
    entry: { id: btn_id2},
    entry_id: btn_id2,
    type:NavSlideType.Spacer,
    collection_id: treeId,
    index: navSlider.value.slides.length,
    setIdx: setIdx,
    mainIdx: 0,
  } as iNavSlide)
}

const MIN_SHOW_COUNT = 4
// TODO BUG: dont show reset btn if entry count is MIN_SHOW_COUNT
const initSetEntries = (parentId:string, setId:string, els):number => {
    let setIdx = 0
    let mx = 0;
    const toShow = showCount.value[setId] || MIN_SHOW_COUNT;
    // set elements
    for (const eId in els) {
      if (eId == '1162575d-557e-46ca-ad5b-007d0bca144d' || eId == 'e03bfb27-baa3-4d05-aa80-83f8b93f8efe') {
        console.error("ignore entry" + eId)
      } else {

      
      els[eId].collection_id = setId;
      // main swiper elems
      entries.value.push(els[eId]);

      if (setIdx < toShow) {

        const newSlide = {
          type:NavSlideType.Entry,
          entry: els[eId],
          entry_id: eId,
          cover_id: currentTree.value.edges[parentId][setId].coverId,
          collection_id: setId,
          index: navSlider.value.slides.length,
          setIdx: setIdx,
          mainIdx: entries.value.length
        } as iNavSlide;
        setIdx++
        navSlider.value.slides.push(newSlide)
        navSlider.value.entryId2Idx[eId] = newSlide.index  
      }
      mx++
      }
    }
    maxCount.value[setId] = mx
    return setIdx
}
const initSubTree = (rootId:string, treeId: string) => {
  console.log("initSubTree: " + treeId);
  showCount.value[rootId] = showCount.value[rootId] || MIN_SHOW_COUNT;
  showCount.value[treeId] = showCount.value[treeId] || MIN_SHOW_COUNT;

  // get root entries
  const rels = currentTree.value.edges[rootId][treeId].entries;
  const rels_count = initSetEntries(rootId, treeId, rels)
  
  // button
  if (Object.keys(rels).length ) {
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
  /* nav_grow_width.value = true
  setTimeout(() => {
    nav_grow_width.value = false
  },1000) */
};

//const nav_grow_width = ref(true);

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

        console.error("no useTree yet, retry later")
        setTimeout(() => {    
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

    if (setid.value) {
        parent_id.value = currentTree.value.up[setid.value]
        console.log(" got parent_id for set: " + parent_id.value)

        path2root.value = []
        let colid = setid.value
        while(currentTree.value.up[colid]) {
            path2root.value.push(colid)
            colid = currentTree.value.up[colid]
        }
        path2root.value = path2root.value.reverse()
        
        console.log(" got path2root for set: " + path2root.value)
        
    } else {
      parent_id.value = RID
      setid.value = treeid.value
    }
    initSubTree(parent_id.value, setid.value)
        //activeSetId.value = setid.value
}

const showSetTitle = ref(false)

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "");
  initData();


  // switch to first slide, init all vars
  setTimeout(() => {
    activeEntryId.value = entries.value[0].id
    activeSetId.value = setid.value
    clickedNavShowMore(activeSetId.value)
    //swiperMain.value.slideTo(1)
    swiperMain.value.slideTo(0)
    //swiperNav.value.slideTo(0)

    onMainSwiperSlideChanged()
    
  },200)
  // init sub set state and btns visually
  let maxIdx = 0;
  navSlider.value.slides.forEach((el, idx) => {
    setTimeout(() => {
      activeSetId.value = el.collection_id
    }, idx * 10)
    maxIdx = idx
  })
  setTimeout(() => {
    activeSetId.value = setid.value
  }, maxIdx * 10)


  // intro animation
  setTimeout(() => {
    animateSwitch2SetList.value = false
  },250)

  // intro show title
  showSetTitle.value = true;
  
})

const swiperNavBtnHoverRight = ref(false)
const swiperNavBtnHoverLeft = ref(false)
const handleMouseMove = (event) => {
  const ex = event.clientX;
  const div = showInfo.value ? 4 : 2;
  const midx = window.innerWidth / div;
  if (ex > midx) {
    swiperNavBtnHoverLeft.value = false
    swiperNavBtnHoverRight.value = true
  } else {
    swiperNavBtnHoverLeft.value = true
    swiperNavBtnHoverRight.value = false
  }
}
const handleMouseLeave = () => {
  swiperNavBtnHoverLeft.value = false
  swiperNavBtnHoverRight.value = false
}


</script>
<style scoped>

.setview_page {
  position: fixed;
  top: 0px; left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: var(--Colors-background-default, #F3F2EF);  
  transition: all 300ms ease-out;
  /* background: var(--background-default, #F3F2EF); */
}


.swiper_main {
  /* border: 1px solid red; */
  position: fixed;
  
  left: 0px;
  width: 100vw;
  top: 80px;
  height: calc(100vh - 280px);

  margin: 0px 0px;
  opacity: 1;
  /* transition: all 450ms linear 50ms ; */
  
}

.swiper_main.zoom {
  top: 0px;
  height: 100vh;
  transition: all 500ms ease-out;
}

.swiper-slide.main_slide {
  /* border: 1px solid blue; */
  align-items: center;
  justify-content: center;
}
.swiper-slide .swiper-slide-transform {
  /* width: 100%; */
  height: 100%;
}
.main_preview {
  /* border: 1px solid green; */
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
  transition: all 500ms linear;
}
.swiper_main.hidden .main_preview {
  transition: opacity 300ms ease-out;
  opacity: 0;
}
.video_slide {
  position:absolute;
  /* TODO gleiche hoehe wie img slide */
  /* top: 88px; bottom: 128px; */
  height: 100%;
  width: 100%;
  margin: auto;  
}
.audio_slide {
  /* TODO gleiche hoehe wie img slide */
  width: 100%;
  height: 100%;
  margin: auto;
}
.audio_player {

}
.audio_slide_icon {
  /* border: 1px solid red; */
  position: absolute;
  top: calc(50% - 98px);
  left: calc(50% - 60px);
  width: 120px;
  height: 196px;
}
.audio_slide_title {
  /* border: 1px solid green; */
  position: absolute;
  top: calc(50% - 12px);
  left: 25%;
  width: 50%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--Colors-text-primary, #2C2C2C)  
}


.info_active {
  transition: all 500ms linear;
}
.swiper_main.info_active {
  /* border: 1px solid red; */
  transition: all 500ms linear;
  
  /* height: 90vh; */
}
.swiper_main.info_active .main_preview {
  /* border: 1px solid red; */
  position: absolute;
  left: 48px;
  top: 10vh;
  height: 74vh;
  width: calc(50vw - 96px);
  transition: all 500ms linear;
}

.entry_info {
  z-index: 10;
  /* border: 1px solid blue; */
  background-color: var(--Colors-background-default);
  transition: all 500ms linear;
}
.entry_info.hidden {
  transform: translateX(50vw);
  transition: all 500ms linear;
}


.bottom_nav {
  /* border: 1px solid blue; */
  position: fixed;
  left: 0px;
  width: calc(100vw - 192px);
  /* background-color: var(--Primitives-color-greys-UltraLightGrey, #F3F2EF); */
  bottom: 24px;
  height: 144px;
  z-index: 100;
  transition: all 500ms linear;
}
.bottom_nav.hidden {
  opacity: 0;
  width: 0px;
  visibility: hidden;
}
.av_control {
  display: block;
  /* border: 1px solid green; */
  position: fixed;
  left: 0px;
  width: calc(100vw - 96px);
  bottom:58px;
  left: 88px;
  /* height: 6rem; */
  z-index: 100;
  /* background-color: var(--Colors-btm-bar-playerView-background); */
  color: var(--Colors-btm-bar-playerView-button, #2C2C2C);
  transition: transform 300ms ease-out;
}
.av_control.hidden {
  transform: translateY(128px);
}
.av_control * {
  float: left;
}

.av_control .av_progress_cont {
  width: 100%;

  display: flex;
  width: calc(100% - 96px);
  
  height: 24px;
  padding: 12px;
  align-items: center;
  flex-shrink: 0;
  
  background: transparent;
  /* Blur */
  backdrop-filter: blur(calc(var(--value-pills, 30px) / 2));
}

.av_progress_cont progress {
  border-radius: 50px;
  appearance: none;
  width: 100%; height: 24px;
  
}
.av_progress_cont progress::-webkit-progress-bar {
  border-radius: 50px;
  background-color: var(--Colors-btm-bar-playerView-progress, #CAC9C2);
}
.av_progress_cont progress::-webkit-progress-value {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: var(--Colors-btm-bar-playerView-background, rgba(0, 0, 0, 0.10));
}

.swiper_nav {
  /* border: 1px solid red; */
  
  width: 100%;
  height: 144px;
  position: absolute;
  top: 0px;
  left: 96px;
  transition: all 500ms ease-out;
  overflow: visible;
}
.swiper_nav.hidden {
  visibility: hidden;
  transform: translateY(180px);
  /* top: 180px; */
}
.nav_slide {
  width: fit-content !important;
  height: 95px;
  margin-top: 24px;
  /* margin: var(--padding-item-vertical-M, 12px) 0px; */
  margin-left: -4px;
  
  border-top: var(--padding-item-vertical-M, 12px) solid var(--Colors-btm-bar-galleryView-gradient-default-stop-1);
  border-left: var(--spacing-between-items-S, 12px) solid var(--Colors-btm-bar-galleryView-gradient-default-stop-1);
  border-bottom: var(--spacing-between-items-S, 12px) solid var(--Colors-btm-bar-galleryView-gradient-default-stop-1);

}

.set_highlight {
  background-color: var(--btm-bar-galleryView-set-hover, var(--Colors-btm-bar-galleryView-gradient-hover-stop-1 ,#E7E6E1));
  /* padding: var(--padding-item-vertical-M, 12px) -4px; */
  border-top: var(--padding-item-vertical-M, 12px) solid var(--Colors-btm-bar-galleryView-gradient-hover-stop-1 ,#E7E6E1);
  border-bottom: var(--padding-item-vertical-M, 12px) solid var(--Colors-btm-bar-galleryView-gradient-hover-stop-1 ,#E7E6E1);
  border-left: var(--spacing-between-items-S, 12px) solid var(--Colors-btm-bar-galleryView-gradient-hover-stop-1 ,#E7E6E1);
  transition: width 500ms ease-out;
}

/* .grow_slides {
  width: 1px !important;
  transition: width 300ms;
} */
.entry_highlight {
  position: absolute;
  top: 36px;
  left: 24px;
  width: 24px; height: 24px;
}
.entry_highlight svg {
  width: 100%; height: 100%;
  border-radius: var(--radius-full, 9999px);
  box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.1);
}

.entry_highlight svg * {
  fill: var(--btm-bar-thumbnail-active, #FFF);
  stroke: none;
}



.nav_preview {
  margin: 0 0;
  width: 72px;
  height: var(--margin-body-margin,96px);
  /* border: 1px solid black; */
  
  /* background-color: var(--Primitives-color-greys-UltraLightGrey, #F3F2EF); */
  /* background-size: 120% 100%; */
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.nav_preview.narrow {
  background-size: 100% auto;
}
.nav_preview_audio {
  background-color: #DAD6CE;
  display: flex;
  width: 72px;
  height: var(--margin-body-margin, 96px);
    
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  color: var(--Primitives-color-greys-ORCBlack, #2C2C2C);

  font-family: "Instrument Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-subline-line-height, 24px); /* 171.429% */
  
  padding-top: 0px;
  transition: all 500ms ease-out;
}
.nav_preview_audio_highlight {
  height: calc(var(--margin-body-margin, 96px) - 54px);
  padding-top: 54px;
}

.nav_preview_col_title {
  user-select: none;
  position: relative;
  top: -40px;
  font-size: 16px;
  left: -12px;
  overflow: clip;
  
  width: 80vw;
  height: 28px;
  color: var(--Colors-text-primary, #2C2C2C);
}




.nav_btns {
  
  height: 100%;
}
.nav_slide_btns {
  width: 36px !important;
  padding-right: var(--margin-btmbar-betweensets, 4px);
  background-color: var(--Colors-btm-bar-galleryView-gradient-default-stop-1, #F3F2EF);
}
.nav_slide_btns.set_highlight {
  background-color: var(--Colors-btm-bar-galleryView-gradient-hover-stop-1, #F3F2EF);
}
.nav_slide_btn_add {
  width: 0px !important;
  
}
.nav_preview_btn {
  position: relative;
  padding-top: 36px;
}
.nav_slide_btn_add .nav_preview_btn {
  top: -12px;
  left: -56px; 
  width: 64px;
  /* padding-left: 24px; */
  height: 84px;
  background: linear-gradient(90deg,
  var(--Colors-btm-bar-galleryView-gradient-default-stop-2, rgba(243,242,239,0.0)) 0%,
  var(--Colors-btm-bar-galleryView-gradient-default-stop-1, #f3f2ef) 25%,
  var(--Colors-btm-bar-galleryView-gradient-default-stop-1, #f3f2ef) 100%);
}
.nav_slide_btn_add .nav_preview_btn .icon-wrap {
  position: relative;
  top: 12px;
  left: 24px;
}
.set_highlight.nav_slide_btn_add .nav_preview_btn {
  background: linear-gradient(90deg,
   var(--Colors-btm-bar-galleryView-gradient-hover-stop-2, rgba(231,230,225,0)) 0%,
   var(--Colors-btm-bar-galleryView-gradient-hover-stop-1, #E7E6E1) 25%,
   var(--Colors-btm-bar-galleryView-gradient-hover-stop-1, #E7E6E1) 100%);
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

.nav_preview_spacer {
  top: -12px;
  width: 0px !important;
  position: relative;
  
  height: calc(100% + 16px);
  background-color: transparent;
  border: 4px solid var(--Colors-background-default, #f3f2ef);
}
.nav_preview_spacer:hover {

}

.nav_preview_subset {
  cursor: pointer;
  float: left;
  position: relative;
  top: 0.5rem; 
  width: 32px; height: 32px;
  margin: 2px 0.5px;
  background-size: 120% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
}



.btn_bottom_nav_hide {
  position: relative;
  top: 60px;
  left: 24px;
  width: 48px; height: 48px;

  cursor: pointer;
  user-select: none;
  

  z-index: 120;
  /* border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2); */
  border-radius: var(--radius-full, 9999px);
  /* TODO color vars */
  background: var(--color-blurs-project-img-blur, rgba(243, 242, 239, 0.30));
  backdrop-filter: blur(10px);

  display: flex;
  width: var(--dimension-icon-size-L, 32px);
  height: var(--dimension-icon-size-L, 32px);
  padding: var(--margin-navbar-institution-logo-right, 10px);
  justify-content: center;
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);
  flex-shrink: 0;
}

/*
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s linear;
}
.rotate-enter-to {
  transform: rotate(90deg);
  opacity: 1;
}
.rotate-leave-to {
  transform: rotate(90deg);
  opacity: 0.15;
}

.rotatel-enter-active,
.rotatel-leave-active {
  
  transition: all 0.5s linear;
}
.rotatel-enter-to {
  transform: rotate(-90deg);
  opacity: 1;
}
.rotatel-leave-to {
  transform: rotate(-90deg);
  opacity: 0.15;
}
*/

.fade-rotate-enter-active,
.fade-rotate-leave-active {
  transition: all 0.5s linear;
}
.fade-rotate-enter-to {
  transform-origin: 0 0;
  transform: rotate(0deg);
  opacity: 1;
}
.fade-rotate-leave-to {
  transform-origin: 24px 0;
  transform: rotate(90deg);
  opacity: 0;
}

/* TODO larger click area */
.swiper-main-button-prev,
.swiper-main-button-next 
{
  position: fixed;
  top: calc(45vh - 24px);

  display: flex;
  width: 48px;
  height: 48px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);
  flex-shrink: 0;

  cursor: pointer;
  z-index: 10;
}

/* TODO swiper main nav btn position */
.swiper-main-button-prev {
  
  left: 24px;
}
.swiper-main-button-next {
  right: 24px;
}
.swiper_main.info_active .swiper-main-button-prev {
  /* top: calc(50% - 24px); */
  left: 62px;
}
.swiper_main.info_active .swiper-main-button-next {
  /* top: calc(50% - 24px); */
  right: calc(50vw + 62px);
}

.swiper-button-disabled {
  visibility: hidden;

}
.swiper-main-button-prev:hover,
.swiper-main-button-next:hover {
  /* cursor: pointer; */
  /* opacity: 1; */
}

.entry_info_title {
  user-select: none;

  z-index: 20;
  position: fixed;
  top: 2.5rem;
  left: 10vw;
  width: 80vw;
  text-align: center;
  align-content: center;
  font-size: 3rem;
  line-height: 3rem;

  color: var(--Colors-text-primary, #fff);
  opacity: 1;
  
  
  transition: transform 300ms ease-in;
  transition: opacity 500ms ease-in;
  transition: all 500ms ease-in;
}
.entry_info_title.fade_hidden {
  transition: opacity 200ms linear;
  opacity: 0;
}
.entry_info_title.move_up_hidden {
  transition: transform 300ms ease-in;
  transform: translateY(-128px);
}

.unblur-enter-active {
  transition: all 50ms ease-out;
}
.unblur-leave-active {
  transition: all 400ms ease-out;
}
.unblur-enter-to {
  filter: blur(25px);
  backdrop-filter: blur(25px);
  /* opacity: 1; */
}
.unblur-leave-to {
  filter: blur(0px);
  /* opacity: 0; */
  backdrop-filter: blur(0px);
}

</style>

