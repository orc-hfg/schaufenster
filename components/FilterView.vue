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
  MK_SEMESTER,
  MK_TITLE,
  RID,
  
  treeList,

  filtersMap,
  //filtersText,
  newFiltersMap,
  filtersTitle,
  newFiltersTitle,
  
  updateFilters,
  
} = treeHelper()

const filteredTreeList = ref()
const filterFor = ref('')

const emit = defineEmits(['closed', 'applied'])
const props = defineProps(['trees_map', 'tree_type', 'useCurrentFilters', 'useCleanFilters'])

// global counts
const keywordMap = ref({} as iFilterTypeMap)
const peopleMap = ref({} as iFilterTypeMap)
const rolesMap = ref({} as iFilterTypeMap)
// filtered counts
const filteredKeywordMap = ref({} as iFilterTypeMap)
const filteredPeopleMap = ref({} as iFilterTypeMap)
const filteredRolesMap = ref({} as iFilterTypeMap)


watch(route, (newVal, oldVal) => {
  console.log("FV: changed route: " + JSON.stringify(newVal))
  filterFor.value = newVal.path
})

const closeFilter = () => {

  newFiltersMap.value[FILTERS_KEYWORD] = {};
  newFiltersMap.value[FILTERS_PEOPLE] = {};
  newFiltersMap.value[FILTERS_ROLES] = {};
  newFiltersTitle.value = ''

  
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

const initKeywords = (treeMap:iTreeMap, kwMap, kwMetaKey:string) => {
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colKeywordMap[kwMetaKey]) {
      const kw = treeMap[treeId].colKeywordMap[kwMetaKey][kwId]
      kwMap[kwId] = kwMap[kwId] || []
      kwMap[kwId].push({
        id: kwId,
        name: kw.name,
        treeId: treeId,
        meta_key: kwMetaKey})
      }
    }
}

const initPeople = (treeMap:iTreeMap, pMap, metaKey:string) => {
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colPeopleMap[metaKey]) {
      const kw = treeMap[treeId].colPeopleMap[metaKey][kwId]
      
      pMap[kwId] = pMap[kwId] || []
      pMap[kwId].push({ 
        id: kwId,
        name: kw.name,
        treeId: treeId,
        meta_key: metaKey})
    }  
  }
}

const initRoles = (treeMap:iTreeMap, pMap, metaKey:string) => {
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colRolesMap[metaKey]) {
      const kw = treeMap[treeId].colRolesMap[metaKey][kwId]
      
      pMap[kwId] = pMap[kwId] || []
      pMap[kwId].push({ 
        id: kwId,
        name: kw.name,
        treeId: treeId,
        meta_key: metaKey})
    }  
  }
}

const initTreeType = () => {
  
  treeList.value = props.trees_map
  filteredTreeList.value = {}
  
  console.log("got tree list" + Object.keys(treeList.value).length)
  
  
  for(const treeId in treeList.value) {
    filteredTreeList.value[treeId] = treeList.value[treeId];
  }
  
  initKeywords(treeList.value, keywordMap.value, MK_KEYWORDS);
  initPeople(treeList.value, peopleMap.value, MK_AUTHORS);
  initRoles(treeList.value, rolesMap.value, MK_PARTICIPANTS);

  console.log("people map")
  console.dir(peopleMap.value)
  console.log("roles map")
  console.dir(rolesMap.value)
  initKeywords(filteredTreeList.value, filteredKeywordMap.value, MK_KEYWORDS);
  initPeople(filteredTreeList.value, filteredPeopleMap.value, MK_AUTHORS);
  initRoles(filteredTreeList.value, filteredRolesMap.value, MK_PARTICIPANTS);

  
}

