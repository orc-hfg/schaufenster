<template>
    <div class="dialog_menu" >
        <!-- data-theme="dark" -->
        <div class="menu_panel"
        :style="font_style">
            <div>Menu {{locale }} {{ defaultLocale }}</div>
            
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
            <div @click="$emit('onShowAbout')">
                {{ $t('menu.about')}}
            </div>
            <div @click="$emit('onShowFonts')">
                {{ $t('menu.fonts')}}
            </div>
            <div @click="$emit('onShowDSA')">
                {{ $t('menu.dsa')}}
            </div>
            <div @click="$emit('onShowImpressum')">
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
    'onShowAbout','onShowFonts', 'onShowDSA', 'onShowImpressum', 'switchLang'])
    
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
    font_style.value = getPixelSizedStyle(240, 210)
})
</script>
<style scoped>
.menu_panel * {
    text-align: center;
}
.btn {

}
.btn:hover {
    cursor: pointer;
}
.btn.disabled {
    opacity: 0.5;
}
</style>