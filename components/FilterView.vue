<script setup lang="ts">
import type { iFilterTypeMap } from '~/composables/tree';


const route = useRoute()
const router = useRouter()
const {
  FILTERS_KEYWORD,
  FILTERS_PEOPLE,
  FILTERS_ROLES,
  MK_AUTHORS,
  MK_KEYWORDS,
  MK_PARTICIPANTS,
  MK_DEPARTMENTS,
  MK_PROGRAM_OF_STUDY,
  MK_PROJECT_LEADER,
  MK_PROJECT_TYPE,
  MK_SEMESTER,
  MK_TITLE,
  RID,
  
  treeList,

  filtersMap,
  //filtersText,
  newFiltersMap,
  filtersTitle,
  newFiltersTitle,
  getMapCount,
  getFilterCount,
  updateFilters,
  
} = treeHelper()

const filteredTreeMap = ref({} as {[key:string]:object})
const getSortedfilteredTreeMapKeys = () => {
  const result = Object.keys(filteredTreeMap.value || {})
  if (result.length == 0) {
    return [];
  }
  result.sort((a:string,b:string) => {
    const ta = filteredTreeMap.value[a].colTitlesMap[a] || ''
    const tb = filteredTreeMap.value[b].colTitlesMap[b] || ''
    return ta.localeCompare(tb)
  })
  return result
}
const filterFor = ref('')

const mobile_show_projects = ref(false)
const emit = defineEmits(['closed', 'applied'])
const props = defineProps(['trees_map', 'tree_type', 'useCurrentFilters', 'useCleanFilters', 'showMetaKey'])

const SHOW_ANIMATE_IO_DELAY = 300
const animate_intro = ref(true)

const selectedFilterCount = ref(0)

// global counts
const globalMap = ref({} as {[key:string]: iFilterTypeMap})
// filtered counts
const countMap = ref({} as {[key:string]: iFilterTypeMap})


watch(route, (newVal, oldVal) => {
  console.log("FV: changed route: " + JSON.stringify(newVal))
  filterFor.value = newVal.path
})
const resetFilter = () => {
  newFiltersMap.value[FILTERS_KEYWORD] = {}
  newFiltersMap.value[FILTERS_PEOPLE] = {}
  newFiltersMap.value[FILTERS_ROLES] = {}
  updateFilteredCounts()
}
const closeFilter = () => {
  
  animate_intro.value = true;
  setTimeout(() => {
    emit('closed')
  }, 200)
}
const applyFilter = () => {
  

  animate_intro.value = true;
  setTimeout(() => {
    emit('applied')
  }, 200)
  
}

const getSortedFilterItemKeys = (metaKey:string)
: //iFilterTypeMap => {
string[] => {
  const result = {}
  for (const item in globalMap.value[metaKey]) {
    const itemVal = globalMap.value[metaKey][item]
    result[itemVal[0].id] = itemVal
  }
  //console.log("sorted result: ")
  //console.dir(result)
  const keys = Object.keys(result).sort((a,b) => globalMap.value[metaKey][a][0].name.localeCompare(globalMap.value[metaKey][b][0].name))
  //console.dir(keys)
  //.keys.sort((a,b) => { a.name > b.name ? 1 : -1 })
   //return globalMap.value[metaKey]
   return keys
}
const addFilterTagCounter =
  (filterMap:iFilterTypeMap, kwId:string,
   kwName:string, treeId:string, kwMetaKey:string) => {

  filterMap[kwId] = filterMap[kwId] || []
  filterMap[kwId].push({
        id: kwId,
        name: kwName,
        treeId: treeId,
        meta_key: kwMetaKey})
}

const initKeywords = (treeMap:iTreeMap, kwMetaKey:string, kwMap: iFilterTypeMap) => {
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colKeywordMap[kwMetaKey]) {
      const kw = treeMap[treeId].colKeywordMap[kwMetaKey][kwId]
      addFilterTagCounter(kwMap, kwId, kw.name, treeId, kwMetaKey)
    }
  }
  // TODO sort map
  return kwMap

}

const initPeople = (treeMap:iTreeMap, metaKey:string, pMap: iFilterTypeMap) => {
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colPeopleMap[metaKey]) {
      const kw = treeMap[treeId].colPeopleMap[metaKey][kwId]
      addFilterTagCounter(pMap, kwId, kw.name, treeId, metaKey)  
    }  
  }
  return pMap
}

const initRoles = (treeMap:iTreeMap, metaKey:string, pMap: iFilterTypeMap) => {
  //const pMap = {} as iFilterTypeMap
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colRolesMap[metaKey]) {
      const kw = treeMap[treeId].colRolesMap[metaKey][kwId]
      addFilterTagCounter(pMap, kwId, kw.name, treeId, metaKey)  
    }  
  }
  return pMap
}

