<template>
  <div class="icon-wrap"
    :class="{ 'icon_large': large }">
    <svg class="icon"
      :class="{ 'inv': inv}"
      xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewbox="0 0 24 24"
      >
    <slot></slot>
    </svg>
  </div>
</template>
<script setup lang="ts">
defineProps({
  inv: Boolean,
  large: Boolean
})
</script>
<style>
svg.icon {
  /* border: 1px solid red; */
  stroke: var(--Colors-text-primary); 
  fill: transparent;
}
svg.icon * {
  stroke: var(--Colors-text-primary) !important; 
}
svg.icon.inv,
svg.icon.inv * {
  stroke: var(--Colors-text-primary-inverted) !important; 
}

.icon-wrap {
  width: 1.5rem; height: 1.5rem;
}
.icon-wrap.icon-large {
  width: 3rem; height: 3rem;
}

</style>
