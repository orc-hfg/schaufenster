<template>
        <header>
        <nav class="nav">
            <NuxtLink :to="'/setlist/' + settype" class="header_nav_logo">
                <IconsNavHome/>
                <div class="content">Zurück</div>
            </NuxtLink>

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
            <!-- :style="{width: showPath2Root? 'auto' : '24px'}" -->
            <Transition name="grow-width">
              
              <NuxtLink class="navbar_set_link"
                  :class="{grow_width:showPath2Root,
                    showPath2Root: showPath2Root}"
                  v-if="activeSetId !== setid"
                  @mouseover="setShowPath2Root(true)"
                  @mouseleave="setShowPath2Root(false)"
                  :to="'/setview/'+settype+'/'+treeid+'/'+ setid">

                  MS {{ showPath2Root ? getColTitle(setid) : '...' }}
              </NuxtLink>
              <NuxtLink class="navbar_set_link"
                v-else-if="activeSetId == setid && parentSetId !== 'root'"
                :to="'/setview/'+settype+'/'+treeid+'/'+ parentSetId"
                :class="{showPath2Root: showPath2Root,
                  }"
                
                @mouseover="setShowPath2Root(true)"
                @mouseleave="setShowPath2Root(false)">

                PS {{showPath2Root ? getColTitle(parentSetId) : '...' }}
              </NuxtLink>
              
            </Transition>

          <Transition name="grow-width">
            <NuxtLink class="navbar_set_link"
              v-if="activeSetId == setid"
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

            

          <Transition name="move-ur30">
            <NuxtLink
                v-if="activeSetId !== setid"
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
            
            <NuxtLink
              @click="$emit('toggleShowInfo')"
              class="navbar_set_link info"
              :class="{info_active: showInfo}"
              >&nbsp;i&nbsp;
            </NuxtLink>
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

const showPath2Root = ref(false)
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
</script>
<style >

.navbar_set_link {
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  padding: var(--spacing__betweenitemsM, 12px);
  border: 1px solid black;
  border-radius: var(--radius__full, 48px);
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: 0 var(--spacing__navbarbetweenitems, 4px);
  transition: all 1s linear;
}

.navbar_set_link.grow_width {
  width: auto;
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