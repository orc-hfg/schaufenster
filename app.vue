<template>
    <NuxtPage />
</template>
<script setup lang="ts">
import '~/assets/vars.css'
import '~/assets/base.css'

const { error_msg, ok_msg, reset_error } = errorHelper();


const {
  MATCH_DIPLOM,
  MATCH_PROJECTS,
  loading,
  treeMapper,
  treeList,
  filterCount,
  filtersMap,
  filteredTreeList,
  
  updateFilters,
  initTree
} = treeHelper();

const route = useRoute();

//const appDataLoaded = ref(false as boolean);
let treeType: string;

//const nuxtApp = useNuxtApp();
const useTree = useState('tree');//, () => { return {}})
const useAppSettings = useState('appSettings')
//const appSettings = ref()



const initMadek = () => {
  console.log("initMadek")

  const madek_store = useMadekStore()

  madek_store.initPublic().then(() => {
      console.log("initMadek: madek appsettings loaded")
      useAppSettings.value = {
        locale: madek_store.appSettings.default_locale,
        locales: madek_store.appSettings.available_locales
      }
       
      //useState('appSettings', () => { return madek_store.appSettings })
      //console.dir(madek_store.appSettings)
  }).catch(error => {
    console.error("initMadek: Could not get madek appsettings.", error)
  })    
}

if (import.meta.server) { 
  console.log("import meta server")
}

if (process.server) {
  console.log("process server")
  const treesData = await initTree()
    useTree.value = treesData
}

const initApp = async() => {
  initMadek();
/*
  initTree().then((treesData) => {
      //useState('tree', () => { return treesData })
      useTree.value = treesData
      console.log("finished initTree: set tree state.")
      //console.dir(treesData)
    }).catch(error => {
      console.error("initTree: Could not init madek data tree.", error)
    })
  */
    
  
  //if (process.server) {
    console.log("init server")
  
  
    
    //useState('tree', () => { return treesData })

    /*.then((treesData) => {
      //useState('tree', () => { return treesData })
      //useTree.value = treesData
      console.log("finished initTree: set tree state.")
      //console.dir(treesData)
    }).catch(error => {
      console.error("initTree: Could not init madek data tree.", error)
    })*/
  
    
    /*
  } else {
    console.log("init client")
    
    //console.error("check useTree: " + useTree.value)
    
    loading.value = 10
    setTimeout(() => {
      loading.value = 0
    })
  }
*/
  
};



//watch(() => loading.value, () => {
  //console.log("APP: loading: " + loading.value)

  /*
  if (loading.value <= 1) {
    console.log("APP: loading finished: " + loading.value)
    //console.dir(treeMapper.value)
    
    setTimeout(() => {
      console.log("loading finished: tree after waiting")
      //console.dir(useTree.value)
      
      
      //localStorage.setItem("tree_data", JSON.stringify(treeMapper.value))
      //initTreeType()
    },5000)
    
  }*/
//})


// watch(() => useTree.value, () => {
//     console.log("APP: watch changed useTree: " + useTree.value)

// })

const showFilterView = ref(false)

const showFilter = () => {
  if (showFilterView.value) {
    showFilterView.value = false;
  } else {
    showFilterView.value = true;
  }
}

const closedFilterView = () => {
  console.log("closedFilterView")
  showFilterView.value = false;
  updateFilters(treeType)
}
const resetFilter = () => {
  filtersMap.value = {}
  //filteredTreeList.value = treeList.value;
  updateFilters(treeType)
}

//const nuxtData = useNuxtData();

// const initTreeType = () => {
//   console.log("App: initTreeType: has route: " + route.path)
//   if (route.path.indexOf('project') >= 0) {
//     treeType = MATCH_PROJECTS;
//   } else {
//     treeType = MATCH_DIPLOM;
//   }
//   treeList.value = treeMapper.value[treeType];
//   filterCount.value = 0;
//   filtersMap.value = {}
//   filteredTreeList.value = treeList.value;
  
// }

//initTreeType()

watch(() => route.fullPath, () => {
  //initTreeType()

  console.log("APP: changed route: " + JSON.stringify(route.fullPath));
  
/*
  if (newVal?.name?.indexOf("diploma") >= 0) {
    showNavDiplom.value = true;
    showFilterView.value = false;
    
  } else {
    showNavDiplom.value = false;
    
  }
  if (newVal?.name?.indexOf("projects") >= 0) {
    showNavProjects.value = true;
    showFilterView.value = false;
  } else {
    showNavProjects.value = false;
  }
  */
  /* setTimeout(() => {
    showHomeHover.value = false;
  }, 1000); */
});


initApp();

</script>
<style>


.page-enter-active,
.page-leave-active {
  transition: all 2s;
}

.page-enter-from {
  clip-path: circle(0vw at 50vw 50vh);
}
.page-leave-to {
  clip-path: circle(100vw at 50vw 50vh);
}

</style>