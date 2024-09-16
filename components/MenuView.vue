<template>

    <div class="dialog_menu" >
        <header>
            <nav class="nav">
                <NuxtLink @click="$emit('onCloseMenu')" class="logo">
                    <IconsNavIconORC />
                </NuxtLink>
            </nav>
        </header>

        <!-- data-theme="dark" -->
        <div class="menu_panel"
            @click="$emit('onCloseMenu')"
            :style="font_style">
           
            <div>
                <span class="btn"
                    @click="switchLocale('de')"
                    :class="{disabled: locale.indexOf('de') < 0}"
                    >
                    {{ $t('menu.label_de')}}
                </span>
                &nbsp;
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
            

            <div>
            <NuxtLink to="/">Intro</NuxtLink>
            </div>
            <br/>
            
            <br/>
            <br/>
            
        </div>
    
  </div>
</template>
<script setup lang="ts">
const {
    MATCH_DIPLOM
} = treeHelper()
const {
    getPixelSizedStyle,
    getViewSizedStyle,
    mergeSetTypeColor,
} = DynFonts()

//TODO close menu on click beside text

const emit = defineEmits([
    'onShowAbout','onShowFonts', 'onShowDSA', 'onShowImpressum', 'onCloseMenu'])
    
const props = defineProps(['settype'])

const font_style = ref({})
const {
    locale,
    defaultLocale,
setLocale
} = useI18n()




const switchLocale = (loc: string) => {
    setLocale(loc)
    console.log("switchLocale: " + loc + ":" + locale.value)
    //locale.value = loc
}
onMounted(() => {
    console.log("mounted menu: " + props.settype)
    font_style.value = mergeSetTypeColor(props.settype, getPixelSizedStyle(240, 210))

    /*font_style.value = getViewSizedStyle(20, 20)
    console.log("font before")
    console.dir(font_style.value)
    const color = props.settype == MATCH_DIPLOM ? '#FF4D00' : '#2C2C2C'
    font_style.value['color'] = color;
    */
    console.log("font after")
    console.dir(font_style.value)
})
</script>
<style scoped>
header {
    z-index: 1100;
}
.logo {
    padding: 0;
    border: 1px solid transparent;
}
.dialog_menu {
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    
    /* color: var(--Colors-text-primary-inverted, #000); */
    /* background-color: var(--Colors-background-menu, #fff); */
}
.dialog_menu .menu_panel {
    /* border: 3px solid red; */
    position: absolute;
    left: -24px;
    top: 0rem;
    width: calc(100vw + 48px);
    height: calc(100vh);
    overflow-y: auto;
    
    
    z-index: 1020;
    filter: none;

    display: flex;
    padding-top: 250px;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-between-menu-items, 20px);
    flex-shrink: 0;
}
.menu_panel * {
    align-items: center;
    text-align: center;  
    /* font-size: 80px; */
    /* color: var(--Colors-text-primary, #222); */
    /* background: var(--Ultra-Light-Grey, #F3F2EF); */
    /* background-color: var(--Colors-background-menu2, rgba(255,255,255, 0.3)); */
}

.menu_panel .btn {
    /* color: var(--text-headlines, #FF4D00); */
    /* h1 */
    /* font-size: var(--font-h1-font-size, 240px); */
    font-style: normal;
    font-weight: 400;
    /* line-height: var(--font-h1-line-height, 210px);  */
}
/* no hover in menu */
/* .menu_panel .btn:hover {} */


</style>