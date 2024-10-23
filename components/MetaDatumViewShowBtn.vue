<template>

<div class="show_all_btn" role="button"
    v-if="count > min"
    @click="$emit('toggleShowAll')">
    <div v-if="!showAll"><span><IconsPlus/></span><span>{{ $t('meta_info.btn_show_more_label') }}</span></div>
    <div v-if="showAll"><span><IconsMinus/></span><span>{{ $t('meta_info.btn_show_less_label') }}</span></div>
</div>

</template>
<script setup lang="ts">
//TODO use svg icon
const emits = defineEmits(['toggleShowAll'])
const props = defineProps(['showAll','count', 'min'])
</script>
<style scoped>
/* HH Button an Figma-Vorgaben anpassen 
 * [!] der Button wird mehrfach in FilterView.vue verwendet -> INLINE CODE, nicht diese Komponente [!]
 * @AL Wie damit umgehen: Code manuell angleichen oder Komponente verwenden?
*/
.show_all_btn {
    cursor: pointer;
    user-select: none;
    /* display: flex; */
    /* height: var(--dimension-button-height-M, 48px); */
    /* padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px); */
    padding: var(--padding-item-vertical-S, 8px) 0;
    /* align-items: center; */
    /* gap: var(--spacing-item-inner, 8px); */

    border-radius: var(--radius-none, 0px);
    border: none;

    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}
.show_all_btn div {
    display: flex;
    gap: var(--spacing-item-inner, 8px);
}

</style>