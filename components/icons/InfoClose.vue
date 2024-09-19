<template>
    <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" 
            fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2.00015 0.585938L10.0002 8.58594L18.0002 0.585938L19.4144 2.00015L11.4144 10.0002L19.4144 18.0002L18.0002 19.4144L10.0002 11.4144L2.00015 19.4144L0.585938 18.0002L8.58594 10.0002L0.585938 2.00015L2.00015 0.585938Z"
             fill="white"/>
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
svg, path {
    stroke: var(--Colors-text-primary-inverted, #FFF);
    fill: var(--Colors-text-primary-inverted, #FFF);
}

</style>