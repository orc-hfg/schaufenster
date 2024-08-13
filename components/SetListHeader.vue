<template>
    <header >
      <nav class="wrapper_left">
        <NuxtLink @click="$emit('showMenu')" class="header_nav_logo">
          <IconsNavIconORC />
        </NuxtLink>

        <Transition name="move-ur30">
          <div class="settype_toggle"
            v-if="!hideNavBtns"
            :class="{diplom: toggleBtnSetType == MATCH_DIPLOM,
              projects: toggleBtnSetType == MATCH_PROJECTS}">
            <NuxtLink class="navbar_link navbar_link_projects"
              :class="{active: toggleBtnSetType == MATCH_PROJECTS}"
              @click="$emit('switch2settype', [MATCH_PROJECTS])"
              >
              Alle Projekte
            </NuxtLink>
            <NuxtLink class="navbar_link navbar_link_diplom"
              :class="{active: toggleBtnSetType == MATCH_DIPLOM}"
              @click="$emit('switch2settype' , [MATCH_DIPLOM])"
              >
              <!-- Abschluss -->
              Abschlussarbeiten
            </NuxtLink>
          </div>
        </Transition>

        <Transition name="move-ur45">
          <NuxtLink class="navbar_link afilter"
            v-if="!hideNavBtns"
            :class="{active:showFilterView}"
            @click="$emit('showFilter')">
            Filter
            <span v-if="filterCount">({{filterCount}})</span>
          </NuxtLink>
        </Transition>

        <Transition name="move-ur45">
        <NuxtLink class="navbar_link areset"
            v-if="!hideNavBtns && filterCount"
            @click="$emit('resetFilter')"
            >
            Reset
          </NuxtLink>
        </Transition>
        
      </nav>
      <nav class="wrapper_right"
        @mouseenter="setShowArchiveLink(true)"
        @mouseleave="setShowArchiveLink(false)"
        >
        <IconsNavIconHfG/>
        <Transition name="move-u30-fade">
          <NuxtLink class="navbar_link aarchive"
            v-if="showArchive"
            to="https://dev.madek.hfg-karlsruhe.de">
            Zur Seite
          </NuxtLink>
        </Transition>
      </nav>
    </header>
</template>
<script setup lang="ts">
const {
  MATCH_DIPLOM,
  MATCH_PROJECTS,
  filterCount,
} = treeHelper();

const emit = defineEmits([
    'showMenu',
    'resetFilter',
    'showFilter',
    'switch2settype'
])

const props = defineProps([
    'toggleBtnSetType',
    'settype',
    'hideNavBtns',
    'showFilterView'
])
const showArchive = ref(false)
const setShowArchiveLink = (val:boolean) => {
  if (val == true) {
    showArchive.value = true;
  } else {
    setTimeout(() => {
      showArchive.value = false;
    },3000)
  }
}
</script>
<style scoped>
header {
  display: flex;
  
  padding: var(--margin-navbar-left-right-top-btm, 12px);
  justify-content: space-between;
  align-items: center;
}
.wrapper_left {
  display: flex;
align-items: center;
gap: var(--spacing-navbar-between-items, 4px);
}
.wrapper_right {
  display: flex;
justify-content: flex-end;
align-items: center;
gap: var(--margin-navbar-institution-logo-right, 10px);
}
header nav a {
  text-decoration: none;
  cursor: pointer;
}
.nav-logo-orc path {
  stroke: var(--Colors-nav-bar-button-outline);
  fill: var(--Colors-nav-bar-platform-logo);
}


.header_nav_logo {
  padding: 0px;
  border: 1px solid transparent
}

.navbar_link {
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  
  /* background-color: var(--Colors-nav-bar-toggle-on); */

  /* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--font-button-line-height, 24px); /* 120% */

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2);
  
}

.navbar_link.afilter {
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: 12px;

  background: var(--Colors-nav-bar-button-fill, #F3F2EF);
}

.navbar_link.areset {
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: 12px;
  
  background: var(--Colors-nav-bar-button-fill, #F3F2EF);
}

.navbar_link.aarchive {
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: 12px;
  
  background: var(--Colors-nav-bar-button-fill, #F3F2EF);
}


.navbar_link:hover {
  /* background-color: var(--Colors-nav-bar-toggle-off); */
}
.navbar_link_projects:hover,
.afilter:hover,
.areset:hover {
   background-color: var(--Colors-nav-bar-toggle-on,#CAC9C2);
}

.settype_toggle {
  float:left;
  background-repeat: no-repeat;
  background-position: 0 0;
  transition: all 0.25s linear;
  display: flex;
  align-items: flex-start;
  
  height: var(--dimension-button-height-M, 48px);
}
.settype_toggle.projects {
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 9.0rem,
    rgba(255,255,255,1) 9.0rem);
}
.settype_toggle.diplom {
  /* background: rgb(242,137,6); */

  background: linear-gradient(90deg, rgba(255,255,255,1) 0,
   rgba(255,255,255,1) 0,
    var(--Colors-nav-bar-info-button-fill) 0px,
    var(--Colors-nav-bar-info-button-fill) 12.60rem,
    rgba(255,255,255,1) 12.5rem
    );
  background-position: 9.0rem 0;
}

.navbar_link.navbar_link_projects,
.navbar_link.navbar_link_diplom {
  float: left;
  
  

  color: var(--text-primary, #2C2C2C);

  /* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--font-button-line-height, 24px); /* 120% */

  
  height: 22px;
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  gap: 12px;

  
  border-radius: var(--radius-none, 0px);
  border: 1px solid var(--nav-bar-button-outline, #CAC9C2);
}
.navbar_link_diplom:hover {
  background-color: var(--Colors-nav-bar-info-button-fill);
}
.navbar_link.navbar_link_projects.active {

  
  color: var(--text-primary-inverted, #FFF);


}
.navbar_link.navbar_link_projects.active:hover {
  background-color: var(--Colors-nav-bar-toggle-on, #222);
}
.navbar_link.navbar_link_diplom.active {
  /* background-color: var(--Colors-nav-bar-toggle-on, #f00); */
  color: #fff;
}
.navbar_set_link.active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 800;
}
</style>