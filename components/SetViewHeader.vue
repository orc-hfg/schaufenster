<template>
  <header>
    <nav class="nav">
<!-- TODO mobile theme btn paddings -->
      <NuxtLink 
        class="header_nav_logo fade_out"
        :class="{hidden_fade_out: hideNav}"
        tabindex="0"
        @click="$emit('clickedBack')"
        @keyup.enter="$emit('clickedBack')">
          <IconsNavHome/>
      </NuxtLink>

      <div class="link_wrapper"
        @mouseover="setShowPath2Root(true)"
        @mouseleave="setShowPath2Root(false)">

        <NuxtLink class="navbar_set_link parent_link animate_up"
          v-for="path_set_id in pathToRoot"
          :class="{ hidden_move_up: hideNav || showInfo || introRunning }"
          :style="getLinkStyle(path_set_id)"
          :tabindex="(!showInfo? '0' : '-1')"
          @click="emit('parentClicked', path_set_id)"
          @keyup.enter="emit('parentClicked', path_set_id)"
          >
          <span>
              {{ isShowTitle(path_set_id) ? getColTitle(path_set_id) : '&nbsp;...' }}
          </span>
        </NuxtLink>
      </div>
      
      <NuxtLink class="navbar_set_link animate_up"
        :class="{hidden_move_up: hideNav || showInfo || introRunning}"
        v-if="activeSetId !== setid"
        :tabindex="(!showInfo? '0' : '-1')"
        @click="emit('parentClicked', activeSetId)"
        @keyup.enter="emit('parentClicked', activeSetId)"
        >
        <span>
          {{ getColTitle(activeSetId) }}
        </span>
      </NuxtLink>
      
        <NuxtLink
          v-if="!showInfo"
          tabindex="0"
          @keyup.enter="$emit('toggleShowInfo')"
          @click="$emit('toggleShowInfo')"
          class="navbar_set_link info animate_up"
          :class="{hidden_move_up: hideNav || introRunning}"
          :style="infoBtnStyle">
          <IconsInfoShow/>
        </NuxtLink>

        <NuxtLink
          v-else
          tabindex="0"
          @keyup.enter="$emit('toggleShowInfo')"
          @click="$emit('toggleShowInfo')"
          class="navbar_set_link info animate_up"
          :class="{hidden_move_up: hideNav || introRunning}"
          :style="infoBtnStyle">
          <IconsInfoClose/>
        </NuxtLink>

    </nav>
  </header>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue'
const runtimeConfig = useRuntimeConfig()

const SHOW_PATH2ROOT_DELAY = 500

const {
  getSetTypeColor
} = DynFonts()

const infoBtnStyle = ref({} as CSSProperties )

const emit = defineEmits([
    'toggleShowInfo',
    'parentClicked',
    'grandParentClicked',
    'clickedBack'
])

const props = defineProps([
    'settype',
    'treeid',
    'setid',
    'activeSetId',
    'parentSetId',
    'showInfo',
    'hideNav',
    'titlesMap',
    'theme',
    'introRunning',
    'pathToRoot'
])

watch(() => props.theme,() => {
  console.log("theme changed")
  infoBtnStyle.value['background-color'] = getSetTypeColor(props.settype, props.theme)

})


const showPath2Root = ref(false)
const showPath2Parent = ref(false)

const getLinkStyle = (path_set_id:string) => {
  const isShowTitle = 
    (path_set_id == props.treeid)
    ||
    (path_set_id == props.activeSetId)
    ||
    showPath2Root.value
  // TODO mobile value if title is hidden
  return {width: (isShowTitle ? getTitleWidth(path_set_id) : '24px')}
}

const isShowTitle = (path_set_id:string) => {
  const ist = 
    (path_set_id == props.treeid)
    ||
    (path_set_id == props.activeSetId)
    ||
    showPath2Root.value
  
  return ist
}

const setShowPath2Root = (value:boolean) => {
  if (value == true) {
    showPath2Root.value = true
  }
  else {
    setTimeout(() => {
      showPath2Root.value = false
    }, SHOW_PATH2ROOT_DELAY)
    
  }
}

const setShowPath2Parent = (value:boolean) => {
  if (value == true) {
    showPath2Parent.value = true
  }
  else {
    setTimeout(() => {
      showPath2Parent.value = false
    }, SHOW_PATH2ROOT_DELAY)
    
  }
}

const getColTitle = (id: string): string => {
    let result = ""
    if (props.titlesMap) {
        result = props.titlesMap[id]
    }
    const max = runtimeConfig.public.SET_VIEW_PROJECT_TITLE_MAX_LENGTH
    if (result && result.length > max) {
      result = result.substring(0,max) + '...'
    }
    return result
}


const canvas = ref(document && document.createElement("canvas"))