const initTreeType = () => {
  
  treeList.value = props.trees_map
  
  console.log("got tree list" + Object.keys(treeList.value).length);

  [MK_KEYWORDS, MK_PROJECT_TYPE, MK_PROGRAM_OF_STUDY, MK_SEMESTER].forEach(meta_key => {
    globalMap.value[meta_key] = initKeywords(treeList.value, meta_key, {})
  });

  [MK_AUTHORS, MK_PROJECT_LEADER].forEach(meta_key => {
    globalMap.value[meta_key] = initPeople(treeList.value, meta_key, {})
  });

  [MK_PARTICIPANTS].forEach(meta_key => {
    globalMap.value[meta_key] = initRoles(treeList.value, meta_key, {})
  });

  console.log("global count map: ")
  console.dir(globalMap.value)
  updateFilteredCounts()
}


const updateFilteredCounts = () => {
  //console.log("updateFilteredCounts: filters new: " + JSON.stringify(newFiltersMap.value))
  //console.log("updateFilteredCounts: filters old: " + JSON.stringify(filtersMap.value))
  
  filteredTreeMap.value = updateFilters(props.trees_map, newFiltersTitle.value, newFiltersMap.value)
  console.log("updateFilteredCounts: filtered tree count " + getMapCount(filteredTreeMap.value));

  [MK_KEYWORDS, MK_PROJECT_TYPE, MK_PROGRAM_OF_STUDY, MK_SEMESTER].forEach(meta_key => {
    countMap.value[meta_key] = initKeywords(filteredTreeMap.value, meta_key, {})
  });

  [MK_AUTHORS, MK_PROJECT_LEADER].forEach(meta_key => {
    countMap.value[meta_key] = initPeople(filteredTreeMap.value, meta_key, {})
  });

  [MK_PARTICIPANTS].forEach(meta_key => {
    countMap.value[meta_key] = initRoles(filteredTreeMap.value, meta_key, {})
  });

  selectedFilterCount.value = getFilterCount(newFiltersTitle.value, newFiltersMap.value)
  
  updateShowAll()

  setTimeout(() => {
    ALL_META_KEYS.forEach(meta_key => {
        updateFilterHeight(meta_key)
    })
  },100)

  console.log("filtered count map: ")
  console.dir(countMap.value)
}


const clickedFilter = (type:string, kwInfo:object[]) => {
  
  if (!kwInfo.length) {
    console.error("clickedFilter: invalid info")
    return;
  }

  if (getFilteredCount(kwInfo[0].meta_key, kwInfo[0].id) < 1) {
    console.error("clickedFilter: invalid combination: ignore")
    return;
  }
  const data = kwInfo[0]
  const id = data.id
  console.log("clickedFilter: " + type + " : " + id + ":" + JSON.stringify(data))

  if (isSelected(type,id)) {
    console.log("already has selected item: reset")
    delete newFiltersMap.value[type][id]
    console.dir(filtersMap.value)
  }
  else {
      newFiltersMap.value[type][id] = data
      console.log("clickedFilter: filter for data: " + JSON.stringify(data))
  }

  updateFilteredCounts()
  updateFilterHeight(kwInfo[0].meta_key)
}

const clickedKeyword = (kwInfo) => {
  //console.log("clickedKeyword: " + JSON.stringify(kwInfo))
  clickedFilter(FILTERS_KEYWORD, kwInfo)
}

const clickedPeople = (kwInfo) => {
  //console.log("clickedPeople: " + JSON.stringify(kwInfo))
  clickedFilter(FILTERS_PEOPLE, kwInfo)
}

const clickedRole = (kwInfo) => {
  //console.log("clickedRole: " + JSON.stringify(kwInfo))
  clickedFilter(FILTERS_ROLES, kwInfo)
}

const changedFilterTitle = () => {
  //filtersText.value = filtersTitle.value
  console.log("changedFilterTitle " + newFiltersTitle.value)
  updateFilteredCounts();
}

const isSelected = (type:string, id:string) => {
  if (!newFiltersMap.value
      || !newFiltersMap.value[type]
      || !newFiltersMap.value[type][id])
      {
        return false
      }
  return newFiltersMap.value[type][id]
}

const getShowAll = (type:string, meta_key:string, id:string) => {
  if (isSelected(type,id)) {
    console.log("show all because meta key " + meta_key+ " has selected " + id)
    showAll[meta_key] = true
  }
}

