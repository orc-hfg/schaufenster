<template>
    <div class="meta_info" v-if="notEmpty() "
        >
        <div class="meta_title"
            v-if="(notEmpty()|| (additStringList && additStringList.length)) && title && title.length">
            {{title}}
        </div>        
        <div v-if="notEmpty()"
            class="meta_content">
            <!-- TYPE [{{ md.type }}] -->
            <!-- ev. BUG: Höhe des containers wird dynamisch berechnet 
                :style="getTextStyle(md.string, showAll)" 
            1. Wert stimmt nicht, längere Texte werden abgeschnitten
            2. nicht nötig? weil .filter_list.show_all hat height: fit-content -->
            <div class="filter_list"
                :class="{show_all: showAll}"
                :style="getContentHeight()"
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
                v-if="(md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE) && md.string.length >= MIN_TEXT_SHOW_COUNT">
                <span class="filter_content" v-html="getAbbrevString(md.string, true)"></span>
            </div>
            <div class="filter_listo "
                :id="getFilterListId(md, 'min')"
                v-if="(md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE) && md.string.length >= MIN_TEXT_SHOW_COUNT">
                <span>{{ md.string.substring(0, MIN_TEXT_SHOW_COUNT + 3) }}</span>
            </div>
            


            <div class="filter_list"
                :class="{show_all: showAll}"
                :style="getContentHeight()"
                v-if="md.type == MD_TYPE_KEYWORDS">
                <div class="filter_tag"
                    role="button"
                    v-if="isSelectable"
                    v-for="(kw,idx) in md.selectedKeywords"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll"
                    @click="$emit('addFilter', FILTERS_KEYWORD,kw)">
                    {{ kw.term }}
                </div>
                <div class="filter_tag unselectable"
                    v-else
                    v-for="(kw,idx) in md.selectedKeywords"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll">
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

            <div class="filter_listo "
                :id="getFilterListId(md, 'max')"
                v-if="md.type == MD_TYPE_KEYWORDS && md.selectedKeywords.length >= MIN_TAG_SHOW_COUNT">
                <div class="filter_tag"
                    v-for="(kw,idx) in md.selectedKeywords">
                    {{ kw.term }}
                </div>
            </div>
            <div class="filter_listo "
                :id="getFilterListId(md, 'min')"
                v-if="md.type == MD_TYPE_KEYWORDS && md.selectedKeywords.length >= MIN_TAG_SHOW_COUNT">
                <div class="filter_tag"
                    v-for="(kw,idx) in md.selectedKeywords"
                    v-show="idx < MIN_TAG_SHOW_COUNT">
                    {{ kw.term }}
                </div>
            </div>

            <!-- MD PEOPLE -->
            <div class="filter_list"
                :class="{show_all: showAll}"
                :style="getContentHeight()"
                v-if="md.type == MD_TYPE_PEOPLE">
            
                <div class="filter_tag"
                    role="button"
                    v-if="isSelectable"
                    v-for="(p,idx) in md.selectedPeople"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll"
                    @click="$emit('addFilter', FILTERS_PEOPLE,p)">
                    {{ buildPersonName(p) }}
                </div>
                <div class="filter_tag unselectable"
                    v-else
                    v-for="(p,idx) in md.selectedPeople"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll">
                    {{ buildPersonName(p) }}
                </div>
            </div>
            <MetaDatumViewShowBtn
                v-if="md.type == MD_TYPE_PEOPLE"
                :show-all="showAll"
                :count="md.selectedPeople.length"
                :min="MIN_TAG_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />

            <div class="filter_listo"
                :id="getFilterListId(md, 'max')"
                v-if="md.type == MD_TYPE_PEOPLE && md.selectedPeople.length >= MIN_TAG_SHOW_COUNT">
                <div class="filter_tag"
                    v-for="(p,idx) in md.selectedPeople">
                    {{ buildPersonName(p) }}
                </div>
            </div>
            <div class="filter_listo "
                :id="getFilterListId(md, 'min')"
                v-if="md.type == MD_TYPE_PEOPLE && md.selectedPeople.length >= MIN_TAG_SHOW_COUNT">
                <div class="filter_tag"
                    v-for="(p,idx) in md.selectedPeople"
                    v-show="idx < MIN_TAG_SHOW_COUNT">
                    {{ buildPersonName(p) }}
                </div>
            </div>

            <!-- MD ROLES -->
            <div class="filter_list"
                :class="{show_all: showAll}"
                :style="getContentHeight()"
                v-if="md.type == MD_TYPE_ROLES">
                <div class="filter_tag"
                    role="button"
                    v-if="isSelectable"
                    v-for="(rp,idx) in md.selectedRoles"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll"
                    @click="$emit('addFilter', FILTERS_ROLES,rp)">
                    {{ buildPersonName(rp.person) }}
                </div>
                <div class="filter_tag unselectable"
                    v-else
                    v-for="(rp,idx) in md.selectedRoles"
                    v-show="idx < MIN_TAG_SHOW_COUNT || showAll">
                    {{ buildPersonName(rp.person) }}
                </div>
            </div>
            <MetaDatumViewShowBtn
                v-if="md.type == MD_TYPE_ROLES"
                :show-all="showAll"
                :count="md.selectedRoles.length"
                :min="MIN_TAG_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />

            <div class="filter_listo"
                :id="getFilterListId(md, 'max')"
                v-if="md.type == MD_TYPE_ROLES && md.selectedRoles.length >= MIN_TAG_SHOW_COUNT">
                <div class="filter_tag"
                    v-for="(rp,idx) in md.selectedRoles">
                    {{ buildPersonName(rp.person) }}
                </div>
            </div>
            <div class="filter_listo "
                :id="getFilterListId(md, 'min')"
                v-if="md.type == MD_TYPE_ROLES && md.selectedRoles.length >= MIN_TAG_SHOW_COUNT">
                <div class="filter_tag"
                    v-for="(rp,idx) in md.selectedRoles"
                    v-show="idx < MIN_TAG_SHOW_COUNT">
                    {{ buildPersonName(rp.person) }}
                </div>
            </div>

        </div>
    </div> 
