<template>
    <header >
      <nav class="wrapper_left">
        <NuxtLink @click="$emit('showMenu')" class="header_nav_logo">
          <IconsNavIconORC />
        </NuxtLink>

<!-- TODO mobile theme btn paddings, toggle size -->
        <!-- <Transition name="move-u50">
        v-if="!hideNavBtns"
             -->
          <div class="settype_toggle"
            :class="{
              hidden: hideNavBtns,
              diplom: toggleBtnSetType == MATCH_DIPLOM,
              projects: toggleBtnSetType == MATCH_PROJECTS}"
              >
            <NuxtLink class="navbar_link navbar_link_projects"
              :class="{active: toggleBtnSetType == MATCH_PROJECTS}"
              
              @click="toggleBtnSetType != MATCH_PROJECTS && $emit('switch2settype', [MATCH_PROJECTS])"
              >
              <!-- Alle Projekte -->
              {{ projects_label }}
            </NuxtLink>
            <NuxtLink class="navbar_link navbar_link_diplom"
              :class="{active: toggleBtnSetType == MATCH_DIPLOM}"
              
              @click="toggleBtnSetType != MATCH_DIPLOM && $emit('switch2settype' , [MATCH_DIPLOM])"
              >
              <!-- Abschlussarbeiten -->
              {{ diploms_label }}
            </NuxtLink>
          </div>
        <!-- </Transition> -->

        <!-- <Transition name="move-u50"> 
        v-if="!hideNavBtns"
            -->
          <NuxtLink class="navbar_link afilter"
            :class="{hidden: hideNavBtns,
              active:showFilterView}"
            @click="$emit('showFilter')">
            <!-- Filter -->
            <!-- <IconWrap class="filter_icon" v-if="isMobile"> -->
            <IconsFilterSearch class="filter_icon" v-if="isMobile"/>
            <!-- </IconWrap> -->
            <span v-else>{{ $t('setlist.btn_title_filter') }}</span>
            
            <span v-if="filterCount">({{filterCount}})</span>
          </NuxtLink>
        <!-- </Transition> -->

        <!-- <Transition name="move-u50">
        v-if="!hideNavBtns && filterCount"
             -->
        <NuxtLink class="navbar_link areset"
            :class="{hidden: hideNavBtns || filterCount == 0}"
            @click="$emit('resetFilter')"
            >
            <!-- Reset -->
            {{ $t('setlist.btn_title_filter_reset') }}
          </NuxtLink>
        <!-- </Transition> -->
        
      </nav>
      <nav class="wrapper_right">
        <!-- <Transition name="move-u50">
        v-if="!hideNavBtns" -->
          <NuxtLink class="navbar_link aarchive"
            :class="{hidden: hideNavBtns}"
            to="https://hfg-karlsruhe.de"
            target="_blank" rel="noopener noreferer"          
            >
            <IconsNavIconHfG/>
          </NuxtLink>
        <!-- </Transition> -->
      </nav>
      
    </header>
</template>
<script setup lang="ts">
// TODO dynamic width for project type toggle

const {
  t,
  locale
} = useI18n()

const {
  MATCH_DIPLOM,
  MATCH_PROJECTS,
  filterCount,
} = treeHelper();

const {
  getSetTypeColor,
  mergeSetTypeColor,
  mergeSetTypeBackColor,
} = DynFonts()


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
const isMobile = ref(false)

const getTextWidth = (text:string):number => {
  // re-use canvas object for better performance
  try {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));

    const context = canvas.getContext("2d");
    const fontSize = (isMobile.value ? '16' : '20')
  
    const SET_TYPE_TOGGLE_FONT= fontSize + 'px Instrument Sans'
    context.font = SET_TYPE_TOGGLE_FONT;
    const metrics = context.measureText(text);
    return metrics.width;
  } catch (error) {
    console.error("getTextWidth: Error: " + error)
    return 146;
  }
}


const toggle_project_width = ref("146px")
const toggle_diplom_width = ref("202px")
const projects_label = ref('Projects')
const diploms_label = ref('Diploma')

const updateStyle = () => {
  isMobile.value = document.documentElement.getAttribute('data-layout') == 'mobile'
  projects_label.value = isMobile.value ? t('setlist.btn_title_toggle_project_mobile') : t('setlist.btn_title_toggle_project')
  diploms_label.value = isMobile.value ?  t('setlist.btn_title_toggle_diplom_mobile') : t('setlist.btn_title_toggle_diplom')
  const project_width = getTextWidth( projects_label.value ) + 
    (isMobile ? 29 : 27)
  const diplom_width = getTextWidth(diploms_label.value ) +
    (isMobile ? 30 : 28) 
  console.log(
    projects_label.value
    + " : "
    + diploms_label.value
    + " pw: " + project_width 
    + " dw: " + diplom_width)
  toggle_diplom_width.value = diplom_width + 'px'
  toggle_project_width.value = project_width + 'px'
}
onMounted(() => {
  updateStyle()
})

