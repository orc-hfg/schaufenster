<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path v-if="showUp" d="M18 15L12 9L6 15" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path v-if="!showUp" d="M6 9L12 15L18 9" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>
<script setup lang="ts">
const props = defineProps(["showUp"])
</script>
<style scoped>
svg {
    width: 24px;
    height: 24px;
}
path {
    stroke: var(--Colors-text-primary);
}
</style>