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

        <NuxtLink class="hfglink" to="https://madek.hfg.karlsruhe.de">//////</NuxtLink>
      </nav>
    </header>
    <div>
      <h1>Projektarchiv</h1>
      <h1>der</h1>
      <h1>Hochschule</h1>
      <h1>für Gestaltung</h1>
      <h1>Karlsruhe</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
  const {
    MATCH_DIPLOM,
    MATCH_PROJECTS
  } = treeHelper()

  onMounted(() => {
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
    font-size: var(--font-h1-font-size, 120px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--font-h1-line-height, 90px) /* 87.5% */;

  }
  
</style>