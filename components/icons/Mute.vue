<template>
    <div class="btn_mute" tabindex="0" role="button">
        <!-- {{ isMute ? "unmute" : "mute" }} -->
        <div v-if="!isMute">
            <IconsMuteIcon />
        </div>
        <div v-if="isMute">
            <IconsUnmuteIcon />
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['isMute'])
</script>
<style scoped>
.btn_mute {
    /* TODO Größe der Icons responsive machen */
    /* width: var(--dimension-button-height-M); */
    width: 48px;
    height: auto;
    cursor: pointer;
    padding: 0 var(--padding-item-horizontal-M);
    line-height: 0;
}
.btn_mute div {
    width: 100%;
}
.btn_mute svg {
    /* TODO Größe der Icons responsive machen */
    /* width: var(--dimension-button-height-M); */
    width: 48px;
    height: auto;
}
.btn_mute svg path {
    stroke: var(--Colors-btm-bar-playerView-button, #2C2C2C);
}
/* .btn_mute {
    width: 76px; height: 48px;
    color: var(--Colors-btm-bar-playerView-button, #2C2C2C);
    font-family: "Instrument Sans";
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.02rem;
    cursor: pointer;
    padding: 0 var(--padding-item-horizontal-M);
}
.btn_mute > div {
    width: 100%;
    padding-top: 10px;
    text-align: center;
} */


/* MOBILE LANDSCAPE Anpassungen */
.mobile_landscape .btn_mute {
  transform: scale(0.6);
  padding: 0;
}
</style>