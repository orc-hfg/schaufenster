<template>
    <div class="close_logo">
        <svg
            width="48" height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="12" />
        </svg>
    </div>
    
</template>
<style scoped>

svg {
    /* fill: #fff; */
    /* stroke: #222; */
    mix-blend-mode: difference;
}
svg circle {
    stroke: var(--Colors-text-primary, #2C2C2C);
    fill: var(--Colors-text-primary, #2C2C2C);   
}

.close_logo {
  transition: transform 150ms ease-out;
}
.close_logo:hover {
  transform: scale(0.83);
}
</style>