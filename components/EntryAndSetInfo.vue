<template>
  <!-- <div>
  
    <Transition name="move-u30-fade">
      <div class="entry_info_title"
        :class="{hidden: entry_info_hidden}"
        v-if="currentTree && currentTree.colTitlesMap"
        >
        {{ currentTree.colTitlesMap[setid] }}
      </div>
    </Transition> -->
    
    
<div class="entry_info"
        @scroll="scrolled"
        @wheel="scrolled">


        
      <div v-if="!activeEntryId || !currentTree || !currentTree.entries_meta_data">
        No meta data yet.
      </div>

      <div class="entry_info_panel" 
        @scroll="scrolled"
        @wheel="scrolled"
        v-else>
        <!-- <div style="display: block; height: 15vh">
          <br/>  
          <br/>
        </div> -->
        <div class="section_entry">
          <div class="meta_info"
            style=" height: 15vh">
            <br/>  
            <br/>
          </div>
            <div class="meta_info">
                <div class="meta_title">
                    Titel
                </div>
                    <MetaDatumView
                        class="meta_content" 
                        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:title']"/>                
            </div>
            <div class="meta_info">
                <div class="meta_title">
                    Medienersteller (Autor)
                </div>
                    <MetaDatumView
                        class="meta_content"
                        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:authors']"/>
            </div>
            <div class="meta_info">
                <div class="meta_title">
                    Copyright
                </div>
                    <MetaDatumView
                        class="meta_content"
                        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:copyright_notice']"/>
            </div>        
        </div>

        <div class="section_set">
            <div class="meta_info">
                <div class="meta_title">
                    Projekt-Autoren
                </div>
                    <MetaDatumView
                        class="meta_content"
                        :md="currentTree.cols_meta_data[activeSetId]['madek_core:authors']"/>
            </div>
            <div class="meta_info">
                <div class="meta_title">
                    Zeitraum
                </div>
                    <MetaDatumView
                        class="meta_content"
                        :md="currentTree.cols_meta_data[activeSetId]['institution:semester']"/>
            </div>
            <div class="meta_info">
                <div class="meta_title">
                    Schlagworte
                </div>
                    <MetaDatumView
                        class="meta_content"
                        :md="currentTree.cols_meta_data[activeSetId]['madek_core:keywords']"/>
            </div>                        
            <div class="meta_info">
                <div class="meta_title">
                    Projektbeschreibung
                </div>
                    <MetaDatumView
                        class="meta_content"
                        :md="currentTree.cols_meta_data[activeSetId]['madek_core:description']"/>
            </div>
        </div>
        <!--
        <h3>
          Entry {{ activeEntryId }} Meta Data:<br/>
        </h3>
        
        <br/>

        <div v-for="(md,meta_key) in currentTree.entries_meta_data[activeEntryId]">
          <div>K:{{meta_key}}:&nbsp;</div><br/>
            <MetaDatumView :md="md"/>
          
          <br/>
          <hr/>
        </div>
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
          <MetaDatumView :md="md"/>

          
          <br/>
          <hr/>
        </div>
        -->
      </div>
    </div>
  <!-- </div> -->
</template>
<script setup lang="ts">
//TODO hide scrollbar
//TODO show more btns for tags and text
//TODO animation in vs out
const {
  MD_TYPE_TEXT,
  MD_TYPE_TEXT_DATE,
  MD_TYPE_JSON,
  MD_TYPE_KEYWORDS,
  MD_TYPE_PEOPLE,
  MD_TYPE_ROLES
} = madekHelper()

const props = defineProps([
    'activeEntryId',
    'activeSetId',
    'currentTree',
    'setid'
])

const emit = defineEmits(['scrollPosChanged'])

const entry_info_hidden = ref(false)

const scrolled = (event) => {
  const pos = document.getElementsByClassName('entry_info')[0].scrollTop
  //console.log("scrolled: " + pos)
  emit('scrollPosChanged',[pos])
  /* if (pos > 50) {
    entry_info_hidden.value = true;
  }
  else {
    entry_info_hidden.value = false;
  } */
}
</script>
<style>


.entry_info {
  /* border: 1px solid blue; */
  position: fixed;
  
  top: 0px;

  left: calc(50vw + 24px);
  width: calc(50vw + 48px);
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: 0px;
  scrollbar-color: transparent;
}

.entry_info::-webkit-scrollbar {
  visibility: hidden;
}

.entry-info-slide-enter-active {
  transition: all 0.5s linear;
  transform: translateX(50vw);
}
.entry-info-slide-leave-active {
  transition: all 0.5s linear;
}
.entry-info-slide-enter-to {
  transform: translateX(0);
  
}
.entry-info-slide-leave-to {
  transform: translateX(50vw);
}

.entry_info_panel {
  width: calc(50vw - 48px);
  padding: var(--spacing__betweenitemsM, 12px) var(--spacing__betweenitemsM,12px);

    display: flex;
    /* width: 100%; */
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-meta-info-between-sections, 80px);
    flex-shrink: 0;
    margin-bottom: 5rem;
}

.section_entry {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-meta-info-between-sub-sections, 24px);
    align-self: stretch;
}
.section_set {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-meta-info-between-sub-sections, 24px);
    align-self: stretch;

}
.meta_info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-meta-info-between-rows, 6px);
    align-self: stretch;
}
.meta_title {
    user-select: none;

    display: flex;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    color: var(--text-secondary, #CAC9C2);

    /* Subline */
    font-family: "Instrument Sans";
    font-size: var(--font-subline-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-subline-line-height, 24px); /* 120% */
}
.meta_content {
  user-select: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    color: var(--text-primary, #2C2C2C);

    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}

.meta_content * {
    
/* Body */
font-family: "Instrument Sans";
font-size: var(--font-body-font-size, 20px);
font-style: normal;
font-weight: 500;
line-height: var(--font-body-line-height, 24px); /* 120% */
}


.entry_info_title {
  user-select: none;

  position: fixed;
  top: 2.5rem;
  left: 10vw;
  width: 80vw;
  text-align: center;
  align-content: center;
  font-size: 3rem;
  line-height: 3rem;
}

.entry_info_title {
  transition: opacity 50ms linear;
}
.entry_info_title.hidden {
  opacity: 0;
}
</style>