const selectedFilterCount = ref(0)
const updateFilteredCounts = () => {
  console.log("updateFilteredCounts: new: " + JSON.stringify(newFiltersMap.value))
  console.log("updateFilteredCounts: old: " + JSON.stringify(filtersMap.value))
  

  //filteredTreeList.value = updateFilters(props.trees_map, filtersTitle.value, filtersMap.value)
  filteredTreeList.value = updateFilters(props.trees_map, newFiltersTitle.value, newFiltersMap.value)

  filteredKeywordMap.value = {}
  initKeywords(filteredTreeList.value, filteredKeywordMap.value, MK_KEYWORDS)
  filteredPeopleMap.value = {}
  initPeople(filteredTreeList.value, filteredPeopleMap.value, MK_AUTHORS)
  filteredRolesMap.value = {}
  initRoles(filteredTreeList.value, filteredRolesMap.value, MK_PARTICIPANTS)
  selectedFilterCount.value = 
  (newFiltersTitle.value.length > 0 ? 1 : 0)
  + Object.keys(newFiltersMap.value[FILTERS_KEYWORD]).length
  + Object.keys(newFiltersMap.value[FILTERS_PEOPLE]).length
  + Object.keys(newFiltersMap.value[FILTERS_ROLES]).length
}

const clickedFilter = (type:string, kwInfo:object[]) => {
  
  if (!kwInfo.length) {
    console.error("clickedFilter: invalid info")
    return;
  }

  const data = kwInfo[0]
  const id = data.id
  console.log("clickedFilter: " + type + " : " + id + ":" + JSON.stringify(data))

  if (isSelected(type,id)) {
    console.log("already has selected item: reset")
    //delete filtersMap.value[type][id]
    delete newFiltersMap.value[type][id]
    console.dir(filtersMap.value)
  }
  else {

      newFiltersMap.value[type][id] = data
      console.log("clickedFilter: filter for data: " + JSON.stringify(data))

      //console.log("clickedFilter: new filtersMap: " + JSON.stringify(filtersMap.value))
      //console.dir(filtersMap.value)
  }
  updateFilteredCounts()
}
const clickedKeyword = (kwInfo) => {
  console.log("clickedKeyword: " + JSON.stringify(kwInfo))
  clickedFilter(FILTERS_KEYWORD, kwInfo)
}

const clickedPeople = (kwInfo) => {
  console.log("clickedPeople: " + JSON.stringify(kwInfo))
  clickedFilter(FILTERS_PEOPLE, kwInfo)
}

const clickedRole = (kwInfo) => {
  console.log("clickedRole: " + JSON.stringify(kwInfo))
  clickedFilter(FILTERS_ROLES, kwInfo)
}

const changedFilterTitle = () => {
  //filtersText.value = filtersTitle.value
  console.log("changedFilterTitle " + newFiltersTitle.value)
  updateFilteredCounts();
}

// const changedFilterString = () => {
//   console.log("changedFilterString " + filtersText.value)
//   updateFilteredCounts();
// }


const isSelected = (type:string, id:string) => {
  if (!newFiltersMap.value
      || !newFiltersMap.value[type]
      || !newFiltersMap.value[type][id])
      {
        return false
      }
  return newFiltersMap.value[type][id]
}
const isSelectedKeyword = (id:string) => {
  return isSelected(FILTERS_KEYWORD,id)
}

const isSelectedPerson = (p_id:string) => {
  return isSelected(FILTERS_PEOPLE,p_id)
}

const isSelectedRole = (p_id:string) => {
  return isSelected(FILTERS_ROLES,p_id)
}

const getFilteredKWCount = (id: string) => {
  if (!filteredKeywordMap.value
      || !filteredKeywordMap.value[id]
  ) {
    return 0
  }
  return filteredKeywordMap.value[id].length
}

const getFilteredPersonCount = (id: string) => {
  if (!filteredPeopleMap.value
      || !filteredPeopleMap.value[id]
  ) {
    return 0
  }
  return filteredPeopleMap.value[id].length
}

const getFilteredRolesCount = (id: string) => {
  if (!filteredRolesMap.value
      || !filteredRolesMap.value[id]
  ) {
    return 0
  }
  return filteredRolesMap.value[id].length
}

const isSubString = (data:string): boolean => {
  if (!newFiltersTitle.value || !newFiltersTitle.value.length) {
    return false
  }
  if (!data || !data.toLocaleLowerCase) {
    return false;
  }
  return (data.toLocaleLowerCase().indexOf(filtersTitle.value.toLocaleLowerCase()) >= 0)
}

const isHideIfNotSubString = (data:string): boolean => {
  if (!newFiltersTitle.value || !newFiltersTitle.value.length) {
    return false
  }
  return !isSubString(data)
}

const animate_intro = ref(true)

