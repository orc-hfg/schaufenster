<template>
    <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none">
        <path d="M0.719344 23.5205V7.20047H3.27934V23.5205H0.719344ZM0.527344 3.48847V0.480469H3.47134V3.48847H0.527344Z" fill="white"/>
        </svg>
    </div>
</template>
<style scoped>
.icon {
    display: flex;
    width: var(--dimension-icon-size-L, 32px);
    height: var(--dimension-icon-size-L, 32px);
    padding: var(--margin-navbar-institution-logo-right, 8px);
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);
    flex-shrink: 0;
    
}
svg {
    
    /* stroke: var(--Colors-text-primary-inverted, #FFF);; */
    fill: var(--Colors-text-primary, #FFF);
}
path {
    /* background-color: #000 ; */
    stroke: var(--Colors-text-primary, #FFF);
    fill: var(--Colors-text-primary, #FFF);
}
</style>