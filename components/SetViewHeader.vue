<template>
        <header>
        <nav class="nav">
            <Transition name="fade">
              <NuxtLink 
                v-if="!showInfo"
                :to="'/setlist/' + settype" class="header_nav_logo">
                  <IconsNavHome/>
                  <div class="content">Zurück</div>
              </NuxtLink>
            </Transition>

<!--
            <Transition name="grow-width">
              <NuxtLink class="navbar_set_link"
                  :class="{grow_width:showPath2Root}"
                  v-if="activeSetId !== setid"
                  @mouseover="setShowPath2Root(true)"
                  @mouseleave="setShowPath2Root(false)"
                  :to="'/setview/'+settype+'/'+treeid+'/'+ setid">

                  {{ showPath2Root ? getColTitle(setid) : '...' }}
              </NuxtLink>
            </Transition>
-->
            
            <Transition :name="showInfo ? 'move-u50' : 'grow-width' ">
              
              <NuxtLink class="navbar_set_link parent_link"
                  v-if="activeSetId !== setid && !showInfo"
                  :class="{showPath2Root: showPath2Root}"
                  :style="{width: showPath2Root? getTitleWidth(setid) : '24px'}"
                  :to="'/setview/'+settype+'/'+treeid+'/'+ setid"
                  @mouseover="setShowPath2Root(true)"
                  @mouseleave="setShowPath2Root(false)"
                  >
                  <span
                    :style="{width: showPath2Root? getTitleWidth(setid) : '24px'}">
                    {{ showPath2Root ? getColTitle(setid) : '&nbsp;...' }}
                  </span>
              </NuxtLink>
              <NuxtLink class="navbar_set_link parent_link"
                v-else-if="activeSetId == setid && parentSetId !== 'root' && !showInfo"
                :class="{showPath2Root: showPath2Root }"
                :style="{width: showPath2Root? getTitleWidth(parentSetId) : '24px'}"
                :to="'/setview/'+settype+'/'+treeid+'/'+ parentSetId"
                @mouseover="setShowPath2Root(true)"
                @mouseleave="setShowPath2Root(false)"
                >
                <span 
                  :style="{width: showPath2Root? getTitleWidth(parentSetId) : '24px'}">
                  {{showPath2Root ? getColTitle(parentSetId) : '&nbsp;...' }}
                </span>
              </NuxtLink>
              
<!--
              <NuxtLink class="navbar_set_link parent_link"
                  :class="{grow_width:showPath2Root,
                    showPath2Root: showPath2Root}"
                  v-if="activeSetId !== setid && !showInfo && !showPath2Root"
                  @mouseover="setShowPath2Root(true)"
                  @mouseleave="setShowPath2Root(false)"
                  :style="{width: showPath2Root? 'auto' : '16px'}"      
                  :to="'/setview/'+settype+'/'+treeid+'/'+ setid">
                    ...
                  
              </NuxtLink>
              <NuxtLink class="navbar_set_link parent_link"
                  :class="{grow_width:showPath2Root,
                    showPath2Root: showPath2Root}"
                  v-else-if="activeSetId !== setid && !showInfo"
                  @mouseover="setShowPath2Root(true)"
                  @mouseleave="setShowPath2Root(false)"
                  :style="{width: showPath2Root? 'auto' : '16px'}"      
                  :to="'/setview/'+settype+'/'+treeid+'/'+ setid">

                  {{ showPath2Root ? getColTitle(setid) : '...' }}
              </NuxtLink>
              <NuxtLink class="navbar_set_link"
                v-else-if="activeSetId == setid && parentSetId !== 'root' && !showInfo && !showPath2Root"
                :to="'/setview/'+settype+'/'+treeid+'/'+ parentSetId"
                :class="{showPath2Root: showPath2Root,
                  }"
                
                @mouseover="setShowPath2Root(true)"
                @mouseleave="setShowPath2Root(false)">
                  ...
                
              </NuxtLink>
              <NuxtLink class="navbar_set_link"
                v-else-if="activeSetId == setid && parentSetId !== 'root' && !showInfo"
                :to="'/setview/'+settype+'/'+treeid+'/'+ parentSetId"
                :class="{showPath2Root: showPath2Root,
                  }"
                
                @mouseover="setShowPath2Root(true)"
                @mouseleave="setShowPath2Root(false)">

                {{showPath2Root ? getColTitle(parentSetId) : '...' }}
              </NuxtLink>
              -->
            </Transition>

            <Transition :name="showInfo ? 'move-u50' : 'grow-width' ">
            <NuxtLink class="navbar_set_link"
              v-if="activeSetId == setid && !showInfo"
              :to="'/setview/'+settype+'/'+treeid+'/'+ activeSetId"
              >
              {{ getColTitle(activeSetId) }}
            </NuxtLink>
          </Transition>
            
            <!-- <NuxtLink class="navbar_set_link"
              v-else-if="parentSetId == 'root'"
              >
              T {{getColTitle(treeid)}}
            </NuxtLink> -->

            

            <Transition :name="showInfo ? 'move-u50' : 'grow-width' ">
            <NuxtLink
                v-if="activeSetId !== setid && !showInfo"
                class="navbar_set_link"
                :to="'/setview/'+settype+'/'+treeid+'/'+ activeSetId">
                {{ getColTitle(activeSetId) }}
            </NuxtLink>
          </Transition>

          

            <!-- <Transition name="fade_io">
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
            </Transition> -->
            <!-- <Transition name="fade_io">
              <NuxtLink
                v-if="activeSetId !== setid || !showPath2Root"
                class="navbar_set_link"
                :to="'/setview/'+settype+'/'+treeid+'/'+ activeSetId">
                {{ getColTitle(activeSetId) }}
              </NuxtLink>
            </Transition> -->
            
            <Transition name="fade">
            <NuxtLink
              v-if="!showInfo"
              @click="$emit('toggleShowInfo')"
              class="navbar_set_link info"
              :class="{info_active: showInfo}"
              >&nbsp;i&nbsp;
            </NuxtLink>

            <NuxtLink
              v-else="showInfo"
              @click="$emit('toggleShowInfo')"
              class="navbar_set_link info"
              :class="{info_active: !showInfo}"
              >X
            </NuxtLink>

          </Transition>

        </nav>
    </header>