onMounted(() => {

  [FILTERS_KEYWORD, FILTERS_PEOPLE, FILTERS_ROLES].forEach(type => {
    filtersMap.value[type] = filtersMap.value[type] || {}
    if (props.useCurrentFilters) {
      newFiltersMap.value[type] = {}
      for (const id in filtersMap.value[type]) {
        newFiltersMap.value[type][id] = filtersMap.value[type][id]
      }
      //newFiltersMap.value[type] = filtersMap.value[type]
    } else if (props.useCleanFilters) {
      newFiltersMap.value[type] = {}
    } else {
      newFiltersMap.value[type] = newFiltersMap.value[type] || {}
    }
    
    
  })
  updateFilteredCounts() 
  /* 
filtersMap.value[FILTERS_KEYWORD] = filtersMap.value[FILTERS_KEYWORD] || {};
filtersMap.value[FILTERS_PEOPLE] = filtersMap.value[FILTERS_PEOPLE] || {};
filtersMap.value[FILTERS_ROLES] = filtersMap.value[FILTERS_ROLES] || {};
 

newFiltersMap.value[FILTERS_KEYWORD] = newFiltersMap.value[FILTERS_KEYWORD] || filtersMap.value[FILTERS_KEYWORD]
newFiltersMap.value[FILTERS_PEOPLE] = newFiltersMap.value[FILTERS_PEOPLE] || filtersMap.value[FILTERS_PEOPLE]
newFiltersMap.value[FILTERS_ROLES] = newFiltersMap.value[FILTERS_ROLES] || filtersMap.value[FILTERS_ROLES]
*/
/*
for (const type in filtersMap.value) {
  for (const fid in filtersMap.value[type]) {
    newFiltersMap.value[type][fid] = filtersMap.value[type][fid]
  }
}*/
console.error("cloned filter map")
console.dir(filtersMap.value)
console.dir(newFiltersMap.value)


  initTreeType()

  animate_intro.value = true;
  setTimeout(() => {
    animate_intro.value = false;
  }, 300)
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
</script>
<template>
  <div class="filter_view"
    :class="{hidden: animate_intro}">
    <header class="header">
      <nav class="nav">
        <div class="wrapper_left">
          <button class="btn_apply"
            @click.once="applyFilter()">
            <!-- <IconsNavHome class="logo"/> -->
            <svg class="logo"
              xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="12" transform="rotate(180 24 24)" fill="#2C2C2C"/>
            </svg>
            <div class="label">Anwenden ({{ selectedFilterCount }})</div>
          </button>
        </div>
        
        <div class="wrapper_mid">
          <button class="btn_close"
            @click="closeFilter()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 17L4 12L9 7" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 18V16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12H4" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Filter zurücksetzen
          </button>
          <input class="filter_text_input"
            type="text"
            @input="changedFilterTitle"
            v-model="newFiltersTitle"/>
          <div class="filer_text_clear">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
        </div>
      </nav>
    </header>
    <!-- <div class="filter_head">
      
    </div> -->
    <div class="filter_content">
    
      <div class="wrapper_filter">
        
        <div class="tree_filter_keywords">
          <div class="filter_headline">Keywords:</div>
          
          <div v-for="kws in keywordMap" :key="kws">
            <button class="keyword_item"
              @click="clickedKeyword(kws)"
              v-if="!isHideIfNotSubString(kws[0].name)"
              :class="{
                selected: isSelectedKeyword(kws[0].id),
                preselected: isSubString(kws[0].name),
                disabled: getFilteredKWCount(kws[0].id) == 0}"
              >
              {{ kws[0].name }}
              ( {{ getFilteredKWCount(kws[0].id) }} )
              <!-- / {{ kws.length }} -->
            </button>
          </div>
          
        </div>
        <hr/>
        <div class="tree_filter_people">
          <div class="filter_headline">Autoren:</div>
          
          <div v-for="person in peopleMap" :key="person">
            <button class="keyword_item"
              @click="clickedPeople(person)"
              v-if="!isHideIfNotSubString(person[0].name)"
              :class="{
                selected: isSelectedPerson(person[0].id),
                preselected: isSubString(person[0].name),
                disabled: getFilteredPersonCount(person[0].id) == 0}"
              >
              {{ person[0].name }}
              ( {{ getFilteredPersonCount(person[0].id) }} / {{ person.length }} )
            </button>
          </div>
        </div>
        <hr/>
        <div class="tree_filter_people">
          <div class="filter_headline">Mitwirkende:<hr></div>

          <div v-for="person in rolesMap" :key="person">
            <button class="keyword_item"
              @click="clickedRole(person)"
              v-if="!isHideIfNotSubString(person[0].name)"
              :class="{
                selected: isSelectedRole(person[0].id),
                preselected: isSubString(person[0].name),
                disabled: getFilteredRolesCount(person[0].id) == 0}">
              {{ person[0].name }}
              ( {{ getFilteredRolesCount(person[0].id) }} / {{ person.length }} )
            </button>
          </div>
        </div>
      </div>

      <div class="wrapper_projects">
        <div class="filter_headline">Projekte:</div>
        

        <div class="tree_list">
          <div class="tree_list_item"
            v-for="tree in filteredTreeList"
            @click="switch2SetView(tree.col_id)"
            :key="tree.col_id">
            <div class="tree_title">
              {{ tree.colTitlesMap[tree.col_id] }}
            </div>
            <div class="tree_authors">
              <div class="tree_authors_item"
                v-for="person in tree.cols_authors[tree.col_id]">
                {{ person }}
              </div>
            </div>
            <div class="tree_fachbereich">
              <!-- <div class="tree_fachbereich_item"
                v-for="fb in tree.cols_departments[tree.col_id]">
                {{ fb }}
              </div> -->
            </div>
            <div class="tree_divider"><hr></div>
            
          </div>
        </div>
        
      </div>
    
    </div>

    
  
  
    <!--Tree List All
    <div class="tree_list">
      <div class="tree_list_item"
        v-for="tree in treeList"
        :key="tree.col_id">
        Title: {{ tree.colTitlesMap[tree.col_id] }}
      </div>
    </div>
    -->

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
  /* 
  
  display: none; */
}

