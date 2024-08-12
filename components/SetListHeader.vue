<template>
    <header >
      <nav class="nav">
        <NuxtLink @click="$emit('showMenu')" class="header_nav_logo">
          <IconsNavIconORC />
        </NuxtLink>

        <Transition name="move-ur30">
          <div class="settype_toggle"
            v-if="!showMenuView"
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
         <NuxtLink class="navbar_link"
          v-if="!showMenuView"
          :class="{active:showFilterView}"
          @click="$emit('showFilter')">
          Filter
        </NuxtLink>
      </Transition>

        <NuxtLink class="navbar_link"
          v-if="!showMenuView">
          FC {{ filterCount }}
        </NuxtLink>

        <NuxtLink class="navbar_link"
          v-if="!showMenuView"
          @click="$emit('resetFilter')"
          >
          Reset
        </NuxtLink>

        <NuxtLink class="navbar_link"
          :class="{disabled: isEnabledYearBack}"
          v-if="!showMenuView && settype == MATCH_DIPLOM"
          @click="$emit('clickedYearBack')">
          Up
        </NuxtLink>
        <NuxtLink class="navbar_link"
          :class="{disabled: isEnabledYearFwd}"
          v-if="!showMenuView && settype == MATCH_DIPLOM"
          @click="$emit('clickedYearFwd')"
          >
          Down
        </NuxtLink>
        
        
        <!-- <h1>Set List</h1> -->
        <!-- <p>
          RP: {{ route.params }}
          ST/MT: {{ settype }}
          <br/>
          
        </p> -->
        

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
    'clickedYearFwd',
    'clickedYearBack',
    'resetFilter',
    'showFilter',
    'switch2settype'])

const props = defineProps([
    'toggleBtnSetType',
    'settype',
    'showMenuView',
    'showFilterView',
    'isEnabledYearFwd',
    'isEnabledYearBack'])
</script>
<style scoped>
.nav-logo-orc path {
  stroke: var(--Colors-nav-bar-button-outline);
  fill: var(--Colors-nav-bar-platform-logo);
}


.nav {

}
.header_nav_logo {
  padding: 0px;
  border: 1px solid transparent
}
.navbar_link {
  font-family: Instrument Sans, sans-serif;
  font-size: 20px;
  padding: 12px;
  border: 1px solid black;
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: 0px 4px;
}
.settype_toggle {
  float:left;
  background-repeat: no-repeat;
  background-position: 0 0;
  transition: all 0.25s linear;
}
.settype_toggle.projects {
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 9.5rem,
    rgba(255,255,255,1) 9.5rem);

}
.settype_toggle.diplom {
  /* background: rgb(242,137,6); */
  
  /* background: linear-gradient(90deg, rgba(255,255,255,1) 0,
   rgba(255,255,255,1) 0,
    var(--Colors-nav-bar-info-button-fill) 1px,
    var(--Colors-nav-bar-info-button-fill) 190px,
    rgba(255,255,255,1) 190px  
    ); */

  background: linear-gradient(90deg, rgba(255,255,255,1) 0,
   rgba(255,255,255,1) 0,
    var(--Colors-nav-bar-info-button-fill) 0px,
    var(--Colors-nav-bar-info-button-fill) 12.60rem,
    rgba(255,255,255,1) 12.6rem
    );
  /* background-position: 75px 0; */
  background-position: 9.75rem 0;
  
}
.settype_toggle.diplom .navbar_link_diplom {

}
.navbar_link.navbar_link_projects,
.navbar_link.navbar_link_diplom {
  float: left;
  text-decoration: none;
  color: #222;
}
.navbar_link.navbar_link_projects.active {

  /* background-color: var(--Colors-nav-bar-toggle-on, #222); */
   
  color: #fff;
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