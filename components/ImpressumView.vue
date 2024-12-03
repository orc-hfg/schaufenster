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
            <!-- @click="$emit('onClose')"> -->
            <h1>Impressum</h1>
            <p>
                Staatliche Hochschule für Gestaltung Karlsruhe<br>
                Lorenzstr. 15<br>
                76135 Karlsruhe
            </p>
            <p>
                T +49 (0) 721 / 8203 0<br>
                F +49 (0) 721 / 8203 2159<br>
                &#x68;&#111;&#x63;&#x68;&#x73;&#99;&#x68;&#117;&#108;&#x65;&#64;&#x68;&#102;&#x67;&#x2d;&#x6b;&#97;&#x72;&#x6c;&#115;&#x72;&#117;&#104;&#x65;&#x2e;&#100;&#x65;<br>
                www.hfg-karlsruhe.de
            </p>
            <p>
                Die Staatliche Hochschule für Gestaltung Karlsruhe ist eine Körperschaft des Öffentlichen Rechts. In Rechts- und Verwaltungsangelegenheiten wird der Rektor durch den Kanzler Thomas Fröhlich vertreten.
            </p>
            <h3>Zuständige Aufsichtsbehörde</h3>
            <p>
                Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg<br>
                Postfach 10 34 53<br>
                70029 Stuttgart
            </p>
            <h3>Inhaltlich Verantwortlicher gemäß §55 RStV</h3>
            <p>
                Thomas Fröhlich, Kanzler
            </p>
            <h2>Urheberrechtshinweise</h2>
            <p>
                Die Inhalte dieser Website (Texte, Bilder, Ton- und Film-Dokumente etc.) sind urheberrechtlich geschützt. Die Vervielfältigung oder Verbreitung der auf dieser Seite bereit gestellten Informationen bedarf der vorherigen schriftlichen Genehmigung durch die Staatliche Hochschule für Gestaltung Karlsruhe. Ausnahmen sind Inhalte, für die eine Lizenz angegeben ist, dort gilt die entsprechende Lizenz.
            </p>
            <h2>Haftungsausschluss</h2>
            <p>
                Die Inhalte, die auf dieser Website gezeigt werden, wurden von Angehörigen der Hochschule für Gestaltung Karlsruhe erstellt und unterliegen der individuellen Verantwortung der jeweiligen Autoren. Eine redaktionelle Überarbeitung der Inhalte ist nicht vorgesehen. Eine Garantie für die Richtigkeit, Vollständigkeit und Aktualität der Angaben kann nicht übernommen werden. Eine Haftung durch die Staatlichen Hochschule für Gestaltung Karlsruhe wird folglich ausgeschlossen. Ebenfalls ausgeschlossen ist die Haftung für Links zu externen Websites. Für den Inhalt der verlinkten Webseiten sind ausschließlich die jeweiligen Anbieter*innen verantwortlich. 
            </p>
            <h2>Über diese Website</h2>
            <h4>Konzeption</h4>
            <p>
                Open Resource Center der HfG Karlsruhe mit Felix Plachtzik, Marcel Strauß und Alexander Liebrich, 2024.
            </p>
            <h4>Design</h4>
            <p><a href="https://www.pl80.cc/" target="_blank" rel="noopener noreferrer">Felix Plachtzik</a> und <a href="https://www.m--s.cc/" target="_blank" rel="noopener noreferrer">Marcel Strauß</a>.</p>
            <h4>Programmierung</h4>
            <p>Alexander Liebrich, Open Resource Center.</p>
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