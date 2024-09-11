<template>
    <div>
        <svg v-if="!isPlay" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M37 24L11 39L11 9L37 24Z" fill="#2C2C2C"/>
        </svg>
        <svg v-if="isPlay" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="27.9219" y="9" width="8.07692" height="30" fill="#2C2C2C"/>
            <rect x="12" y="9" width="8.07692" height="30" fill="#2C2C2C"/>
        </svg>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['isPlay'])
</script>
<style scoped>
div {
    width: 48px; height: 48px;

}
svg * {
    fill: var(--Colors-btm-bar-playerView-button, #2C2C2C)
}
</style>