<script setup lang="ts">

const route = useRoute()
const router = useRouter()
const {
  FILTERS_KEYWORD,
  FILTERS_PEOPLE,
  RID,
  
  treeList,
  filtersMap,
  filtersText,
  filteredTreeList,
  
  updateFilters,
  
} = treeHelper()

const filterFor = ref('')

const emit = defineEmits(['closed'])
const props = defineProps(['trees_map', 'tree_type'])

const keywordMap = ref({})
const peopleMap = ref({})
const filteredKeywordMap = ref({})
const filteredPeopleMap = ref({})


let treeType: string;
//const treeList = ref({});

watch(route, (newVal, oldVal) => {
  console.log("FV: changed route: " + JSON.stringify(newVal))
  filterFor.value = newVal.path
})

const closeFilter = () => {
  emit('closed')
}

const initKeywords = (treeMap:iTreeMap, kwMap) => {
  for(const treeId in treeMap) {
    
    for (const kwMetaKey in treeMap[treeId].colKeywordMap) {
      if (kwMetaKey == 'madek_core:keywords') {
        for (const kwId in treeMap[treeId].colKeywordMap[kwMetaKey]) {
          const kw = treeMap[treeId].colKeywordMap[kwMetaKey][kwId]
          kwMap[kwId] = kwMap[kwId] || []
          kwMap[kwId].push({ id: kwId, term: kw.term, treeId: treeId, meta_key: kwMetaKey})
          //keywordMap.value[kwId] = keywordMap.value[kwId] || []
          //keywordMap.value[kwId].push({ id: kwId, term: kw.term, treeId: treeId, meta_key: kwMetaKey})
        }
        
      }
    }
  }
}

const initPeople = (treeMap:iTreeMap, pMap) => {
  for(const treeId in treeMap) {
    
    for (const kwMetaKey in treeMap[treeId].colPeopleMap) {
      if (kwMetaKey == 'madek_core:authors') {
        for (const kwId in treeMap[treeId].colPeopleMap[kwMetaKey]) {
          const kw = treeMap[treeId].colPeopleMap[kwMetaKey][kwId]
          
          pMap[kwId] = pMap[kwId] || []
          pMap[kwId].push({ 
            id: kwId,
            name: kw.name,
            treeId: treeId,
            meta_key: kwMetaKey})
        }  
      }
    }
  }
}

filtersMap.value[FILTERS_KEYWORD] = filtersMap.value[FILTERS_KEYWORD] || {};
filtersMap.value[FILTERS_PEOPLE] = filtersMap.value[FILTERS_PEOPLE] || {};

const initTreeType = () => {
  
  treeList.value = props.trees_map
  filteredTreeList.value = {}
  
  console.log("got tree list" + Object.keys(treeList.value).length)
  
  
  for(const treeId in treeList.value) {
    filteredTreeList.value[treeId] = treeList.value[treeId];
  }
  
  initKeywords(treeList.value, keywordMap.value);
  initPeople(treeList.value, peopleMap.value);

  initKeywords(filteredTreeList.value, filteredKeywordMap.value);
  initPeople(filteredTreeList.value, filteredPeopleMap.value);
    

    //TODO roles

 
  //console.log("got kw map")
  //console.dir(keywordMap.value)
  //console.dir(keywordMap.value)
  
  
}



const clickedKeyword = (kwInfo) => {
  console.log("clickedKeyword: " + JSON.stringify(kwInfo))
  if (kwInfo.length && isSelectedKeyword(kwInfo[0].id)) {
    console.log("already has selected kw: reset")
    delete filtersMap.value[FILTERS_KEYWORD][kwInfo[0].id]
    console.dir(filtersMap.value)
    
  }
  else {
    for (const kw of kwInfo) {

      filtersMap.value[FILTERS_KEYWORD][kw.id] =  filtersMap.value[FILTERS_KEYWORD][kw.id] || []
      filtersMap.value[FILTERS_KEYWORD][kw.id].push(kw)
      console.log("clickedKeyword: insert tree for kw: " + JSON.stringify(kw.treeId))

    }
    console.log("clickedKeyword: new filtersMap: " + JSON.stringify(filtersMap.value))
    console.dir(filtersMap.value)
  }
  //filteredTreeList.value = {}
  //addKeywordFilter(kwInfo)
  
  updateFilters(props.trees_map)
  filteredKeywordMap.value = {}
  initKeywords(filteredTreeList.value, filteredKeywordMap.value)
}
const clickedPeople = (kwInfo) => {
  console.log("clickedPeople: " + JSON.stringify(kwInfo))
  if (kwInfo.length && isSelectedPerson(kwInfo[0].id)) {
    console.log("already has selected person: reset")
    delete filtersMap.value[FILTERS_PEOPLE][kwInfo[0].id]
    console.dir(filtersMap.value)
  }
  else {
    for (const kw of kwInfo) {

      filtersMap.value[FILTERS_PEOPLE][kw.id] =  filtersMap.value[FILTERS_PEOPLE][kw.id] || []
      filtersMap.value[FILTERS_PEOPLE][kw.id].push(kw)
      console.log("clickedPeople: insert tree for kw: " + JSON.stringify(kw.treeId))
      //filteredTreeList.value[kw.treeId] = treeList.value[kw.treeId]
    }
    console.log("clickedPeople: new filtersMap: " + JSON.stringify(filtersMap.value))
    console.dir(filtersMap.value)
  }
  //addPersonFilter(kwInfo)
  

  
  
  updateFilters(props.trees_map)
  filteredPeopleMap.value = {}
  initPeople(filteredTreeList.value, filteredPeopleMap.value)
  
}

