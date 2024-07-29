

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

export const DynFonts = () => {
    const initFontList = () => {
        dynFontsState.font_list.push(font_0)
        dynFontsState.font_list.push(font_1)
    }
    if (!dynFontsState.font_list.length) initFontList()
    
    const initPageFonts = () => {

    }
    return {
        initFontList,
        initPageFonts,
        ...toRefs(dynFontsState)
    }
}


const font_selected = ref()
const font_list = ref([font_0, font_1])
