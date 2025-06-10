<template>

    <div class="dialog fades"
        :data-theme="highContrastState? 'hc_dark': 'dark'"
        :class="{hidden:animate_io}">
        <header>
            <nav class="nav">
                <NuxtLink 
                    tabindex="0"
                    @keyup.enter="doClose()"
                    @click="doClose()"
                    class="nav_close">
                    <IconsNavHome/>
                </NuxtLink>
            </nav>
        </header>

        <div class="page_content">
            <!-- @click="$emit('onClose')"> -->
            <h1>Datenschutzerklärung</h1>
            <h3>
                Verantwortlich im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:
            </h3>
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
            
            <div class="row two-cols">
                <div class="col">
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
                </div>
                <div class="col">
                    <h3>Zuständige Aufsichtsbehörde</h3>
                    <p>
                        Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg<br>
                        Postfach 10 34 53<br>
                        70029 Stuttgart
                    </p>
                </div>
            </div>
            
            <h2>Abweichungen gegenüber der Datenschutzerklärung der Website der HfG Karlsruhe</h2>
            <p>
                Für diese Website gilt so weit nicht anders angegeben die Datenschutzerklärung der Website der HfG Karlsruhe: <a href="https://www.hfg-karlsruhe.de/datenschutz/" target="_blank" rel="noopener noreferrer">https://www.hfg-karlsruhe.de/datenschutz/</a>.
            </p>
            <p>
                Abweichungen ergeben sich in den folgenden Punkten:
            </p>
            <div class="row two-cols">            
                <div class="col">
                    <h3>Nutzungsanalyse mittels Matomo</h3>
                    <p>
                        Schaufenster nutzt Matomo, eine Freie Software zur statistischen Auswertung von Website-Besuchen.
                    </p>
                    <p>Matomo erfasst</p>
                    <ul>
                        <li>die Internetadresse des Besuchers in gekürzter Form,</li>
                        <li>Datum und Uhrzeit von Anfragen,</li>
                        <li>Titel der betrachteten Webseiten,</li>
                        <li>URLs der betrachteten Webseiten,</li>
                        <li>URLs der unmittelbar vorher betrachteten Webseite bei Verlinkungen,</li>
                        <li>die Bildschirmauflösung,</li>
                        <li>die lokale Zeitzone des Besuchers,</li>
                        <li>Downloadvorgänge von Dateien und Dokumenten,</li>
                        <li>Links auf andere Webangebote (Outlinks),</li>
                        <li>Lade- und Darstellungszeiten,</li>
                        <li>den Aufenthaltsort des Besuchers auf Basis der gekürzten Internetadresse und einer GeoIP-Datenbank,</li>
                        <li>die bevorzugte Sprache des Besuchers laut Browsereinstellung,</li>
                        <li>den genutzten Webbrowser.</li>
                    </ul>
                    <p>
                        Es werden keine Cookies oder sonstige Merkmale verwendet, die eine Identifizierung von Besuchern über mehrere Sitzungen hinweg ermöglichen würden. Zudem werden IP-Adressen während der Erfassung gekürzt, um eine eineindeutige Zuordenbarkeit zwischen Besuchern und Datensätzen zu erschweren. Werden Daten an Dritte weitergegeben, dann ausschließlich in anonymisierter und aggregierter Form.
                    </p>
                    <p>
                        Rechtsgrundlage für die Verarbeitung der personenbezogenen Daten der Nutzer ist <a href="https://www.bmj.de/SharedDocs/Downloads/DE/Themen/Nav_Themen/Amtsblatt_EU_DSGVO.pdf?__blob=publicationFile&v=3" target="_blank" rel="noopener noreferrer">Art. 6 Abs. 1 lit. f DSGVO.</a>
                    </p>
                    <p>
                        Die Verarbeitung der personenbezogenen Daten der Besucher ermöglicht uns eine Analyse des Nutzungsverhaltens. Wir sind durch die Auswertung der gewonnen Daten in der Lage, Informationen über die Nutzung der einzelnen Komponenten unserer Webseite zusammenzustellen. Dies hilft uns dabei, unsere Webseite und deren Nutzerfreundlichkeit stetig zu verbessern. In diesen Zwecken liegt auch unser berechtigtes Interesse in der Verarbeitung der Daten nach <a href="https://www.bmj.de/SharedDocs/Downloads/DE/Themen/Nav_Themen/Amtsblatt_EU_DSGVO.pdf?__blob=publicationFile&v=3" target="_blank" rel="noopener noreferrer">Art. 6 Abs. 1 lit. f DSGVO</a>.
                    </p>
                    <p>
                        Aufzeichnungen einzelner Seitenbesuche bzw. Navigationsverläufe werden nach 6 Monate gelöscht. Darüber hinaus werden ausschließlich aggregierte Daten vorgehalten, deren Personenbezug zweifelsfrei ausgeschlossen werden kann.
                    </p>
                </div>
                <div class="col">
                    <h3>Newsletterservice</h3>
                    <p>
                        Absatz V. Newsletter / Versand von Presseinformationen ist nicht gültig: Diese Website stellt keinen Newsletterservice bereit.
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
            
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['onClose'])
const highContrastState = useState('isHighContrast')
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