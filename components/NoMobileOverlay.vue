<template>
  <div class="hfg-logo">
    <IconsNavIconHfG />
  </div>
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
.hfg-logo {
  text-align: center;
  svg {
    width: 100px;
    height: auto;
  }
}
.no-mobile-overlay {
  /* position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px); */

  /* Fallback für ältere Browser*/
  width: 100vw;
  height: 100vh;
  /* Neuere Browser: dynamisch auf 100% des Viewports setzen */
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  padding-top: 0;
  box-sizing: border-box;
  text-align: center;
}
h1 {
    line-height: 1.1;
    margin-top: 0;
    margin-bottom: 1.5em;
}
@media (max-height: 300px) or (max-width: 370px) {
    .no-mobile-overlay {
        display: block;
        font-size: 0.8em;
        line-height: 1.1;
        padding: 1em;
    }
    h1 {
        margin-bottom: 0.5em;
    }
}
</style>
