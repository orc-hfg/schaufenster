<template>

<div class="show_all_btn"
    v-if="count > min"
    @click="$emit('toggleShowAll')">
    <span v-if="!showAll">+&nbsp;&nbsp;show all</span>
    <span v-if="showAll">-&nbsp;&nbsp;show less</span>
</div>

</template>
<script setup lang="ts">
//TODO use svg icon
const emits = defineEmits(['toggleShowAll'])
const props = defineProps(['showAll','count', 'min'])
</script>
<style scoped>
.show_all_btn {
    cursor: pointer;
    user-select: none;
    display: flex;
    height: var(--dimension-button-height-M, 48px);
    padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px);
    align-items: center;
    gap: var(--spacing-item-inner, 8px);

    border-radius: var(--radius-none, 0px);
    border: none;

    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}

</style>