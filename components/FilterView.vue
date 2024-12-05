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

const filteredTreeList = ref()
const filterFor = ref('')

const emit = defineEmits(['closed', 'applied'])
const props = defineProps(['trees_map', 'tree_type', 'useCurrentFilters', 'useCleanFilters'])

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
  //kwMap = kwMap || {} as iFilterTypeMap
  for(const treeId in treeMap) {
    for (const kwId in treeMap[treeId].colKeywordMap[kwMetaKey]) {
      const kw = treeMap[treeId].colKeywordMap[kwMetaKey][kwId]
      addFilterTagCounter(kwMap, kwId, kw.name, treeId, kwMetaKey)
    }
  }
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
  console.log("updateFilteredCounts: filters new: " + JSON.stringify(newFiltersMap.value))
  console.log("updateFilteredCounts: filters old: " + JSON.stringify(filtersMap.value))
  
  filteredTreeList.value = updateFilters(props.trees_map, newFiltersTitle.value, newFiltersMap.value)
  console.log("updateFilteredCounts: filtered tree count " + getMapCount(filteredTreeList.value));

  [MK_KEYWORDS, MK_PROJECT_TYPE, MK_PROGRAM_OF_STUDY, MK_SEMESTER].forEach(meta_key => {
    countMap.value[meta_key] = initKeywords(filteredTreeList.value, meta_key, {})
  });

  [MK_AUTHORS, MK_PROJECT_LEADER].forEach(meta_key => {
    countMap.value[meta_key] = initPeople(filteredTreeList.value, meta_key, {})
  });

  [MK_PARTICIPANTS].forEach(meta_key => {
    countMap.value[meta_key] = initRoles(filteredTreeList.value, meta_key, {})
  });

  selectedFilterCount.value = getFilterCount(newFiltersTitle.value, newFiltersMap.value)

  updateShowAll()
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
const getFilterTagClass = (type:string, meta_key: string, filterInfo) => {
  getShowAll(type, meta_key, filterInfo.id)
  return {
    selected: isSelected(type, filterInfo.id),
    preselected: isSubString(filterInfo.name),
    disabled: getFilteredCount(meta_key, filterInfo.id) == 0
  }
}

const showAll = ref({} as {[key:string]:boolean})
const showAllHeight = ref({} as {[key:string]:number})

const updateShowAll = () => {
  for (const type in newFiltersMap.value) {
    for (const id in newFiltersMap.value[type]) {
        const filterInfo = newFiltersMap.value[type][id]
        showAll.value[filterInfo.meta_key] = true
      }
  }
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
  

  console.error("filter map current: " + JSON.stringify(filtersMap.value))
  console.error("filter map new: " + JSON.stringify(newFiltersMap.value))

  initTreeType();

  [MK_AUTHORS,
   MK_KEYWORDS,
   MK_PARTICIPANTS,
   MK_PROGRAM_OF_STUDY,
   MK_PROJECT_LEADER,
   MK_PROJECT_TYPE,
   MK_SEMESTER].forEach(meta_key => {
    showAll.value[meta_key] = true
   });

   setTimeout(() => {

    [MK_AUTHORS,
      MK_KEYWORDS,
      MK_PARTICIPANTS,
      MK_PROGRAM_OF_STUDY,
      MK_PROJECT_LEADER,
      MK_PROJECT_TYPE,
      MK_SEMESTER].forEach(meta_key => {

        const fc_elem = document.getElementById('filter_cloud_' + meta_key)
        const height = fc_elem?.getBoundingClientRect().height || 54 //164
        showAllHeight.value[meta_key] = height + 'px';
      })
      console.log("got show heights: " + JSON.stringify(showAllHeight.value))
   },100)
   

   setTimeout(() => {
    [MK_AUTHORS,
      MK_KEYWORDS,
      MK_PARTICIPANTS,
      MK_PROGRAM_OF_STUDY,
      MK_PROJECT_LEADER,
      MK_PROJECT_TYPE,
      MK_SEMESTER].forEach(meta_key => {
        showAll.value[meta_key] = false
      });
  
   }, 100)

  
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
    return { height: '56px'}
  } 
  return {height: showAllHeight.value[meta_key]}
}

