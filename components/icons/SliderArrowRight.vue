<template>
    <div class="slider_arrow_icon_right">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
        <title> {{$t('setview.btn_title_arrow_right')}}</title>
        <g>
            <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5839 28L31.9999 14.7471L31.9999 13.253L17.5838 1.1074e-05L16.1825 1.49412L28.6981 13L1.31134e-06 13L1.3131e-06 15L28.6982 15L16.1825 26.5059L17.5839 28Z"
                fill="var(--Colors-text-primary, #2C2C2C)"/>
        </g>
    </svg>
    </div>
</template>
<style scoped>
.slider_arrow_icon_right {
    display: flex;

    width: var(--dimension-icon-size-L, 32px);
    height: var(--dimension-icon-size-L, 32px);
    padding: var(--margin-navbar-institution-logo-right, 10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);
    filter: contrast(0);
}

.slider_arrow_icon_right svg {
    width: 32px;
    height: 28px;
    flex-shrink: 0;
}
/* .slider_arrow_icon_right svg g {

} */

/* .slider_arrow_icon_right svg g path { */
    /* mix-blend-mode: difference; */
    /* stroke: var(--Colors-text-primary, #2C2C2C) !important; */
    /* fill: var(--Colors-text-primary, #2C2C2C) !important; */
/* } */
</style>