<template>
    <div class="dialog_menu">
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
                :style="{
                    'font-family': 'font_' + font_selected,
                    'font-size': 240 * font_list[font_selected].size_factor + 'px',
                    'line-height': 240 * font_list[font_selected].line_height_factor + 'px'
                }">
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
    font_selected
} = DynFonts()

</script>
<style>
.font_test {
    line-break: anywhere;
    margin-block: 0px;
}
</style>