</script>
<template>
  <div class="filter_view"
    :class="{hidden: animate_intro}">
    <header class="header">
      <nav class="nav">
        <div class="wrapper_left">
          <button class="btn_logo"
            @click.once="closeFilter()">
            <!-- <IconsNavHome class="logo"/> -->
            <!-- TODO padding -->
            <svg class="logo"
              xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="12" transform="rotate(180 24 24)" fill="#2C2C2C"/>
            </svg>
          </button>
        </div>
        
        <div class="wrapper_mid">
          <button class="btn_apply"
            @click.once="applyFilter()">
            <div class="label">{{ $t('filter.btn_apply_label') }}&nbsp;({{ selectedFilterCount }})</div>
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
            <input class="filter_text_input"
              type="text"
              @input="changedFilterTitle"
              v-model="newFiltersTitle"/>
            <div class="filter_text_clear"
              @click="newFiltersTitle = '';updateFilteredCounts()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <button class="btn_close"
            @click="resetFilter()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 17L4 12L9 7" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 18V16C20 14.9391 19.5786 13.9217 18.8284 13.1716C18.0783 12.4214 17.0609 12 16 12H4" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{$t('filter.btn_reset_label')}}
          </button>
          
        </div>
      </nav>
    </header>

    <div class="filter_content">
    
      <div class="wrapper_filter">

        <!-- HH Können statt den filter-translations die meta_info-translations verwendet werden? Redundanz vermeiden. -->

        <!-- MK_KEYWORDS -->
        <div class="meta_key_filter">
          <div class="filter_headline">{{ $t('meta_info.label_project_keywords') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_KEYWORDS "
            :style="getShowAllStyle(MK_KEYWORDS)"
            :class="{hide_all:!showAll[MK_KEYWORDS]}">
            <div v-for="kws in globalMap[MK_KEYWORDS]" :key="kws">
              <button class="keyword_item"
                @click="clickedKeyword(kws)"
                v-if="!isHideIfNotSubString(kws[0].name)"
                :class="getFilterTagClass(FILTERS_KEYWORD, MK_KEYWORDS, kws[0])"
                >
                {{ kws[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_KEYWORDS, kws[0].id) }}</span>
              </button>
            </div>
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_KEYWORDS)"
            :show-all="showAll[MK_KEYWORDS]"
            :count="getTagCount(MK_KEYWORDS)"/>
          <!-- <button class="btn_show_all"
            @click="showAll[MK_KEYWORDS] = !showAll[MK_KEYWORDS]">
            <span v-if="!showAll[MK_KEYWORDS]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button> -->
          
        </div>
        

        <!-- MK_AUTHORS -->
        <div class="tree_filter_people">
          <div class="filter_headline">{{ $t('meta_info.label_project_authors') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_AUTHORS "
            :style="getShowAllStyle(MK_AUTHORS)"
            :class="{hide_all:!showAll[MK_AUTHORS]}">
            <div v-for="person in globalMap[MK_AUTHORS]" :key="person">
              <button class="keyword_item"
                @click="clickedPeople(person)"
                v-if="!isHideIfNotSubString(person[0].name)"
                :class="getFilterTagClass(FILTERS_PEOPLE, MK_AUTHORS, person[0])"
                >
                {{ person[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_AUTHORS, person[0].id) }}</span>
              </button>
            </div>
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_AUTHORS)"
            :show-all="showAll[MK_AUTHORS]"
            :count="getTagCount(MK_AUTHORS)"/>
          <!--<button class="btn_show_all"
            @click="showAll[MK_AUTHORS] = !showAll[MK_AUTHORS]">
            <span v-if="!showAll[MK_AUTHORS]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button>-->
        </div>
        

        <!-- MK_PARTICIPANTS -->
        <div class="tree_filter_people">
          <div class="filter_headline">{{ $t('meta_info.label_project_participants') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_PARTICIPANTS "
            :style="getShowAllStyle(MK_PARTICIPANTS)"
            :class="{hide_all:!showAll[MK_PARTICIPANTS]}">
            <div v-for="person in globalMap[MK_PARTICIPANTS]" :key="person">
              <button class="keyword_item"
                @click="clickedRole(person)"
                v-if="!isHideIfNotSubString(person[0].name)"
                :class="getFilterTagClass(FILTERS_ROLES, MK_PARTICIPANTS, person[0])">
                {{ person[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_PARTICIPANTS, person[0].id) }}</span>
              </button>
            </div>
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_PARTICIPANTS)"
            :show-all="showAll[MK_PARTICIPANTS]"
            :count="getTagCount(MK_PARTICIPANTS)"/>
          <!--<button class="btn_show_all"
            @click="showAll[MK_PARTICIPANTS] = !showAll[MK_PARTICIPANTS]">
            <span v-if="!showAll[MK_PARTICIPANTS]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button>-->
        </div>
        

        <!-- MK_PROGRAM_OF_STUDY -->
        <div class="meta_key_filter">
          <div class="filter_headline">{{ $t('meta_info.label_project_program_of_study') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_PROGRAM_OF_STUDY "
            :style="getShowAllStyle(MK_PROGRAM_OF_STUDY)"
            :class="{hide_all:!showAll[MK_PROGRAM_OF_STUDY]}">
            <div v-for="item in globalMap[MK_PROGRAM_OF_STUDY]" :key="item">
              <button class="keyword_item"
                @click="clickedKeyword(item)"
                v-if="!isHideIfNotSubString(item[0].name)"
                :class="getFilterTagClass(FILTERS_KEYWORD, MK_PROGRAM_OF_STUDY, item[0])"
                  >
                {{ item[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_PROGRAM_OF_STUDY, item[0].id) }}</span>
              </button>
            </div>
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_PROGRAM_OF_STUDY)"
            :show-all="showAll[MK_PROGRAM_OF_STUDY]"
            :count="getTagCount(MK_PROGRAM_OF_STUDY)"/>
            
          <!-- <button class="btn_show_all"
            @click="showAll[MK_PROGRAM_OF_STUDY] = !showAll[MK_PROGRAM_OF_STUDY]">
            <span v-if="!showAll[MK_PROGRAM_OF_STUDY]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button> -->
        </div>
        

        <!-- MK_PROJECT_CATEGORY -->
        <div class="meta_key_filter">
          <div class="filter_headline">{{ $t('meta_info.label_project_category') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_PROJECT_TYPE "
            :style="getShowAllStyle(MK_PROJECT_TYPE)"
            :class="{hide_all:!showAll[MK_PROJECT_TYPE]}">
            <div v-for="item in globalMap[MK_PROJECT_TYPE]" :key="item">
              <button class="keyword_item"
                @click="clickedKeyword(item)"
                v-if="!isHideIfNotSubString(item[0].name)"
                :class="getFilterTagClass(FILTERS_KEYWORD, MK_PROJECT_TYPE, item[0])"
                  >
                {{ item[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_PROJECT_TYPE,item[0].id) }}</span>
              </button>
            </div>
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_PROJECT_TYPE)"
            :show-all="showAll[MK_PROJECT_TYPE]"
            :count="getTagCount(MK_PROJECT_TYPE)"/>
          <!--<button class="btn_show_all"
            @click="showAll[MK_PROJECT_TYPE] = !showAll[MK_PROJECT_TYPE]">
            <span v-if="!showAll[MK_PROJECT_TYPE]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button>-->
          
        </div>
        
        <!-- MK_PROJECT_LEADER -->
        <div class="meta_key_filter">
          <div class="filter_headline">{{ $t('meta_info.label_project_leader') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_PROJECT_LEADER "
            :style="getShowAllStyle(MK_PROJECT_LEADER)"
            :class="{hide_all:!showAll[MK_PROJECT_LEADER]}">
            <div v-for="item in globalMap[MK_PROJECT_LEADER]" :key="item">
              <button class="keyword_item"
                @click="clickedPeople(item)"
                v-if="!isHideIfNotSubString(item[0].name)"
                :class="getFilterTagClass(FILTERS_PEOPLE, MK_PROJECT_LEADER, item[0])"
                  >
                {{ item[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_PROJECT_LEADER, item[0].id) }}</span>
              </button>
            </div>
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_PROJECT_LEADER)"
            :show-all="showAll[MK_PROJECT_LEADER]"
            :count="getTagCount(MK_PROJECT_LEADER)"/>
          <!--<button class="btn_show_all"
            @click="showAll[MK_PROJECT_LEADER] = !showAll[MK_PROJECT_LEADER]">
            <span v-if="!showAll[MK_PROJECT_LEADER]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button>-->
        </div>
        

        <!-- MK_SEMESTER -->
        <div class="meta_key_filter">
          <div class="filter_headline">{{ $t('meta_info.label_project_semester') }}</div>
          <div class="filter_cloud"
            :id=" 'filter_cloud_' + MK_SEMESTER "
            :style="getShowAllStyle(MK_SEMESTER)"
            :class="{hide_all:!showAll[MK_SEMESTER]}">
            <div v-for="item in globalMap[MK_SEMESTER]" :key="item">
              <button class="keyword_item"
                @click="clickedFilter(FILTERS_KEYWORD, item)"
                v-if="!isHideIfNotSubString(item[0].name)"
                :class="getFilterTagClass(FILTERS_KEYWORD, MK_SEMESTER, item[0])"
                  >
                {{ item[0].name }}
                <span class="filter_count">{{ getFilteredCount(MK_SEMESTER, item[0].id) }}</span>
              </button>
            </div>
            
          </div>
          <FilterViewShowBtn
            @toggle-show-all="toggleShowAll(MK_SEMESTER)"
            :show-all="showAll[MK_SEMESTER]"
            :count="getTagCount(MK_SEMESTER)"/>
          <!--<button class="btn_show_all"
            @click="showAll[MK_SEMESTER] = !showAll[MK_SEMESTER]">
            <span v-if="!showAll[MK_SEMESTER]">+&nbsp;&nbsp;Show all</span>
            <span v-else>-&nbsp;&nbsp;Show less</span>
          </button>-->
          
        </div>
        


      </div>

      <div class="wrapper_projects">
        <div class="filter_headline">{{ $t('filter.label_projects') }}</div>
        

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
            <!-- <div class="tree_fachbereich">
              <div class="tree_fachbereich_item"
                v-for="fb in tree.cols_departments[tree.col_id]">
                {{ fb }}
              </div>
            </div> -->
            <div class="tree_divider"></div>
            
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
  height: 50px; width: 50px;
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
  flex-shrink: 0;
  transition: all 500ms ease-out;
}
.hidden .wrapper_mid {
  transform: translateY(-10vh);
}

.btn_logo {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-navbar-between-items, 4px);

  border: none;
  width: 50px;
}
.btn_logo .logo {

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
  /* display: inline-flex;
  align-items: center;
  gap: var(--spacing-navbar-between-items, 4px); */
  border: none;
  color: var(--Colors-text-primary, #2C2C2C);
  padding: var(--padding-item-vertical-M, 12px) 0;
}
/* .btn_apply .label {
  display: flex;
  padding-right: var(--margin-navbar-institution-logo-right, 10px);
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);
} */

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
  border: 1px solid var(--Colors-nav-bar-button-outline, #CAC9C2);

  color: var(--Colors-text-primary, #2C2C2C);
}
.btn_close:hover {
  background: var(--Colors-nav-bar-button-fill-hover, #E7E6E1);
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

.wrapper_filter {
  /* border: 1px solid red; */
  position: absolute;
  top: 0px;
  left: 10vw;
  width: calc(40vw - 24px);
  

  display: flex;
  
  height: calc(100vh - 200px);
  overflow-y: scroll;
  padding-top: 200px;

  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.wrapper_filter::-webkit-scrollbar {
  display: none;
}
.wrapper_projects {
  /* border: 1px solid blue; */
  position: absolute;
  left: calc(50vw + 24px);
  width: calc(40vw - 24px);
  height: calc(100vh - 200px);
  

  display: flex;
  
  
  overflow-y: scroll;
  padding-top: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.wrapper_projects::-webkit-scrollbar {
  display: none;
}

.meta_key_filter,
.tree_filter_people {
  position:relative;
  width: 100%;
  float: left;
  padding-bottom: 40px;
}


.filter_headline {  
  flex-direction: column;
 
  display: flex;
  align-items: flex-start;
  gap: var(--margin-navbar-institution-logo-right, 10px);

  align-self: stretch;

  color: var(--Colors-text-secondary, #CAC9C2);

  /* padding-bottom: var(--padding-item-vertical-L); */
  height: 36px;
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

.btn_show_all {
  z-index: 10;
  display: flex;
  padding: var(--padding-item-vertical-M, 12px) var(--padding-item-horizontal-XS, 0px);
  align-items: center;
  gap: var(--spacing-item-inner, 8px);

  color: var(--text-primary, #2C2C2C);

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

  color: var(--Colors-text-primary, #2C2C2C);

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
  /* border-bottom: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2); */
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
/*.tree_fachbereich {
  display: flex;
  align-items: center;
  gap: var(--spacing-between-items-L, 16px);
}*/
.tree_divider {
  padding-top: 16px;
  
  flex-direction: column;
  align-items: flex-start;
  /* gap: 10px; */
  margin-bottom: 16px;
  align-self: stretch;
  border-bottom: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);
}
</style>
