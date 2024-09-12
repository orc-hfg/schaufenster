<template>
    <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
        <!-- <g style="mix-blend-mode:difference"> -->
        <g>
            <path fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M3.43461 15.0195L16.3492 26.5059L14.9007 28L0 14.7471L1.26878e-07 13.2529L14.9007 0L16.3492 1.4941L3.43461 12.9805H18.2279H32V15.0195L3.43461 15.0195Z" 
                fill="var(--Colors-text-primary, #2C2C2C)"/>
        </g>
    </svg>
    </div>
</template>
<style scoped>
.icon {
    display: flex;
width: var(--dimension-icon-size-L, 32px);
height: var(--dimension-icon-size-L, 32px);
padding: var(--margin-navbar-institution-logo-right, 10px);
flex-direction: column;
justify-content: center;
align-items: center;
gap: var(--margin-navbar-institution-logo-right, 10px);
}
svg {
    width: 32px;
    height: 28px;
    flex-shrink: 0;
}
svg,
svg g, svg g path {
    /* mix-blend-mode: difference; */
    stroke-width: 2px;
    stroke: var(--Colors-text-primary, #2C2C2C) !important;
    fill: var(--Colors-text-primary, #2C2C2C) !important;
}

</style>