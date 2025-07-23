<template>
  <div class="no-mobile-overlay">
    <div class="no-mobile-overlay-content">
      <h1>{{ t('no_mobile.title') }}</h1>
      <p>{{ t('no_mobile.p1') }}</p>
      <p>{{ t('no_mobile.p2') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.no-mobile-overlay {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  box-sizing: border-box;
  text-align: center;
}
h1 {
    line-height: 1.1;
    margin-bottom: 1.5em;
}
</style>
