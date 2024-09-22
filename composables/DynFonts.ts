

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

const font_0:iFontData = {
    name: 'Anthony',
    url: 'assets/anthony/anthony.woff2',
    author: '',
    year: '',
    size_factor: 0.9,
    line_height_factor: 0.9,
}
const font_1:iFontData = {
    name: 'gqom404',
    url: 'assets/gqom404/gqom404.woff',
    author: '',
    year: '',
    size_factor: 0.9,
    line_height_factor: 0.9,
}

// --Primitives-color-highlight-bright-tone
// --Primitives-color-greys-ORCBlack
const COLOR_DIPLOM =  '#FF4D00'
const COLOR_PROJECTS = '#2C2C2C'
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
            'line-height': vh * font_list[font_selected].size_factor* font_list[font_selected].line_height_factor + 'vh',
            'font_weight': 400
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
            'font_weight': 400
        }
        return result;
    }

    const getSetTypeColor = (settype: string) => {
        const color = settype == MATCH_DIPLOM ? COLOR_DIPLOM : COLOR_PROJECTS
        return color
    }
    const mergeSetTypeColor = (settype: string, obj: object): object =>  {
        obj['color'] = getSetTypeColor(settype)
        return obj 
    }
    const mergeSetTypeBackColor = (settype: string, obj: object): object =>  {
        obj['background-color'] = getSetTypeColor(settype)
        return obj 
    }
    return {
        initFontList,
        initPageFonts,
        selectRandomFont,
        getViewSizedStyle,
        getPixelSizedStyle,
        mergeSetTypeColor,
        mergeSetTypeBackColor,
        ...toRefs(dynFontsState)
    }
}


const font_selected = ref()
const font_list = ref([font_0, font_1])
