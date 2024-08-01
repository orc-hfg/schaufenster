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
        :style="font_style">
            <!-- <div>Menu {{locale }} {{ defaultLocale }}</div> -->
            
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
            
        </div>
    
  </div>
</template>
<script setup lang="ts">

const emit = defineEmits([
    'onShowAbout','onShowFonts', 'onShowDSA', 'onShowImpressum', 'onCloseMenu'])
    
const props = defineProps(['settype'])

const font_style = ref({})
const {
    locale,
    defaultLocale,
setLocale
} = useI18n()



const {
    getPixelSizedStyle
} = DynFonts()

const switchLocale = (loc: string) => {
    setLocale(loc)
    console.log("switchLocale: " + loc + ":" + locale.value)
    //locale.value = loc
}
onMounted(() => {
    console.log("mounted menu: " + props.settype)
    font_style.value = getPixelSizedStyle(240, 240)
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
    left: 2rem;
    top: 2rem;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    overflow-y: auto;
    
    z-index: 1020;
    filter: none;
}
.menu_panel * {
    align-items: center;
    text-align: center;  
    /* font-size: 80px; */
    color: var(--Colors-text-primary, #fff);
    
    background-color: var(--Colors-background-menu2, rgba(255,255,255, 0.3));
}

.menu_panel * {
    text-align: center;
}
.btn {

}

.btn.disabled {
    
}
</style>