<template>
  <div class="setview_page">
  <!-- TODO mobile theme: different layout meta-data (animations); -->
    <SetViewHeader 
      :settype="settype"
      :treeid="treeid"
      :setid="setid"
      :active-set-id="activeSetId"
      :parent-set-id="parent_id"

      :show-info="showInfo"
      :intro-running="showSetTitle"
      :hide-nav="animate_view_io || showFilterView"
      
      :titles-map="currentTree.colTitlesMap"
      :theme="data_theme"
      :path-to-root="path2root"
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
        hidden: animate_view_io,
        info_active: showInfo,
        zoom: !showBottomNav,
        nozoom: showBottomNav
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

        <div v-if="el.isSubSet == true"
          class="main_preview_subset"
          tabindex="0"
          @click="switch2Set(el.sub_set_id)">
          <div class="subset_tiles"></div>
          <div class="subset_tiles"></div>
          <div class="subset_tiles"></div>
          <div class="subset_tiles"></div>
          
          <!-- TODO style -->
          <div class="subset_content">
            <div class="subset_title">
              {{getAbbrevColTitle(el.sub_set_id)}}
            </div>
            <button class="subset_btn">
              <span>Open Set</span>
              <!-- TODO icon -->
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </span>
            </button>
            
          </div>
        </div>
        <!-- <div class="swiper-slide-transform"> -->
        <div v-else-if="currentTree.previewsAudio[el.id]"
          class="main_preview">
          <div class="audio_slide"
            tabindex="0"
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
            tabindex="0"
            @click="toggleStatePlay(!av_state_play)"
            >
            <source v-for="url in previewVideoUrls(el.id)" :src="url">
          </video>
        </div>
        <div v-else-if="currentTree.previewsLarge[el.id] && currentTree.previewsLarge[el.id].media_type == 'document'">
          TODO docs
        </div>
        <div v-else-if="currentTree.previewsLarge[el.id] && currentTree.previewsLarge[el.id].media_type == 'image'"
          class="main_preview">
          <div
            class="image_slide" 
            :style="{ 'background-image': 'url(\'' + previewLargeUrl(el.id) + '\')' }">
          </div>
        </div>
        
        <!-- HH: könnte auch mit der neuen Funktion !hasPreview(el.entry_id) abgefragt werden 
         die wir für die bottom bar brauchen (denke ich). -->
        <div v-else
          class="unknown_filetype_slide">
          <div class="slide_icon">
            <IconsFileIcon />
          </div>
          
        </div>
      <!-- </div> -->
        
      </swiper-slide>
      <div class="swiper-main-button-prev"
        v-if="!isMobile"
        :class="{'swiper-button-disabled': swiperNavBtnHoverLeft == false || meta_info_ani || activeEntryIndex == 0 }"
        tabindex="0"
        @click.once="swiperMain.slidePrev()">
        <IconsSliderArrowLeft/>
      </div>
      <div class="swiper-main-button-next"
        v-if="!isMobile"
        :class="{'swiper-button-disabled': swiperNavBtnHoverRight == false || meta_info_ani || activeEntryIndex >= (entries.length-1) }"
        tabindex="0"
        @click.once="swiperMain.slideNext()">
        <IconsSliderArrowRight/>
      </div>
    </swiper>

<!-- TODO mobile theme: layout and animation meta-data -->
    <EntryAndSetInfo
      v-if="currentTree && currentTree.colTitlesMap &&  !entries[activeEntryIndex].isSubSet"
      :class="{hidden: !showInfo}"
      :active-entry-id="activeEntryId"
      :active-set-id="activeSetId"
      :current-tree="currentTree"
      :parent-set-id="setid"
      @scrollPosChanged="entryInfoScrollPosChanged"
      @added-filter="addedFilter"
    />

    <!-- class="btn_bottom_nav_hide" -->
    <Transition name="fade">
      <div
        v-if="!showInfo && !animate_view_io"
        tabindex="0"
        @click="toggleShowBottomNav()"
        class="btn_bottom_nav_toggle">
        <IconsBtmBarFoldPlusMinus :show-plus="!showBottomNav || show_av_control" />
      </div>
    </Transition>