const getTextWidth = (text:string, font:string):number => {
  // re-use canvas object for better performance
  try {
    canvas.value = canvas.value || document.createElement("canvas") 
    //const canvas = document.createElement("canvas");
    const context = canvas.value.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    //console.log("width: " + text + " : " + metrics.width)
    return metrics.width;
  } catch (error) {
    console.error("getTextWidth: Error: " + error)
    return 24;
  }  
}

const isMobile = useState('mobile')
const FONT_SIZE_MOBILE = '500 16'
const FONT_SIZE_DESKTOP = '500 20'
const FONT_SIZE_SUFFIX = 'px Instrument Sans'
const ADDIT_MOBILE = 15
const ADDIT_DESKTOP = 10

const getTitleWidth = (id:string): string => {
  const fontSize = (isMobile.value ? FONT_SIZE_MOBILE : FONT_SIZE_DESKTOP)
  const result = getTextWidth(getColTitle(id),fontSize + FONT_SIZE_SUFFIX)
  return (result + (isMobile.value ? ADDIT_MOBILE : ADDIT_DESKTOP)) + 'px';
}

onMounted(() => {
  infoBtnStyle.value['background-color'] = getSetTypeColor(props.settype, props.theme)
  
})

</script>
<style scoped>

.navbar_set_link {
  position: relative;
  /* left: 0; */
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  
  
  /* border: 1px solid black; */
  /* border-radius: var(--radius__full, 48px); */
  /* background-color: var(--Colors-nav-bar-toggle-on); */

  /* HH statt margin über gap des parent containers */
  /* margin: 0 var(--spacing-navbar-between-items, 4px); */
  overflow: hidden;
  min-width: var(--dimension-icon-size-M);

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  justify-content: center;
  gap: var(--spacing-item-inner, 8px);

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2);
  background-color: var(--Colors-nav-bar-button-fill, #F3F2EF); /* or #2C2C2C */

  transition: all 500ms linear;


  color: var(--Colors-text-primary, #2C2C2C);

  /* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-button-line-height, 24px); /* 120% */  
}


.link_wrapper {
  /* border: 1px solid green; */
  position: relative;
  display: contents;
  /* height: 50px; */
  width: min-content;
}


.fade_out {
  opacity: 1;
  transition: all 800ms ease-out;
}
.hidden_fade_out {
  opacity: 0;
  transition: all 800ms ease-out;
}

/* Pfad-Pillen jenseits von Eben 0 (parent_link) */
.navbar_set_link.animate_up {
  top: 0px;
  transition: var(--transition-move-items-faster);
}
.navbar_set_link.hidden_move_up {
  top: -144px;
  transition: var(--transition-move-items-faster);
}

.navbar_set_link:hover {
  background-color: var(--Colors-nav-bar-button-fill-hover, #E7E6E1);
}
.navbar_set_link * {
  text-decoration: none;
  user-select: none;
  cursor: pointer;
}

.navbar_set_link.parent_link {
  transition: var(--transition-move-items-default);
}


.navbar_set_link span {
  /* height: 24px; */
  /* 
  * overflow: hidden verhindert, dass Text der länger als die Breite des Elements ist
  * über die Grenzen hinaus angezeigt wird. Zusammen mit white-space: nowrap und
  * text-overflow: ellipsis wird der Text mit "..." abgeschnitten
  */
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.navbar_set_link.parent_link:hover {
  width: 20rem; /* dummy number, real num is computed */
}


nav {
  /* width: calc(100vw - 2 * var(--dimension---margin-header-margin, 12px)); */
  /* HH volle Breite minus Info-Button */
  width: calc(100% - 60px);
}

.navbar_set_link.info {
  position: absolute;
  right: var(--margin-navbar-institution-logo-right, 10px);

  /* gap: var(--margin-navbar-institution-logo-right, 10px); */
  display: flex;
  /* width: var(--dimension-button-height-M, 48px);
  height: var(--dimension-button-height-M, 48px); */
  width: var(--dimension-icon-size-M, 24px);
  height: var(--dimension-icon-size-M, 24px);
  justify-content: center;
  align-items: center;
  /* gap: 20px; */
  flex-shrink: 0;

  border-radius: var(--radius-full, 9999px);
  border: 1px solid transparent;
  background-color: var(--Colors-nav-bar-info-button-fill, #2C2C2C);
  color: var(--Colors-text-primary-inverted, #FFF);

  top: 12px;
  
}
.navbar_set_link.info.animate_up {
  top: 12px;
}
.navbar_set_link.info.hidden_move_up {
  top: -72px;
}

.header_nav_logo {
  text-decoration: none;
  transition: all 300ms ease-out;
}
.header_nav_logo:hover {
  transform: scale(0.833);  
}


/* MOBILE LANDSCAPE Anpassungen */
.mobile_landscape header {
  padding: 6px 12px;
}
.mobile_landscape .navbar_set_link {
  transform: scale(0.8);
  transform-origin: left center;
}
.mobile_landscape .header_nav_logo {
  transform: scale(0.8);
  transform-origin: center;
}
</style>