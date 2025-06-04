

export interface iFontData {
  name: string,
  url: string,
  author: string,
  year: string,
  size_factor: number,
  line_height_factor: number,
}

export interface iDynFontsState {
    font_selected: number,
    font_list: iFontData[]
}
const dynFontsState = reactive<iDynFontsState> ({
    font_selected: 0,
    font_list: [] as iFontData[]
})

// TODO default font
const font_0:iFontData = {
    name: 'Anthony',
    url: 'assets/anthony/anthony.woff2',
    author: 'Sun Young Oh',
    year: '2021',
    size_factor: 0.9,
    line_height_factor: 1.0 // 0.9,
}
const font_1:iFontData = {
    name: 'gqom404',
    url: 'assets/gqom404/gqom404.woff',
    author: 'Calvin Kudufia',
    year: '2020',
    size_factor: 0.9,
    line_height_factor: 1.0 // 0.9,
}

/* high contrast theme */
// get colors from css
const COLOR_DIPLOM =  '--Primitives-color-highlight-bright-tone' // '#FF4D00'
const COLOR_PROJECTS = '--Primitives-color-greys-ORCBlack' // '#2C2C2C'
const COLOR_PROJECTS_DARK = '--Primitives-color-greys-UltraLightGrey' // '#F3F2EF'
const COLOR_HC_DIPLOM =  '--Primitives-color-hc-highlight-bright-tone' // '#FF4D00'
const COLOR_HC_PROJECTS = '--Primitives-color-greys-ORCBlack' // '#2C2C2C'
const COLOR_HC_PROJECTS_DARK = '--Primitives-color-greys-UltraLightGrey' // '#F3F2EF'

// TODO cannot useTree / for kiosk: useRuntimeConfig
const MATCH_DIPLOM = "diplom";

export const DynFonts = () => {
    const initFontList = () => {
        dynFontsState.font_list.push(font_0)
        dynFontsState.font_list.push(font_1)
    }
    if (!dynFontsState.font_list.length) initFontList()
    
    const initPageFonts = () => {

    }

    const selectRandomFont = () => {
        const max = dynFontsState.font_list.length
        dynFontsState.font_selected = Math.floor((Math.random()* max))
        console.log("selected font " + dynFontsState.font_selected);
    }

    const getViewSizedStyle = (vw:number, vh:number) => {
        const font_list = dynFontsState.font_list
        const font_selected = dynFontsState.font_selected
        const result = {
            'font-family': 'font_' + font_selected,
            'font-size': 'min(' + vw * font_list[font_selected].size_factor + 'vw' + ',' +  vh * font_list[font_selected].size_factor + 'vh' + ')' ,
            'line-height': vh * font_list[font_selected].size_factor * font_list[font_selected].line_height_factor + 'vh',
            'font-weight': 400
        }
        return result;
    }
    const getPixelSizedStyle = (fs:number, lh:number) => {
        const font_list = dynFontsState.font_list
        const font_selected = dynFontsState.font_selected
        const result = {
            'font-family': 'font_' + font_selected,
            'font-size': fs * font_list[font_selected].size_factor + 'px',
            'line-height': lh * font_list[font_selected].size_factor * font_list[font_selected].line_height_factor + 'px',
            'font-weight': 400
        }
        return result;
    }

    /* TODO high contrast theme */
    const highContrastState = useState('isHighContrast')
    
    const getSetTypeColor = (settype: string, theme: string = '') => {
        if (!window) {
            debugger
            return '#2C2C2C'
        }
        const style = window.getComputedStyle(document.body)
        if (highContrastState.value) {
            const colVar = settype == MATCH_DIPLOM ? COLOR_HC_DIPLOM : 
                theme?.indexOf('dark') > -1 ? COLOR_HC_PROJECTS_DARK : COLOR_HC_PROJECTS
            const color = style.getPropertyValue(colVar)
            return color
        } else {
            const colVar = settype == MATCH_DIPLOM ? COLOR_DIPLOM : 
                theme?.indexOf('dark') > -1 ? COLOR_PROJECTS_DARK : COLOR_PROJECTS
            const color = style.getPropertyValue(colVar)
            return color
        }
        
    }
    const mergeSetTypeColor = (settype: string, obj: object, theme: string = ''): object =>  {
        obj['color'] = getSetTypeColor(settype, theme)
        return obj 
    }
    const mergeSetTypeBackColor = (settype: string, obj: object, theme: string = ''): object =>  {
        obj['background-color'] = getSetTypeColor(settype, theme)
        return obj 
    }
    return {
        initFontList,
        initPageFonts,
        selectRandomFont,
        getViewSizedStyle,
        getPixelSizedStyle,
        getSetTypeColor,
        mergeSetTypeColor,
        mergeSetTypeBackColor,
        ...toRefs(dynFontsState)
    }
}


const font_selected = ref()
const font_list = ref([font_0, font_1])
