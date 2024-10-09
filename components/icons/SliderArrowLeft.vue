<template>
    <div class="slider_arrow_icon_left">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
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
.slider_arrow_icon_left {
    display: flex;

    width: var(--dimension-icon-size-L, 32px);
    height: var(--dimension-icon-size-L, 32px);
    padding: var(--margin-navbar-institution-logo-right, 10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);
    color: var(--Colors-text-primary, #2C2C2C);
    filter: contrast(0);
}

.slider_arrow_icon_left svg {
    width: 32px;
    height: 28px;
    flex-shrink: 0;
}

/* .slider_arrow_icon svg_left g { */
    /* mix-blend-mode: difference;     */
    /* filter: saturate(1); */
/* } */
/* .slider_arrow_icon svg g path { */
    /* stroke: var(--Colors-text-primary, #2C2C2C) !important; */
    /* fill: var(--Colors-text-primary, #2C2C2C) !important; */
/* } */

</style>