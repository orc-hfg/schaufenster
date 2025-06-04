<template>

    <div class="dialog fades" 
        :data-theme="highContrastState? 'hc_dark' : 'dark'"
        :class="{hidden:animate_io}">
        <header>
            <nav class="nav">
                <NuxtLink 
                    tabindex="0"
                    @keyup.enter="doClose()"
                    @click="doClose()" class="nav_close">
                    <IconsNavHome/>
                </NuxtLink>

                <NuxtLink  
                    tabindex="0"
                    @click="changeContrast()"
                    >
                    {{ $t('static_pages.accessibility.label') }}
                </NuxtLink >
            </nav>
        </header>

        <div class="page_content">
            <!-- @click="doClose()"> -->
            
              
               
            <h1>
                {{ $t('static_pages.accessibility.h1') }}  
            </h1>
            
            <h2>Erklärung zur Barrierefreiheit </h2>
            <p>
                Die Staatliche Hochschule für Gestaltung Karlsruhe ist bemüht, ihre Website <a href="https://hfg-karlsruhe.de" target="_blank" rel="noopener noreferre">https://hfg-karlsruhe.de</a> in Einklang mit § 10 Absatz 1 des Landesbehindertengleichstellungsgesetzes (L-BGG) barrierefrei zugänglich zu machen.
            </p>
            <p>
                <!-- nochmal dem Link -->
                Diese Erklärung zur Barrierefreiheit gilt für alle Seiten und Unterseiten des <a href="https://hfg-karlsruhe.de" target="_blank" rel="noopener noreferre">https://hfg-karlsruhe.de</a>
            </p>
            <h3>
                 1. Stand der Vereinbarkeit mit den Anforderungen
            </h3>
            <p>
                Diese mobile Anwendung ist derzeit noch nicht mit § 10 Absatz 1 L-BGG vereinbar. Die Unvereinbarkeiten sind nachstehend aufgeführt.
            </p>
            <h3>
                2. Nicht barrierefreie Inhalte        
            </h3>
            <p>
                Die nachstehend aufgeführten Inhalte sind aus den folgenden Gründen nicht barrierefrei (Unvereinbarkeit mit § 10 Absatz 1 L-BGG):
            </p>
                <!-- ↓ Nochmal prüfen ↑ -->
            <ul>
                <li>Die Alternativtexte beschreiben nicht den dargestellten Bildinhalt.</li>
                <li>Einige visuell wahrnehmbare Überschriften sind nicht mit dem</li> HTML-Strukturelement „Überschrift“ ausgezeichnet.
                <li>Die Lesbarkeit von Grafiken ist aufgrund geringer Kontrastverhältnisse</li> nicht ausreichend. Für Sehbehinderte ist die Wahrnehmung somit erschwert.
                <li>Der Tastaturfokus ist teilweise nicht deutlich hervorgehoben.</li>
                <li>Inhalte sind teilweise nicht ohne Maus nutzbar.</li>
                <li>Nicht alle gleichlautenden Bereiche der Seite sind unterscheidbar. Nicht</li> alle Bedienelemente sind mit ihrem Sinn und Zweck für Personen ohne visuelle Wahrnehmung verständlich.
                <li>Eine Tastaturnavigation ist nur teilweise möglich.</li>
                <li>Die verwendete Programmiersprache ist teilweise nicht korrekt eingesetzt.</li>
                <li>Es wird keine Erläuterung in deutscher Gebärdensprache angeboten.</li>
                <li>Es wird keine Erläuterung in leichter Sprache angeboten.</li>
            </ul>
            
            <h3>
                3. Erstellung dieser Erklärung zur Barrierefreiheit
            </h3>
            <p>Diese Erklärung wurde am 04.06.2025 erstellt.</p>
            <h3>
                4. Rückmeldung und Kontaktangaben
            </h3>
            <p>
                Wir möchten die Zugänglichkeit unserer Webseiten für Menschen mit Behinderung kontinuierlich verbessern. Wenn Sie Barrieren auf unseren Webseiten melden wollen oder Informationen über die von § 10 Absatz 1 L-BGG ausgenommenen Inhalte einholen möchten, wenden Sie sich bitte per E-Mail oder Telefon an die zentrale Onlineredaktion:
            </p>
            <address>
                Staatliche Hochschule für Gestaltung Karlsruhe<br/>
                Presse- und Öffentlichkeitsarbeit<br/>
                Lorenzstraße 15, 76135 Karlsruhe<br/>
                Tel.: +49 (0) 721 / 8203 2313<br/>
                E-Mail: <a href="mailto:&#112;&#114;&#101;&#115;&#115;&#101;&#64;&#104;&#102;&#103;&#45;&#107;&#97;&#114;&#108;&#115;&#114;&#117;&#104;&#101;&#46;&#100;&#101;">&#112;&#114;&#101;&#115;&#115;&#101;&#64;&#104;&#102;&#103;&#45;&#107;&#97;&#114;&#108;&#115;&#114;&#117;&#104;&#101;&#46;&#100;&#101;</a>
            </address>
            <h3>
                5. Schlichtungsverfahren
            </h3>
            <p>
                Wenn Sie der Meinung sind, dass diese Webseite nicht barrierefrei zugänglich ist, können Sie unsere unter 4. genannte zentrale Onlineredaktion darüber informieren.
            </p>
            <p>
                Falls wir Ihnen nicht oder nicht zufriedenstellend innerhalb von vier Wochen ab Zugang Ihrer Anfrage antworten, können Sie sich an die Schlichtungsstelle des Landeszentrums Barrierefreiheit (LZ-BARR) wenden. Die Schlichtungsstelle erreichen Sie wie folgt:
            </p>
        <address>
            Landeszentrum Barrierefreiheit<br/>
            Schlichtungsstelle <br/>
            Else-Josenhans-Straße 6<br/>
            70173 Stuttgart<br/>
            Telefon: 0711 123 39375<br/>
            <!-- https://v2.cryptii.com/text/htmlentities -->
            E-Mail: <a href="mailto:&#115;&#99;&#104;&#108;&#105;&#99;&#104;&#116;&#117;&#110;&#103;&#64;&#98;&#97;&#114;&#114;&#105;&#101;&#114;&#101;&#102;&#114;&#101;&#105;&#104;&#101;&#105;&#116;&#46;&#98;&#119;&#108;&#46;&#100;&#101;">
                &#115;&#99;&#104;&#108;&#105;&#99;&#104;&#116;&#117;&#110;&#103;&#64;&#98;&#97;&#114;&#114;&#105;&#101;&#114;&#101;&#102;&#114;&#101;&#105;&#104;&#101;&#105;&#116;&#46;&#98;&#119;&#108;&#46;&#100;&#101;</a><br/>
            Webseite: <a href="https://barrierefreiheit-bw.de/" target="_blank" rel="noopener noreferre">https://barrierefreiheit-bw.de/</a>
        </address>
        <p>
            Das Schlichtungsverfahren ist unentgeltlich.
        </p>
        <p>
            Auf die Möglichkeit des Verbandsklagerechts nach § 12 Absatz 1 Satz 1 Nummer 4 L-BGG wird hingewiesen.
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
const highContrastState = useState('isHighContrast')
/* Kann gelöscht werden */
const changeContrast = () => {
    
    highContrastState.value = !highContrastState.value
    if (highContrastState.value) {
        document.documentElement.setAttribute("data-theme", "hc_light");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
    
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