button {
  cursor: pointer;
  user-select: none;
}

.filter_view * {
  
  /* color: var(--Primitives-color-transparencies-black-70); */
  font-family: Instrument Sans, sans-serif;
}
header {
  /* background: var(--background-default, #F3F2EF); */
  transition: all 300ms ease-out;
}
.hidden .header {
  top: -120px;
}

nav {
  background: var(--background-default, #F3F2EF);
  /* border: 1px solid green; */
  width: 100%;
  display: flex;
}
.wrapper_left {
  display: flex;
  justify-content: start;
}
.wrapper_mid {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 768px;
  position: absolute;
  left: calc(50% - 384px);
  
  gap: var(--margin-navbar-institution-logo-right, 10px);
  flex-shrink: 0;
}
.btn_apply {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-navbar--space-between-items, 4px);

  border: none;
  color: var(--Colors-text-primary, #2C2C2C);

/* Buttons */
font-family: "Instrument Sans";
font-size: var(--font-button-font-size, 20px);
font-style: normal;
font-weight: 400; letter-spacing: 0.02rem;
line-height: var(--font-button-line-height, 24px); /* 120% */
}

.btn_apply .logo {

}
.btn_apply .logo:hover {
  transform: scale(0.83);
}
.btn_apply .label {
  display: flex;
  padding-right: var(--margin-navbar-institution-logo-right, 10px);
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);
}
.btn_close {
  cursor: pointer;
  user-select: none;

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-navbar-between-items, 4px);

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--nav-bar-button-outline, #CAC9C2);

  color: var(--Colors-text-primary, #2C2C2C);

/* Buttons */
  font-family: "Instrument Sans";
  font-size: var(--font-button-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-button-line-height, 24px); /* 120% */
}
.filter_text_input {

  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-L, 16px);
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;

  border-radius: var(--radius-full, 9999px);
  background: var(--filter-searchbar-fill-default, #E7E6E1);

  color: var(--filter-searchbar-text-actice, #2C2C2C);

/* Buttons */
font-family: "Instrument Sans";
font-size: var(--font-button-font-size, 20px);
font-style: normal;
font-weight: 400; letter-spacing: 0.02rem;
line-height: var(--font-button-line-height, 24px); /* 120% */
}
.filter_text_clear {
  position: relative;
  left: -24px;
}
button {
  
  
}
.tree_list {

}
.tree_list_item {

}


.filter_content {
  /* border: 1px solid green; */
  position: absolute;
  top: 0px;
  left: -3rem;
  width: calc(100vw + 6rem);
  height: calc(100vh - 240px);
  overflow-y: visible;
  padding: 0px 0rem;

  display: flex;

  /* padding-top: 200px; */
  justify-content: center;
  align-items: flex-start;
  gap: var(--spacing-meta-info-between-sections, 80px);
  flex-shrink: 0;
  transition: all 800ms ease-out;
}

.hidden .filter_content {
  top: 100vh;
}

.wrapper_filter {
  /* border: 1px solid red; */
  position: relative;
  top: 0px;
  
  width: 50%;
  float: left;
/*
  display: flex;
justify-content: center;
align-items: flex-start;
gap: var(--margin-navbar-institution-logo-right, 10px);
align-self: stretch;
*/
display: block;
width: 700px;
height: calc(100vh - 240px);
overflow-y: scroll;
padding-top: 200px;

flex-direction: column;
align-items: flex-start;
gap: 40px;
}
/* TODO scrollbar firefox and others */
.wrapper_filter::-webkit-scrollbar {
  width: 0;
}
.wrapper_projects {
  /* border: 1px solid blue; */
  position: relative;
  width: 50%;
  float: left;

  display: flex;
  width: 700px;
  height: calc(100vh - 240px);
  overflow-y: scroll;
  padding-top: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
/* TODO scrollbar firefox and others */
.wrapper_projects::-webkit-scrollbar {
  width: 0;
}

.tree_filter_keywords,
.tree_filter_people {
  position:relative;
  width: 100%;
  float: left;
}

.keyword_item {
  float: left;
  height: var(--dimension-button-height-M, 48px);

  display: flex;
  padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px);
  margin-right: var(--spacing-between-items-S, 4px);
  margin-bottom: var(--spacing-navbar-between-items, 4px);
  align-items: center;
  gap: var(--spacing-item-inner, 8px);
  border-radius: var(--radius-none, 0px);

  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
  color: var(--Colors-filter-chip-text-default, #2C2C2C);
  display: inline-flex;

  font-size: var(--font-button-font-size, 1.25rem);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-button-line-height, 1.5rem); /* 120% */

  
  
}


.keyword_item:hover,
.keyword_item:hover * {
  background: var(--Colors-filter-chip-fill-hover, #E7E6E1);
}

.keyword_item.selected,
.keyword_item.selected *,
.keyword_item.preselected,
.keyword_item.preselected *
{
  color: var(--Colors-filter-chip-text-active, #FFF);
  background: var(--Colors-filter-chip-fill-active, #2C2C2C);
}

.keyword_item.disabled,
.keyword_item.disabled * {
  opacity: 0.5;
  display: none;
}

.keyword_item.selected.disabled *{
  color: #800;
}

.filter_headline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* gap: 26px; */
  padding-bottom: 16px;
  align-self: stretch;

  color: var(--Colors-text-secondary, #CAC9C2);
  font-family: "Instrument Sans";
  font-size: var(--font-subline-font-size, 20px);
  font-style: normal;
  font-weight: 400;
  font-stretch: 0.2px;
  line-height: var(--font-subline-line-height, 24px) /* 120% */;

}
.wrapper_projects .filter_headline {
  padding-bottom: 0px;
} 
.wrapper_projects .tree_list_item {
  /* display: flex; */
  /* width: 100%; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  gap: var(--spacing-between-items-L, 16px);
}
.tree_title {
  display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: flex-start;
 gap: 12px;
 align-self: stretch;
 color: var(--text-primary, #2C2C2C);
 font-family: Instrument Sans, sans-serif;
 font-size: var(--font-h4-font-size, 32px);
 font-style: normal;
 font-weight: 400; letter-spacing: 0.02rem;
 line-height: var(--font-h4-line-height, 40px) /* 125% */;

}
.tree_authors {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-between-items-L, 16px);
  align-self: stretch;
}
.tree_fachbereich {
  display: flex;
  align-items: center;
  gap: var(--spacing-between-items-L, 16px);
}
.tree_divider {
  /* display: flex; */
  padding-top: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
}
</style>
