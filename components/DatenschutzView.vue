<template>

    <div class="dialog_ds" data-theme="dark">
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

        <div class="ds_panel"
            @click="$emit('onClose')">

            <div class="col_100">
                <h3 class="ds_h3">
                    Datenschutzhinweise
                </h3>
                <div class="ds_content">
                    Datenschutz Content.
                </div>
            </div>
<!--
            <div class="col_100">
                <h3 class="ds_h3">
                    Über das ORC-Projekt
                </h3>
                <div class="ds_content">
                    Das HfG Open Resource Center (ORC) ist eine zentrale Einrichtung zur Entwicklung und Verankerung einer nachhaltigen digitalen Infrastruktur für die Hochschule. Darüber hinaus arbeitet das ORC an der Verankerung einer Kultur des eigenverantwortlichen Dokumentierens und Archivierens an der HfG.
                </div>
            </div>
            <div class="col_100">
                <h3 class="ds_h3">
                    Über die Stiftung                    
                </h3>
                <div class="ds_content">
                    Text zur Stiftung lorem ipsum dolor sit amet consectetur. Facilisis est amet proin diam sed. Tempus proin egestas semper commodo proin id nisl. At est faucibus in pellentesque faucibus aenean. Lorem eleifend pellentesque morbi integer lobortis bibendum id massa. In ac arcu faucibus ac eget enim auctor dolor. Porttitor tellus amet sed quam tortor sociis neque faucibus. Semper nibh purus pellentesque dui. Integer ut malesuada suspendisse integer sit quam. Adipiscing neque venenatis ut in sapien. Interdum blandit fringilla eu consectetur. Venenatis dolor a et luctus dignissim turpis sit viverra id. Magna fermentum viverra eget amet ac metus sed eget. Est non nulla eleifend et sagittis faucibus diam. Ut nibh laoreet vel blandit auctor enim nunc nibh. Imperdiet nisl ut aliquam eu orci massa. Egestas dui sem aliquet magnis. Ut in rhoncus aliquam eleifend mattis scelerisque tincidunt id. Facilisis sed at tortor vitae ultricies praesent. Gravida pharetra tincidunt et consectetur in arc.
                </div>
            </div>

            <div class="row_100">
                <div class="col_50">
                    <div class="ds_list">
                        <div class="ds_list_title">
                            Projektleitung
                        </div>
                        <div class="ds_list_content_wrap">
                            <div class="ds_list_content">
                                Dr. Barbara Kuon
                            </div>
                            <div class="ds_list_content_link">
                                bkuon(at)hfg-karlsruhe.de
                            </div>
                        </div>
                    </div>
                    

                    <div class="ds_list">
                        <div class="ds_list_title">
                            Koordination
                        </div>
                        
                        <div class="ds_list_content_wrap">
                            <div class="ds_list_content">
                                Dr. Katarina Schorb
                            </div>
                            <div class="ds_list_content_link">
                                kschorb(at)hfg-karlsruhe.de
                            </div>
                        </div>
                    </div>
                    <div class="ds_list">
                        <div class="ds_list_title">
                        Digital Archivists
                        </div>
                        <div class="ds_list_content_wrap2">
                            <div class="ds_list_content_wrap">
                                <div class="ds_list_content">
                                    Hannes Herold 
                                </div>
                                <div class="ds_list_content_link">
                                    hherold(at)hfg-karlsruhe.de
                                </div>
                            </div>
                            <div class="ds_list_content_wrap">
                                <div class="ds_list_content">
                                    Víctor Fancelli Capdevila 
                                </div>
                                <div class="ds_list_content_link">
                                    vfcapdevila(at)hfg-karlsruhe.de
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ds_list">
                        <div class="ds_list_title">
                        Archival Curators
                        </div>
                        <div class="ds_list_content_wrap2">
                            <div class="ds_list_content_wrap">
                                <div class="ds_list_content">
                                    Hannes Herold 
                                </div>
                                <div class="ds_list_content_link">
                                    hherold(at)hfg-karlsruhe.de
                                </div>
                            </div>
                            <div class="ds_list_content_wrap">
                                <div class="ds_list_content">
                                    Víctor Fancelli Capdevila 
                                </div>
                                <div class="ds_list_content_link">
                                    vfcapdevila(at)hfg-karlsruhe.de
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col_50">
                    <div class="ds_list">
                        <div class="ds_list_title">
                        Mail
                        </div>
                        <div class="ds_list_content">
                            Dr. Barbara Kuon
                        </div>
                        <div class="ds_list_content_link">
                            bkuon(at)hfg-karlsruhe.de
                        </div>
                    </div>
                    <div class="ds_list">
                        <div class="ds_list_title">
                            Links zu Madek
                        </div>
                        
                        <div class="ds_list_content_link">
                            HfG Handbuch
                        </div>
                        <div class="ds_list_content_link">
                            HfG Handbuch
                        </div>
                        <div class="ds_list_content_link">
                            HfG Handbuch
                        </div>
                        <div class="ds_list_content_link">
                            HfG Handbuch
                        </div>
                        <div class="ds_list_content_link">
                            HfG Handbuch
                        </div>
                        <div class="ds_list_content_link">
                            HfG Handbuch
                        </div>
                    </div>
                </div>
            </div>
            -->
            <br/>
            <br/>
            <br/>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['onClose'])
//TODO content
</script>
<style scoped>
.dialog_ds {
    position: fixed;
    top: 0px; left: 0px;
    width: calc(100vw + 20px); /*move scroller */
    height: 100vh;
    z-index: 1150;
    background-color: var(--Colors-background-default,#2C2C2C);
    color: var(--Colors-text-primary, #FFFFFF);
    overflow-y: auto;
    /* scrollbar-width: 0; */
    /* scrollbar-color: rgba(255,255,255,0.0); */
}
.ds_panel {
    position: absolute;
    left: 23%;
    right: 23%;
    top: 12%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--padding-container-bottom-XL, 112px);
    align-self: stretch;
}


.nav_close {
    height: 48px;
    padding: 0;
    cursor: pointer;
    user-select: none
}
.close_logo {
    float: left;
    padding: 0;
    height: 48px;
    transition: transform 300ms ease-out;
}
.close_logo:hover {
    transform: scale(0.83);
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
.ds_content {
    color: var(--text-primary, #FFF);
    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}
.row_100 {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
    gap: var(--padding-container-vertical-M, 32px);
}
.col_50 {
    width: 50%;
    min-width: 420px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--padding-container-bottom-M, 32px);
    flex: 1 0 0;
}

.ds_list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
}
.ds_list_title {
    color: var(--Colors-text-secondary, #CAC9C2);

    display: flex;
    align-items: flex-start;
    gap: 12px;

    /* Subline */
    font-family: "Instrument Sans";
    font-size: var(--font-subline-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-subline-line-height, 24px); /* 120% */
}

.ds_list_content_wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* gap: 12px; */
    gap:0px;
    align-self: stretch;
}
.ds_list_content_wrap2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}
.ds_list_content {
    color: var(--Colors-text-primary, #FFF);

    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}
.ds_list_content_link {
    color: var(--Colors-text-primary, #FFF);

    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px);
    text-decoration-line: underline;
}

@media screen and (max-width: 1280px) {
    .row_100 {
        flex-direction: column;
        
    }
}
</style>