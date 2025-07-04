<template>
    <header >
      <nav class="wrapper_left">
        <NuxtLink
          @click="$emit('showMenu')" 
          @keyup.enter="$emit('showMenu')"
          class="header_nav_logo"
          :tabindex="(hideNavBtns? '-1' : '0')">
          <IconsNavIconORC />
        </NuxtLink>

<!-- TODO mobile theme btn paddings, toggle size -->
        <div class="settype_toggle"
            v-if="!isKioskMode"
            :class="{
              hidden: hideNavBtns || isKioskMode,
              diplom: toggleBtnSetType == MATCH_DIPLOM,
              projects: toggleBtnSetType == MATCH_PROJECTS}"
              >
            <NuxtLink class="navbar_link navbar_link_projects" id="navbar_link_projects"
              :class="{active: toggleBtnSetType == MATCH_PROJECTS}"
              :tabindex="(hideNavBtns? '-1': '0')"
              @click="switch2SetType(MATCH_PROJECTS)"
              @keyup.enter="switch2SetType(MATCH_PROJECTS)"
              >
              <!-- Alle Projekte -->
              {{ projects_label }}
            </NuxtLink>
            <NuxtLink class="navbar_link navbar_link_diplom" id="navbar_link_diplom"
              :class="{active: toggleBtnSetType == MATCH_DIPLOM}"
              :tabindex="(hideNavBtns? '-1': '0')"
              @click="switch2SetType(MATCH_DIPLOM)"
              @keyup.enter="switch2SetType(MATCH_DIPLOM)"
              >
              <!-- Abschlussarbeiten -->
              {{ diploms_label }}
            </NuxtLink>
        </div>

        <NuxtLink class="navbar_link afilter"
            
            :class="{hidden: hideNavBtns,
              active:showFilterView}"
              :tabindex="(hideNavBtns? '-1': '0')"
            @click="$emit('showFilter')"
            @keyup.enter="$emit('showFilter')">
            <!-- Filter -->
            <IconsFilterSearch class="filter_icon" v-if="isMobile"/>
            <span v-else>{{ $t('setlist.btn_title_filter') }}</span>
            
            <span v-if="filterCount">({{filterCount}})</span>
        </NuxtLink>
      
        <NuxtLink class="navbar_link areset"
            v-if="!isKioskMode"
            :class="{hidden: hideNavBtns || filterCount == 0}"
            :tabindex="(hideNavBtns || filterCount == 0? '-1': '0')"
            @click="$emit('resetFilter')"
            >
            <!-- Reset -->
            {{ $t('setlist.btn_title_filter_reset') }}
          </NuxtLink>
      </nav>

      <nav class="wrapper_right">
          <NuxtLink class="navbar_link aarchive"
            :aria-label="$t('setlist.btn_title_institution')" 
            :class="{hidden: hideNavBtns}"
            :tabindex="(hideNavBtns? '-1': '0')"
            to="https://hfg-karlsruhe.de"
            target="_blank" rel="noopener noreferer"       
            >
            <IconsNavIconHfG/>
          </NuxtLink>
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
const isMobile = useState('mobile')
const isKioskMode = ref(false)

const FONT_SIZE_MOBILE = 16
const FONT_SIZE_DTOP = 20
const FONT_SIZE_SUFFIX = 'px Instrument Sans'
const canvas = ref(document && document.createElement("canvas"))

const getTextWidth = (text:string):number => {
  // re-use canvas object for better performance
  try {
    canvas.value = canvas.value || document.createElement("canvas") 
    //const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));

    const context = canvas.value.getContext("2d");
    const fontSize = (isMobile.value ? FONT_SIZE_MOBILE : FONT_SIZE_DTOP)
    context.font = fontSize + FONT_SIZE_SUFFIX
    const metrics = context?.measureText(text);
    return metrics?.width || 146;
  } catch (error) {
    console.error("getTextWidth: Error: ", error)
    // TODO default width for mobile
    return 146;
  }
}

// css used vars for toggle background animation
// filled with default sizes and texts
const toggle_project_width = ref("146px")
const toggle_diplom_width = ref("202px")
const projects_label = ref(t('setlist.btn_title_toggle_project'))
const diploms_label = ref(t('setlist.btn_title_toggle_diplom'))

const updateStyle = () => {
  
  if (useRuntimeConfig().public.kioskForestSetId) {
    isKioskMode.value = true
    return
  }
  
  projects_label.value = isMobile.value ? t('setlist.btn_title_toggle_project_mobile') : t('setlist.btn_title_toggle_project')
  diploms_label.value = isMobile.value ?  t('setlist.btn_title_toggle_diplom_mobile') : t('setlist.btn_title_toggle_diplom')
  // after drawing, get real size
  setTimeout(() => {
    const tg_left = document.getElementById('navbar_link_projects')?.getBoundingClientRect();
    const tg_right = document.getElementById('navbar_link_diplom')?.getBoundingClientRect();
    toggle_diplom_width.value = tg_right?.width + 'px'
    toggle_project_width.value = tg_left?.width + 'px'

    /*console.log("updateStyle: measured after redraw "
    + projects_label.value
    + " : "
    + diploms_label.value
    + " pw: " + toggle_project_width.value
    + " dw: " + toggle_diplom_width.value)
    */
  },100)
  
  const project_width = getTextWidth( projects_label.value ) + 27
  const diplom_width = getTextWidth(diploms_label.value ) + 28
  toggle_diplom_width.value = diplom_width + 'px'
  toggle_project_width.value = project_width + 'px'

  /*console.log("updateStyle: computed before redraw"
    +projects_label.value
    + " : "
    + diploms_label.value
    + " pw: " + toggle_project_width.value
    + " dw: " + toggle_diplom_width.value)
    */
}
onMounted(() => {
  updateStyle()
})

watch(isMobile, updateStyle)
watch(locale, () => {
  console.log("locale changed: update style")
  updateStyle()
})

const switch2SetType = (type:string) => {
   if (props.toggleBtnSetType == type) {
    return
   }
   else {
    emit('switch2settype', [type])
   } 
}
</script>
<style scoped>
header {
  display: flex;
  
  padding: var(--padding-navbar-left-right-top-btm);
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.wrapper_left {
  display: flex;
align-items: center;
gap: var(--spacing-navbar-between-items, 4px);
 pointer-events: auto;
}
.wrapper_right {
  display: flex;
justify-content: flex-end;
align-items: center;
gap: var(--margin-navbar-institution-logo-right, 10px);
 pointer-events: auto;
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
  gap: var(--padding-item-horizontal-S);

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

[data-layout="mobile"] {
  .navbar_link.areset {
    display: none;
  }
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
  border-color: var(--Colors-nav-bar-toogle-diplom, #FF4D00);
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