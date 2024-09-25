<template>    
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

    <div class="section_entry">
      <div class="meta_info"
        style=" height: 15vh">
        <br/>  
        <br/>
      </div>

      
          
      <MetaDatumView
        :title="$t('meta_info.label_title')"
        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:title']"/>                
        
      <MetaDatumView
        :title="$t('meta_info.label_title_en')"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:title_en']"/>                

      <MetaDatumView
        :title="$t('meta_info.label_authors')"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:creator_of_media_object']"/>

      <MetaDatumView
        :title="$t('meta_info.label_copyright')"
        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:copyright_notice']"/>
      <MetaDatumView
        :md="currentTree.entries_meta_data[activeEntryId]['rights:license']"/>

<!--      <MetaDatumView
        :title="$t('meta_info.label_license')"
        :md="currentTree.entries_meta_data[activeEntryId]['rights:license']"/>
        -->


      <MetaDatumView
        title="MediaObject All Text"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:all-text']"/>

      <MetaDatumView
        title="MediaObject All Text (en)"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:all-text_en']"/>

      </div>

      <div class="section_set">
      
        <MetaDatumView
          v-if="isShowParentSetTitle()"
          :title="$t('meta_info.label_project_parent_title')"
          :md="currentTree.cols_meta_data[parentSetId]['madek_core:title']"/>
      
        <MetaDatumView
          :title="$t('meta_info.label_project_title')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:title']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_title_en')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:project_title_en']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_subtitle')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:subtitle']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_subtitle_en')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:project_subtitle_en']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_authors')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:authors']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_category')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:project_category']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_keywords')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:keywords']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_leader')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:project_leader']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_semester')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:semester']"/>
        
        <MetaDatumView
          :title="$t('meta_info.label_project_program_of_study')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:program_of_study']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_description')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:description']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_description_en')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:description_en']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_participants')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:other_creative_participants']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_extra')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:material']"/>
        <MetaDatumView
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:dimension']"/>
        <MetaDatumView
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:duration']"/>
        <MetaDatumView
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:format']"/>
        
        
      </div>
      
      </div>
    </div>
  
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
    'parentSetId'
])

const emit = defineEmits(['scrollPosChanged'])

//const entry_info_hidden = ref(false)

const scrolled = (event) => {
  const pos = document.getElementsByClassName('entry_info')[0].scrollTop
  emit('scrollPosChanged',[pos])
}
const MAX_SET_TITLE_LENGTH = 50;

const isShowParentSetTitle = ():boolean => {
  const pid = props.parentSetId
  if (pid == props.activeSetId) {
    return false
  }
  if (!props.currentTree
      || !props.currentTree.colTitlesMap[pid]
      || !props.currentTree.colTitlesMap[pid].length) {
    return false
  }
  if (props.currentTree.colTitlesMap[pid].length > MAX_SET_TITLE_LENGTH) {
    return true
  }
  return false
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
  padding: var(--spacing-betweenitemsM, 12px) var(--spacing-betweenitemsM,12px);

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

    color: var(--Colors-text-secondary, #CAC9C2);

    /* Subline */
    font-family: "Instrument Sans";
    font-size: var(--font-subline-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-subline-line-height, 24px); /* 120% */
}
.meta_content {
  user-select: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    color: var(--Colors-text-primary, #2C2C2C);

    /* Body */
    font-family: "Instrument Sans";
    font-size: var(--font-body-font-size, 20px);
    font-style: normal;
    font-weight: 400; letter-spacing: 0.02rem;
    line-height: var(--font-body-line-height, 24px); /* 120% */
}

.meta_content * {
      
  /* Body */
  font-family: "Instrument Sans";
  font-size: var(--font-body-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-body-line-height, 24px); /* 120% */
}

/* 
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
} */
</style>