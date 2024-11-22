<template>
<div>
    <div v-if="!slideList || !slideList.length">No data yet!</div>

    <Transition name="fade">
    <div v-if="settype==MATCH_DIPLOM && !showMenuView"
        class="year_stepper">
    <IconsYearSelectorUp
        @click="clickedYearBack()"
        :class="{disabled: !isEnabledYearBack}"
        />
    <IconsYearSelectorDown
        @click="clickedYearForward()"
        :class="{disabled: !isEnabledYearForward}"
        />
    </div>
    </Transition>


    <swiper
      v-if="slideList && slideList.length"
      :modules="swiper_modules"
      class="swiper_main"
      :class="{
        filter_blured: showMenuView,
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
              v-if="hasPreview(el.col_id)"
              :class="{swiper_moving: swiperMoving}"
              :style="{ 'background-image': 'url(\'' + previewLargeUrl(el.col_id) + '\')' }">
            </div>
            <div class="img_alt" v-else>
                <div class="img_alt_title">
                  {{getColTitle(el.col_id)}}
                </div>
            </div>
          </div>
          
        </div>
        
      </swiper-slide>

    </swiper>
  
    
    <Transition name="fade">
    <SetListTreeInfo
      v-if="slideList && !showMenuView"
      :sorted-trees="filteredSortedTrees"
      :settype="settype"
      :tree-info-idx="treeInfoIdx"
      />
    </Transition>

    
    <Transition name="fade">
      <div class="year_info"
        @click="currentYear = ''"
        :style="year_info_style"
        v-show="currentYear && !introInfo"
        >
        {{ currentYear }}
      </div>
    </Transition>

    <Transition name="fade">
      <div class="intro_info"
        :style="intro_info_style"
        @click="introInfo = ''"
        v-if="introInfo">
        {{ introInfo }}
        <br/>
        {{ introInfo2 }}
      </div>
    </Transition>
    
</div>
</template>
<script setup lang="ts">
const router = useRouter();
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

const {
  font_list, font_selected,
  getPixelSizedStyle,
  getViewSizedStyle,
  mergeSetTypeColor
} = DynFonts()

const props = defineProps([
    'colCount',
'settype',
'slideList',
'useTree',
'filteredSortedTrees',
'nextYearList',
'showMenuView',
'introInfo',
'introInfo2',
])
const emits = defineEmits(['switch2setview'])

const { apiConfig } = apiHelper();
const apiBaseUrl = apiConfig.baseUrl + "/api-v2/";
const {
  RID,
  MATCH_DIPLOM,
  
} = treeHelper();

//const RID = 'root'
const intro_info_style = ref(mergeSetTypeColor(props.settype,getPixelSizedStyle(240,210)))
const year_info_style = ref(mergeSetTypeColor(props.settype, getPixelSizedStyle(240,210)))


const swiperMain = ref({} as typeof Swiper);
const swiperMoving = ref(false)

const SWPIPER_MOVING_DELAY = 200;
const treeInfoIdx = ref(0)

const scrollEvent = (ev) => {
  const current = swiperMain.value.getTranslate()
  console.log("got scroll event" + ev.deltaY + ":" + current)
  swiperMain.value.translateTo(current - 12 * ev.deltaY)
}
const wheelEvent = (ev) => {
  const current = swiperMain.value.getTranslate()
  console.log("got wheel event" + ev.deltaY + ":" + current)
  swiperMain.value.translateTo(current - 12 * ev.deltaY)
}

const setSwiperMoving = () => {
  swiperMoving.value = true;
  setTimeout(() => {
    swiperMoving.value = false;
  },SWPIPER_MOVING_DELAY)
}


