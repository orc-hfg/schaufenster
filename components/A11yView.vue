<template>

    <div class="dialog fades" 
        :data-theme="highContrastState? 'hc_dark' : 'dark'"
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
            <div class="wrapper_center">
                <div class="wrapper_dropdown">
                    <div class="hc_selector"
                    tabindex="0"
                    @keyup.enter="changeContrast()"
                    @click="changeContrast()"
                    >
                     <IconsHighContrast/>
                    </div>
                </div > 
            </div>    
        </header>

        <div class="page_content">
            <!-- @click="doClose()"> -->
            
            <h2>{{ $t('static_pages.a11y.title_1') }}</h2>
            <div class="row two-cols">
                <div class="col">
                    <p>
                        {{ $t('static_pages.a11y.p1_1') }}
                    </p>        
                </div>
                <div class="col">
                    <p>{{ $t('static_pages.a11y.p1_2') }}</p>
                    <p>{{ $t('static_pages.a11y.p1_3') }}</p>
                </div>
            </div>
            <div class="row two-cols">
                <div class="col">
                    <h3>
                        {{ $t('static_pages.a11y.title_2') }}        
                    </h3>
                    <p>
                        {{ $t('static_pages.a11y.p2_1') }}
                    </p>
                        <!-- ↑ Nochmal prüfen ↑ -->
                    <ul>
                        <li>{{ $t('static_pages.a11y.p2_2') }}</li>
                        <li>{{ $t('static_pages.a11y.p2_3') }}</li>
                        <li>{{ $t('static_pages.a11y.p2_4') }}</li>
                        <li>{{ $t('static_pages.a11y.p2_5') }}</li>
                        <li>{{ $t('static_pages.a11y.p2_6') }}</li>
                        <li>{{ $t('static_pages.a11y.p2_7') }}</li>
                        <li>{{ $t('static_pages.a11y.p2_8') }}</li>
                    </ul>
                </div>
                <div class="col">
                    <h3>
                        {{ $t('static_pages.a11y.title_3') }}
                    </h3>
                    <p>
                        {{ $t('static_pages.a11y.p3_1') }}
                    </p>
                    <address>
                        {{ $t('static_pages.a11y.p3_2') }}<br/>
                        {{ $t('static_pages.a11y.p3_3') }}<br/>
                        {{ $t('static_pages.a11y.p3_4') }}<br/>
                        Tel.: +49 (0) 721 / 8203 2313<br/>
                        E-Mail: &#x70;&#x72;&#x65;&#x73;&#x73;&#x65;&#x40;&#x68;&#x66;&#x67;&#x2d;&#x6b;&#x61;&#x72;&#x6c;&#x73;&#x72;&#x75;&#x68;&#x65;&#x2e;&#x64;&#x65;
                    </address>
                    <h3>
                        {{ $t('static_pages.a11y.title_4') }}
                    </h3>
                    <p>
                        {{ $t('static_pages.a11y.p4_1') }}
                    </p>
                    <address>
                        {{ $t('static_pages.a11y.p4_2') }}<br/>
                        {{ $t('static_pages.a11y.p4_3') }} <br/>
                        {{ $t('static_pages.a11y.p4_4') }}<br/>
                        {{ $t('static_pages.a11y.p4_5') }}<br/>
                        Tel.: 0711 123 39375<br/>
                        E-Mail: &#x73;&#x63;&#x68;&#x6c;&#x69;&#x63;&#x68;&#x74;&#x75;&#x6e;&#x67;&#x40;&#x62;&#x61;&#x72;&#x72;&#x69;&#x65;&#x72;&#x65;&#x66;&#x72;&#x65;&#x69;&#x68;&#x65;&#x69;&#x74;&#x2e;&#x62;&#x77;&#x6c;&#x2e;&#x64;&#x65;<br/>
                        https://barrierefreiheit-bw.de/
                    </address>
                    <p>
                        {{ $t('static_pages.a11y.p4_6') }}
                    </p>
                    <p>
                        {{ $t('static_pages.a11y.p4_7') }}
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
    justify-content: right;
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