<template>
  <div class="setlist_page">
    <header>
      <nav class="nav">
        <NuxtLink to="/">
          <IconsNavIconORC />
        </NuxtLink>

        <NuxtLink :to="'/setlist/' + MATCH_PROJECTS">Index</NuxtLink>
        <NuxtLink :to="'/setlist/' + MATCH_DIPLOM">Diplom</NuxtLink>

        <a @click="$emit('showFilter')">Filter</a>
      </nav>
    </header>

    <h1>Set List</h1>

    <br />

    <br />
    <p>RP: {{ route.params }}</p>
    ST/MT: {{ settype }}
    <br />
    <!--
    <hr/>
    USETREE:
    <div v-if="useTree && useTree[settype]"
         v-for="treedata in useTree[settype]">
        <p>
            <NuxtLink :to=" '/setview/' + route.params.settype + '/' + treedata.col_id ">Show</NuxtLink>
            | Title: {{ treedata.colTitlesMap[treedata.col_id] }} 
            | Author: {{ getAuthorNames(treedata) }}
            | Col: {{ treedata.col_id }} 
        </p>
    </div>
    -->

    <hr />

    filteredTreeList:
    <div v-for="treedata in filteredTreeList">
      <p>
        <NuxtLink :to="'/setview/' + settype + '/' + treedata.col_id">Show</NuxtLink>
        | Title: {{ treedata.colTitlesMap[treedata.col_id] }}
        <!-- | Author: {{ getAuthorNames(treedata) }}  -->
        | Author {{ treedata.cols_authors[treedata.col_id] }} | Col: {{ treedata.col_id }}
        <!-- | Cover: {{ treedata.edges[RID][treedata.col_id].coverId }} -->
      </p>
      <img
        @click="switch2set(treedata.col_id)"
        :src="previewUrl(treedata.col_id, treedata.edges[RID][treedata.col_id].coverId)"
        alt="No Cover"
      />
    </div>
    <br />
    <!-- FTL: {{ filteredTreeList }} -->
    <br />
    <hr />
    <br />
  </div>
</template>
<script setup lang="ts">
const {
  loading,
  RID,
  MATCH_DIPLOM,
  MATCH_PROJECTS,
  treeMapper,

  treeList,
  filteredTreeList,
} = treeHelper();

const { apiConfig } = apiHelper();
const apiBaseUrl = apiConfig.baseUrl + "/api-v2/";
const route = useRoute();
const router = useRouter();
const settype = ref();

const useTree = useState("tree");

const myTree = ref();

const previewUrl = (treeId: string, eId: string): string => {
  const pid = useTree.value[settype.value][treeId].previews[eId]?.id
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const previewLargeUrl = (treeId: string, eId: string): string => {
  const pid = useTree.value[settype.value][treeId].previewsLarge[eId]?.id;
  return apiBaseUrl + "previews/" + pid + "/data-stream";
};
const switch2set = (setid) => {
  const url = "/setview/" + settype.value + "/" + setid;
  router.push(url);
};
const getAuthorNames = (td) => {
  let result = "";

  if (
    td.cols_meta_data &&
    /*&& td.cols_authors
        && td.cols_authors[td.col_id]) {
            td.cols_authors[td.col_id].forEach(element => {
                    result += element.first_name + ' ' + (element.last_name || '')
                });
        }*/
    td.cols_meta_data[td.col_id] &&
    td.cols_meta_data[td.col_id]["madek_core:authors"] &&
    td.cols_meta_data[td.col_id]["madek_core:authors"].selectedPeople
  ) {
    td.cols_meta_data[td.col_id]["madek_core:authors"].selectedPeople.forEach(
      (element) => {
        result += element.first_name + " " + (element.last_name || "");
      }
    );
  }

  //console.log("getAuthorNames:"  + td.col_id + ":" + result)
  return result;
};
const updateSetType = () => {
  settype.value = route.params.settype || MATCH_PROJECTS;
  console.log("updateSetType: " + route.params.settype + " : " + settype.value);


  /* console.error(
    "useTree value: " + useTree.value ? useTree.value[settype.value] : "empty"
  ); */

  if (!useTree || !useTree.value || !useTree.value[settype.value]) {
    setTimeout(() => {
      console.error("no useTree yet, retry later");
      updateSetType();
      //window && window.Location && window.location.reload()
    }, 10000);
    return;
  }
  //myTree.value = useTree.value;

  console.error("use Tree state value: " + useTree.value[settype.value]);
  
  treeList.value = useTree.value[settype.value];

  filteredTreeList.value = treeList.value;

  //filterCount.value = 0;
  //filtersMap.value = {}
};

// watch(route.path, (nv,ov) => {
//     console.log("watch changed route: " + route.params.settype)
//     updateSetType();
// })

updateSetType();

onMounted(() => {
  updateSetType();
  
    
  /* if (import.meta.client) {
    setTimeout(() => {

      if (settype.value == MATCH_DIPLOM) {
           document.documentElement.setAttribute("data-theme", "diplom");    
        } else {
            document.documentElement.setAttribute("data-theme", "");
        }
      },100)
    } */
      


  /*watch(() => useTree.value, () => {
        console.error("SetList: watch changed use tree state: " + useTree.value)
        //updateSetType()
    })*/
  /*watch(() => treeMapper.value, () => {
        console.log("watch changed treeMapper: " + treeMapper.value)
        updateSetType()
    })*/

  watch(
    () => loading.value,
    () => {
      console.log("SetList: watch changed loading: " + loading.value);
      updateSetType();
    }
  );
});
</script>
<style>
.setlist_page {
  position: fixed;
  top: 0px; left: 0px;
  width: 100vw;
  height: 100vh;
  padding: 8rem 2rem;
  color: var(--Colors-text-primary);
  /* background: var(--Colors-text-primary-inverted); */
  background-color: var(--Colors-background-default);
  overflow-y: auto;
  clip-path: circle(99vw at 50vw 50vh);
}
</style>
