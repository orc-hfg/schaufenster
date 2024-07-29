<template>
    <div class="dialog_menu">
        <div class="menu_panel"
        :style="{
                    'font-family': 'font_' + font_selected,
                    'font-size': 240 * font_list[font_selected].size_factor + 'px',
                    'line-height': 240 * font_list[font_selected].line_height_factor + 'px'
                }">
            <div>Menu</div>
            
            <div>
                <span @clicked="$emit('switchLang','de')">DE</span>
                <span @clicked="$emit('switchLang','en')">EN</span>
            </div>
            <div @clicked="$emit('onShowAbout')">
                About
            </div>
            <div @click="$emit('onShowFonts')">
                Fonts
            </div>
            <div @clicked="$emit('onShowImpressum')">
                Impressum
            </div>
            <div @clicked="$emit('onShowDSA')">
                Datenschutz
            </div>

            <div>
            <NuxtLink to="/">Intro</NuxtLink>
            </div>
            
        </div>
    
  </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['onShowAbout','onShowFonts', 'onShowDSA', 'onShowImpressum', 'switchLang'])
const props = defineProps(['settype'])

const {
    font_list,
    font_selected
} = DynFonts()

onMounted(() => {
    console.log("mounted menu: " + props.settype)
})
</script>
<style scoped>
</style>