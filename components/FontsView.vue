<template>
    <div class="dialog_menu" 
        :class="{hidden:animate_io}"
        data-theme="dark">
        <header>
            <nav class="nav">
                <NuxtLink @click="doClose()">
                    <IconsNavHome />
                </NuxtLink>
            </nav>
            <div class="wrapper_mid">
                <div class="font_selector">
                    <div class="font_label">
                    Select font
                    </div>
                    <select
                        class="font_input"
                        v-model="font_selected"
                        @change="updateFont">
                        <option v-for="(f,idx) in font_list" :value="idx">
                        <!-- I:{{ idx }} F: {{ f }} -->
                        {{ f.name }}
                        </option>
                    </select>
                    <div class="font_by">by</div>
                    <a class="font_link">{{ JSON.stringify(font_list[font_selected].author) }},</a>
                    <div class="font_year">{{font_list[font_selected].year}}</div>
                </div>
                
                
            </div>
        </header>
      <div class="menu_panel">
        

        <div class="font_test_view">
            <br>
            <br>
            <br>
            <h2 class="font_test"
                :style="font_style">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br/>
                abcdefghijklmnopqrstuvwxyz
                <br/>
                1234567890
                <br/>
                .:,;!?#[(€$@)]
            </h2>
        </div>
        
        <br>
        <br>
        <br>
        <br>
      

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
const font_style = ref(getPixelSizedStyle(120,120))

const updateFont = () => {
    font_style.value = getPixelSizedStyle(120,120)
}
const animate_io = ref(true)
const doClose = () => {
    animate_io.value = true
    setTimeout(() => {
        emit("onClose")
    }, 250)
}
onMounted(() => {
    setTimeout(() => {
        animate_io.value = false
    }, 250)
    
})

</script>
<style scoped>
header {
    /*position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 72px;*/
    z-index: 1100;
    background-color: var(--Colors-background-about, #2C2C2C);
    /* border: 1px solid red; */
}
nav {
    float: left;
}
nav a {
    width: 48px;
    height: 48px;
    padding: 0px;
}
nav a svg {
    mix-blend-mode: normal;
}
.wrapper_mid {
    float: left;
    width: calc(100% - 48px);
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    justify-content: center;
}

.dialog_menu {
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    
    color: var(--Colors-text-primary-inverted, #fff);
    background-color: var(--Colors-background-default, #2C2C2C);
    transition: all 300ms linear;
    opacity: 1;
}
.dialog_menu.hidden {
    transition: all 300ms linear;
    opacity: 0;
}
.menu_panel {
    /* border: 3px solid red; */
    position: absolute;
    left: 10vw;
    top: 120px;
    width: calc(100% - 20vw);
    height: calc(100% - 180px);
    overflow-y: auto;
    
    z-index: 1020;
    filter: none;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.menu_panel::-webkit-scrollbar {
    display: none;
}
.menu_panel * {
    align-items: center;
    text-align: center;  
    /* font-size: 80px; */
    color: var(--Colors-text-primary, #fff);
    
    background-color: var(--Colors-background-default, rgba(255,255,255, 0.3));
}

.font_selector {
    display: inline-flex;
    align-items: center;
    gap: 20px;

    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */
    color: var(--Colors-text-primary, #FFF);
}
.font_label {
    color: var(--Colors-text-secondary, #CAC9C2);
    text-align: center;

    /* Buttons */
    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */
}
.font_input {
    display: flex;
    padding: var(--margin-navbar-institution-logo-right, 10px);
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);

    border-radius: var(--radius-full, 9999px);
    border: 1px solid var(--nav-bar-button-outline, #524F4F);
    background: #2C2C2C;

    color: var(--Colors-text-primary, #FFF);

    text-align: center;

    /* font-family: gqom404; */

    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--font-button-line-height, 24px); /* 120% */

  /*   background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
   */
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
}
.font_link {
    text-decoration: underline;
}
.font_test_view {
    padding-bottom: 120px;
}
.font_test {
    line-break: anywhere;
    margin-block: 0px;
}
</style>