<template>
  <div class="intro_page">
    <!--<header>
      <nav>
        <NuxtLink to="/">
          <IconsNavIconORC/>
        </NuxtLink>
        <NuxtLink class="indexlink" 
          :to="'/setlist/' + MATCH_PROJECTS">Index</NuxtLink>
        <NuxtLink class="diplomlink"
          :to="'/setlist/' + MATCH_DIPLOM">Diplom</NuxtLink>

        <NuxtLink class="hfglink" to="https://madek.hfg-karlsruhe.de">//////</NuxtLink>
        <button @click="showContent=!showContent">SHOW</button>
      </nav>
    </header>-->
    <Transition>
    <div class="intro_content"
      v-if="showContent"
      >
      <div v-for="idx in [1,2,3,4,5]"
        :style="font_style">{{ $t('intro.title' + idx) }}</div>
      <!-- <h1 :style="font_style">{{ $t('intro.title') }}</h1> -->                
    </div>
  </Transition>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()
const {
    MATCH_DIPLOM,
    MATCH_PROJECTS
} = treeHelper()

const {
  font_selected,
  font_list, 
  selectRandomFont,
  getViewSizedStyle
} = DynFonts()
const showContent = ref(false)
const font_style = ref({})

onMounted(() => {
  selectRandomFont()
  font_style.value = getViewSizedStyle(18,16)
  
  document.documentElement.setAttribute("data-theme", "dark");
  showContent.value=true
  setTimeout(() => {
    router.push('setlist/' + MATCH_DIPLOM)
  },7000)
})
  
</script>
  
<style scoped>
  .indexlink,
  .diplomlink,
  .hfglink {
    padding: 12px;
    border: 1px solid black;
    font-size: 20px;
    color: var(--Colors-text-headlines)
  }
  .hfglink {
    float: right;
  }
  .nav-logo-orc path {
      stroke: none;
      fill: var(--Colors-nav-bar-button-fill);
    }
  .intro_page {
    position: fixed;
    top: 0px; left: 0px; width: 100vw; height: 100%;
    padding: 2.2rem 0rem;
    overflow: hidden;

    background-color: var(--background-intro, #2C2C2C);
    
    color: var(--Colors-text-headlines, #fff);
  }
  h1 {
    
    align-self: stretch;
    color: var(--Colors-text-headlines, #FFF);
    text-align: center;
    font-family: Instrument Sans, sans-serif;
    
    
    font-style: normal;
    font-weight: 400;
    
    font-size: min(16vw, 16vh);
    line-height: 16vh;
  }
  .intro_content {
    margin: auto;
    align-self: stretch;
    /* color: var(--Colors-text-headlines, #FFF); */
    /* color: var(--Primitives-color-highlight-bright-tone, #fff); */
    color: #fff;
    text-align: center;
    font-style: normal;
    font-weight: 400;

    font-family: Instrument Sans, sans-serif;
    font-size: min(16vw, 16vh);
    line-height: 6vh;
    position:relative;
    top: 100px;
    display:block;
  }

  /* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 2.0s 1s ease-out;
  /*transition: opacity 0.5s 1s ease;*/
  
}

.v-enter-from,
.v-leave-to {
  /* opacity: 0; */
  top: 100vh;
}

</style>