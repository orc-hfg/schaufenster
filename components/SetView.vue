<template>
    <swiper
      :modules="modules"
      class="swiper_main"
      :class="{
        hidden: animateSwitch2SetList,
        info_active: showInfo,
        bottom_nav_hide: !showBottomNav
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
      :auto-resize="false"
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
        <div class="swiper-slide-transform">
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
      </div>
        
      </swiper-slide>
      <div class="swiper-main-button-prev"
        :class="{'swiper-button-disabled': swiperNavBtnHoverLeft == false}"
        @click.once="swiperMain.slidePrev()">
        <IconsSliderArrowLeft/>
      </div>
      <div class="swiper-main-button-next"
        :class="{'swiper-button-disabled': swiperNavBtnHoverRight == false}"
        @click.once="swiperMain.slideNext()">
        <IconsSliderArrowRight/>
      </div>
    </swiper>
</template>
<script setup lang="ts">
const { apiConfig } = apiHelper()
const apiBaseUrl = apiConfig.baseUrl + '/api-v2/'

const props = defineProps([
    'currentTree',
    'entries',
    'av_state_play',
    'entry_info_hidden',
    'showInfo',
    'navSlider'
])


const emits = defineEmits([
    'onToggleStatePlay',
    'onSetSwiperMain',
    'onSlideChanged',
    
    'onAvTimeUpdate',
    'onSlideIsAudio',
    'onSlideIsVideo',
])

const swiperMain = ref({} as typeof Swiper);

const toggleStatePlay = (state:boolean) => {
    emits('onToggleStatePlay', state)
}

const previewLargeUrl = (eId: string): string => {
  const pid = props.currentTree.previewsLarge[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const previewAudioUrls = (eId: string): string[] => {
  const urlList = [] as string[]
  props.currentTree.value.previewsAudio[eId].forEach(preview => {
    const url = apiBaseUrl + 'previews/' + preview.id + '/data-stream'
    urlList.push(url)
  });
  return urlList;
}
const previewVideoUrls = (eId: string): string[] => {
  const urlList = [] as string[]
  props.currentTree.previewsVideo[eId].forEach(preview => {
    const url = apiBaseUrl + 'previews/' + preview.id + '/data-stream'
    urlList.push(url)
  });
  return urlList;
}


const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex;
    /* console.log("swiperMain changed slide: " + activeSlide) */
    const entry = props.entries[activeSlide]
    const colId = entry.collection_id
    emits('onSlideChanged', activeSlide, entry)
    //activeEntryId.value = entry.id
    //activeSetId.value = colId
    console.log("swiperMain changed slide: " + activeSlide
      + " entry " + entry.id // JSON.stringify(entry)
      + " colId " + colId) 
    const navIdx = props.navSlider.entryId2Idx[entry.id];


    
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
      if (vel) {
        emits('onSlideIsVideo')
      } else {
        emits('onSlideIsAudio')
      }
      
      
      //showBottomNav.value = false
      if (!showInfo.value) {
        // auto play video
        if (vel) {
          toggleStatePlay(true)
        }
        show_av_control.value = true
        showBottomNav.value = false
      }
      document.documentElement.setAttribute("data-theme", "dark");
      //data_theme.value="dark"
    }
    else {
      show_av_control.value = false
      document.documentElement.setAttribute("data-theme", "light");
      //data_theme.value=""
    }
    /* 
    if (ael) {
      //progressEl.setAttribute('max', ael.duration)
      showBottomNav.value = false
      if (!showInfo.value) {
        show_av_control.value = true
      }
      
    } else if (vel) {
      //progressEl.setAttribute('max', vel.duration)
      showBottomNav.value = false
      if (!showInfo.value) {
        show_av_control.value = true
      }
    } else if (!showInfo.value) {
      
      // showBottomNav.value = true
      show_av_control.value = false
    } */
    
    if (lastActiveEntryId) {
      const lavel = document.getElementById('slide-audio-'+ lastActiveEntryId) 
        || document.getElementById('slide-video-'+ lastActiveEntryId)
      if (lavel && !avel && !showInfo.value) {

          console.error("last elem was audio or video, but current is not; info is not shown: show btm nav and hide av_control")
          show_av_control.value = false
          showBottomNav.value = true
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


const setMainSwiper = (swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
};


const swiperNavBtnHoverRight = ref(false)
const swiperNavBtnHoverLeft = ref(false)
const handleMouseMove = (event) => {
  const ex = event.clientX;
  const div = pros.showInfo ? 4 : 2;
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