watch(locale, () => {
  console.log("locale changed: update style")
  updateStyle()
})
// const showArchive = ref(false)
// const setShowArchiveLink = (val:boolean) => {
//   if (val == true) {
//     showArchive.value = true;
//   } else {
//     setTimeout(() => {
//       showArchive.value = false;
//     },3000)
//   }
// }
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
  border: 1px solid var(--Primitives-color-greys-ORCBlack, #2C2C2C);
  width: var(--dimension-button-height-M, 48px);
  height: var(--dimension-button-height-M, 48px);
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
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-button-line-height, 24px); /* 120% */

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2);
  
 /*  background: var(--Colors-nav-bar-button-fill, #F3F2EF); */
 transition: transform 300ms ease-out;
}
.settype_toggle.hidden,
.navbar_link.hidden {
  transform: translateY(-100px);
}

.navbar_link.afilter {
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: 12px;

  background: var(--Colors-nav-bar-button-fill, #F3F2EF);
}
[data-layout="mobile"] {
  .navbar_link.afilter {
    height: var(--font-button-line-height, 18px)
    
  }
  .filter_icon {
    width: 18px;
    height: 18px;
  }
}


.navbar_link.areset {
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: 12px;
  
  background: var(--Colors-nav-bar-button-fill, #F3F2EF);
}

.navbar_link.aarchive {
  cursor: pointer;
  display: flex;
  /* padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px); */
  padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-S, 8px);
  align-items: center;
  gap: 12px;
  
  /* background: var(--Colors-nav-bar-button-fill, #F3F2EF); */
  border: none
}


.navbar_link:hover {
  /* background-color: var(--Colors-nav-bar-toggle-off); */
}
.navbar_link_diplom:hover,
.navbar_link_projects:hover,
.afilter:hover,
.areset:hover {
   background-color: var(--Colors-nav-bar-toggle-on,#CAC9C2);
}

.settype_toggle {
  float:left;
  background-repeat: no-repeat;
  background-position: 0 0;
  transition: all 200ms ease-out;
  display: flex;
  align-items: flex-start;
  
  height: calc(var(--dimension-button-height-M, 48px) + 2px);
  /* height: 50px; */
}
.settype_toggle.projects {
  background: linear-gradient(90deg, 
    var(--Colors-nav-bar-toogle-project, #2C2C2C) 0%,
    var(--Colors-nav-bar-toogle-project, #2C2C2C) v-bind(toggle_project_width),
    var(--Colors-nav-bar-toggle-off, #F3F2EF) v-bind(toggle_project_width));
}
.settype_toggle.diplom {
  background: linear-gradient(90deg, 
    var(--Colors-nav-bar-toggle-off, #F3F2EF) 0,
    var(--Colors-nav-bar-toggle-off, #F3F2EF) 0,
    var(--Colors-nav-bar-toogle-diplom, #FF4D00) 0px,
    var(--Colors-nav-bar-toogle-diplom, #FF4D00) v-bind(toggle_diplom_width),
    var(--Colors-nav-bar-toggle-off, #F3F2EF) v-bind(toggle_diplom_width)
    );
  background-position: v-bind(toggle_project_width) 0;
}

.navbar_link.navbar_link_projects,
.navbar_link.navbar_link_diplom {
  float: left;
  
  color: var(--Colors-text-primary, #2C2C2C);

  /* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-button-line-height, 24px); /* 120% */

  
  height: calc((var(--dimension-button-height-M, 48px) / 2));
  /* height: 24px; */
  
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  gap: 12px;

  
  border-radius: var(--radius-none, 0px);
  border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2);
}

[data-layout="mobile"] {
  .navbar_link.navbar_link_projects,
  .navbar_link.navbar_link_diplom {
    height: calc((var(--dimension-button-height-M, 48px) / 2) - 3px);
  }
}

.navbar_link.navbar_link_projects {
  border-right: none;
  /* width: 146px; */
}

.navbar_link.navbar_link_projects.active {
  color: var(--Colors-text-primary-inverted, #FFF);
  border-color: var(--Colors-nav-bar-toogle-project, #2C2C2C); 

}
.navbar_link.navbar_link_projects.active:hover {
  background-color: transparent;
}
.navbar_link.navbar_link_diplom {
  border-left: none;
}
.navbar_link.navbar_link_diplom.active {
  border-color: var(--Colors-nav-bar-toogle-highlight, #FF4D00);
  color: #fff;
}
.navbar_link.navbar_link_diplom.active:hover {
  background-color: transparent;
}
.navbar_set_link.active {
  background-color: var(--Colors-nav-bar-toggle-off);
  font-weight: 400;
}
</style>