<!-- TODO broken fade transition?? -->
    <div class="bottom_nav" 
    :class="{hidden: !showBottomNav || showInfo || animate_view_io || showSetTitle || show_av_control }"
      >
      <!-- <Transition name="fade">
        <div
          v-if="!showInfo && !animate_view_io"
          @click="toggleShowBottomNav()"
          class="btn_bottom_nav_hide">
          <IconsBtmBarFoldPlusMinus :show-plus="!showBottomNav || show_av_control" />
        </div>
      </Transition> -->
      <!-- TODO mobile theme: bottom bar slider -->
      <swiper
        :modules="modules"
        class="swiper_nav"
        :class="{hidden: !showBottomNav || showInfo || animate_view_io || showSetTitle || show_av_control }"
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
          
          <!-- :title="'E: \n' + el.index + ':\n' + JSON.stringify(el)" -->
          <div
            v-if="el.type === NavSlideType.Entry"
            class="nav_preview"
            tabindex="0"
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
              :style="{width: ((getShowCount(el.collection_id)) * 72) + 'px'}">
              {{getColTitle(el.collection_id)}}
            </div>

            <!-- HH: Hier brauchen wir eine neue Funktion (denke ich), 
             die abfragt, ob ein Eintrag überhaupt ein Preview hat. -->
            <div v-if="!hasPreview(el.entry_id)"
              class="unknown_filetype_bottom_bar">
              <div class="bottom_bar_icon">
                <IconsFileIcon />
              </div>
            </div>
          </div>
          <!-- :title="'E: ' + JSON.stringify(el)" -->
          <div
            class="nav_preview nav_set"
            v-if="el.type === NavSlideType.Set"
            tabindex="0"
            @click="nav2Element(el)"
            >
            <!-- :style="{ 'background-image': 'url(\'' + previewUrl(ceId) + '\')' }" -->
            <div class="nav_preview_subset"
              v-for="ceId in el.cover_entry_ids" :key="ceId">
              
            </div>
          </div>
          <!-- show more/less btns -->          
          <!-- :title="'E: \n' + el.index + ':\n' + JSON.stringify(el)" -->
          <div
            v-if="el.type === NavSlideType.Button"
            v-show="maxCount[el.collection_id] > MIN_SHOW_COUNT"
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
          <!-- spacer element -->
          <!-- :title="'E: \n' + el.index + ':\n' + JSON.stringify(el)" -->
          <div
            v-if="el.type === NavSlideType.Spacer"
            class="nav_preview_spacer"
            
            >
          </div>
          <!-- highlight current element -->
          <div class="entry_highlight"
            v-if="isNavSlideHighlight(el)">
            <IconsEntryHighlight />
          </div>

        </swiper-slide>
      </swiper>
  </div>

  <div class="av_control" 
    :class="{hidden: !show_av_control || showInfo || showSetTitle}">
    <div class="av_control_playpause"
      tabindex="0"
      @click="toggleStatePlay(!av_state_play)">
      <IconsPlayPause :isPlay="av_state_play"
      />
    </div>
    <div class="av_control_mute"
      v-if="av_state_show_mute"
      @click="toggleStateMute(!av_state_mute)">
      <IconsMute :isMute="av_state_mute"
      />
    </div>
    <div class="av_progress_cont" tabindex="0">
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
          :show-meta-key="filterShowMetaKey"
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
const runtimeConfig = useRuntimeConfig()
const route = useRoute();
const router = useRouter();
const {
    RID,
    MATCH_PROJECTS,
    FILTERS_ROLES,
    filteredTreeList,
    newFiltersMap,
    filtersMap
} = treeHelper()

//TODO runtime conf
const { apiConfig } = apiHelper()
const apiBaseUrl = apiConfig.baseUrl + '/api-v2/'


const isMobile = ref(false)

const useTree = useState("tree");

//TODO watch resolution change

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

