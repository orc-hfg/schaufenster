<template>
<button class="btn_show_all"
        v-if="isShow()"
        tabindex="0"
        @click="$emit('toggleShowAll')"
        @keyup.enter="$emit('toggleShowAll')"
        >
        <span v-if="!showAll">
            <IconsPlus/>
            {{ $t('filter.label_show_all') }}
            
        </span>
        <span v-if="showAll">
            <IconsMinus/>
            {{ $t('filter.label_show_less') }}
        </span>
    </button>
</template>

<script setup lang="ts">
    const emits = defineEmits(['toggleShowAll'])
    const props = defineProps(['showAll','count'])
    const MINIMAL_SHOW_COUNT = 3;
    const isShow = () => {
        return props.count > MINIMAL_SHOW_COUNT
    }
</script>
