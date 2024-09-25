<template>
  <header>
    <nav class="nav">

      <NuxtLink 
        class="header_nav_logo fade_out"
        :class="{hidden_fade_out: showInfo}"
        @click="$emit('clickedBack')">
        <!-- :to="'/setlist/' + settype" > -->
          <IconsNavHome/>
          <!-- <div class="content">Zurück</div> -->
      </NuxtLink>
              
      <!-- :to="'/setview/'+settype+'/'+treeid+'/'+ setid" -->
      <NuxtLink class="navbar_set_link parent_link animate_up"
          v-if="activeSetId !== setid"
          :class="{
            showPath2Root: showPath2Root,
            hidden_move_up: showInfo,

            }"
          :style="{width: showPath2Root? getTitleWidth(setid) : '24px'}"
          @click="emit('parentClicked')"
          @mouseover="setShowPath2Root(true)"
          @mouseleave="setShowPath2Root(false)"
          >
          <span
            :style="{width: showPath2Root? getTitleWidth(setid) : '24px'}">
            {{ showPath2Root ? getColTitle(setid) : '&nbsp;...' }}
          </span>
      </NuxtLink>

      <!-- :to="'/setview/'+settype+'/'+treeid+'/'+ parentSetId" -->
      <NuxtLink class="navbar_set_link parent_link animate_up"
        v-else-if="activeSetId == setid && parentSetId !== 'root'"
        :class="{
          showPath2Root: showPath2Root,
          hidden_move_up: showInfo
        }"
        :style="{width: showPath2Root? getTitleWidth(parentSetId) : '24px'}"
        @mouseover="setShowPath2Root(true)"
        @mouseleave="setShowPath2Root(false)"
        >
        <span 
          :style="{width: showPath2Root? getTitleWidth(parentSetId) : '24px'}">
          {{showPath2Root ? getColTitle(parentSetId) : '&nbsp;...' }}
        </span>
      </NuxtLink>
              
      <NuxtLink class="navbar_set_link animate_up"
        :class="{hidden_move_up: showInfo}"
        @click="activeSetId == setid && emit('parentClicked')"
        >
        {{ getColTitle(activeSetId) }}
      </NuxtLink>
        
            
      <Transition :css="true" name="fade">            
        <NuxtLink
          v-if="!showInfo"
          @click="$emit('toggleShowInfo')"
          class="navbar_set_link info"
          :style="infoBtnStyle">
          <IconsInfoShow/>
        </NuxtLink>

        <NuxtLink
          v-else
          @click="$emit('toggleShowInfo')"
          class="navbar_set_link info"
          :style="infoBtnStyle">
          <IconsInfoClose/>
        </NuxtLink>
      </Transition>

    </nav>
  </header>
</template>
<script setup lang="ts">

const SHOW_PATH2ROOT_DELAY = 500
const MAX_SET_TITLE_LENGTH = 50;

const {
  mergeSetTypeColor,
  mergeSetTypeBackColor,
} = DynFonts()

const infoBtnStyle = ref({})

const emit = defineEmits([
    'toggleShowInfo',
    'parentClicked',
    'clickedBack'
])

const props = defineProps([
    'settype',
    'treeid',
    'setid',
    'activeSetId',
    'parentSetId',
    'showInfo',
    'titlesMap'
])


const showPath2Root = ref(false)

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

const getColTitle = (id: string): string => {
    let result = ""
    if (props.titlesMap) {
        result = props.titlesMap[id]
    }
    if (result && result.length > MAX_SET_TITLE_LENGTH) {
      result = result.substring(0,MAX_SET_TITLE_LENGTH) + '...'
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
  return metrics.width;
  } catch (error) {
    console.error("getTextWidth: Error: " + error)
    return 24;
  }
  
}


const getTitleWidth = (id:string): string => {
  //const result = getColTitle(id).length * 24;
  const result = getTextWidth(getColTitle(id),"20px Instrument Sans")
  return (result + 10) + 'px';
}

onMounted(() => {
  mergeSetTypeBackColor(props.settype, infoBtnStyle.value)

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
  margin: 0 var(--spacing-navbar-between-items, 4px);

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
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
  transition: all 500ms ease-out;
}
.navbar_set_link.hidden_move_up {
  top: -72px;
  transition: all 500ms ease-out;
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
  width: 24px;
  /* transition: width 500ms; */
  transition: all 500ms ease-out;
  overflow: hidden;
}

.navbar_set_link.parent_link span {
  display: inline-block;
  height: 24px;
  overflow: hidden;
}

.navbar_set_link.parent_link:hover {
  width: 20rem;
}
/* .navbar_set_link.grow_width {
  width: auto;
  transition: all 1s linear;
} */

nav {
  width: calc(100vw - var(--dimension__icon__sizeM, 24px));
}

.navbar_set_link.info {
  float: right;
  position: absolute;
  right: var(--margin-navbar-institution-logo-right, 10px);

  /* gap: var(--margin-navbar-institution-logo-right, 10px); */
  display: flex;
  /* width: var(--dimension-button-height-M, 48px);
  height: var(--dimension-button-height-M, 48px); */
  width: var(--dimension-button-height-M, 24px);
  height: var(--dimension-button-height-M, 24px);
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  border-radius: var(--radius-full, 9999px);
  border: 1px solid transparent;
  background-color: var(--Colors-nav-bar-info-button-fill, #2C2C2C);

  color: var(--Colors-text-primary-inverted, #FFF);
  font-family: "Instrument Sans";
  font-size: var(--font-h4-font-size, 24px);
  font-style: normal;
  
  line-height: var(--font-h4-line-height, 32px); /* 125% */

  transition: all 1s linear;
}


.header_nav_logo {
  text-decoration: none;
  transition: all 300ms ease-out;
}
.header_nav_logo:hover {
  transform: scale(0.833);  
}

</style>