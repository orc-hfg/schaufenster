<template>
    <div>
        <div class="filter_list"
            v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">
            <span v-if="showAll">{{md.string}}</span>
            <span v-if="!showAll">
                {{
                    md.string?.substring(0, MIN_TEXT_SHOW_COUNT)
                    + (md.string.length > MIN_TEXT_SHOW_COUNT && !showAll ? '...':'')
                }}
            </span>

            <MetaDatumViewShowBtn
                :show-all="showAll"
                :count="md.string.length"
                :min="MIN_TEXT_SHOW_COUNT"
                @toggle-show-all="showAll=!showAll"
                />
        </div>
        
          
        <div class="filter_list"
            v-if="md.type == MD_TYPE_KEYWORDS">
            <div class="filter_tag"
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

        <div class="filter_list"
            v-if="md.type == MD_TYPE_PEOPLE">
        
            <div class="filter_tag"
                v-for="p in md.selectedPeople">
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

        <div v-if="md.type == MD_TYPE_ROLES">
        ROLES
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
const MIN_TAG_SHOW_COUNT = 4;
const MIN_TEXT_SHOW_COUNT = 200;

const props = defineProps(['md'])
const showAll = ref(false)
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


}
.filter_tag {
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
    border: 1px solid var(--filter-chip-fill-outline, #CAC9C2);

    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}

</style>