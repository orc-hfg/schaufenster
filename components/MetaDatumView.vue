<template>
    <div class="meta_info"
        v-if="notEmpty()">
        <div class="meta_title"
            v-if="title && title.length">
            {{title}}
        </div>        
        <div class="meta_content">

            <div class="filter_list"
                :class="{show_all: showAll}"
                :style="getTextStyle(md.string, showAll)"
                v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">
                <span class="filter_content" v-html="getAbbrevString(md.string, showAll)"></span>
            </div>
            <MetaDatumViewShowBtn
                v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE"
                :show-all="showAll"
                :count="md.string.length"
                :min="MIN_TEXT_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />
            
            <div class="filter_listo "
                :id="getFilterListId(md, 'max')"
                v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">
                <span>{{ md.string }}</span>
            </div>
            <div class="filter_listo "
                :id="getFilterListId(md, 'min')"
                v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">
                <span>{{ md.string.substring(0, MIN_TEXT_SHOW_COUNT + 3) }}</span>
            </div>
            


            <div class="filter_list"
                :class="{show_all: showAll}"
                v-if="md.type == MD_TYPE_KEYWORDS">
                <div class="filter_tag"
                    v-for="(kw,idx) in md.selectedKeywords"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll"
                    @click="$emit('addFilter', FILTERS_KEYWORD,kw)">
                    {{ kw.term }}
                </div>
            </div>
            <MetaDatumViewShowBtn
                v-if="md.type == MD_TYPE_KEYWORDS"
                :show-all="showAll"
                :count="md.selectedKeywords.length"
                :min="MIN_TAG_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />

            <div class="filter_list"
                :class="{show_all: showAll}"
                v-if="md.type == MD_TYPE_PEOPLE">
            
                <div class="filter_tag"
                    v-for="(p,idx) in md.selectedPeople"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll"
                    @click="$emit('addFilter', FILTERS_PEOPLE,p)">
                    {{ p.first_name }}&nbsp;{{ p.last_name }}
                </div>
            </div>
            <MetaDatumViewShowBtn
                v-if="md.type == MD_TYPE_PEOPLE"
                :show-all="showAll"
                :count="md.selectedPeople.length"
                :min="MIN_TAG_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />

            <div class="filter_list"
                :class="{show_all: showAll}"
                v-if="md.type == MD_TYPE_ROLES">
                <div class="filter_tag"
                    v-for="(rp,idx) in md.selectedRoles"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll"
                    @click="$emit('addFilter', FILTERS_ROLES,rp)">
                    {{ rp.person.first_name }}&nbsp;{{ rp.person.last_name }}
                </div>
            </div>
            <MetaDatumViewShowBtn
                v-if="md.type == MD_TYPE_ROLES"
                :show-all="showAll"
                :count="md.selectedRoles.length"
                :min="MIN_TAG_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />
        </div>
    </div> 
</template>
<script setup lang="ts">
//TODO show more animation ?
//TODO show more btn
const {
  MD_TYPE_TEXT,
  MD_TYPE_TEXT_DATE,
  MD_TYPE_JSON,
  MD_TYPE_KEYWORDS,
  MD_TYPE_PEOPLE,
  MD_TYPE_ROLES
} = madekHelper()
const {
    FILTERS_KEYWORD,
    FILTERS_PEOPLE,
    FILTERS_ROLES
} = treeHelper()
const MIN_TAG_SHOW_COUNT = 4;
const MIN_TEXT_SHOW_COUNT = 200;


const props = defineProps(['md','title'])
const emits = defineEmits(['addFilter'])
const showAll = ref(false)

const notEmpty = () => {
    if (!props.md || !props.md.type) {
        return false;
    }
    // ignore json
    if ( props.md.type == MD_TYPE_JSON ) {
        return false;
    }
    if ( (props.md.type == MD_TYPE_TEXT
          || props.md.type == MD_TYPE_TEXT_DATE)
          && props.md.string && props.md.string.length) {
        return true;
    }
    if (props.md.type == MD_TYPE_PEOPLE
        && props.md.selectedPeople
        && props.md.selectedPeople.length) {
        return true;
    }
    if (props.md.type == MD_TYPE_KEYWORDS
        && props.md.selectedKeywords
        && props.md.selectedKeywords.length) {
        return true;
    }
    if (props.md.type == MD_TYPE_ROLES
        && props.md.selectedRoles
        && props.md.selectedRoles.length) {
        return true;
    }

}