const changedFilterString = () => {
  console.log("changedFilterString " + filtersText.value)
  //filtersText.value = event.target.value
  
  updateFilters(props.trees_map)
  filteredPeopleMap.value = {}
  initPeople(filteredTreeList.value, filteredPeopleMap.value)
}

const isSelectedKeyword = (kw_id:string) => {
  if (!filtersMap.value
      || !filtersMap.value[FILTERS_KEYWORD]
      || !filtersMap.value[FILTERS_KEYWORD][kw_id])
      {
        return false
      }
  return filtersMap.value[FILTERS_KEYWORD][kw_id]
}

const isSelectedPerson = (p_id:string) => {
  if (!filtersMap.value
    || !filtersMap.value[FILTERS_PEOPLE]
    || !filtersMap.value[FILTERS_PEOPLE][p_id]
  ) {
    return false
  }
  return filtersMap.value[FILTERS_PEOPLE][p_id]
}

const getFilteredKWCount = (kw_id: string) => {
  if (!filteredKeywordMap.value
      || !filteredKeywordMap.value[kw_id]
  ) {
    return 0
  }
  return filteredKeywordMap.value[kw_id].length
}

const getFilteredPersonCount = (kw_id: string) => {
  if (!filteredPeopleMap.value
      || !filteredPeopleMap.value[kw_id]
  ) {
    return 0
  }
  return filteredPeopleMap.value[kw_id].length
}



initTreeType()

</script>
<template>
  <div class="filterView">
    <div class="filter_head">
      <h1>This is the filter page for type [{{ treeType }}]</h1>
      <p>Search:&nbsp;
        <input type="text" @input="changedFilterString" v-model="filtersText"/>
      </p>
      <button @click="closeFilter()">Close</button>
      
    </div>
    <div class="filter_content">
    
      <div class="tree_filter">
        Filters:
        <hr/>
        <div class="tree_filter_keywords">
          Keywords:
          <br/>
          <span class="keyword_item"
            v-for="kws in keywordMap"
            :key="kws"
            :class="{selected: isSelectedKeyword(kws[0].id),
              disabled: getFilteredKWCount(kws[0].id) == 0}"
            >
            
            <button @click="clickedKeyword(kws)">
              <span v-if="isSelectedKeyword(kws[0].id)">S</span>
              T: {{ kws[0].term }}
              FC: {{ getFilteredKWCount(kws[0].id) }}
              C: {{ kws.length }}
              
            </button>
            
            
          </span>
          
        </div>
        <hr/>
        <div class="tree_filter_people">
          People<br/>
          <span class="keyword_item"
            v-for="person in peopleMap"
            :key="person"
            :class="{selected: isSelectedPerson(person[0].id),
              disabled: getFilteredPersonCount(person[0].id) == 0}"
            >
            <button @click="clickedPeople(person)">
              T: {{ person[0].name }}
              FC: {{ getFilteredPersonCount(person[0].id) }}
              C: {{ person.length }}
              
            </button>
            
            
          </span>
        </div>
      </div>

      <div class="filtered_tree_list">
        Filtered Tree List:
        <div class="tree_list">
          <div class="tree_list_item"
            v-for="tree in filteredTreeList"
            :key="tree.col_id">
            <hr>
            Title: {{ tree.colTitlesMap[tree.col_id] }}
            <br/>
            Authors: {{ tree.cols_authors[tree.col_id] }}
            <br/>

          </div>
        </div>
        <hr/>
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
.filterView {
  position: fixed;
  top: 0px; left: 0px; width: 100vw; height: 100vh;
  z-index: 1000;
  padding: 8rem 2rem;
  background-color: #fff;
  color: var(--Primitives-color-transparencies-black-70);
}
.filterView * {
  background-color: #fff;
  color: var(--Primitives-color-transparencies-black-70);
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
  position: relative; float: left;
  color: var(--Primitives-color-transparencies-black-70);
  background-color: #fff;
  
  margin: 0.75rem 0.75rem;
}
.keyword_item.selected *{

  color: #fff;
  background-color: #333;
}
.keyword_item.disabled * {
  color: #ccc;
  background-color: #aaa;
}
.person_item {

}
.role_item {

}
</style>
