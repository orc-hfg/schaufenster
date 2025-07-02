<template>

    <div class="dialog fades" 
        :data-theme="highContrastState? 'hc_dark': 'dark'"
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
        </header>

        <div class="page_content">
            <!-- @click="doClose()"> -->
            <h1>
                {{ kioskConfig?.infoH1 || $t('static_pages.kiosk_about.title1') }}
            </h1>
            <p>
                {{ kioskConfig?.infoP1 || $t('static_pages.kiosk_about.p1') }}
            </p>
            <!-- <p>
                {{ $t('static_pages.kiosk_about.contact') }}<a href="mailto:&#115;&#99;&#104;&#97;&#117;&#102;&#101;&#110;&#115;&#116;&#101;&#114;&#64;&#104;&#102;&#103;&#45;&#107;&#97;&#114;&#108;&#115;&#114;&#117;&#104;&#101;&#46;&#100;&#101;">&#115;&#99;&#104;&#97;&#117;&#102;&#101;&#110;&#115;&#116;&#101;&#114;&#64;&#104;&#102;&#103;&#45;&#107;&#97;&#114;&#108;&#115;&#114;&#117;&#104;&#101;&#46;&#100;&#101;</a><br>
                {{ $t('static_pages.kiosk_about.more_info') }}<a href="https://hfg-karlsruhe.de" target="_blank" rel="noopener noreferre">https://hfg-karlsruhe.de</a>
            </p> -->
            <div class="row two-cols">
                <div class="col">
                    <h2>{{ kioskConfig?.infoH2 || $t('static_pages.kiosk_about.title2') }}</h2>
                    <p>{{ kioskConfig?.infoP2 || $t('static_pages.kiosk_about.p2_1') }}</p>
                </div>
                <div class="col">
                    <h2>{{ kioskConfig?.infoH3 || $t('static_pages.kiosk_about.title3') }}</h2>
                    <p>{{ kioskConfig?.infoP3 || $t('static_pages.kiosk_about.p3_1') }}</p>
                </div>
            </div>
            
            <h2>
                 {{ $t('static_pages.kiosk_about.title4') }}
            </h2>
            <div class="row two-cols">
                <div class="col">
                    <h4>{{ $t('static_pages.kiosk_about.role1') }}</h4>
                    <p>Dr. Barbara Kuon</p>
                    
                    <h4>{{ $t('static_pages.kiosk_about.role2') }}</h4>
                    <p>Dr. Katarina Schorb</p>
                    
                    <h4>{{ $t('static_pages.kiosk_about.role3') }}</h4>
                    <p>Hannes Herold<br>
                    Víctor Fancelli Capdevila</p>
                    
                </div>
                <div class="col">
                    <h4>{{ $t('static_pages.kiosk_about.role4') }}</h4>
                    <p>Mustafa Emin Büyükcoskun<br>
                    Zulfikar Filandra</p>
                    
                    <h4>{{ $t('static_pages.kiosk_about.role5') }}</h4>
                    <p>Alexander Liebrich</p>
                    
                    <h4>{{ $t('static_pages.kiosk_about.contact') }}</h4>
                    <p><a href="mailto:&#32;&#111;&#114;&#x63;&#x40;&#104;&#102;&#x67;&#x2d;&#x6b;&#x61;&#114;&#x6c;&#x73;&#x72;&#117;&#104;&#101;&#46;&#x64;&#101;">&#32;&#111;&#114;&#x63;&#x40;&#104;&#102;&#x67;&#x2d;&#x6b;&#x61;&#114;&#x6c;&#x73;&#x72;&#117;&#104;&#101;&#46;&#x64;&#101;</a></p>
                </div>
            </div>
            <!-- Links?
             <h2>Further information on the project archive</h2>
                Projektarchiv
                HfG Handbuch -->
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

const kioskConfig = ref({})
onMounted(() => {
    setTimeout(() => {
        animate_io.value = false
    }, ANIMATE_IN_MS)
    kioskConfig.value = useRuntimeConfig().public.kiosk;
    console.error("kiosk info " + JSON.stringify(kioskConfig.value))
})

</script>

<style scoped>
    @import 'assets/static-pages.css';
</style>