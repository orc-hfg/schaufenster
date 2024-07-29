<template>
  <div class="intro_page">
    <header>
      <nav>
        <NuxtLink to="/">
          <IconsNavIconORC/>
        </NuxtLink>
        <NuxtLink class="indexlink" 
          :to="'/setlist/' + MATCH_PROJECTS">Index</NuxtLink>
        <NuxtLink class="diplomlink"
          :to="'/setlist/' + MATCH_DIPLOM">Diplom</NuxtLink>

        <NuxtLink class="hfglink" to="https://madek.hfg-karlsruhe.de">//////</NuxtLink>
      </nav>
    </header>
    <div class="intro_content"
      :style="{
                    'font-family': 'font_' + font_selected,
                    'font-size': 'min(' + 15 * font_list[font_selected].size_factor + 'vw' + ',' +  15 * font_list[font_selected].size_factor + 'vh' + ')' ,
                    'line-height': 15 * font_list[font_selected].line_height_factor + 'vh'
                }">
                
                Projektarchiv<br/>
                der<br/>
                Hochschule<br/>
                für Gestaltung<br/>
                Karlsruhe<br/>
      <!-- <div>Projektarchiv</div>
      <div>der</div>
      <div>Hochschule</div>
      <div>für Gestaltung</div>
      <div>Karlsruhe</div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
const {
    MATCH_DIPLOM,
    MATCH_PROJECTS
} = treeHelper()

const { font_selected, font_list } = DynFonts()

onMounted(() => {
  font_selected.value = Math.floor((Math.random()* font_list.value.length))
  document.documentElement.setAttribute("data-theme", "");
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
  .nav-logo-orc path {
      stroke: none;
      fill: var(--Colors-nav-bar-button-fill);
    }
  .intro_page {
    position: fixed;
    top: 0px; left: 0px; width: 100vw; height: 90vh;
    padding: 2.2rem 0rem;
    overflow: hidden;

    background-color: var(--background-intro, #2C2C2C);
    
    color: var(--Colors-text-headlines);
  }
  h1 {
    
    align-self: stretch;
    color: var(--Colors-text-headlines, #FFF);
    text-align: center;
    font-family: gqom404;
    /* font-size: var(--font-h1-font-size, 120px); */
    font-size: min(16vw, 16vh);
    font-style: normal;
    font-weight: 400;
    /* line-height: var(--font-h1-line-height, 90px) */
    line-height: 6vh;
     /* 87.5% */;

  }
  .intro_content {
    align-self: stretch;
    color: var(--Colors-text-headlines, #FFF);
    text-align: center;
    font-style: normal;
    font-weight: 400;

    font-size: min(16vw, 16vh);
    line-height: 6vh;
  }
</style>