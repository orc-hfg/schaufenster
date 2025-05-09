<template>
    <div class="setview_intro_info"
        :class="{hidden: animate_io}">
        <div class="set_info_blur" @click="doClose()"></div>
        <div 
            class="set_info_blend"
            :style="showSetTitleStyle"
            @click="doClose()">
            <div class="blend_content"
            :class="props.setType">
            {{ setTitle }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const SHOW_SET_TITLE_DELAY = 3000
const SHOW_ANIMATE_DELAY = 500

const {
  font_list, font_selected,
  getPixelSizedStyle,
  getViewSizedStyle,
  mergeSetTypeColor
} = DynFonts()

const props = defineProps(['setType','setTitle'])
const emits = defineEmits(['onClose'])
const animate_io = ref(true)
/* 
desktop:
--font-h2-font-size:120px;
--font-h2-line-height:146px;
mobile:
--font-h2-font-size:60px;
--font-h2-line-height:60px;
*/
const is_mobile = document.documentElement.getAttribute('data-layout') == "mobile"
const h2_pixel_sized = (is_mobile ? getPixelSizedStyle(60,60) : getPixelSizedStyle(120,146))
const showSetTitleStyle = ref(mergeSetTypeColor(props.setType, h2_pixel_sized))

const doClose = () => {
    animate_io.value = true
    setTimeout(() => {
        emits("onClose")
    }, SHOW_ANIMATE_DELAY)
}
onMounted(() => {
    animate_io.value = false;
    // auto self hide
    setTimeout(() => {
        doClose()
    }, SHOW_SET_TITLE_DELAY)
    
})
</script>
<style scoped>

.set_info_blur {
  position: fixed;
  left: 0px; top: 0px; width: 100vw; height: 100vh; z-index: 90;
  background: var(--Color-blurs-project-img-blur, rgba(243, 242, 239, 0.30));
  backdrop-filter: blur(25px);
  opacity: 1;
  transition: all 300ms ease-out;
}
.set_info_blend {
  
  position: fixed;
  z-index: 1010;
  
  left: 6.5vw;
  right: 6.5vw;
  top: 0;
  height: 100vh;
  /* overflow: hidden; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  opacity: 1;
  transition: all 300ms ease-out;
  /* HH kleines delay, weil sonst die Textfarbe im dark mode (Videos) blitzt */
  transition-delay: 150ms;
}
.hidden .set_info_blur {
  opacity: 0;
  backdrop-filter: blur(0px);
  transition: all 800ms ease-out;
}
.hidden .set_info_blend {
  opacity: 0;
  transform: translateY(10vh);
  transition: all 800ms ease-out;
 }
/* HH "word-break: break-word;", um zu lange Worte umzubrechen. 
 * Hinweis: hyphens: auto; hätte den Effekt, dass Worte auch dann umbrechen, 
 * wenn sie eigentlich in eine Zeile passen würden. Der Browser präferiert dann also 
 * generell Wort-Umbruch gegenüber Zeilenumbruch.
 * Gerade bei Projekt-Titeln wollen wir aber Umbrücke in Worten vermeiden.
 * "word-break" ist zwar nicht so schön, aber dennoch die besser Lösung, 
 * weil das Problem nur selten auftritt: mobil und langes Wort. */
.blend_content {
  /* border: 1px solid blue; */
  /* display: inline-flex;   */
  word-break: break-word;
  color: var(--Colors-text-primary);
}
.blend_content.diplom { 
  color: var(--Primitives-color-identity-Signal-Red);
}
</style>