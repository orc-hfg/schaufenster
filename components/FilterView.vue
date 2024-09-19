<script setup lang="ts">

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
const props = defineProps(['trees_map', 'tree_type'])

// global counts
const keywordMap = ref({})
const peopleMap = ref({})
const rolesMap = ref({})
// filtered counts
const filteredKeywordMap = ref({})
const filteredPeopleMap = ref({})
const filteredRolesMap = ref({})


watch(route, (newVal, oldVal) => {
  console.log("FV: changed route: " + JSON.stringify(newVal))
  filterFor.value = newVal.path
})

const closeFilter = () => {

  newFiltersMap.value[FILTERS_KEYWORD] = {};
  newFiltersMap.value[FILTERS_PEOPLE] = {};
  newFiltersMap.value[FILTERS_ROLES] = {};
  newFiltersTitle.value = ''

  emit('closed')
}
const applyFilter = () => {
  filtersTitle.value = newFiltersTitle.value
  //filtersMap.value = newFiltersMap.value
  for (const type in filtersMap.value) {
    for (const fid in filtersMap.value[type]) {
      filtersMap.value[type][fid] = newFiltersMap.value[type][fid]
    }
  }
  console.error("cloned back filter map")
  console.dir(filtersMap.value)
  console.dir(newFiltersMap.value)

  emit('applied')
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

const updateFilteredCounts = () => {
  console.log("updateFilteredCounts: ")
  console.dir(filtersMap)

  //filteredTreeList.value = updateFilters(props.trees_map, filtersTitle.value, filtersMap.value)
  filteredTreeList.value = updateFilters(props.trees_map, newFiltersTitle.value, newFiltersMap.value)

  filteredKeywordMap.value = {}
  initKeywords(filteredTreeList.value, filteredKeywordMap.value, MK_KEYWORDS)
  filteredPeopleMap.value = {}
  initPeople(filteredTreeList.value, filteredPeopleMap.value, MK_AUTHORS)
  filteredRolesMap.value = {}
  initRoles(filteredTreeList.value, filteredRolesMap.value, MK_PARTICIPANTS)
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

      console.log("clickedFilter: new filtersMap: " + JSON.stringify(filtersMap.value))
      console.dir(filtersMap.value)
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
  console.log("changedFilterTitle " + filtersTitle.value)
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
  if (!filtersTitle.value || !filtersTitle.value.length) {
    return false
  }
  if (!data || !data.toLocaleLowerCase) {
    return false;
  }
  return (data.toLocaleLowerCase().indexOf(filtersTitle.value.toLocaleLowerCase()) >= 0)
}

const isHideIfNotSubString = (data:string): boolean => {
  if (!filtersTitle.value || !filtersTitle.value.length) {
    return false
  }
  return !isSubString(data)
}



onMounted(() => {

filtersMap.value[FILTERS_KEYWORD] = filtersMap.value[FILTERS_KEYWORD] || {};
filtersMap.value[FILTERS_PEOPLE] = filtersMap.value[FILTERS_PEOPLE] || {};
filtersMap.value[FILTERS_ROLES] = filtersMap.value[FILTERS_ROLES] || {};

newFiltersMap.value[FILTERS_KEYWORD] = filtersMap.value[FILTERS_KEYWORD]
newFiltersMap.value[FILTERS_PEOPLE] = filtersMap.value[FILTERS_PEOPLE]
newFiltersMap.value[FILTERS_ROLES] = filtersMap.value[FILTERS_ROLES]
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

})

</script>
<template>
  <div class="filter_view">
    <div class="filter_head">
      <h1>This is the filter page for type [{{ tree_type }}]</h1>
      <p>Search:&nbsp;
        <!-- Keywords:
        <input type="text" @input="changedFilterString" v-model="filtersText"/>
 -->
        <!-- Title: -->
        <input type="text" @input="changedFilterTitle" v-model="filtersTitle"/>
        
      </p>
      <button @click="closeFilter()">Close</button>
      <button @click="applyFilter()">Apply</button>
      
    </div>
    <div class="filter_content">
    
      <div class="tree_filter">
        <div class="filter_headline">
        Filters:
        </div>
        
        <hr/>
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
              ( {{ getFilteredKWCount(kws[0].id) }} / {{ kws.length }} )
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

      <div class="filtered_tree_list">
        <div class="filter_headline">Projekte:</div>
        

        <div class="tree_list">
          <div class="tree_list_item"
            v-for="tree in filteredTreeList"
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
              <div class="tree_fachbereich_item"
                v-for="fb in tree.cols_authors[tree.col_id]">
                {{ fb }}
              </div>
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
  padding: 8rem 2rem;
  background-color: #fff;
  color: var(--Primitives-color-transparencies-black-70);
}
.filter_view * {
  background-color: #fff;
  color: var(--Primitives-color-transparencies-black-70);
  font-family: Instrument Sans, sans-serif;
}

button {
  padding: 0.75rem;
}
.tree_list {

}
.tree_list_item {

}


.filter_content {
  position: relative;
  width: calc(100vw - 10rem);
  height: calc(100vh - 16rem);
  overflow-y: auto;
  padding: 3rem 3rem;

}

.tree_filter {
  position: relative;
  width: 50%;
  float: left;
}
.filtered_tree_list {
  position: relative;
  width: 50%;
  float: left;
}

.tree_filter_keywords,
.tree_filter_people {
  position:relative;
  width: 100%;
  float: left;
}
.filter_content * {

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

  border: 1px solid var(--filter-chip-fill-outline, #CAC9C2);
  color: var(--filter-chip-text-default, #2C2C2C);
  display: inline-flex;

  font-size: var(--font-button-font-size, 1.25rem);
  font-style: normal;
  font-weight: 500;
  line-height: var(--font-button-line-height, 1.5rem); /* 120% */

  
  
}

.keyword_item * {
  /* align-items: center; */
  /* gap: var(--spacing-item-inner, 8px); */
  /* flex-shrink: 0; */
  /* border-radius: var(--radius-none, 0px); */
  
  /* border: 1px solid var(--filter-chip-fill-outline, #CAC9C2); */
  /* color: var(--filter-chip-text-default, #2C2C2C); */

/* Buttons */
/* font-family: Instrument Sans, sans-serif; */
/* font-size: var(--font-button-font-size, 1.25rem); */
/* font-style: normal; */
/* font-weight: 500; */
/* line-height: var(--font-button-line-height, 1.5rem); 120% */
}

.keyword_item:hover,
.keyword_item:hover * {
  background: var(--filter-chip-fill-hover, #E7E6E1);
}

.keyword_item.selected,
.keyword_item.selected *,
.keyword_item.preselected,
.keyword_item.preselected *
{
  color: var(--filter-chip-text-active, #FFF);

/* Buttons */
  /* font-family: Instrument Sans, sans-serif; */
  /* font-size: var(--font-button-font-size, 1.25rem); */
  /* font-style: normal; */
  /* font-weight: 500; */
  /* line-height: var(--font-button-line-height, 1.5rem); */ /* 120% */

  background: var(--filter-chip-fill-active, #2C2C2C);
}

.keyword_item.disabled,
.keyword_item.disabled * {
  opacity: 0.5;
}

.keyword_item.selected.disabled *{
  color: #800;
}

.filter_headline {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;

  color: var(--text-secondary, #CAC9C2);
  /* font-family: Instrument Sans, sans-serif; */
  font-size: var(--font-subline-font-size, 20px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--font-subline-line-height, 24px) /* 120% */;

}

.filtered_tree_list .tree_list_item {
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
 font-weight: 500;
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
