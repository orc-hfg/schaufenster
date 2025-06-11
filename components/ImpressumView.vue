<template>

    <div class="dialog fades"
        :data-theme="highContrastState? 'hc_dark': 'dark'"
        :class="{hidden:animate_io}">
        <header>
            <nav class="nav">
                <NuxtLink 
                    tabindex="0"
                    @click="doClose()"
                    @keyup.enter="doClose()"
                    class="nav_close">
                    <IconsNavHome/>
                </NuxtLink>
            </nav>
        </header>

        <div class="page_content">
            <!-- @click="$emit('onClose')"> -->
            <h1>{{ $t('static_pages.imprint.title_1') }}</h1>
            <div class="row two-cols">
                <div class="col">
                    <p>
                        {{ $t('static_pages.imprint.p1_1') }}<br>
                        {{ $t('static_pages.imprint.p1_2') }}<br>
                        {{ $t('static_pages.imprint.p1_3') }}
                    </p>
                    <p>
                        Tel. +49 (0) 721 / 8203 0<br>
                        Fax +49 (0) 721 / 8203 2159<br>
                        &#x68;&#111;&#x63;&#x68;&#x73;&#99;&#x68;&#117;&#108;&#x65;&#64;&#x68;&#102;&#x67;&#x2d;&#x6b;&#97;&#x72;&#x6c;&#115;&#x72;&#117;&#104;&#x65;&#x2e;&#100;&#x65;<br>
                        www.hfg-karlsruhe.de
                    </p>
                    <p>
                        {{ $t('static_pages.imprint.p1_4') }}
                    </p>
                </div>
                <div class="col">                    
                    <h3>{{ $t('static_pages.imprint.title_2') }}</h3>
                    <p>
                        {{ $t('static_pages.imprint.p2_1') }}<br>
                        {{ $t('static_pages.imprint.p2_2') }}<br>
                        {{ $t('static_pages.imprint.p2_3') }}
                    </p>
                    <h3>{{ $t('static_pages.imprint.title_3') }}</h3>
                    <p>
                        {{ $t('static_pages.imprint.p3_1') }}
                    </p>
                </div>
            </div>
            <h2>{{ $t('static_pages.imprint.title_4') }}</h2>
            <p>
                {{ $t('static_pages.imprint.p4_1') }}
            </p>
            <h2>{{ $t('static_pages.imprint.title_5') }}</h2>
            <p>
                {{ $t('static_pages.imprint.p5_1') }}
            </p>

            <h2>{{ $t('static_pages.imprint.title_6') }}</h2>

            <h4>{{ $t('static_pages.imprint.title_7') }}</h4>
            <p>
                {{ $t('static_pages.imprint.p7_1') }}
            </p>                    
            <div class="row two-cols">
                <div class="col">
                    <h4>{{ $t('static_pages.imprint.title_8') }}</h4>
                    <p><a href="https://www.pl80.cc/" target="_blank" rel="noopener noreferrer">Felix Plachtzik</a>, <a href="https://www.m--s.cc/" target="_blank" rel="noopener noreferrer">Marcel Strauß</a></p>
                </div>
                <div class="col">
                    <h4>{{ $t('static_pages.imprint.title_9') }}</h4>
                    <p>Alexander Liebrich, Open Resource Center</p>
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