</template>
<script setup lang="ts">
const emit = defineEmits([
    'toggleShowInfo'
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

const showPath2Root = ref(true)
const SHOW_PATH2ROOT_DELAY = 500

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
    return result
}

const getTextWidth = (text:string, font:string) => {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  //const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const getTitleWidth = (id:string): string => {
  //const result = getColTitle(id).length * 24;
  const result = getTextWidth(getColTitle(id),"20px Instrument Sans")
  return (result + 10) + 'px';
}
</script>
<style scoped>

.navbar_set_link {
  position: relative;
  /* left: 0; */
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  
  padding: var(--spacing__betweenitemsM, 12px);
  border: 1px solid black;
  border-radius: var(--radius__full, 48px);
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: 0 var(--spacing__navbarbetweenitems, 4px);

  transition: all 0.5s linear;

  color: var(--text-primary, #2C2C2C);

    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}
.navbar_set_link * {
  text-decoration: none;
  user-select: none;
  cursor: pointer;
}

.navbar_set_link.parent_link {
  width: 24px;
  transition: width 0.5s;
  overflow: hidden;
}

.navbar_set_link.parent_link span {
  display: inline-block;
  height: 24px;
  overflow: hidden;
}
/* .navbar_set_link.parent_link::before {
  content: '...  .........';
}
.navbar_set_link.parent_link:hover::before {
  content: '';
} */
.navbar_set_link.parent_link:hover {
  width: 20rem;
}
/* .navbar_set_link.grow_width {
  width: auto;
  transition: all 1s linear;
} */
/* .navbar_set_link.info_active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
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
  background: var(--nav-bar-info-button-fill, #2C2C2C);

  color: var(--text-primary-inverted, #FFF);
font-family: "Instrument Sans";
font-size: var(--font-h4-font-size, 24px);
font-style: normal;
font-weight: 500;
line-height: var(--font-h4-line-height, 32px); /* 125% */

transition: all 1s linear;
}


.header_nav_logo {
  stroke: none;
  fill: #222 !important;
  text-decoration: none;
}

.header_nav_logo .content {
  color: var(--text-primary, #2C2C2C);
  visibility: collapse;
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  position: relative;
  top: -40px; left: 48px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.5s;
  opacity: 0;
}
.header_nav_logo:hover {
  width: 8rem;
  transition: all 0.5s;
}
.header_nav_logo:hover .content {
  visibility: visible; 
  opacity: 1;
}

</style>