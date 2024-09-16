<template>
  <div class="intro_page" data-theme="dark" @click.prevent.once="switchPage()">
    <header>
      <nav class="wrap_left">
        <NuxtLink to="/" class="home_link">
          <IconsNavHome/>
        </NuxtLink>
      </nav>
      <nav class="wrap_right">
        <NuxtLink class="hfg_link"
          to="https://hfg-karlsruhe.de"
          target="_blank" rel="noopener noreferer">
          <IconsNavIconHfG/>
        </NuxtLink>
      </nav>
    </header>
    <div class="intro_content">
      <div v-for="idx in [1,2,3,4,5]"
        class="intro_line"
        :class="{hidden: !showContent }"
        :style="getFontStyle(idx)"
        >
        {{ $t('intro.title' + idx) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const SHOW_CONTENT_DELAY = 300;
const SHOW_LIST_DELAY = 5000;
const TITLE_ENTER_DELAY_PER_LINE = 50;
const TITLE_ENTER_DURATION = 800;

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

const switchPage = () => {
  router.push('setlist/' + MATCH_DIPLOM)
}
const getFontStyle = (idx) => {
  const fs = getViewSizedStyle(18,18)
  fs.transitionDelay = (idx * TITLE_ENTER_DELAY_PER_LINE) + 'ms'
  fs.transitionDuration = TITLE_ENTER_DURATION + 'ms'
  return fs;
}
onMounted(() => {
  selectRandomFont()
  font_style.value = getViewSizedStyle(18,17)
  
  document.documentElement.setAttribute("data-theme", "dark");
  setTimeout(() => {
    showContent.value=true
  }, SHOW_CONTENT_DELAY)
  
  setTimeout(switchPage,SHOW_LIST_DELAY)
})
  
</script>
  
<style scoped>
  header {
    display: flex;
    
    padding: var(--margin-navbar-left-right-top-btm, 12px);
    justify-content: space-between;
    align-items: center;
  }
  .wrap_left {
    display: flex;
    align-items: center;
    gap: var(--spacing-navbar-between-items, 4px);
  }
  .wrap_right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);
  }
  .home_link {
    padding: 0px;
    height: 48px;
    user-select: none;
    transition: transform 300ms ease-out;
  }
  .home_link:hover {
    transform: scale(0.83);
  }
  .hfg_link {
    cursor: pointer;
    user-select: none;
    padding: 12px;
    /* border: 1px solid white; */
    font-size: 20px;

    display: flex;
    padding-right: var(--margin-navbar-institution-logo-right, 10px);
    justify-content: flex-end;
    align-items: center;
    gap: var(--padding-item-horizontal-M, 12px);
  }

  svg * {
    fill: var(--Colors-text-primary, #ffffff);
  }
  
  .intro_page {
    position: fixed;
    top: 0px; left: 0px; width: 100vw; height: 100%;
    overflow: hidden;
    background-color: var(--background-intro, #2C2C2C);
    color: var(--Colors-text-primary, #fff);
  }

  h1 {
    
    align-self: stretch;
  
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
    
    text-align: center;
    font-style: normal;
    font-weight: 400;

    font-family: Instrument Sans, sans-serif;
    font-size: min(16vw, 16vh);
    line-height: 6vh;

    position:relative;
    top: 64px; /* 103px; */
    display:block;

  }
.intro_line {
  user-select: none;
  position: relative;
  opacity: 1;
 
  transition: all 800ms ease-out;
  /* transition: opacity 800ms ease-out; */
  
}
.intro_line.hidden {
  opacity: 0;
  transform: translateY(50vh);
}


/* 
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s 2.5s ease-out;
  transition: all 2.0s 1s ease-out;
  
  
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  top: 100vh;
}

.line-enter-enter-active,
.line-enter-leave-active {
  transition: opacity 0.5s 2.5s ease-out;
  transition: all 2.0s 1s ease-out;
  
  
}

.line-enter-enter-from,
.line-enter-leave-to {
  opacity: 0;
  transform: translateY(100vh);
} */

</style>