const getFilteredCount = (meta_key:string, id:string) => {
  if (!countMap.value
    || !countMap.value[meta_key]
    || !countMap.value[meta_key][id]) {
    return 0
  }
  return countMap.value[meta_key][id].length
}


const isSubString = (data:string): boolean => {
  if (!newFiltersTitle.value || !newFiltersTitle.value.length) {
    return false
  }
  if (!data || !data.toLocaleLowerCase) {
    return false;
  }
  return (data.toLocaleLowerCase().indexOf(newFiltersTitle.value.toLocaleLowerCase()) >= 0)
}

const isHideIfNotSubString = (data:string): boolean => {
  if (!newFiltersTitle.value || !newFiltersTitle.value.length) {
    return false
  }
  return !isSubString(data)
}

const getTagCount = (meta_key: string): number => {
  if (globalMap.value[meta_key]) {
    return Object.keys(globalMap.value[meta_key]).length
  }
  return 10;
}
const toggleShowAll = (meta_key:string) => {
  showAll.value[meta_key] = !showAll.value[meta_key]
}
const getFilterTagClass = (type:string, meta_key: string, filterId:string) => {
  const filterInfo = globalMap.value[meta_key][filterId][0]
  getShowAll(type, meta_key, filterId)
  return {
    selected: isSelected(type, filterId),
    preselected: isSubString(filterInfo.name),
    disabled: getFilteredCount(meta_key, filterId) == 0
  }
}

const showAll = ref({} as {[key:string]:boolean})
const showAllHeight = ref({} as {[key:string]:number})

const updateShowAll = () => {
  for (const type in newFiltersMap.value) {
    for (const id in newFiltersMap.value[type]) {
        const filterInfo = newFiltersMap.value[type][id]
        console.log("updateShowAll: " + filterInfo.meta_key)
        console.dir(filterInfo)
        showAll.value[filterInfo.meta_key] = true
        //updateFilterHeight(filterInfo.meta_key)
      }
  }
  console.log("updateShowAll: ")
  console.dir( showAll.value)
}

const hasFilterResults = (meta_key: string): boolean => {
  for (const item in globalMap.value[meta_key]) {
    if (!isHideIfNotSubString(globalMap.value[meta_key][item][0].name)) {
      return true;
    }
  }
  return false;
}

const ALL_META_KEYS = [
  MK_AUTHORS,
  MK_PARTICIPANTS,
  MK_PROGRAM_OF_STUDY,
  MK_PROJECT_TYPE,
  MK_PROJECT_LEADER,
  MK_SEMESTER,
  MK_KEYWORDS,
];

const META_KEY_FILTER_TYPES = [
  FILTERS_PEOPLE,
  FILTERS_ROLES,
  FILTERS_KEYWORD,
  FILTERS_KEYWORD,
  FILTERS_PEOPLE,
  FILTERS_KEYWORD,
  FILTERS_KEYWORD
]

const META_KEY_FILTER_TITLES = [
  'meta_info.label_project_authors',
  'meta_info.label_project_participants',
  'meta_info.label_project_program_of_study',
  'meta_info.label_project_category',
  'meta_info.label_project_leader',
  'meta_info.label_project_semester',
  'meta_info.label_project_keywords'
]

const getFilterHeight = (metaKey:string) => {
  //const fc_elem = document.getElementById('filter_cloud_' + metaKey)
  const elId = 'filter_cloud_content_' + metaKey
  const fc_elem = document.getElementById(elId)
  const height = fc_elem?.getBoundingClientRect().height || 54 //164
  console.log("getFilterHeight: " + elId + " : " + height)
  return height
}


const updateFilterHeight = (metaKey:string) => {
  showAllHeight.value[metaKey] = getFilterHeight(metaKey) + 'px';
}


onMounted(() => {

  [FILTERS_KEYWORD, FILTERS_PEOPLE, FILTERS_ROLES].forEach(type => {
    filtersMap.value[type] = filtersMap.value[type] || {}
    if (props.useCurrentFilters) {
      newFiltersMap.value[type] = {}
      for (const id in filtersMap.value[type]) {
        newFiltersMap.value[type][id] = filtersMap.value[type][id]
      }
    } else if (props.useCleanFilters) {
      newFiltersMap.value[type] = {}
    } else {
      newFiltersMap.value[type] = newFiltersMap.value[type] || {}
    }
    
    
  })
  

  //console.error("filter map current: " + JSON.stringify(filtersMap.value))
  //console.error("filter map new: " + JSON.stringify(newFiltersMap.value))

  initTreeType();
/*
  ALL_META_KEYS.forEach(meta_key => {
    showAll.value[meta_key] = true
   });
*/
   setTimeout(() => {

    ALL_META_KEYS.forEach(meta_key => {
        updateFilterHeight(meta_key)
    })
    console.log("got show heights: " + JSON.stringify(showAllHeight.value))

      setTimeout(() => {
        ALL_META_KEYS.forEach(meta_key => {
            showAll.value[meta_key] = false
        });

        if (props.showMetaKey) {
          showAll.value[props.showMetaKey] = true
          document.getElementById('filter_cloud_' + props.showMetaKey)?.scrollIntoView()
        }
      }, 100)

    },100)

   
  
  animate_intro.value = true;
  setTimeout(() => {
    animate_intro.value = false;
    updateShowAll()
  }, SHOW_ANIMATE_IO_DELAY)
  
})


