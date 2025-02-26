<template>
  <div class="intro_page" data-theme="dark" @click.prevent.once="switchPage()">
  <!-- TODO mobile theme: dynamic fonts font sizes -->
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
      <h1 v-for="idx in [1,2,3,4,5]"
        class="intro_line"
        :class="{hidden: !showContent }"
        :style="getFontStyle(idx)"
        >
        {{ $t('intro.title' + idx) }}
      </h1>
    </div>
  </div>
</template>
<script setup lang="ts">
const SHOW_CONTENT_DELAY = 200;
const SHOW_LIST_DELAY = 5000;
const TITLE_ENTER_DELAY_PER_LINE = 50;
const TITLE_ENTER_DURATION = 300;
 
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
  const config = useRuntimeConfig()
  if (config.public.kioskSetId) {
    const kioskId = config.public.kioskSetId
    const path = '/setview/projekt/' 
      + kioskId
      + '/' 
      + kioskId
    router.push(path)
  } else {
    router.push('/setlist/' + MATCH_DIPLOM)
  }
  
}
const getFontStyle = (idx) => {
  let vw = 18
  if (window && window.innerWidth) {
    const iw = window.innerWidth
    if (iw < 768) vw = 12
    else if (iw < 1280) vw = 14
    else if (iw > 2048) vw = 22
  }
  
  const fs = getViewSizedStyle(vw,20)
  fs.transitionDelay = (idx * TITLE_ENTER_DELAY_PER_LINE) + 'ms'
  fs.transitionDuration = TITLE_ENTER_DURATION + 'ms'
  //i.fs['line-height'] = fs['line-height'] * 1.1;
  return fs;
}
onMounted(() => {
  selectRandomFont()
  font_style.value = getViewSizedStyle(14,14)
  
  document.documentElement.setAttribute("data-theme", "dark");
  setTimeout(() => {
    showContent.value=true
  }, SHOW_CONTENT_DELAY)
  
  setTimeout(switchPage,SHOW_LIST_DELAY)
})
onBeforeUnmount(() => {
  
})
onBeforeRouteUpdate(() => {
  
})
onBeforeRouteLeave(() => {
  setTimeout(() => {
    showContent.value = false
  },200)
})
</script>
  
<style scoped>
  header {
    display: flex;
    
    padding: var(--padding-navbar-left-right-top-btm);
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
 
h1 {  
  align-self: stretch;

  text-align: center;
  font-family: "Instrument Sans";
  font-style: normal;
  font-weight: 400;
  /* computed */
  font-size: min(16vw, 16vh);
  line-height: 16vh;

  margin-block: 0;
}

.intro_page {
  position: fixed;
  top: 0px; left: 0px; width: 100vw; height: 100%;
  overflow: hidden;
  background-color: var(--background-intro, #2C2C2C);
  color: var(--Colors-text-primary, #fff);

  display: flex;
  justify-content: center;
}


.intro_content {
  /* border: 1px solid red; */
  display:block;
  margin: auto;
  align-self: stretch;
  
  text-align: center;
  
  font-style: normal;
  font-weight: 400;

  font-family: "Instrument Sans";
  font-size: min(16vw, 16vh);
  line-height: 6vh;
}

.intro_line {
  user-select: none;
  position: relative;
  opacity: 1;
 
  /* transition: all 800ms ease-out; */
  /* transition: opacity 800ms ease-out; */
}
.intro_line.hidden {
  opacity: 0;
  transform: translateY(10vh);
}
</style>