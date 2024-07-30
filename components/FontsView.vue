<template>
    <div class="dialog_menu" data-theme="dark">
        <header>
            <nav class="nav">
                <NuxtLink @click="$emit('onClose')">
                    <IconsNavIconORC />
                </NuxtLink>
            </nav>
        </header>
      <div class="menu_panel">
        <h1>Fonts</h1>
        
        <select v-model="font_selected">
            <option v-for="(f,idx) in font_list" :value="idx">I:{{ idx }} F: {{ f }}</option>
        </select>

        <div>
            <br>
            <br>
            <br>
            <h1 class="font_test"
                :style="font_style">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </h1>
        </div>
        
        <br>
        <br>
        <br>
        <br>
        <hr/>
        <p>FS: {{ font_selected }}</p>
        <hr/>
        <p>FL: {{ font_list }}</p>
        <hr/>
        <p>FD: {{ font_list[font_selected] }}</p>
        <hr/>

      </div>
      
    </div>
</template>
<script setup lang="ts">
const {
    font_list,
    font_selected,
    getPixelSizedStyle
} = DynFonts()

const emit = defineEmits(['onClose'])
const font_style = ref(getPixelSizedStyle(240,240))

</script>
<style scoped>
header {
    z-index: 1100;
}
.dialog_menu {
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    
    color: var(--Colors-text-primary-inverted, #fff);
    background-color: var(--Colors-background-menu, #000);
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
    /* color: var(--Colors-text-primary2, #fff); */
    
    background-color: var(--Colors-background-menu, rgba(255,255,255, 0.3));
}


.font_test {
    line-break: anywhere;
    margin-block: 0px;
}
</style>