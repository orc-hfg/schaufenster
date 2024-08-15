<template>
<div class="entry_info"
      :class="{hidden: !showInfo}">

      <div v-if="!activeEntryId || !currentTree || !currentTree.entries_meta_data">
        No entry meta data yet.
      </div>

      <div class="entry_info_panel" v-else>
        <h3>
          Entry {{ activeEntryId }} Meta Data:<br/>
        </h3>
        
        
        <!-- Title:
        {{ currentTree.entries_meta_data[activeEntryId]['madek_core:title'].string }} -->
        <br/>

        <div v-for="(md,meta_key) in currentTree.entries_meta_data[activeEntryId]">
          <div>K:{{meta_key}}:&nbsp;</div><br/>
          
          <div v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">{{md.string}}</div>
          
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_KEYWORDS">
            <div class="filter_tag"
              v-for="kw in md.selectedKeywords">
                {{ kw.term }}
            </div>
            
          </div>
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_PEOPLE">
            
            <div class="filter_tag"
              v-for="p in md.selectedPeople">
                {{ p.first_name }}&nbsp;{{ p.last_name }}
            </div>
          </div>
          <div v-else-if="md.type == MD_TYPE_ROLES">
            ROLES
          </div>
          
          <br/>
          <hr/>
        </div>
        <!-- <hr>
        <textarea>{{ currentTree.entries_meta_data[activeEntryId] }}</textarea>
        <br/>
        <br/>
        <br/> -->
      </div>

      <div v-if="!activeSetId || !currentTree || !currentTree.cols_meta_data">
        No set meta data yet.
      </div>

      <div class="entry_info_panel" v-else>
      <h3>
        Set {{ activeSetId }} Meta Data:<br/>
      </h3>
        
        
        <br/>

        <div v-for="(md,meta_key) in currentTree.cols_meta_data[activeSetId]">
          <div>K:{{meta_key}}:&nbsp;</div><br/>
          
          <div v-if="md.type == MD_TYPE_TEXT || md.type == MD_TYPE_TEXT_DATE">{{md.string}}</div>
          
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_KEYWORDS">
            <div class="filter_tag"
              v-for="kw in md.selectedKeywords">
                {{ kw.term }}
            </div>
            
          </div>
          <div class="filter_list"
            v-else-if="md.type == MD_TYPE_PEOPLE">
            
            <div class="filter_tag"
              v-for="p in md.selectedPeople">
                {{ p.first_name }}&nbsp;{{ p.last_name }}
            </div>
          </div>
          <div v-else-if="md.type == MD_TYPE_ROLES">
            ROLES
          </div>
          
          <br/>
          <hr/>
        </div>
        <!-- <hr>
        <textarea>{{ currentTree.cols_meta_data[activeSetId] }}</textarea>
        <br/>
        <br/>
        <br/>
        <br/> -->
      </div>
    </div>
</template>
<script setup lang="ts">
const {
  MD_TYPE_TEXT,
  MD_TYPE_TEXT_DATE,
  MD_TYPE_JSON,
  MD_TYPE_KEYWORDS,
  MD_TYPE_PEOPLE,
  MD_TYPE_ROLES
} = madekHelper()

const props = defineProps([
    'showInfo',
    'activeEntryId',
    'activeSetId',
    'currentTree'
])
</script>
<style>


.entry_info {
  /* border: 1px solid blue; */
  position: fixed;
  top: 72px;
  left: 50%;
  width: calc(50vw - 48px);
  height: calc(100vh - 250px);
  overflow-y: auto;
  
  visibility: visible;
  /** hidden state */
  
  transition: all 1s 1s;
}
.entry_info.hidden {
  left: 100%;
  visibility: hidden;
}
.entry_info_panel {
  padding: var(--spacing__betweenitemsM, 12px) var(--spacing__betweenitemsM,12px);
}

.filter_list {
  display: ruby-text;

}
.filter_tag {
  float: left;
  display: block;
  font-size: var(--font__body__fontsize, 20px);
  line-height: var(--font__body__lineheight, 24px);
  padding: var(--spacing__betweenitemsM, 12px);
  border: 1px solid black;
  border-radius: var(--radius__full, 48px);
  background-color: var(--Colors-nav-bar-toggle-on);
  margin: var(--spacing__navbarbetweenitems, 4px) var(--spacing__navbarbetweenitems, 4px);
}

</style>