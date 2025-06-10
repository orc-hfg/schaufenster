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
            </nav>
            <div class="wrapper_center">
                <div class="wrapper_dropdown">
                    <div class="hc_selector"
                    tabindex="0"
                    @click="changeContrast()"
                    >
                    <div class="hc_label">
                        {{ $t('static_pages.accessibility.label') }}
                    </div>
                </div>
            </div >
            
        </div>    
        </header>

        <div class="page_content">
            <!-- @click="doClose()"> -->
            
            <h2>Erklärung zur Barrierefreiheit </h2>
            <div class="row two-cols">
                <div class="col">
                    <p>
                        Die Staatliche Hochschule für Gestaltung Karlsruhe ist bemüht, ihre Website https://hfg-karlsruhe.de und weitere Onlineangebote, die über diese Domain erreichbar sind, in Einklang mit § 10 Absatz 1 des Landesbehindertengleichstellungsgesetzes (L-BGG) barrierefrei zugänglich zu gestalten.
                    </p>        
                </div>
                <div class="col">
                    <p>Diese Anwendung ist derzeit noch nicht vollständig mit § 10 Absatz 1 L-BGG vereinbar. Die Unvereinbarkeiten sind nachstehend aufgeführt. </p>
                    <p>Stand: Juni 2025</p>
                </div>
            </div>
            <div class="row two-cols">
                <div class="col">
                    <h3>
                        Nicht barrierefreie Inhalte        
                    </h3>
                    <p>
                        Die nachstehend aufgeführten Inhalte sind aus den folgenden Gründen nicht barrierefrei:
                    </p>
                        <!-- ↑ Nochmal prüfen ↑ -->
                    <ul>
                        <li>Die Alternativtexte beschreiben nicht immer den dargestellten Medieninhalt.</li>
                        <li>Einige visuell wahrnehmbare Überschriften sind nicht mit dem HTML-Strukturelement „Überschrift“ ausgezeichnet.</li>
                        <li>Die Lesbarkeit mancher Grafiken ist aufgrund geringer Kontrastverhältnisse nicht ausreichend. Für Sehbehinderte ist die Wahrnehmung in diesen Fällen erschwert.</li>
                        <li>Die Tastaturnavigation ist nur teilweise möglich. Der Tastaturfokus ist teilweise nicht deutlich hervorgehoben.</li>
                        <li>Manche Bedienelemente sind nicht ohne Maus nutzbar.</li>
                        <li>Nicht alle gleichlautenden Bereiche einer Seite sind eindeutig unterscheidbar. Nicht alle Bedienelemente sind mit ihrem Sinn und Zweck für Personen ohne visuelle Wahrnehmung verständlich.</li>
                        <li>Es wird keine Erläuterung in deutscher Gebärdensprache angeboten.</li>
                        <li>Es wird keine Erläuterung in leichter Sprache angeboten.</li>
                    </ul>
                </div>
                <div class="col">
                    <h3>
                        Rückmeldung und Kontaktangaben
                    </h3>
                    <p>
                        Wir möchten die Zugänglichkeit unserer Website für Menschen mit Behinderung kontinuierlich verbessern. Wenn Sie Barrieren auf unseren Webseiten melden wollen oder Informationen über die von § 10 Absatz 1 L-BGG ausgenommenen Inhalte einholen möchten, wenden Sie sich bitte per E-Mail oder Telefon an die zentrale Onlineredaktion:
                    </p>
                    <address>
                        Staatliche Hochschule für Gestaltung Karlsruhe<br/>
                        Presse- und Öffentlichkeitsarbeit<br/>
                        Lorenzstraße 15, 76135 Karlsruhe<br/>
                        Tel.: +49 (0) 721 / 8203 2313<br/>
                        E-Mail: &#x70;&#x72;&#x65;&#x73;&#x73;&#x65;&#x40;&#x68;&#x66;&#x67;&#x2d;&#x6b;&#x61;&#x72;&#x6c;&#x73;&#x72;&#x75;&#x68;&#x65;&#x2e;&#x64;&#x65;
                    </address>
                    <h3>
                        Schlichtungsverfahren
                    </h3>
                    <p>
                        Wenn Sie der Meinung sind, dass diese Webseite nicht barrierefrei zugänglich ist, wenden Sie sich bitte an die oben genannte Onlineredaktion.
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
                        E-Mail: &#x73;&#x63;&#x68;&#x6c;&#x69;&#x63;&#x68;&#x74;&#x75;&#x6e;&#x67;&#x40;&#x62;&#x61;&#x72;&#x72;&#x69;&#x65;&#x72;&#x65;&#x66;&#x72;&#x65;&#x69;&#x68;&#x65;&#x69;&#x74;&#x2e;&#x62;&#x77;&#x6c;&#x2e;&#x64;&#x65;<br/>
                        Webseite: https://barrierefreiheit-bw.de/
                    </address>
                    <p>
                        Das Schlichtungsverfahren ist unentgeltlich.
                    </p>
                    <p>
                        Auf die Möglichkeit des Verbandsklagerechts nach § 12 Absatz 1 Satz 1 Nummer 4 L-BGG wird hingewiesen.
                    </p>       
                </div>
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
    
    .wrapper_center {
    /* width: calc(100% - 48px); */
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);
}
[data-layout="mobile"] {
    .dropdown_label {
        display: none
    }
    .wrapper_center {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

.wrapper_dropdown {
    width: fit-content;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    justify-content: center;
}

.hc_selector {

    display: inline-flex;
    
    padding: var(--margin-navbar-institution-logo-right, 10px);
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);

    border-radius: var(--radius-full, 9999px);
    border: 1px solid var(--Colors-nav-bar-button-outline, #524F4F);
    background: #2C2C2C;


    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */

    color: var(--Colors-text-primary, #FFF);

    cursor: pointer;
}
.hc_label {
    
    color: var(--Colors-text-primary, #FFF);
    text-align: center;

    /* Buttons */
    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */
    padding-right: 5px;
    padding-left: 5px;
}
</style>