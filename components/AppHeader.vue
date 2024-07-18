<template>
    <header>
      <nav class="nav">
        <NuxtLink to="/">
          <IconsNavIconORC/>
        </NuxtLink>

        
          <NuxtLink :to="'/setlist/' + MATCH_PROJECTS">Index</NuxtLink>
          <NuxtLink :to="'/setlist/' + MATCH_DIPLOM">Diplom</NuxtLink>

          <a @click="$emit('showFilter')">Filter</a>
        
        
        
      </nav>
    </header>
  </template>
  <script setup lang="ts">
  const route = useRoute()

  const {
    MATCH_DIPLOM,
    MATCH_PROJECTS
  } = treeHelper()

  defineEmits(['showFilter'])
  </script>
  <style scoped>
  .nav, .nav * {
    z-index: 1000;
  }
  header {
    z-index: 1000;
    position: fixed;
    top: 0; left: 0; width: 100vw; height:auto;
  }
  </style>