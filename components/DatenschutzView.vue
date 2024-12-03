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
            <h1>Datenschutzerklärung</h1>
            <p>
                Verantwortlich im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:
            </p>
            <p>
                Staatliche Hochschule für Gestaltung Karlsruhe<br>
                Lorenzstr. 15<br>
                76135 Karlsruhe<br>
                T +49 (0) 721 / 8203 0<br>
                F +49 (0) 721 / 8203 2159<br>
                www.hfg-karlsruhe.de
            </p>
            <p>
                Die Staatliche Hochschule für Gestaltung Karlsruhe ist eine Körperschaft des Öffentlichen Rechts. Sie wird durch ihren Kanzler Thomas Fröhlich gesetzlich vertreten.
            </p>
            <h3>Zuständige Aufsichtsbehörde</h3>
            <p>
                Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg<br>
                Postfach 10 34 53<br>
                70029 Stuttgart
            </p>
            <h3>Datenschutzbeauftragter</h3>
            <p>
                Florian Ultsch<br>
                Staatliche Hochschule für Gestaltung Karlsruhe<br>
                Lorenzstraße 15<br>
                76135 Karlsruhe, Deutschland<br>
                E-Mail: &#x66;&#117;&#108;&#x74;&#x73;&#x63;&#x68;&#64;&#x68;&#x66;&#x67;&#x2d;&#107;&#x61;&#x72;&#x6c;&#115;&#x72;&#x75;&#x68;&#101;&#x2e;&#100;&#x65;<br>
            </p>
            <p>
                Jede betroffene Person kann sich jederzeit bei allen Fragen und Anregungen zum Datenschutz direkt an unseren Datenschutzbeauftragten wenden.
            </p>
            <h2>Abweichungen gegenüber der Datenschutzerklärung der Website der HfG Karlsruhe</h2>
            <p>
                Für diese Website gilt so weit nicht anders angegeben die Datenschutzerklärung der Website der HfG Karlsruhe: <a href="https://www.hfg-karlsruhe.de/datenschutz/" target="_blank" rel="noopener noreferrer">https://www.hfg-karlsruhe.de/datenschutz/</a>.
            </p>
            <p>
                Abweichungen ergeben sich in den folgenden Punkten:
            </p>
            <h3>Newsletterservice</h3>
            <p>
                Absatz V. Newsletter / Versand von Presseinformationen ist nicht gültig: Diese Website stellt keinen Newsletterservice bereit.
            </p>
            <h3>Webanalyse</h3>
            <p>
                Absatz VI. Webanalyse durch AWStats ist nicht gültig: Diese Website erhebt keine Besucherstatistiken.
            </p>
            <h3>Dienste Dritter</h3>
            <p>
                In Abweichung zu Absatz VII. Dienste Dritter werden auf dieser Website keine Social Media Dienste oder Videoplattformen eingebunden. Es ist jedoch möglich, dass Links auf entsprechende Dienste von Drittanbietern verweisen. Beim Aufrufen dieser Links (Klick) werden personenbezogene Daten (IP-Adresse und ggf. weitere) durch den jeweiligen Dienstleister erhoben und ggf. gespeichert. Wir haben keinen Einfluss darauf, ob und wie Drittanbieter personenbezogene Daten speichern und nutzen.
            </p>
            <h3>Cookies</h3>
            <p>
                Zusätzlich zur Datenschutzerklärung der HfG Karlsruhe weisen wir darauf hin, dass beim Besuch dieser Website technisch notwendige Cookies gesetzt werden. Solche technisch notwendigen Cookies dienen etwa dazu, von Ihnen gesetzte Filter oder die gewählte Sprachversion der Website beizubehalten. In diesen Zwecken liegt unser berechtigtes Interesse in der Verarbeitung der personenbezogenen Daten nach Art. 6 Abs. 1 lit. f DSGVO. Es werden zu keinem Zeitpunkt  Nutzerprofile erstellt.
            </p>
            <p>
                Durch eine Änderung der Einstellungen in Ihrem Internetbrowser können Sie Cookies deaktivieren oder einschränken. Bereits gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für unsere Website deaktiviert, können nicht mehr alle Funktionen der Website vollumfänglich genutzt werden.
            </p>
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