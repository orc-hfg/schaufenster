<template>
    <div class="dialog_menu" 
        :class="{hidden:animate_io}"
        data-theme="dark">
        <header>
            <nav class="nav">
                <NuxtLink @click="doClose()"
                    :class="{hidden:selector_open}">
                    <IconsNavHome />
                </NuxtLink>
            </nav>
            <div class="wrapper_mid">
                <div class="font_selector"
                    @click="selector_open = !selector_open">
                    <div class="font_label">
                    {{ font_list[font_selected].name }}
                    </div>
                    <div class="font_dropper"
                        >
                        <IconsChevronUpDown :show-up="selector_open" />
                    </div>
                </div>
                <div class="font_options"
                    :class="{hidden: !selector_open}">
                    <div 
                        class="font_option"
                        
                        v-for="(f,idx) in font_list" :value="idx"
                        @click="font_selected = idx; selector_open = false; updateFont()">
                        <!-- I:{{ idx }} F: {{ f }} -->
                        {{ f.name }}
                    </div>
                </div>

                    <!-- <div class="font_by">by</div>
                        <a class="font_link">{{ JSON.stringify(font_list[font_selected].author) }},</a>
                    <div class="font_year">{{font_list[font_selected].year}}</div>
                </div> -->
                
                
            </div>
        </header>
      <div class="menu_panel">
        

        <div class="font_test_view">
            <br>
            <br>
            <br>
            <br/>
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
            <br/>
        </div>
        
        <br>
        <br>
        <br>
        <br>
      

      </div>
      
      <div class="selector_blur"
        v-if="selector_open">
        
      </div>
    </div>
</template>
<script setup lang="ts">
//TODO merge settype color
const {
    font_list,
    font_selected,
    getPixelSizedStyle
} = DynFonts()

const emit = defineEmits(['onClose'])

const font_style = ref(getPixelSizedStyle(210,240))

const selector_open = ref(false)

const updateFont = () => {
    font_style.value = getPixelSizedStyle(210,240)
}
const animate_io = ref(true)
const doClose = () => {
    animate_io.value = true
    setTimeout(() => {
        emit("onClose")
    }, 300)
}
onMounted(() => {
    setTimeout(() => {
        animate_io.value = false
    }, 250)
    

})

</script>
<style scoped>
header {
    z-index: 1100;
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


.font_selector {

    display: inline-flex;
    
    padding: var(--margin-navbar-institution-logo-right, 10px);
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);

    border-radius: var(--radius-full, 9999px);
    border: 1px solid var(--Colors-nav-bar-button-outline, #524F4F);
    background: #2C2C2C;


    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */

    color: var(--Colors-text-primary, #FFF);

    cursor: pointer;
}
.font_label {
    
    color: var(--Colors-text-primary, #FFF);
    text-align: center;

    /* Buttons */
    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */
    padding-right: 5px;
}
.font_dropper {
    height: 24px;
}

.font_options {
    position: absolute;
    top: 64px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    transition: all 300ms ease-out;
}
.font_options.hidden {
    opacity: 0;
}

.font_option {
    display: flex;

    padding: var(--margin-navbar-institution-logo-right, 10px);
    justify-content: center;
    align-items: center;
    gap: var(--margin-navbar-institution-logo-right, 10px);
    
    border-radius: var(--radius-full, 9999px);
    border: 1px solid var(--Colors-nav-bar-button-outline, #524F4F);
    background: #2C2C2C;

    color: var(--Colors-text-primary, #FFF);
    text-align: center;

    /* Buttons */
    font-family: "Instrument Sans";
    font-size: var(--font-button-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-button-line-height, 24px); /* 120% */

    cursor: pointer;
}

/* .font_link {
    text-decoration: underline;
} */

.dialog_menu {
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    
    /* color: var(--Colors-text-primary-inverted, #fff);
     */
     background-color: var(--Colors-background-default, #2C2C2C);
     
     /* "Kaugummi"-Effekt beim Aufziehen des Browserfensters verhindern */
     /* Siehe https://cloud.hfg-karlsruhe.de/index.php/f/1918388 */
    /* transition: all 300ms linear; */
    transition: opacity 200ms ease-out;
    opacity: 1;
}
.dialog_menu.hidden {
    transition: all 300ms ease-out;
    opacity: 0;
    transition-delay: 150ms;
}
.dialog_menu.hidden .menu_panel {
    transition: all 150ms ease-out;
    opacity: 0;
}

.menu_panel {
    /* border: 3px solid red; */
    position: absolute;
    left: 10vw;
    top: 0px;
    width: calc(100% - 20vw);
    height: 100vh;
    overflow-y: auto;
    
    z-index: 1010;
    filter: none;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    transition: all 150ms ease-out;
    transition-delay: 150ms;
    opacity: 1;
}

.menu_panel::-webkit-scrollbar {
    display: none;
}
.selector_blur {
    
    position: fixed;
    top: 0px; left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 1020;
    
    background: rgba(43, 42, 39, 0.30);
    backdrop-filter: blur(25px);
}
.menu_panel * {
    align-items: center;
    text-align: center;  
    /* font-size: 80px; */
    color: var(--Colors-text-primary, #fff);
    
    background-color: var(--Colors-background-default, rgba(255,255,255, 0.3));
}

.font_test_view {
    padding-bottom: 20vh;
    user-select: none;
}
.font_test {
    line-break: anywhere;
    margin-block: 0px;
}
</style>