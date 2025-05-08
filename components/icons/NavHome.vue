<template>
    
        <svg
            width="100%" height="100%"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg">
            <title>{{ $t('menu.back') }}</title>
            <circle cx="24" cy="24" r="12" />
        </svg>
</template>
<style scoped>

svg {
    /* fill: #fff; */
    /* stroke: #222; */
    mix-blend-mode: difference;
    transition: transform 150ms ease-out;
}

svg circle {
    stroke: var(--Colors-text-primary, #2C2C2C);
    fill: var(--Colors-text-primary, #2C2C2C);   
}
svg:hover {
  transform: scale(0.83);
}
</style>