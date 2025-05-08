<template>
    <div class="btn_mute" tabindex="0">
        <!-- {{ isMute ? "unmute" : "mute" }} -->
        <div v-if="!isMute">
            mute
        </div>
        <div v-if="isMute">
            unmute
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['isMute'])
</script>
<style scoped>
.btn_mute {
    width: 76px; height: 48px;
    /* padding-top: 6px; */
    color: var(--Colors-btm-bar-playerView-button, #2C2C2C);
    font-family: "Instrument Sans";
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02rem;
    cursor: pointer;
}
.btn_mute > div {
    width: 100%;
    padding-top: 10px;
    text-align: center;
}

</style>