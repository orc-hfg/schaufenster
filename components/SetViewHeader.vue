<template>
  <header>
    <nav class="nav">
<!-- TODO mobile theme btn paddings -->
      <NuxtLink 
        class="header_nav_logo fade_out"
        :class="{hidden_fade_out: hideNav}"
        tabindex="0"
        @click="$emit('clickedBack')">
          <IconsNavHome/>
      </NuxtLink>
      <!--        
      <NuxtLink class="navbar_set_link parent_link animate_up"
          v-if="parentSetId !== treeid"
          :class="{
            showPath2Root: showPath2Parent,
            hidden_move_up: hideNav || showInfo,
            }"
          :style="{width: showPath2Parent? getTitleWidth(parentSetId) : '24px'}"
          @click="emit('parentClicked', parentSetId)"
          @mouseover="setShowPath2Parent(true)"
          @mouseleave="setShowPath2Parent(false)"
          >
          <span
            :style="{width: showPath2Parent ? getTitleWidth(parentSetId) : '24px'}">
            {{ showPath2Parent ? getColTitle(parentSetId) : '&nbsp;...' }}
          </span>
      </NuxtLink>
      -->
<!--
      <NuxtLink class="navbar_set_link parent_link animate_up"
          
          :class="{
            showPath2Root: true,
            hidden_move_up: hideNav || showInfo || introRunning,
            }"
          :style="{width: getTitleWidth(treeid)}"
          @click="emit('parentClicked', treeid)"
          >
          <span
            :style="{width: getTitleWidth(treeid) }">
            {{ getColTitle(treeid) }}
          </span>
      </NuxtLink>
-->
      <div class="link_wrapper"
        @mouseover="setShowPath2Root(true)"
        @mouseleave="setShowPath2Root(false)">

        <NuxtLink class="navbar_set_link parent_link animate_up"
          v-for="path_set_id in pathToRoot"
          :class="{ hidden_move_up: hideNav || showInfo || introRunning }"
          :style="getLinkStyle(path_set_id)"
          tabdindex=0
          @click="emit('parentClicked', path_set_id)"
          >
          <span>
              {{ isShowTitle(path_set_id) ? getColTitle(path_set_id) : '&nbsp;...' }}
          </span>
        </NuxtLink>
      </div>

      <!-- :to="'/setview/'+settype+'/'+treeid+'/'+ setid" -->
      <!--
      <NuxtLink class="navbar_set_link parent_link animate_up"
          v-if="activeSetId !== setid"
          :class="{
            showPath2Root: showPath2Root,
            hidden_move_up: hideNav || showInfo || introRunning,

            }"
          :style="{width: showPath2Root? getTitleWidth(setid) : '24px'}"
          @click="emit('parentClicked', setid)"
          @mouseover="setShowPath2Root(true)"
          @mouseleave="setShowPath2Root(false)"
          >
          <span
            :style="{width: showPath2Root? getTitleWidth(setid) : '24px'}">
            {{ showPath2Root ? getColTitle(setid) : '&nbsp;...' }}
          </span>
      </NuxtLink>
      -->
      

      <!-- :to="'/setview/'+settype+'/'+treeid+'/'+ parentSetId" -->
      <!--
      <NuxtLink class="navbar_set_link parent_link animate_up"
        v-else-if="activeSetId == setid && parentSetId !== 'root'"
        :class="{
          showPath2Root: showPath2Root,
          hidden_move_up: hideNav || showInfo || introRunning
        }"
        @click="emit('parentClicked', parentSetId)"
        :style="{width: showPath2Root? getTitleWidth(parentSetId) : '24px'}"
        @mouseover="setShowPath2Root(true)"
        @mouseleave="setShowPath2Root(false)"
        >
        <span 
          :style="{width: showPath2Root? getTitleWidth(parentSetId) : '24px'}">
         {{showPath2Root ? getColTitle(parentSetId) : '&nbsp;...' }}
        </span>
      </NuxtLink>
      -->
      
      <NuxtLink class="navbar_set_link animate_up"
        :class="{hidden_move_up: hideNav || showInfo || introRunning}"
        v-if="activeSetId !== setid"
        tabindex="0"
        @click="emit('parentClicked', activeSetId)"
        >
        <span>
          {{ getColTitle(activeSetId) }}
        </span>
      </NuxtLink>
      
          
      <!-- <Transition :css="true" name="fade"> -->
        <NuxtLink
          v-if="!showInfo"
          tabindex="0"
          @click="$emit('toggleShowInfo')"
          class="navbar_set_link info animate_up"
          :class="{hidden_move_up: hideNav || introRunning}"
          :style="infoBtnStyle">
          <IconsInfoShow/>
        </NuxtLink>

        <NuxtLink
          v-else
          tabindex="0"
          @click="$emit('toggleShowInfo')"
          class="navbar_set_link info animate_up"
          :class="{hidden_move_up: hideNav || introRunning}"
          :style="infoBtnStyle">
          <IconsInfoClose/>
        </NuxtLink>
      <!-- </Transition> -->

    </nav>
  </header>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const SHOW_PATH2ROOT_DELAY = 500

const {
  getSetTypeColor
} = DynFonts()

const infoBtnStyle = ref({})

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

const getTextWidth = (text:string, font:string):number => {
  // re-use canvas object for better performance
  try {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  //const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  console.log("width: " + text + " : " + metrics.width)
  return metrics.width;
  } catch (error) {
    console.error("getTextWidth: Error: " + error)
    return 24;
  }
  
}


const getTitleWidth = (id:string): string => {
  //const result = getColTitle(id).length * 24;
  const isMobile = document.documentElement.getAttribute('data-layout') == 'mobile'
  const fontSize = (isMobile ? '500 16' : '500 20')
  const result = getTextWidth(getColTitle(id),fontSize + 'px Instrument Sans')
  //return (result + 10) + 'px';
  return (result + (isMobile ? 15 : 10)) + 'px';
}

onMounted(() => {
  const theme = document.documentElement.getAttribute('data-theme') || ''
  
  infoBtnStyle.value['background-color'] = getSetTypeColor(props.settype, theme)
  
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

.navbar_set_link.animate_up {
  top: 0px;
  transition: all 300ms ease-out;
}
.navbar_set_link.hidden_move_up {
  top: -144px;
  transition: all 300ms ease-out;
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
  /* transition: width 500ms; */
  transition: all 500ms ease-out;
  
  /* HH wird vermutlich nicht mehr begraucht */
  /* space for nav home and nav info */
  /* max-width: calc(100vw - 96px - 48px - 12px); 
  width: 24px;
  overflow: hidden;
  justify-content: center;
  align-items: center; */
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
  /* float: right; */
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

</style>