<template>

    <div class="dialog_menu"
        :class="{hidden: animate_io}">
        <header>
            <nav class="nav">
                <NuxtLink @click="closeMenu()" class="logo">
                    <IconsNavHome/>
                    <!-- <svg
                        width="48" height="48"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="12"/>
                    </svg> -->
                </NuxtLink>
            </nav>
        </header>

        <div class="menu_panel"
            
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
                    @click="switchLocale('en')"
                    :class="{disabled: locale.indexOf('en') < 0}"
                    >
                    {{ $t('menu.label_en')}}
                </span>
            </div>
            <div class="btn"
                @click="$emit('onShowAbout')">
                {{ $t('menu.about')}}
            </div>
            <div class="btn"
                @click="$emit('onShowFonts')">
                {{ $t('menu.fonts')}}
            </div>
            <div class="btn"
                @click="$emit('onShowDSA')">
                {{ $t('menu.dsa')}}
            </div>
            <div class="btn"
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
    setLocale(loc)
    console.log("switchLocale: " + loc + ":" + locale.value)
    //locale.value = loc
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
    background-color: var(--Colors-background-default);
    padding: 12px 12px;
    height: 50px;
}
.logo {
    padding: 0;
    border: 1px solid transparent;
    height: 48px;
}
svg {
    mix-blend-mode: normal;
}
/* svg circle {
    stroke: var(--Colors-text-primary, #2C2C2C);
    fill: var(--Colors-text-primary, #2C2C2C);   
} */

.dialog_menu {
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    opacity: 1;
    /* transition: all 300ms ease-out; */
    /* color: var(--Colors-text-primary-inverted, #000); */
    /* background-color: var(--Colors-background-menu, #fff); */
}

.menu_panel {
    /* border: 3px solid red; */
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    
    
    z-index: 1020;
    filter: none;

    display: flex;
    padding-top: 96px;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-between-menu-items, 20px);
    flex-shrink: 0;
    opacity: 1;
    transition: all 300ms ease-out;
}
.hidden {
    /* opacity: 0; */
    transition: all 300ms ease-out;
    /* display: none; */
}

.hidden header {
    opacity: 0;
    transform: translateY(0vh);
    background-color: transparent;
    transition: all 300ms ease-out;
}
.hidden .menu_panel {
    opacity: 0;
    transform: translateY(10vh);
    /* top: 50vh; */
    transition: all 300ms ease-out;
}
.hidden svg circle {
    opacity: 0;
    transition: all 300ms ease-out;
}
.menu_panel * {
    align-items: center;
    text-align: center;  
    /* font-size: 80px; */
    /* color: var(--Colors-text-primary, #222); */
    /* background: var(--Ultra-Light-Grey, #F3F2EF); */
    /* background-color: var(--Colors-background-menu2, rgba(255,255,255, 0.3)); */
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
/* no hover in menu */
/* .menu_panel .btn:hover {} */


</style>