const switch2SetView = (tree_col_id: string) => {
  const url = '/setview/' 
    + props.tree_type
    + '/'
    + tree_col_id
    + '/'
    + tree_col_id
  router.push(url)
}

const getShowAllStyle = (meta_key) => {
  if (!showAll.value[meta_key]) {
    // use default height var
    return { height: 'var(--dimension-filter-cloud-height)'}
  } 

  return {height: showAllHeight.value[meta_key]}
}

const highContrastState = useState('isHighContrast')
</script>
<template>
  <div class="filter_view"
    :data-theme="highContrastState? 'hc_light': 'light'"
    :class="{hidden: animate_intro}">
    <!-- TODO mobile theme: complete different layout; show more/less sizes; btn paddings -->
    <header class="header">
      <nav class="nav">
        <div class="wrapper_left">
          <button class="btn_logo"
            tabindex="0"
            @click.once="closeFilter()"
            @keyup.enter="closeFilter()">
            <!-- <IconsNavHome class="logo"/> -->
            <!-- TODO padding -->
            <svg class="logo"
              xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <title>{{ $t('menu.back')}}</title>
              <circle cx="24" cy="24" r="12" transform="rotate(180 24 24)" fill="#2C2C2C"/>
            </svg>
          </button>
        </div>
        
        <div class="wrapper_mid">
          <button class="btn_apply"
            tabindex="0"
            @click.once="applyFilter()">
            <div class="label">
              {{ $t('filter.btn_apply_label') }} 
              <div class="label_filter_count">({{ selectedFilterCount }})</div>
            </div>
          </button>
          <!-- <button class="btn_close"
            @click="closeFilter()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 17L4 12L9 7" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 18V16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12H4" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{$t('filter.btn_close_label')}}
          </button> -->

          <!-- slightly different construction */ -->
          <div class="input_wrapper">
            <input
              id="filter_text_input"
              class="filter_text_input"
              type="text"
              :placeholder="$t('filter.input_label')"
              @input="changedFilterTitle"
              v-model="newFiltersTitle"/>
            <div class="filter_text_clear"
              tabindex="0"
              @click="newFiltersTitle = '';updateFilteredCounts()"
              @keyup.enter="newFiltersTitle = '';updateFilteredCounts()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <title>{{ $t('filter.input_clear')}}</title>
                <path d="M18 6L6 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <button class="btn_close"
            tabindex="0"
            @click="resetFilter()"
            @keyup.enter="resetFilter()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 17L4 12L9 7" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 18V16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12H4" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="btn_close_label">
              {{$t('filter.btn_reset_label')}}
            </div>
          </button>
          
        </div>
      </nav>
    </header>

    <div class="filter_content">
      <div class="content_toggle"
        :class="{'projects-active': mobile_show_projects}">
        <button 
          class="content_toggle_filter"
          tabindex="-1"
          @click="mobile_show_projects = !mobile_show_projects"
          :class="{active: !mobile_show_projects}">
          Filter
        </button>
        
        <button
          class="content_toggle_projects"
          tabindex="-1"
          @click="mobile_show_projects = !mobile_show_projects"
          :class="{active: mobile_show_projects}">
          Projekte
        </button>
      </div>
      <div class="wrapper_filter"
      tabindex="-1"
        :class="{mobile_hidden:mobile_show_projects}">

        <!-- HH Können statt den filter-translations die meta_info-translations verwendet werden? Redundanz vermeiden. -->

        <div
          v-for="(metaKey,idx) in ALL_META_KEYS"
          class="meta_key_filter">
          <div class="filter_headline"
            @click="toggleShowAll(metaKey)"
            @keyup.enter="toggleShowAll(metaKey)"
            role="button"
            tabIndex="0">
            {{ $t(META_KEY_FILTER_TITLES[idx]) }}
            <IconsChevronUpDown :show-up="showAll[metaKey]"/>
          </div>
          <template v-if="hasFilterResults(metaKey)">
            <div class="filter_cloud"
              :id=" 'filter_cloud_' + metaKey "
              :style="getShowAllStyle(metaKey)"
              :class="{hide_all:!showAll[metaKey]}">
              <div class="filter_cloud_content"
                :id=" 'filter_cloud_content_' + metaKey ">
                <div class="filter_cloud_item"
                  v-for="itemId in getSortedFilterItemKeys(metaKey)">
                  <button class="keyword_item"
                    :tabindex="(!showAll[metaKey]? '-1' : '0')"
                    @click="clickedFilter(META_KEY_FILTER_TYPES[idx],globalMap[metaKey][itemId])"
                    v-if="!isHideIfNotSubString(globalMap[metaKey][itemId][0].name)
                      && getFilteredCount(metaKey, itemId) > 0"
                    :class="getFilterTagClass(META_KEY_FILTER_TYPES[idx], metaKey, itemId)">
                    {{ globalMap[metaKey][itemId][0].name }}
                    <span class="filter_count">{{ getFilteredCount(metaKey, itemId) }}</span>
                  </button>
                </div>
              </div>
            </div>

          </template>
          <div v-else class="filter_cloud_no_results">
            {{ $t('filter.no_results') }}
          </div>

        </div>

      </div>

      <div class="wrapper_projects"
      tabindex="-1"
        :class="{mobile_hidden:!mobile_show_projects}">
        <div class="filter_headline">{{ $t('filter.label_projects') }}</div>
        

        <div class="tree_list">
          <div class="tree_list_item"
            v-if="Object.keys(filteredTreeMap || {}).length == 0">
            <div class="tree_authors">
              {{ $t('filter.no_results') }}
            </div>
          </div>
          <!-- v-for="tree in filteredTreeMap"  -->
          <div class="tree_list_item"
            v-for="treeId in getSortedfilteredTreeMapKeys()"
            tabindex="0"
            @click="switch2SetView(treeId)"
            :key="treeId">
            <div class="tree_title">
              {{ filteredTreeMap[treeId].colTitlesMap[treeId] }}
            </div>
            <div class="tree_authors">
              <div class="tree_authors_item"
                v-for="person in filteredTreeMap[treeId].cols_authors[treeId]">
                {{ person }}
              </div>
            </div>
            <!-- <div class="tree_fachbereich">
              <div class="tree_fachbereich_item"
                v-for="fb in tree.cols_departments[tree.col_id]">
                {{ fb }}
              </div>
            </div> -->

            <!-- HH stattdessen Abstand und Border direkt an .tree_list_item -->
            <!-- <div class="tree_divider"></div> -->
            
          </div>
          
        </div>
        
      </div>
    
    </div>

    

  </div>
