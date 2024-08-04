<template>

    <div class="dialog_about" >
        <header>
            <nav class="nav">
                <NuxtLink @click="$emit('onClose')" class="nav_close">
                    <IconsNavHome class="close_logo"/>
                    <div class="close_content">
                        zurück
                    </div>
                </NuxtLink>
            </nav>
        </header>

        <!-- data-theme="dark" -->
        <div class="about_panel"
            @click="$emit('onClose')">

            <div class="col_100">
                <h3 class="about_h3">
                    Diese „Schaufenster-Seite“ lorem ipsum dolor sit amet consectetur. Facilisis est amet proin diam sed. Tempus proin egestas semper commodo proin id nisl.
                </h3>
                <div class="about_content">
                    Text zur Schaufenster-Seite lorem ipsum dolor sit amet consectetur. Facilisis est amet proin diam sed. Tempus proin egestas semper commodo proin id nisl. At est faucibus in pellentesque faucibus aenean. Lorem eleifend pellentesque morbi integer lobortis bibendum id massa. In ac arcu faucibus ac eget enim auctor dolor. Porttitor tellus amet sed quam tortor sociis neque faucibus. Semper nibh purus pellentesque dui. Integer ut malesuada suspendisse integer sit quam. Adipiscing neque venenatis ut in sapien. Interdum blandit fringilla eu consectetur. Venenatis dolor a et luctus dignissim turpis sit viverra id. Magna fermentum viverra eget amet ac metus sed eget. Est non nulla eleifend et sagittis faucibus diam. Ut nibh laoreet vel blandit auctor enim nunc nibh. Imperdiet nisl ut aliquam eu orci massa. Egestas dui sem aliquet magnis. Ut in rhoncus aliquam eleifend mattis scelerisque tincidunt id. Facilisis sed at tortor vitae ultricies praesent. Gravida pharetra tincidunt et consectetur in arc.
                </div>
            </div>
            <div class="col_100">
                <h3 class="about_h3">
                    Über das ORC-Projekt
                </h3>
                <div class="about_content">
                    Das HfG Open Resource Center (ORC) ist eine zentrale Einrichtung zur Entwicklung und Verankerung einer nachhaltigen digitalen Infrastruktur für die Hochschule. Darüber hinaus arbeitet das ORC an der Verankerung einer Kultur des eigenverantwortlichen Dokumentierens und Archivierens an der HfG.
                </div>
            </div>
            <div class="col_70">
                <h3 class="about_h3">
                    Über die Stiftung                    
                </h3>
                <div class="about_content">
                    Text zur Stiftung lorem ipsum dolor sit amet consectetur. Facilisis est amet proin diam sed. Tempus proin egestas semper commodo proin id nisl. At est faucibus in pellentesque faucibus aenean. Lorem eleifend pellentesque morbi integer lobortis bibendum id massa. In ac arcu faucibus ac eget enim auctor dolor. Porttitor tellus amet sed quam tortor sociis neque faucibus. Semper nibh purus pellentesque dui. Integer ut malesuada suspendisse integer sit quam. Adipiscing neque venenatis ut in sapien. Interdum blandit fringilla eu consectetur. Venenatis dolor a et luctus dignissim turpis sit viverra id. Magna fermentum viverra eget amet ac metus sed eget. Est non nulla eleifend et sagittis faucibus diam. Ut nibh laoreet vel blandit auctor enim nunc nibh. Imperdiet nisl ut aliquam eu orci massa. Egestas dui sem aliquet magnis. Ut in rhoncus aliquam eleifend mattis scelerisque tincidunt id. Facilisis sed at tortor vitae ultricies praesent. Gravida pharetra tincidunt et consectetur in arc.
                </div>
            </div>

            <div>
                <div class="col_50">
                    <div class="subline">
                        Projektleitung
                    </div>

                    <div class="subline">
                        Koordination
                    </div>
                    <div class="subline">
                        Digital Archivists
                    </div>
                    <div class="subline">
                        Archival Curators
                    </div>
                </div>
                <div class="col_50">
                    <div class="subline">
                        Mail
                    </div>
                    <div class="subline">
                        Links zu Madek
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['onClose'])
</script>
<style scoped>
.dialog_about {
    position: fixed;
    top: 0px; left: 0px;
    width: 103vw;
    height: 100vh;
    z-index: 1150;
    background-color: var(--Colors-background-menu);
    color: var(--Colors-text-primary-inverted);
    overflow-y: auto;
}
.about_panel {
    position: absolute;
    left: 23%;
    right: 23%;
    top: 12%;
    /* bottom: 2rem; */
    
    /* overflow-y: auto; */
    display: flex;

    flex-direction: column;
    align-items: center;
    gap: var(--spacing-between-menu-items, 20px);
    flex-shrink: 0;
}
.nav_close {
    /* float: left; */
    /* border: 1px solid #fff; */
    height: 48px;
    padding: 0;
}

.close_logo {
    float: left;
    padding: 0;
    /* border: 1px solid #fff; */
    height: 48px

}
.close_content {
    position: relative;
    float: left;
    height: 24px;
    padding: 12px;
}
.close_logo * {
    stroke: none;
    fill: var(--text-primary, #FFF) !important;
 }

h3 {
    color: var(--text-primary, #FFF);

    /* h3 */
    font-family: "Instrument Sans";
    font-size: var(--font-h3-font-size, 48px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-h3-line-height, 60px); /* 125% */
}
.about_content {
    color: var(--text-primary, #FFF);
    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}
.col_50 {
    position: relative;
    float: left;
    width: 50%;
}

.subline {
    color: var(--text-secondary, #CAC9C2);

    /* Subline */
    font-family: "Instrument Sans";
    font-size: var(--font-subline-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-subline-line-height, 24px); /* 120% */
}
.link {
    color: var(--text-primary, #FFF);
    font-family: "Instrument Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
}
</style>