</template>
<script setup lang="ts">


import { 
  MD_TYPE_KEYWORDS,
  MD_TYPE_PEOPLE,
  MD_TYPE_ROLES,
} from "../utils/madekTypes"

const {
    FILTERS_KEYWORD,
    FILTERS_PEOPLE,
    FILTERS_ROLES
} = treeHelper()
const MIN_TAG_SHOW_COUNT = 4;
const MIN_TEXT_SHOW_COUNT = 200;

const MIN_FILTER_TAG_LIST_HEIGHT = 52;
const MIN_TEXT_HEIGHT = 24;

const props = defineProps(['md','title', 'isSelectable', 'additStringList'])
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
    if (props.additStringList && props.additStringList.length) {
        return true
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

const toPxHeight = (height:number):object => {
    return { 'height': height + 'px' }
}

const getContentHeight = () => {
    const type = showAll.value == true ? 'max' : 'min'
    const id = getFilterListId(props.md, type)
    
  const listo = document.getElementById(id)
  if (listo && listo.getBoundingClientRect) {
    const height = listo.getBoundingClientRect().height

    console.log("got height for " + id + " : " + height)
    return toPxHeight(height)
  }
  //console.error("no height yet")
  if (props.md.type == MD_TYPE_KEYWORDS
    || props.md.type == MD_TYPE_PEOPLE
    || props.md.type == MD_TYPE_ROLES
  ) {
    if ((props.md.selectedKeywords && props.md.selectedKeywords.length >= MIN_TAG_SHOW_COUNT)
        || (props.md.selectedPeople && props.md.selectedPeople.length >= MIN_TAG_SHOW_COUNT)
        || (props.md.selectedRoles && props.md.selectedRoles.length >= MIN_TAG_SHOW_COUNT)) {
        return toPxHeight(MIN_FILTER_TAG_LIST_HEIGHT * 2)
    }
    return toPxHeight(MIN_FILTER_TAG_LIST_HEIGHT)
  }

// HH schneidet mehrzeilige Titel ab – wird diese Abfrage gebraucht?
// Reference: https://cloud.hfg-karlsruhe.de/s/QbS29xigK4fyxSd
//   if (props.md.type == MD_TYPE_TEXT) {
//     return toPxHeight(MIN_TEXT_HEIGHT)
//   }

  
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
    if (props.additStringList) {
        let waddit = result
        props.additStringList.forEach(str => {
            waddit += ', ' + str
        })
        return waddit
    }
    return result;
}

const buildPersonName = (p:iPerson) => {
    if (!p.first_name && !p.last_name) {
        return (p.description || p.pseudonym)
    } else {
        return p.first_name 
            + (p.last_name ? ' ' + p.last_name : '')
    }
}
const resetShowAll = () => {
    showAll.value = true
    setTimeout(() => {
        showAll.value = false
    }, 25)
}
onMounted(() => {
    resetShowAll()
})

watch(props, () => {
    //console.log("changed props")
    resetShowAll()
})
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

/* HH vertikale Abstände vereinheitlichen 
 * Ref.: https://cloud.hfg-karlsruhe.de/s/NqsnkjWLED5KGA7
*/
/* height: 50px; */
overflow: hidden;

transition: all 300ms ease-out;
}
.filter_listo {
    position:fixed;
    top: 1000vh;
    width: calc(50vw - 80px);

    display: flex;
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
    color: var(--Colors-text-primary, #2C2C2C);
}
.filter_content span {
    display: inline-block;
}

.filter_tag {
    
    user-select: text;

    display: flex;
    /* height: var(--dimension-button-height-M, 48px); */
    height: var(--dimension-button-height-S, 32px);
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
.filter_tag:not(.unselectable):hover {
    /* TODO filter tag hover color for dark theme */
    background: var(--Colors-filter-chip-fill-hover, #E7E6E1);
}

.filter_tag:not(.unselectable) {
    cursor: pointer;
    
}

.filter_tag.unselectable {
    border: none;
    padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px) var(--padding-item-vertical-S, 8px) 0;
}

</style>