const isNavSlideHighlight = (el:iNavSlide) => {
  const result = (el.entry_id == activeEntryId.value)
    
  return result
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

const clickedParent = (col_id: string) => {
  
  if (col_id == activeSetId.value) {
    const idx = entries.value.findIndex( (elem) => { return elem.collection_id == col_id})
    console.log(" for active found idx " + idx)
    // TODO slide to subslide elem
    swiperMain.value.slideTo(idx)
  }
  else if (col_id == setid.value) {
    swiperMain.value.slideTo(0)
  }
  else //if (col_id == parent_id.value) 
  {
    switch2Set(col_id)
  }
}

const showFilterView = ref(false)
const filterShowMetaKey = ref('')
const addedFilter = (type, data) => {
  
  newFiltersMap.value = {}
  newFiltersMap.value[type] = {}
  if (type == FILTERS_ROLES) {
    //TODO dont use person.id it is not really correct
    newFiltersMap.value[type][data.person.id] = {
      id: data.person.id,
      treeId: treeid.value,
      name: data.person.first_name + ' ' + data.person.last_name,
      //TODO roles is missing meta_key_id
      //meta_key: data.meta_key_id
      //TODO this is a fake fix, but we have only one role meta-data
      meta_key: 'creative_work:other_creative_participants'
    }
  } else {
    newFiltersMap.value[type][data.id] = {
      id: data.id,
      name: data.term,
      meta_key: data.meta_key_id
    }
    
    
  }
  filterShowMetaKey.value = data.meta_key_id
  showFilterView.value = true;
  //console.error("new filters map: " + JSON.stringify(newFiltersMap.value))
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

  //console.error("onFilterViewApplied: filter map: new: " + JSON.stringify(newFiltersMap.value))
  //console.error("onFilterViewApplied: filter map: old: " + JSON.stringify(filtersMap.value))
  

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

const toggleStateMute = (newState:boolean) => {
  av_state_mute.value = newState
  const entryId = activeEntryId.value
  const avel = document.getElementById('slide-audio-'+ entryId) || document.getElementById('slide-video-'+ entryId)
  if (avel) {
    if (newState) avel.volume = 0
    else avel.volume = 1
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
      (ev.pageX - progressEl?.offsetLeft - progressEl?.offsetParent?.offsetLeft) /
    progressEl?.offsetWidth;
  avel.currentTime = pos * avel.duration;
}

const getAbbrevColTitle = (setid: string): string => {
    
    if (!currentTree.value || !currentTree.value.colTitlesMap) {
      return ""
    }
    const title = currentTree.value.colTitlesMap[setid]
    const max = runtimeConfig.public.SET_VIEW_PROJECT_TITLE_MAX_LENGTH
    if (title.length > max) {
      return title.substring(0, max) + '...'
    }
    return title
}

const showCount = ref({} as { [key:string]: number})
const maxCount = ref({} as { [key:string]: number})

const getNavSlideClass = (el:iSlideElement):object => {
  const col_id = el.collection_id
  const parent_id = currentTree.value.up[col_id]
  const max_count = maxCount.value[col_id]
  const show_count = showCount.value[col_id]
  const result = {
    set_highlight:
      (activeSetId.value == col_id || hoverSetId.value == col_id
        || activeSetId.value == parent_id || hoverSetId.value == parent_id
      )
      && treeid.value !== col_id,
    nav_slide_btns: el.type == NavSlideType.Button && max_count >= MIN_SHOW_COUNT,
    nav_slide_btn_add: el.type == NavSlideType.Button && show_count < max_count && max_count >= MIN_SHOW_COUNT,
    nav_slide_btn_reset: el.type == NavSlideType.Button && show_count == max_count && max_count >= MIN_SHOW_COUNT,
  }
  return result
}

// const getNavSlideParentClass = (el:iSlideElement):object => {
//   const child_id = el.collection_id
//   const col_id = currentTree.value.up[child_id]
//   console.log(" parent id " + col_id)
//   const max_count = maxCount.value[col_id]
//   const show_count = showCount.value[col_id]
//   const result = {
//     set_highlight: (activeSetId.value == col_id || hoverSetId.value == col_id) && treeid.value !== col_id,
//   }
//   return result
// }
const showBottomNav = ref(true)
const show_av_control = ref(false)

const showInfo = ref(false)

const DELAY_META_INFO_TRIGGER_SWIPER_RESIZE = 600

const meta_info_ani = ref(false)
const toggleShowInfo = () => {
  meta_info_ani.value = true;
  showInfo.value = !showInfo.value
  if (showInfo.value && !entry_info_hidden) {
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

// HH: Prüft, ob überhaupt ein Preview für einen Eintrag vorhanden ist.
const hasPreview = (entryId: string): boolean => {
  if (!currentTree.value) return false;
  
  return entryId in currentTree.value.previews ||
         entryId in currentTree.value.previewsLarge ||
         entryId in currentTree.value.previewsAudio ||
         entryId in currentTree.value.previewsVideo;
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
  if (currentTree.value.previewsVideo[eId]) {

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

const animate_view_io = ref(true)

const switch2setlist = () => {
  if (useRuntimeConfig().public.kioskSetId) {
    // TODO show menu
    const url = '/setview/' 
    + settype.value
    + '/'
    + treeid.value
    + '/'
    + treeid.value
  console.log("switch 2 kiosk set: " + treeid.value + ":" + url)
  router.push(url)
  } else {
    animate_view_io.value = true
    setTimeout(() => {
      const url = '/setlist/' + settype.value
      console.log("switch2setlist: " + settype.value + ":" + url)
      router.push(url)
    },200)
  }
  
  
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


const av_state_show_mute = ref(false)
const av_state_mute = ref(false)

const on_av_time_update = () => {
  
  const entryId = activeEntryId.value
  const avel = document.getElementById('slide-audio-'+ entryId) || document.getElementById('slide-video-'+ entryId)
  const progressEl = document.getElementById('av_progress')
  //console.error("progress for av elem" + avel + ":" + progressEl)
  
  if (avel && progressEl) {
    //console.error("progress for av elem" + avel.currentTime + ":" + avel.duration)
    progressEl.setAttribute('max', avel.duration)
    progressEl.setAttribute('value', avel.currentTime)
    progressEl.value = avel.currentTime
  } else {
    console.error("no progress or av elem")
  }
  //const progressBarEl = document.getElementById('progress_bar')
  //progressBarEl.style.width = Math.floor((avel.currentTime / avel.duration) * 100) + '%'
}

const data_theme = ref('')
const activeEntryIndex = ref(0)

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex;
    activeEntryIndex.value = activeSlide
    /* console.log("swiperMain changed slide: " + activeSlide) */
    const entry = entries.value[activeSlide]
    const colId = entry.collection_id
    activeEntryId.value = entry.id
    activeSetId.value = colId
    const navIdx = navSlider.value.entryId2Idx[entry.id];
    console.error("swiperMain changed slide: " + activeSlide
      + " entry " + entry.id // JSON.stringify(entry)
      + " colId " + colId
      + " navIdx " + navIdx) 
    


    
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

    av_state_play.value = false

    setTimeout(() => {

      const vel = document.getElementById('slide-video-'+ entry.id)
      const ael = document.getElementById('slide-audio-'+ entry.id)
      const avel = document.getElementById('slide-audio-'+ entry.id) || document.getElementById('slide-video-'+ entry.id)
      const progressEl = document.getElementById('av_progress')
      //const progressBarEl = document.getElementById('progress_bar')
      console.error(" avel " + avel + " pEL: " + progressEl)
      if (avel && progressEl) {
        
        progressEl.setAttribute('max', avel.duration)
        progressEl.setAttribute('value', 0)
        avel.addEventListener('timeupdate', on_av_time_update)
        //showBottomNav.value = false
        if (!showInfo.value) {
          // auto play video
          if (vel) {
            if (activeSlide !== 0) {
              toggleStatePlay(true)
            }
            av_state_show_mute.value = true
            av_state_mute.value = true
            toggleStateMute(true)
            
          }
          if (ael) {
            av_state_play.value = false
            av_state_show_mute.value = false
            av_state_mute.value = true
          }
          show_av_control.value = true
          //showBottomNav.value = false
        }
        console.error("is an av element for entry: " + entry.id)
        document.documentElement.setAttribute("data-theme", "dark");
        data_theme.value="dark"
      }
      else {
        console.error("not an av element for entry: " + entry.id)
        show_av_control.value = false
        document.documentElement.setAttribute("data-theme", "light");
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

    },50)

    setTimeout(() => {
      swiperNav.value.update()
      swiperNav.value?.slideTo(navIdx)
    },300)
    
  }

const nav2Element = (el: iNavSlide) => {
  swiperMain.value.slideTo(el.mainIdx - 1)
  swiperNav.value.slideTo(el.index)
  onMainSwiperSlideChanged()
}

const setMainSwiper = (swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
};

const setNavSwiper = (swiper) => {
  swiperNav.value = swiper;
};

const NAV_SUBSUBSET_PREFIX = 'subsubset_'

const initSubSetPreview = (childId:string, subChildId:string) => {
  const subEntries = currentTree.value.edges[childId][subChildId].entries;
  // main swiper
  const dummySlide = {
    id: NAV_SUBSUBSET_PREFIX + subChildId,
    collection_id: childId,
    sub_set_id: subChildId,
    isSubSet: true,
    mainIdx: entries.value.length
  }
  entries.value.push(dummySlide);
  // nav swiper
  const newSubSlide = {
    type:NavSlideType.Set,
    entry: undefined as unknown as iMediaEntry,
    entry_id: NAV_SUBSUBSET_PREFIX + subChildId,
    cover_id: "" + currentTree.value.edges[childId][subChildId].coverId,
    cover_entry_ids: [] as string[],
    collection_id: subChildId,
    index: navSlider.value.slides.length,
    setIdx: 0,
    mainIdx: entries.value.length
  } as iNavSlide
  /* no more real preview */
  let sec = 0;
  for (const subEntryId in subEntries) {
    newSubSlide.cover_entry_ids.push(subEntryId)
    sec++
    if (sec > 3) {
      break
    }
  }
  navSlider.value.slides.push(newSubSlide)
  navSlider.value.entryId2Idx[dummySlide.id] = newSubSlide.index
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
const initSetEntries = (parentId:string, setId:string, els, arcs):number => {
    let setIdx = 0
    let mx = 0;
    const toShow = showCount.value[setId] || MIN_SHOW_COUNT;

    // cover entry first
    const cover_id = currentTree.value.edges[parentId][setId].coverId;
    if (!cover_id || !els[cover_id]) {
      console.error("initSetEntries: no cover_id for set: " + setId)
    } else {
      els[cover_id].collection_id = setId;
      // main swiper elems
      entries.value.push(els[cover_id]);

      const newSlide = {
        type:NavSlideType.Entry,
        entry: els[cover_id],
        entry_id: cover_id,
        cover_id: currentTree.value.edges[parentId][setId].coverId,
        collection_id: setId,
        index: navSlider.value.slides.length,
        setIdx: setIdx,
        mainIdx: entries.value.length
      } as iNavSlide;
      setIdx++
      navSlider.value.slides.push(newSlide)
      navSlider.value.entryId2Idx[cover_id] = newSlide.index
      mx++
    }


    // set elements
    // collections order by arcs
    arcs.forEach(arc => {
      const eId = arc.media_entry_id
      if (!els[eId]) {
        console.error("invalid me " + eId)
      } else
      //TODO is this still needed: remove this
      if (eId == '1162575d-557e-46ca-ad5b-007d0bca144d' || eId == 'e03bfb27-baa3-4d05-aa80-83f8b93f8efe') {
        console.error("ignore entry" + eId)
      } else if (eId == cover_id) {
        console.error("ignore entry as used as cover: " + eId)
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
    });
    maxCount.value[setId] = mx
    return setIdx
}
const initSubTree = (rootId:string, treeId: string) => {
  console.log("initSubTree: " + treeId);
  showCount.value[rootId] = showCount.value[rootId] || MIN_SHOW_COUNT;
  showCount.value[treeId] = showCount.value[treeId] || MIN_SHOW_COUNT;

  // get root entries
  const rels = currentTree.value.edges[rootId][treeId].entries;
  const arcs = currentTree.value.edges[rootId][treeId].arcs;
  const rels_count = initSetEntries(rootId, treeId, rels, arcs)
  
  // button
  if (Object.keys(rels).length ) {
    initSetBtns(treeId, rels_count)
  }

  // get child set entries
  for (const childId in currentTree.value.edges[treeId]) {
    const els = currentTree.value.edges[treeId][childId].entries;
    const arcs = currentTree.value.edges[treeId][childId].arcs;
    const els_count = initSetEntries(treeId, childId, els, arcs)

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
  document.documentElement.setAttribute("data-theme", "light");
  isMobile.value = (document.documentElement.getAttribute('data-layout') == "mobile")
  initData();


  // intro show title animation
  showSetTitle.value = true;

  // intro animation
  setTimeout(() => {
    animate_view_io.value = false
  },250)
 
  // init sub set state and btns visually
  let maxIdx = 0;
  navSlider.value.slides.forEach((el, idx) => {
    setTimeout(() => {
      activeSetId.value = el.collection_id
    }, idx * 10)
    maxIdx = idx + 1
  })

  // switch to first slide, init all vars
  setTimeout(() => {
    activeEntryId.value = entries.value[0].id
    activeSetId.value = setid.value
    clickedNavShowMore(activeSetId.value)
    swiperMain.value.slideTo(0)
    swiperNav.value.slideTo(0)
    onMainSwiperSlideChanged()
  }, maxIdx * 10)
  
})

onBeforeUnmount(() => {
  console.log("setView: onBeforeUnmount: ")

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
  /* transition: all 300ms ease-out; */
  transition: background-color 300ms ease-out;
}

.swiper_main {
  /* HH to correctly position prev-nex-arrows */
  --margin-top-swiper: 80px;

  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  top: 0px;
  margin: 0px;
  opacity: 1;
}

.swiper-slide.main_slide {
  /* border: 1px solid blue; */
  align-items: center;
  justify-content: center;
}
.swiper-slide .swiper-slide-transform {
  /* width: 100%; */
  /* height: 100%; */
}

.main_preview {
  /* border: 1px solid green; */
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-size: contain;
  background-position: center;
  background-repeat: no-repeat; */
  opacity: 1;
  /* transition: all 300ms ease-in; */
}

.image_slide {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 300ms linear;
}

/* HH TODO video_slide Höhe begrenzen wenn controls open */
/* Umschalter der bottom nav hat momentan noch Probleme */
.video_slide,
.audio_slide {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 300ms linear;
}
.main_preview_subset {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 80%;
}
/*
.main_preview_subset div {
  
  display: block;
  float: left;
  
  width: 46%;
  height: 46%;
  margin: 2%;
  background-color: var(--Primitives-color-greys-ORCBlack)
}
*/
/*
 * animate preview
 * HH Das größte Problem ist das gleichzietige Skalieren und Positionieren.
 * Dieser Ansatz scheint insgesamt am besten zu funktionieren.
 * Voraussetzung DOM: "image_slide" als div innerhalb von "main_preview", 
 * damit aber auch konsitent gegenüber "video_slide" und "audio_slide".
 * Nachteil: die transition wirkt im Safari nicht 100% smooth
 * Auch versucht: "transform: scale()"" mit css-animation 
 * liefert zwar flüssige Animation aber unschönen Bewegungsverlauf wegen skalieren/positionieren.
 */
.nozoom .image_slide {
  height: calc(100vh - 260px);
  margin-top: var(--margin-top-swiper);
}
.info_active .image_slide,
.info_active .video_slide,
.info_active .audio_slide {
  width: 47%;
  height: 65%;
  margin-top: 20vh;
  margin-left: 2%;
}
.nozoom .video_slide {
  height: calc(100vh - 260px);
  margin-top: var(--margin-top-swiper);
}

/* HH Ansatz mit transform: scale() und Animationen hat nicht geklappt:
 * a) Nur skalieren würde funktionieren, aber in Kombination mit Positionierung unschöne Bewegungsabläufe
 * b) zu kompliziert mit den unterschiedlichen Bedingunegen: von zoom her, von nozoom her, infos open, infos closed
 */

/* .nozoom .main_preview {
  animation: zoom-in 300ms ease-out forwards;
}
@keyframes zoom-in {
  0% {
    transform: scale(1);
    top: 0;
  }
  100% {
    transform: scale(var(--scale-preview-nozoom));
    top: var(--margin-top-preview-nozoom);
  }
}

.zoom .main_preview {
  animation: zoom-out 300ms ease-out forwards;
}
@keyframes zoom-out {
  0% {
    transform: scale(var(--scale-preview-nozoom));
    top: var(--margin-top-preview-nozoom);
  }
  100% {
    transform: scale(1);
    top: 0;
  }
}

.info_active .main_preview {
  animation: zoom-out-info 300ms ease-out forwards;
}
@keyframes zoom-out-info {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(.5) translateX(0);
  }
  100% {
    transform: scale(.5) translateX(-50%);
  }
} */


.unknown_filetype_slide {
  width: 100%;
  height: calc(100% - 100px);
}
.info_active .unknown_filetype_slide {
  width: 50%;
  height: 100%;
}
.slide_icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide_icon svg {
  width: 50%;
  height: 50%;
}
/* HH transitions */
.unknown_filetype_slide,
.slide_icon svg {
  transition: all 300ms linear;
}


/* 
 * toggle bottom nav 
 */

 /* HH neue Variablen gesetzt */
.setview_page {
  --bottom-nav-height: 144px;
  --bottom-nav-padding: 24px;
  --bottom-nav-toggle-height: 55px;
}

.bottom_nav {
  /* border: 1px solid blue; */
  position: fixed;
  left: 0px;
  /* HH Frage: wieso Breite minus 192px? */
  width: calc(100vw - 192px);
  /* background-color: var(--Primitives-color-greys-UltraLightGrey, #F3F2EF); */
  bottom: var(--bottom-nav-padding);
  height: var(--bottom-nav-height);
  z-index: 100;
  transition: all 300ms ease-in;
  transition-delay: 150ms;
}
.bottom_nav.hidden {
  /* opacity: 0;
  width: 0px;
  visibility: hidden; */
  bottom: calc(var(--bottom-nav-height) * -1);
  transition: all 300ms ease-out;
}
.btn_bottom_nav_toggle {
  position: absolute;
  left: var(--bottom-nav-padding);
  width: var(--bottom-nav-toggle-height);
  height: var(--bottom-nav-toggle-height);
  /* HH vertikale Position mittig zur bottom_nav */
  bottom: calc(calc(var(--bottom-nav-height) / 2) - calc(var(--bottom-nav-toggle-height) / 2) + calc(var(--bottom-nav-padding) / 2));
  z-index: 120;

  cursor: pointer;
  user-select: none;
  
  border-radius: 50%;
  /* TODO color vars */
  background: var(--color-blurs-project-img-blur, rgba(243, 242, 239, 0.30));
  backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  align-items: center;
}



.swiper_main.hidden .main_preview {
  transition: opacity 300ms ease-out;
  opacity: 0;
}
.video_slide {
  /* TODO gleiche hoehe wie img slide */
  /* top: 88px; bottom: 128px; */
  /* position:absolute;
  height: 100%;
  width: 100%;
  margin: auto;   */
}
.audio_slide {
  /* TODO gleiche hoehe wie img slide */
  /* width: 100%;
  height: 100%;
  margin: auto; */
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

.unknown_filetype_bottom_bar,
.bottom_bar_icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom_bar_icon svg {
  width: 100%;
  height: 100%;
}

.main_preview_subset {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 80%;
}

.subset_tiles {
  display: block;
  float: left;
  
  width: 46%;
  height: 46%;
  margin: 2%;
  background: rgba(0, 0, 0, 0.02);
}
.subset_content {
  position: absolute;
  top: calc(50% - 50px);
  left: 0; width: 100%;

  display: inline-flex;
height: 104px;
padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
flex-direction: column;
align-items: center;
gap: var(--spacing-item-inner, 8px);
flex-shrink: 0;

}
.subset_title {
  color: var(--text-primary, #2C2C2C);

  /* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--font-button-line-height, 24px); /* 120% */
}
/* TODO hover state ? */
.subset_btn {
  user-select: none;
  cursor: pointer;

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: var(--spacing-item-inner, 8px);

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2);

  color: var(--Colors-text-primary, #2C2C2C);

  /* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--font-button-line-height, 24px); /* 120% */
}


.av_control {
  display: block;
  /* border: 1px solid green; */
  position: fixed;
  left: 0px;
  width: calc(100vw - 96px);
  bottom:60px;
  left: 88px;
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

.av_control_playpause {

}
.av_control_mute {

}
.av_control .av_progress_cont {
  

  display: flex;
  width: calc(100% - 192px);
  width: calc(100% - 212px);
  
  height: 24px;
  padding: 12px;
  align-items: center;
  flex-shrink: 0;
  
  background: transparent;
  /* Blur */
  /* backdrop-filter: blur(calc(var(--value-pills, 30px) / 2)); */
}


/* HH remove border */
/* TODO preliminary variables -> ich komme mit den globalen Variablen nicht so ganz klar */
/* --Colors-btm-bar-playerView-background passt nicht ... */
/* die vorläufigen Werte hier sind direkt aus Figma genommen */
progress {
  border-radius: 50px;
  appearance: none;
  width: 100%; 
  height: 24px;
  border: none;
  --Colors-av-progress-background: rgba(255,255,255,.2);
  --Colors-av-progress-bar: #FFFFFF;
  cursor: pointer;
}
/* HH add color of background */
progress::-webkit-progress-bar,
progress {
  border-radius: 50px;
  background-color: var(--Colors-av-progress-background); 
}
/* HH add color of (moving) bar */
/* need to be 2 individual selectors, not combined by comma; otherwise webkit error */
progress::-moz-progress-bar {
  background-color: var(--Colors-av-progress-bar);
}
progress::-webkit-progress-value { 
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: var(--Colors-av-progress-bar);
}
progress {
  color: yellow;
}


/* 
 * HH wird nicht mehr individuell angesteuert.
 * Animation über den container "bottom_nav"
 */
.swiper_nav {
  /* border: 1px solid red; */
  
  /* width: 100%;
  height: 144px;
  position: absolute;
  top: 0px;
  left: 96px; */
  /* transition: all 300ms ease-out; */
  overflow: visible;
  margin-left: 96px;
}
.swiper_nav.hidden {
  /* visibility: hidden;
  transform: translateY(180px); */
  /* top: 180px; */
}

/* 
 * TODO larger click area
 * HH trying different method
 */

.swiper-main-button-prev,
.swiper-main-button-next {
  --btn-prev-next-size: 96px;
  --btn-prev-next-half-size: calc(var(--btn-prev-next-size) / 2);

  position: fixed;
  z-index: 10;

  width: var(--btn-prev-next-size);
  height: var(--btn-prev-next-size);
  
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: top 300ms ease-in;

  visibility: visible;
}

/* 
 * TODO swiper main nav btn position > DONE?
 * HH trying relative values 
 */
 /* horizontal */
 .swiper-main-button-prev {
  left: 0;
}
.swiper-main-button-next {
  right: 0;
}
.info_active .swiper-main-button-next {
  right: 50vw;
}
/* vertical */
.nozoom .swiper-main-button-prev,
.nozoom .swiper-main-button-next { 
  top: calc(50% - var(--margin-top-swiper));
  margin-top: calc(var(--btn-prev-next-half-size) * -1);
}
.zoom .swiper-main-button-prev,
.zoom .swiper-main-button-next { 
  top: 50vh;
  margin-top: calc(var(--btn-prev-next-half-size) * -1);
}
.info_active .swiper-main-button-next,
.info_active .swiper-main-button-prev {
  top: 50%;
  margin-top: calc(var(--btn-prev-next-half-size) * -1);
}


.swiper-button-disabled {
  visibility: hidden;
}
.swiper-main-button-prev:hover,
.swiper-main-button-next:hover {
  /* cursor: pointer; */
  /* opacity: 1; */
}

/* HH Sollte überarbeitet werden: Buttons besser über isMobile steuern 
 * und mobile gar nicht erst in die Swiper-Komponente einbinden, anstatt
 * sie nachträglich wieder per CSS zu entfernen. */
[data-layout="mobile"] {
  .swiper-main-button-prev,
  .swiper-main-button-next {
    display: none;
  }
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

  cursor: pointer;
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
  position: relative;
  margin: 0 0;
  width: 72px;
  height: var(--margin-body-margin,96px);
  width: calc(var(--dimension-btmbar-img-width, 48px) + 24px);
  height: calc(var(--dimension-btmbar-img-height, 64px) + 32px);
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
  position: absolute;
  top: 0;
  left: 0;
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
  
  /* padding-top: 0px; */
  transition: all 500ms ease-out;
}
.nav_preview_audio_highlight {
  height: calc(var(--margin-body-margin, 96px) - 54px);
  padding-top: 54px;
}

.nav_preview_col_title {
  /* border: 1px solid magenta; */
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
  cursor: pointer;
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
  transition: left 200ms ease-out;
}
.nav_slide_btn_add:hover .icon-wrap {
  left: 30px;
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

.nav_preview .nav_set {

}
.nav_preview_subset {
  cursor: pointer;
  float: left;
  position: relative;
  top: 12px; 
  width: 32px; height: 32px;
  margin: 2px 2px;
  background-size: 120% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  background-color: #DAD6CE;  
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


.entry_info_title {
  user-select: none;

  z-index: 20;
  position: fixed;
  top: var(--margin-entry-info-title-top);
  left: 10vw;
  width: 80vw;
  height: fit-content;
  text-align: center;
  align-content: center;
  /* HH use defined variables */
  font-size: var(--font-h3-font-size, 48px);
  line-height: var(--font-h3-line-height, 48px);

  color: var(--Colors-text-primary, #fff);
  opacity: 1;
  
  transition: opacity 300ms ease-in, transform 300ms ease-in;
  /* transition: all 500ms ease-in; */
}

.entry_info_title.fade_hidden {
  transition: opacity 200ms linear;
  opacity: 0;
}
.entry_info_title.move_up_hidden {
  transition: transform 300ms ease-out;
  transform: translateY(-6em);
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

[data-layout="mobile"] {
  .setview_page {
    overflow-x: hidden;
    overflow-y: auto;
    /* TODO scrollbar hide */
    scrollbar-width: 0px;
  }
  .setview_page::-webkit-scrollbar {
    visibility: hidden;
  }

  .entry_info_title {
    position: relative;
    /* border: 1px solid red; */
    top: calc(var(--margin-entry-info-title-top) * 2);
    margin-bottom: 1em;
  }
  .swiper_main {
    position: relative;
    /* top: 0px; */
    /* top: var(--margin-entry-info-title-top); */
    /* height: calc(100vh - 68px); */
    height: auto;

    /* border: 1px solid blue; */
  }
  .swiper_main.info_active {
    top: calc(var(--margin-entry-info-title-top) * 2);
    transition: all 300ms ease-out;
  }
  .image_slide {
    /* border: 1px solid black; */
  }
  .nozoom .image_slide,
  .nozoom .video_slide,
  .nozoom .audio_slide {
    margin-top: 0;
    /* margin-top: var(--margin-entry-info-title-top); */
  }
  .info_active .image_slide,
  .info_active .video_slide,
  .info_active .audio_slide {
    width: 100%;
    height: 50vh;
    /* margin-top: calc(var(--margin-entry-info-title-top) * 1.5); */
    margin-left: 0%;    
  }

  
  .entry_info {
    z-index: 20;
    /* border: 1px solid green; */
    position: relative;
    /* HH hier top statt margin-top, ansonsten Kollision mit entry_info.hidden */
    top: calc(var(--margin-entry-info-title-top) * 3);
    margin-bottom: calc(var(--margin-entry-info-title-top) * 2);
    left: 24px;
    width: calc(100vw - 48px);
    height: fit-content;
    background: transparent;
  }
  .entry_info.hidden {
    transform: translateY(50vh);
    height: 0px;
    transition: all 600ms ease-in-out;
  }

}

</style>