const setTreeInfo = (el: iTree) => {
  //const elem = document.getElementById('treeInfo_' + el.col_id)
  treeInfoIdx.value = props.filteredSortedTrees.findIndex((val) => { return val.col_id == el.col_id})
  //elem?.scrollIntoView({block: "start", behavior: "smooth"})
  const ntop = (treeInfoIdx.value + 2 ) * 48
  //console.log("scroll to " + treeInfoIdx.value + ": " + ntop)
  document.getElementsByClassName('project_counter')[0].scrollTo({top: ntop, behavior: "smooth"})
}

const getColTitle = (id: string): string => {
    let result = ""
    if (props.useTree 
        && props.useTree[props.settype]
        && props.useTree[props.settype][id]
        && props.useTree[props.settype][id].colTitlesMap[id]) {
            result = props.useTree[props.settype][id].colTitlesMap[id]
        }
    return result
}

const hasPreview = (id:string):boolean => {
  if (previewLargeUrl(id).indexOf('undefined') > -1) {
    return false
  }
  return true
}

const previewLargeUrl = (treeId: string): string => {
  let eId = props.useTree[props.settype][treeId]?.edges[RID][treeId].coverId
  if (!eId) {
    for (const child_id in props.useTree[props.settype][treeId]?.edges[treeId]) {
      eId = props.useTree[props.settype][treeId]?.edges[treeId][child_id].coverId
      if (eId) {
        break
      }
    }
  }
  const pid = props.useTree[props.settype][treeId]?.previewsLarge[eId]?.id;
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const switch2set = (setid) => {
  emits('switch2setview', setid)
};

const isEnabledYearBack = ref(false)
const isEnabledYearForward = ref(false)

const upateEnabledYearBack = () => {
  const activeSlide = swiperMain.value?.activeIndex
  isEnabledYearBack.value = activeSlide > 0
}
const clickedYearBack = () => {
  const activeSlide = swiperMain.value?.activeIndex
  let last = 0
  last = props.nextYearList.findLastIndex((el) => { 
    return el < activeSlide})
  console.log("clickedYearBack1: " + activeSlide + ":" + last)

  for(let i = 0; i < props.nextYearList.length; i++) {
    if (props.nextYearList[i] < activeSlide) {
      last = props.nextYearList[i]
    }
  }
  
  console.log("clickedYearBack2: " + activeSlide + ":" + last)
  swiperMain.value.slideTo(last)
  /*if (activeSlide > 0) {
    swiperMain.value.slideTo(activeSlide-1)
  }*/
}

const upateEnabledYearForward = () => {
  const activeSlide = swiperMain.value?.activeIndex
  
  
  let next = 0
  next = props.nextYearList.findIndex(el => {
    return el > activeSlide
  })
  console.log("active Slide: " + activeSlide + " has next: " + next)
  isEnabledYearForward.value = (next != -1)
}

const clickedYearForward = () => {
  const activeSlide = swiperMain.value?.activeIndex
  const maxSlides = props.slideList.length
  let next = 0
  next = props.nextYearList.findIndex(el => {
    return el > activeSlide
  })
  console.log("clickedYearForward1: " + activeSlide + ":" + next)
  
  for(let i = 0; i < props.nextYearList.length; i++) {
    next = props.nextYearList[i]
    if (next > activeSlide) {
      
      break;
    }
  }
  
  console.log("clickedYearForward2: " + activeSlide + ":" + next)
  swiperMain.value.slideTo(next)
  /*if (activeSlide < maxSlides) {
    swiperMain.value.slideTo(activeSlide+1)
  }*/
}
const currentYear = ref('')
let currentTimeout = undefined

const SHOW_YEAR_DURATION = 2000;

const showYear = (activeSlide:number) => {
  let yearVal = props.slideList[activeSlide].year
  /*if (yearVal && (typeof yearVal == 'string' || yearVal.split)) {
    const sl = yearVal.split(' ')
    yearVal = sl[0] + ' ' + sl[1].slice(0,1) + 'S'
    
  }*/
  
  currentYear.value = yearVal
  /* console.log("swiperMain changed slide: " + activeSlide 
    + ":" + props.slideList[activeSlide].year
    + ":" + currentYear.value) */
  
  if (currentTimeout) {
    clearTimeout(currentTimeout)
  }


  currentTimeout = setTimeout(() => {
    currentYear.value = ''
  }, SHOW_YEAR_DURATION)
}

const onMainSwiperSlideChanged = () => {
    const activeSlide = swiperMain.value?.activeIndex
    if (props.settype == MATCH_DIPLOM) {
      showYear(activeSlide)
    }
    upateEnabledYearBack()
    upateEnabledYearForward()
    //const set = treeMap.value[activeSlide]
}

const onSwiperEvent = (eventName, ...args) => {
     console.log('Event: ', eventName);
     console.log('Event data: ', args);
}

const onBeforeSlideChange = () => {
  //console.log("onBeforeSlideChange")
  swiperMoving.value = true
}
const onAfterSlideChange = () => {
  //console.log("onAfterSlideChange")
  swiperMoving.value = false
}


const setMainSwiper = (swiper: Swiper) => {
  swiperMain.value = swiper;
  swiperMain.value.on('slideChange', onMainSwiperSlideChanged)
  //swiperMain.value.on('touchStart', onBeforeSlideChange)
  //swiperMain.value.on('touchEnd', onAfterSlideChange)
  swiperMain.value.on('transitionStart', onBeforeSlideChange)
  swiperMain.value.on('transitionEnd', onAfterSlideChange)
  //swiperMain.value.on('slideChangeTransitionStart', onBeforeSlideChange)
  //swiperMain.value.on('slideChangeTransitionEnd', onAfterSlideChange)
  
  upateEnabledYearBack()
  upateEnabledYearForward()
};
</script>
<style scoped>

.swiper_main {
  /* border: 1px solid red; */
  position: absolute;
  top: 112px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  overflow-y: visible;
  background-color: var(--Colors-background-default);
}
.filter_blured {
  filter: blur(25px);
}
.swiper_main.button_pad_left {
  /* left: 8rem; */
  /* width: calc(100vw - 10rem); */
  width: 100vw;
}

.main_slide {
  /* border: 1px solid blue; */
  height: 600px;
  /* width: calc(100vw - 4rem); */
  width: 100vw;
  cursor: pointer;
}
.swiper_main.button_pad_left .main_slide{
  /* width: calc(100vw - 12rem); */
  width: 100vw;
}
.year_stepper {
  position: absolute;
  top: calc(50vh - 48px);
  left: 12px;
  z-index: 90;

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}
.year_stepper * {
  opacity: 1;
  user-select: none;
  cursor: pointer;
}
.year_stepper *.disabled {
  opacity: 0.1;
}
.year_stepper *:active {
  opacity: 1.0;
}
.year_stepper svg * {
  stroke: transparent;
  fill: var(--Colors-text-headlines);
}

.sub_slide {
  /* border: 1px solid green; */
  width: 30vw;
  height: 100%;
  float: left;
  padding: 0px 20px;
  
}
.set_preview {
  position: relative;
  /* border: 1px solid red; */
  transition:all 0.25s linear;
}
.set_preview .img_alt {
  border: 1px solid var(--Colors-text-primary);
  /* position: absolute;
  top: 0px; left: 0px;
  */
  width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img_alt .img_alt_title {
  display: flex;
}
.set_preview:hover {
  transform: scale(1.01);
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
  transition: transform 300ms linear;
}
.set_preview .img.swiper_moving {
  transform: scale(0.98);
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


.intro_info {
  position: fixed;
  top: calc(50vh - 240px);
  font-size: 10vh;
  left: 0vw;
  width: 100vw;
  text-align: center;
  z-index: 1010;
  user-select: none;
}

.year_info {
  position: fixed;
  top: calc(50vh - 120px);
  font-size: 10vh;
  left: 10vw;
  right: 10vw;
  text-align: center;
  align-items: center;
  z-index: 1010;
  user-select: none;
  pointer-events: none;
}

</style>