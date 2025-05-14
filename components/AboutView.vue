<template>

    <div class="dialog fades" data-theme="dark"
        :class="{hidden:animate_io}">
        <header>
            <nav class="nav">
                <NuxtLink @click="doClose()" class="nav_close">
                    <IconsNavHome/>
                </NuxtLink>
            </nav>
        </header>

        <div class="page_content">
            <!-- @click="doClose()"> -->
            <h1>
                Schaufenster präsentiert Projekte aus dem digitalen Archiv der Hochschule für Gestaltung Karlsruhe und gibt Einblick in die vielseitigen Produktionen und Arbeiten der Studierenden aller Studiengänge.
            </h1>
            <p>
                Alle Projekte können auch im Projektarchiv der HfG unter <a href="https://madek.hfg-karlsruhe.de" target="_blank" rel="noopener noreferre">https://madek.hfg-karlsruhe.de</a> eingesehen und detaillierter recherchiert werden. Alle Hochschulangehörigen können Projekte, für die Veröffentlichung auf Schaufenster vorschlagen – vorausgesetzt, sie haben die jeweiligen Projekte zuvor in der Projektarchiv-Datenbank angelegt. Einreichungen werden formell überprüft, um sicherzustellen, dass die notwendigen Metadaten eingetragen sind. Bei Abschlussarbeiten wird vor der langfristigen Archivierung abgefragt, ob eine Veröffentlichung auf Schaufenster gewünscht ist. 
            </p>
            <p>
                Kontakt für Einreichungen: <a href="mailto:&#115;&#99;&#104;&#97;&#117;&#102;&#101;&#110;&#115;&#116;&#101;&#114;&#64;&#104;&#102;&#103;&#45;&#107;&#97;&#114;&#108;&#115;&#114;&#117;&#104;&#101;&#46;&#100;&#101;">&#115;&#99;&#104;&#97;&#117;&#102;&#101;&#110;&#115;&#116;&#101;&#114;&#64;&#104;&#102;&#103;&#45;&#107;&#97;&#114;&#108;&#115;&#114;&#117;&#104;&#101;&#46;&#100;&#101;</a><br>
                Mehr Informationen zum Studium an der HfG: <a href="https://hfg-karlsruhe.de" target="_blank" rel="noopener noreferre">https://hfg-karlsruhe.de</a>
            </p>
            <h2>
                Das Typo-Feature
            </h2>
            <p>
                Schriftgestaltung hat an der HfG eine lange Tradition. Mit dem Typo Feature – den großen Titelschriften, deren Font zufällig wechselt, – geben wir Studierenden die Möglichkeit, ihre Kreationen auf Schaufenster zu präsentieren. Neue Einreichungen sind willkommen!
            </p>
            <h2>
                Über diese Website                 
            </h2>
            <p>
                Schaufenster wurde 2024/2025 vom Team des HfG Open Resource Center mit Unterstützung durch die Stiftung Innovation in der Hochschullehre und in Zusammenarbeit mit den Designern Marcel Strauß und Felix Plachtzik entwickelt.
                <!-- Der Quellcode kann auf GitHub eingesehen und weiter genutzt werden. -->
            </p>
            <h2>
                Das Open Resource Center der HfG 
            </h2>
            <div class="row">
                <div class="col">
                    <h4>Projektleiterin</h4>
                    <p>Dr. Barbara Kuon</p>
                    
                    <h4>Koordinatorin</h4>
                    <p>Dr. Katarina Schorb</p>
                    
                    <h4>Digital Archivists</h4>
                    <p>Hannes Herold<br>
                    Víctor Fancelli Capdevila</p>
                    
                </div>
                <div class="col">
                    <h4>Archival Curators</h4>
                    <p>Mustafa Emin Büyükcoskun<br>
                    Zulfikar Filandra</p>
                    
                    <h4>Softwareentwicker</h4>
                    <p>Alexander Liebrich</p>
                    
                    <h4>Kontakt</h4>
                    <p><a href="mailto:&#32;&#111;&#114;&#x63;&#x40;&#104;&#102;&#x67;&#x2d;&#x6b;&#x61;&#114;&#x6c;&#x73;&#x72;&#117;&#104;&#101;&#46;&#x64;&#101;">&#32;&#111;&#114;&#x63;&#x40;&#104;&#102;&#x67;&#x2d;&#x6b;&#x61;&#114;&#x6c;&#x73;&#x72;&#117;&#104;&#101;&#46;&#x64;&#101;</a></p>
                </div>
            </div>
            <div class="logos">
                <NuxtLink 
                to="https://hfg-karlsruhe.de/"
                target="_blank">
                    <LogosHfgReduced class="hfg-logo_reduced" />
                </NuxtLink>
                <NuxtLink
                to="https://hfg-karlsruhe.de/"
                target="_blank">
                    <LogosOrc class="orc-logo" />
                </NuxtLink>
                <NuxtLink
                to="https://stiftung-hochschullehre.de/"
                target="_blank">
                    <LogosSihl class="sihl-logo" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['onClose'])

const animate_io = ref(true)

// TODO use global config var
const ANIMATE_IN_MS = 150;
const ANIMATE_OUT_MS = 300;

const doClose = () => {
    animate_io.value = true
    setTimeout(() => {
        emit("onClose")
    }, ANIMATE_OUT_MS)
}

onMounted(() => {
    setTimeout(() => {
        animate_io.value = false
    }, ANIMATE_IN_MS)
})

</script>

<style scoped>
    @import 'assets/static-pages.css';
</style>