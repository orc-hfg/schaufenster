<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
        :class="{rotated: showPlus}">
    <title>{{$t('setview.btn_title_btm_bar_toggle')}}</title>    
  <path :class="{hidden: !showPlus}" d="M17 2H15V30H17V2Z" fill="black"/>
  <path d="M30 15H2V17H30V15Z" fill="black"/>
</svg>
</template>
<script lang="ts" setup>
const props = defineProps(['showPlus'])
</script>
<style scoped>
svg {
    /* position: absolute;
    top: 10px; left: 10px; */
    /* fill: var(--btm-bar-main-button-fill, rgba(243, 242, 239, 0.70)); */
    
    opacity: 1;
    transition: all 300ms ease-in-out;
}
svg path {
    fill: var(--Colors-btm-bar-main-button-icon, #000000);
    stroke: var(--Colors-btm-bar-main-button-icon, #000000);
    transition: all 300ms ease-in-out;
}
.hidden {
    opacity: 0;
}
.rotated {
    transform: rotateZ(-90deg)
}
</style>