</template>

<style scoped>
.filter_view {
  position: fixed;
  top: 0px; left: 0px; width: 100vw; height: 100vh;
  z-index: 1000;
  /* padding: 8rem 2rem; */
  background-color: var(--background-default, #F3F2EF);
  color: var(--Colors-text-primary);

  opacity: 1;
  transition: all 500ms ease-out;
}
.hidden {
  transition: all 500ms ease-out;
}
.filter_view.hidden {
  opacity: 0;
  background-color: transparent;
}

button {
  cursor: pointer;
  user-select: none;
  background-color: unset;
  color: var(--Colors-text-primary, #2C2C2C);
  border: none;
}

.filter_view * {
  
  /* color: var(--Primitives-color-transparencies-black-70); */
  font-family: "Instrument Sans";
}
header {
   transition: all 800ms ease-out;
   background: var(--background-default, #F3F2EF);
   border-bottom: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
}


nav {
  /* border: 1px solid green; */
  width: 100%;
  display: flex;
}
.wrapper_left {
  display: flex;
  justify-content: start;
  height: 50px; 
  width: 50px;
  opacity: 1;
  transition: all 500ms ease-out;
}
.hidden .wrapper_left {
  opacity: 0;
}

/* HH Vorschlag, Header und seine Elemente homogener aufzubauen 
 * Ref.: https://cloud.hfg-karlsruhe.de/s/YD9K3e3qE5etBWc
*/
.wrapper_mid {
  display: flex;
  justify-content: center;
  align-items: center;

  /* width: 768px;
  position: absolute;
  left: calc(50% - 384px);
   */
  margin: 0 auto;
  
  /* gap: var(--margin-navbar-institution-logo-right, 10px); */
  gap: var(--spacing-between-menu-items, 20px);

  /* HH wegen flex-shrink fließt .wrapper_mid in mobile über nav hinaus */
  /* flex-shrink: 0; */
  transition: all 500ms ease-out;
}
.hidden .wrapper_mid {
  transform: translateY(-20vh);
}

[data-theme="hc_light"] {
  .filter_headline {
    color: #4d4d4d;
  }
 ::placeholder {
    color: #020202;
    opacity: 1;
  }
}

[data-layout="mobile"] {
  .btn_logo {
    width: var(--dimension-button-height-M);
    height: var(--dimension-button-height-M);
    gap:0;
    padding:0;  
  }
  
  svg.logo {
    width: var(--dimension-button-height-M);
    height: var(--dimension-button-height-M);
  }
  .wrapper_mid {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: var(--spacing-between-items-M);
  }
  .input_wrapper {
    order: 3;
    width: calc(100% + var(--dimension-button-height-M));
    margin-left: calc(-1 * var(--dimension-button-height-M));
    margin-top: var(--margin-header-margin);
    /* width: calc(100% + var(--dimension-button-height-M)); */
    /* margin-left: calc(-1 * var(--dimension-button-height-M)); */
    /* margin-top: var(--spacing-between-items-M); */
    width: 100%;
    margin: 0 var(--spacing-between-items-M);
    .filter_text_input {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .wrapper_left {
    position: absolute;
    width: var(--dimension-button-height-M);
    height: var(--dimension-button-height-M);
  }

  /* HH Umschalter einblenden */
  .content_toggle {
    display: flex;
  }
  /* HH Content positionieren und beim Umschalten animieren */
  .wrapper_filter,
  .wrapper_projects {
    left: calc(0vw + 24px);
    width: calc(100vw - 48px);
    gap: 0;
    transition: transform 200ms ease-out;
  }
  .wrapper_filter.mobile_hidden {
    transform: translateX(-100vw);
  }
  .wrapper_projects.mobile_hidden {
    transform: translateX(100vw);
  }
  .btn_apply {
    /* margin-left: calc(100vw/3  - var(--dimension-button-height-M) - (2 * var(--spacing-navbar-between-items)) ); */
  }

  .btn_apply .label_filter_count {
  width: 2.2em;
  text-align: left;
  }

  .btn_close_label {
    display: none;
  }
  

}

.btn_logo {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-navbar-between-items, 4px);

  border: none;
  width: 50px;
}

.btn_logo .logo:hover {
  transform: scale(0.83);
}

/* quasi-helper-class, trying to be more "dry" */
.btn_apply,
.btn_close,
.filter_text_input,
.filter_headline,
.btn_show_all,
.keyword_item {
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-button-line-height, 24px);
}

.btn_apply {
cursor: pointer;
  user-select: none;

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  /* gap: var(--spacing-navbar-between-items, 4px); */
  gap: var(--spacing-between-items, 12px);

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);

  color: var(--Colors-filter-chip-text-default, #2C2C2C);
  padding: var(--padding-item-vertical-M, 12px) 0;

  
}
/* HH vermeiden, dass der header "springt", wenn sich die Zahl in filter_count verändert */
.btn_apply .label {
  display: flex;
  gap: var(--padding-item-horizontal-S);
  margin-left: var(--padding-item-horizontal-M);
  height: calc((var(--dimension-button-height-M, 48px) / 2) - 3px);
  line-height: 1;
  
}
.btn_apply .label_filter_count {
  width: 2.2em;
  text-align: left;
}

.btn_close {
  cursor: pointer;
  user-select: none;

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  /* gap: var(--spacing-navbar-between-items, 4px); */
  gap: var(--spacing-between-items, 12px);

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);

  color: var(--Colors-filter-chip-text-default, #2C2C2C);
}
.btn_close:hover,
.btn_apply:hover {
  background: var(--Colors-filter-chip-fill-hover, #E7E6E1);
}

/* HH Wrapper für Input-Element und "x" */
.input_wrapper {
  position: relative;
}

.filter_text_input {
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-L, 16px);
  /* HH stops entered text before "x" */
  padding-right: calc(var(--spacing-between-items, 12px) * 3.5);
  
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0; */

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
  background: var(--Colors-filter-searchbar-fill-default, #E7E6E1);

  color: var(--Colors-filter-searchbar-text-active, #2C2C2C);

  outline: none;
  box-shadow: none;
}
.filter_text_clear {
  cursor: pointer;
  user-select: none;
  position: absolute;
  right: var(--spacing-between-items, 12px);
  top: 25%;
}


.filter_content {
  /* border: 1px solid green; */
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  overflow-y: visible;
  padding: 0px 0rem;

  display: flex;

  /* padding-top: 200px; */
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-meta-info-between-sections, 80px);
  flex-shrink: 0;
  transition: all 300ms ease-out;
}

.hidden .filter_content {
  top: 20vh;
}


.wrapper_filter,
.wrapper_projects {
  /* border: 1px solid red/blue */
  position: absolute;
  top: 0px;
  width: calc(40vw - 24px);
  height: calc(100vh - 180px);
  padding-top: 180px;
  overflow-y: scroll;
  
  /* display: flex;
  flex-direction: column;
  align-items: flex-start; */

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.wrapper_filter {
  /* border: 1px solid red; */
  left: 10vw;
  /* gap: 40px; */
  & > div:last-of-type {
    margin-bottom: 4em;
  }
}

.wrapper_projects {
  /* border: 1px solid blue; */
  left: calc(50vw + 24px);
  gap: 16px;
  & > div:last-of-type {
    margin-bottom: 5em;
  }
}

.wrapper_filter::-webkit-scrollbar,
.wrapper_projects::-webkit-scrollbar {
  display: none;
}


/* HH für die besser Übersicht wird das Element unabhängig von data-layout konstruiert */
.content_toggle {
  /* HH für desktop ausblenden */
  display: none;

  border: 1px solid var(--Colors-filter-chip-fill-outline);
  position: fixed;
  bottom: var(--margin-btmbar-main-button);
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  cursor: pointer;
  background-color: var(--Colors-background-default);
  z-index: 20;
  box-shadow: var(--shadow-button-default);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: var(--Colors-filter-chip-fill-active);
    transition: transform 200ms ease-out;
    z-index: -1;
  }
  
  &.projects-active::before {
    transform: translateX(100%);
  }
}
.content_toggle button {
  height: var(--dimension-button-height-M);
  width: calc(var(--dimension-button-height-M) * 3);
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
  font-size: var(--font-button-font-size);
  line-height: 1;
}
.content_toggle button.active {
  color: var(--Colors-filter-chip-text-active);
  background-color: transparent;
}

[data-layout="mobile"] {
  /* HH Umschalter einblenden */
  .content_toggle {
    display: flex;
  }
  /* HH Content positionieren und beim Umschalten animieren */
  .wrapper_filter,
  .wrapper_projects {
    left: calc(0vw + 24px);
    width: calc(100vw - 48px);
    gap: 0;
    transition: transform 200ms ease-out;
  }
  .wrapper_filter.mobile_hidden {
    transform: translateX(-100vw);
  }
  .wrapper_projects.mobile_hidden {
    transform: translateX(100vw);
  }
}

.meta_key_filter,
.tree_filter_people {
  position:relative;
  width: 100%;
  float: left;
  padding-bottom: var(--padding-item-vertical-S);
  margin-bottom: calc(var(--padding-container-bottom-L) + var(--padding-container-bottom-M));
  /* border-bottom: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2); */
}


.filter_headline {  
  flex-direction: row;
 
  display: flex;
  align-items: flex-start;
  gap: var(--margin-navbar-institution-logo-right, 10px);

  align-self: stretch;

  color: var(--Colors-text-secondary, #CAC9C2);

  /* padding-bottom: var(--padding-item-vertical-L); */
  height: 36px;
  cursor: pointer;
}
.filter_headline svg {
  width: 24px;
  height: 24px;
  color: var(--Colors-text-secondary, #CAC9C2) !important;
  stroke: var(--Colors-text-secondary, #CAC9C2) !important; 
}
.filter_headline svg path {
  color: var(--Colors-text-secondary, #CAC9C2) !important;
  stroke: var(--Colors-text-secondary, #CAC9C2) !important; 
}



.filter_cloud {
  display: flex;
  
  align-items: flex-start;
  align-content: flex-start;
  gap: var(--spacing-between-items-S, 4px);
  align-self: stretch;
  flex-wrap: wrap;
  overflow: hidden;
  height: auto;
  transition: all 300ms ease-out;
}

.filter_cloud.hide_all {
  height: 164px;
  
  transition: all 300ms ease-out;
}

.filter_cloud_no_results {
  padding: var(--padding-item-vertical-M) 0;
}

.filter_cloud_item:not(:has(button)) {
  display: none;
}

.filter_cloud_content {
  display: flex;
  
  align-items: flex-start;
  align-content: flex-start;
  gap: var(--spacing-between-items-S, 4px);
  align-self: stretch;
  flex-wrap: wrap;
  overflow: hidden;
  height: auto;
  transition: all 300ms ease-out;
}
.btn_show_all {
  z-index: 10;
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-XS, 0px);
  align-items: center;
  gap: var(--spacing-item-inner, 8px);

  color: var(--Colors-filter-text-primary, #2C2C2C);

  border: none;

}

.keyword_item {
  float: left;
  

  /* display: flex; */
  display: inline-flex;
  height: var(--dimension-button-height-M, 48px);
  padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px);
  margin-right: var(--spacing-between-items-S, 4px);
  margin-bottom: var(--spacing-navbar-between-items, 4px);
  align-items: center;
  gap: var(--spacing-item-inner, 8px);

  border-radius: var(--radius-none, 0px);
  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);

  color: var(--Colors-filter-chip-text-default, #2C2C2C);
}

.filter_count {
  /* border-radius: var(--radius-full, 9999px); */
  font-size: var(--font-number-L-font-size, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: var(--font-number-L-line-height, 18px); /* 112.5% */

  color: var(--Colors-filter-chip-text-default, #2C2C2C);

  display: flex;
  width: 24px; /* var(--dimension-button-height-S, 32px); */
  height: 24px; /* var(--dimension-button-height-S, 32px); */
  /* padding: var(--margin-navbar-institution-logo-right, 10px); */

  justify-content: center;
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);
  flex-shrink: 0;
}
.filter_content.u10 {
/* Filter Number L */
font-family: "Instrument Sans";
font-size: var(--font-number-L-font-size, 16px);
font-style: normal;
font-weight: 700;
line-height: var(--font-number-L-line-height, 18px); /* 112.5% */
}
.filter_count.u100 {
/* Filter Number M */
font-family: "Instrument Sans";
font-size: var(--font-number-M-font-size, 14px);
font-style: normal;
font-weight: 700;
line-height: var(--font-number-M-line-height, 18px); /* 128.571% */
letter-spacing: 0.84px;
}
.filter_count.u1000 {
/* Filter Number S */
font-family: "Instrument Sans";
font-size: var(--font-number-S-font-size, 12px);
font-style: normal;
font-weight: 700;
line-height: var(--font-number-S-line-height, 14px); /* 116.667% */
letter-spacing: 0.72px;
}

.keyword_item:hover,
.keyword_item:hover * {
  background: var(--Colors-filter-chip-fill-hover, #E7E6E1);
}

.keyword_item.selected,
.keyword_item.selected *
{
  color: var(--Colors-filter-chip-text-active, #FFF);
  background: var(--Colors-filter-chip-fill-active, #2C2C2C);
}

.keyword_item.preselected,
.keyword_item.preselected *
{
  /* color: var(--Colors-filter-chip-text-active, #FFF);
  background: var(--Colors-filter-chip-fill-active, #2C2C2C); */
}

.keyword_item.disabled {
  cursor: default;
  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
  opacity: 0.5;
}

.keyword_item.selected.disabled *{
  color: #800;
}

.wrapper_projects .filter_headline {
  padding-bottom: 0px;
} 
.wrapper_projects .tree_list_item {
  cursor: pointer;
  /* display: flex; */
  /* width: 100%; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  gap: var(--spacing-between-items-L, 16px);
}


.tree_list {
  width: 100%;
}
.tree_list_item {
  padding-bottom: var(--padding-item-vertical-L);
  margin-bottom: var(--padding-item-vertical-L);
  border-bottom: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
}

.tree_title {
  display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: flex-start;
 gap: 12px;
 align-self: stretch;
 color: var(--Colors-filter-text-primary, #2C2C2C);
 font-family: Instrument Sans, sans-serif;
 font-size: var(--font-h4-font-size, 32px);
 font-style: normal;
 font-weight: 400; letter-spacing: 0.02rem;
 line-height: var(--font-h4-line-height, 40px) /* 125% */;

}
.tree_authors {
  /* display: flex;
  align-items: flex-start;
  gap: var(--spacing-between-items-L, 16px);
  align-self: stretch; */
  color: var(--Colors-filter-chip-text-default, #2C2C2C);
}
.tree_authors_item {
  display: inline-block;
}
.tree_authors_item::after {
  content: "/";
  padding: 0 var(--spacing-between-items-S);
  color: var(--Colors-text-secondary);
}
.tree_authors_item:last-child::after {
  content: "";
}
/*.tree_fachbereich {
  display: flex;
  align-items: center;
  gap: var(--spacing-between-items-L, 16px);
}*/

/* HH stattdessen Abstand und Border direkt an .tree_list_item */
/* .tree_divider {
  padding-top: 16px;
  
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  align-self: stretch;
  border-bottom: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
} */
</style>