const getTextSize = (show_all:boolean):number[] => {
  // re-use canvas object for better performance
  //console.log("md: " + JSON.stringify(props.md))
  //const listos = document.getElementsByClassName('filter_listo')
  /* for (let i = 0; i < listos.length; i++) {
    console.log("width: " + listos[i].clientWidth
        + " height: " + listos[i].clientHeight
    )
  } */
  const type = show_all == true ? 'max' : 'min'
  const id = getFilterListId(props.md, type)
    
  const listo = document.getElementById(id)
  if (listo && listo.clientWidth) {
    const rect = listo.getBoundingClientRect()
    console.log(
        
        + " My width: " + listo.clientWidth // rect.width
        + " My height: " + rect.height
    )
    return [listo.clientWidth, rect.height]
  }
  return [100,50]
/*
  try {
    //const canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    const canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
    canvas.width = ((window.innerWidth / 2) - 48) + 'px';
    canvas.display = "block"
  //const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.textAlign = 'left'
    context.font = font;
    context.fillStyle = 'black'
    const metrics = context.measureText(text);
    const actualWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    
    
    console.log(
        "height" + metrics.height 
        + " actual hight: " + actualHeight
        + " width: "+ metrics.width
        + " actual width: "+ actualWidth
        
    )

    

    return metrics.width;
  } catch (error) {
    console.error("getTextWidth: Error: " + error)
    return 100;
  }*/
}

const getFilterListId = (md, type) => {
    return 'filter_list_'
        + type
        + '_'
        + (md.media_entry_id ? md.media_entry_id : md.collection_id)
        + '_'
        + md.meta_key_id
}

const getAbbrevString = (text:string, show_all:boolean):string => {
    const result = text.replace('\n','<br>')
    if (show_all == false && text.length > MIN_TEXT_SHOW_COUNT) {
        return result.substring(0, MIN_TEXT_SHOW_COUNT) + '...'
    }
    return result;
}

const getTextStyle = (text:string, show_all:boolean) => {
    /*if (show_all) {
        return { height: '100%'}
    }*/
    const [width,height] = getTextSize(show_all) 
    
    
    const style = {
        
        height: height + 'px'
    }
    return style
}

</script>
<style>

.filter_list {
 /* display: flex;
flex-direction: column;
align-items: flex-start;
gap: var(--spacing-meta-info-between-rows, 6px);
align-self: stretch; */

display: flex;
align-items: flex-start;
align-content: flex-start;
gap: var(--spacing-between-items-S, 4px);
align-self: stretch;
flex-wrap: wrap;
height: 50px;
overflow: hidden;

transition: all 300ms ease-out;
}
.filter_listo {
    position:fixed;
    top: 1000vh;
    width: calc(50vw - 48px);
    display: block;
    box-sizing: border-box;

align-items: flex-start;
align-content: flex-start;
gap: var(--spacing-between-items-S, 4px);
align-self: stretch;
flex-wrap: wrap;

}
.filter_list.show_all {
    height: fit-content;
}
.filter_content {
    user-select: text;
    
}
.filter_content span {
    display: inline-block;
}
.filter_tag {
    cursor: pointer;
    user-select: text;
/*  float: left;
  display: block;
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  padding: var(--spacing__betweenitemsM, 12px);
  border: 1px solid black;
  border-radius: var(--radius__full, 48px);
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: var(--spacing__navbarbetweenitems, 4px) var(--spacing__navbarbetweenitems, 4px);
*/
    display: flex;
    height: var(--dimension-button-height-M, 32px);
    padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px);
    align-items: center;
    gap: var(--spacing-item-inner, 8px);

    border-radius: var(--radius-none, 0px);
    border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);

    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}

</style>