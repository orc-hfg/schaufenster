<template>

    <div class="dialog_menu"
        :class="{hidden: animate_io}">
        <header>
            <nav class="nav">
                <NuxtLink tabindex="0" @click="closeMenu()" class="logo">
                    <IconsNavHome/>
                </NuxtLink>
            </nav>
        </header>

        <div class="menu_panel"
            tabindex="0"
            @click="closeMenu()"

            :style="font_style">
           
            <div class="lang_switch">
                <span class="btn"
                    @click="switchLocale('de')"
                    :class="{disabled: locale.indexOf('de') < 0}"
                    >
                    {{ $t('menu.label_de')}}
                </span>
                
                <span class="btn"
                    tabindex="0"
                    @click="switchLocale('en')"
                    :class="{disabled: locale.indexOf('en') < 0}"
                    >
                    {{ $t('menu.label_en')}}
                </span>
            </div>
            <div class="btn"
                tabindex="0"
                @click="$emit('onShowAbout')">
                {{ $t('menu.about')}}
            </div>
            <div class="btn"
                tabindex="0"
                @click="$emit('onShowFonts')">
                {{ $t('menu.fonts')}}
            </div>
            <div class="btn"
                tabindex="0"
                @click="$emit('onShowDSA')">
                {{ $t('menu.dsa')}}
            </div>
            <div class="btn"
                tabindex="0"
                @click="$emit('onShowImpressum')">
                {{ $t('menu.impressum')}}
            </div>
            
        </div>
    
  </div>
</template>
<script setup lang="ts">


const DELAY_ANIMATE_OUT = 500;

const {
    MATCH_DIPLOM
} = treeHelper()

const {
    locale,
    defaultLocale,
    setLocale
} = useI18n()

const {
    getPixelSizedStyle,
    getViewSizedStyle,
    mergeSetTypeColor,
} = DynFonts()

//TODO close menu on click beside text

const emit = defineEmits([
    'onShowAbout',
    'onShowFonts',
    'onShowDSA',
    'onShowImpressum',
    'onCloseMenu',
    'onSwitchLang'
])
    
const props = defineProps(['settype'])
const font_style = ref({})
const animate_io = ref(true)

const switchLocale = (loc: string) => {
    emit('onSwitchLang', loc)
    console.log("switchLocale: " + loc + ":" + locale.value)
}
const closeMenu = () => {
    animate_io.value = true
    setTimeout(() => {
        emit('onCloseMenu')
    }, DELAY_ANIMATE_OUT)
    
}

const init = () => {
    console.log("init menu: " + props.settype)
    let vw = 18
    if (window && window.innerWidth) {
        const iw = window.innerWidth
        if (iw < 768) vw = 12
        else if (iw < 1280) vw = 14
        else if (iw > 2048) vw = 22
    }    
    const fs = getViewSizedStyle(vw,16)
    font_style.value = mergeSetTypeColor(props.settype, fs)
    console.log("font after")
    console.dir(font_style.value)
}

onMounted(() => {
    console.log("mounted menu: " + props.settype)
    setTimeout(() => {
        animate_io.value = false;
    }, 300)
    
})

init()

</script>
<style scoped>
header {
    z-index: 1100;
    /* background-color: var(--Colors-background-default); */
    padding: 12px 12px;
    height: 50px;

}
.logo {
    padding: 0;
    border: 1px solid transparent;
    height: 48px;
    width: 48px;
}
svg {
    mix-blend-mode: normal;
}

.dialog_menu {
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    opacity: 1;
    backdrop-filter: blur(30px);
    
}

.menu_panel {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    
    z-index: 1020;
    filter: none;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-between-menu-items);
    flex-shrink: 0;
    opacity: 1;
    transition: all 300ms ease-out;
}
.hidden {
    transition: all 300ms ease-out;
}

.hidden .dialog_menu {
    opacity: 0;    
    backdrop-filter: blur(0px);
    transition: all 900ms ease-out;
}

.hidden header {
    opacity: 0;
    transform: translateY(0vh);
    background-color: transparent;
    transition: all 300ms ease-out;
}
.hidden svg circle {
    opacity: 0;
    transition: all 300ms ease-out;
}

.hidden .menu_panel {
    opacity: 0;
    transform: translateY(10vh);
    /* top: 50vh; */
    transition: all 300ms ease-out;
}
.menu_panel * {
    align-items: center;
    text-align: center;
}

.lang_switch {
    display: flex;
    gap: 40px;
}
.menu_panel .btn {
    /* color: var(--text-headlines, #FF4D00); */
    /* h1 */
    /* font-size: var(--font-h1-font-size, 240px); */
    font-style: normal;
    font-weight: 400;
    font-stretch: 0.2px;
    /* line-height: var(--font-h1-line-height, 210px);  */
}


[data-layout="mobile"] {
    .dialog_menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .menu_panel {
        position: relative;
        justify-content: space-between;
        height: auto;
        gap: 0;
    }
    @media (orientation: portrait) {
        .menu_panel .btn {
            font-size: 14vw;
            line-height: 1.3em;
        }
    }
    @media (orientation: landscape) {
        .menu_panel .btn {
            font-size: 13vh;
            line-height: 1.3em;
        }
    }
}


</style>