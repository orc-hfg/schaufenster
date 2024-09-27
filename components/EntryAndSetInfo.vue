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
        v-if="isShowLocale(currentTree.entries_meta_data[activeEntryId]['media_object:title_en'])"
        :title="$t('meta_info.label_title_en')"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:title_en']"/>

      <MetaDatumView
        v-else
        :title="$t('meta_info.label_title')"
        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:title']"/>                
        
      

      <MetaDatumView
        :title="$t('meta_info.label_authors')"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:creator_of_media_object']"
        @add-filter="addFilter"
        />

      <MetaDatumView
        :title="$t('meta_info.label_copyright')"
        :md="currentTree.entries_meta_data[activeEntryId]['madek_core:copyright_notice']"
        @add-filter="addFilter"/>
      <MetaDatumView
        :md="currentTree.entries_meta_data[activeEntryId]['rights:license']"
        @add-filter="addFilter"/>

<!--      <MetaDatumView
        :title="$t('meta_info.label_license')"
        :md="currentTree.entries_meta_data[activeEntryId]['rights:license']"/>
        -->

      <MetaDatumView
        v-if="isShowLocale(currentTree.entries_meta_data[activeEntryId]['media_object:all-text_en'])"
        title="MediaObject All Text (en)"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:all-text_en']"/>

      <MetaDatumView
        v-else
        title="MediaObject All Text"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:all-text']"/>

      </div>

      <div class="section_set">
        <MetaDatumView
          v-if="isShowParentSetTitle() && isShowLocale(currentTree.cols_meta_data[parentSetId]['madek_core:title_en'])"
          :title="$t('meta_info.label_project_parent_title')"
          :md="currentTree.cols_meta_data[parentSetId]['madek_core:title_en']"/>

        <MetaDatumView
          v-else-if="isShowParentSetTitle()"
          :title="$t('meta_info.label_project_parent_title')"
          :md="currentTree.cols_meta_data[parentSetId]['madek_core:title']"/>

        <MetaDatumView
          v-if="isShowLocale(currentTree.cols_meta_data[activeSetId]['creative_work:project_title_en'])"
          :title="$t('meta_info.label_project_title_en')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:project_title_en']"/>
        <MetaDatumView
          v-else
          :title="$t('meta_info.label_project_title')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:title']"/>

        <MetaDatumView
          v-if="isShowLocale(currentTree.cols_meta_data[activeSetId]['creative_work:project_subtitle_en'])"
          :title="$t('meta_info.label_project_subtitle_en')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:project_subtitle_en']"/>
        <MetaDatumView
          v-else
          :title="$t('meta_info.label_project_subtitle')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:subtitle']"/>

        
        <MetaDatumView
          :title="$t('meta_info.label_project_authors')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:authors']"
          @add-filter="addFilter"
          />

        <MetaDatumView
          :title="$t('meta_info.label_project_category')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:project_category']"
          @add-filter="addFilter"
          />

        <MetaDatumView
          :title="$t('meta_info.label_project_keywords')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:keywords']"
          @add-filter="addFilter"
          />

        <MetaDatumView
          :title="$t('meta_info.label_project_leader')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:project_leader']"
          @add-filter="addFilter"
          />

        <MetaDatumView
          :title="$t('meta_info.label_project_semester')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:semester']"
          @add-filter="addFilter"
          />
        
        <MetaDatumView
          :title="$t('meta_info.label_project_program_of_study')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:program_of_study']"
          @add-filter="addFilter"
          />

        <MetaDatumView
          v-if="isShowLocale(currentTree.cols_meta_data[activeSetId]['creative_work:description_en'])"
          :title="$t('meta_info.label_project_description_en')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:description_en']"/>
        <MetaDatumView
          v-else
          :title="$t('meta_info.label_project_description')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:description']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_participants')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:other_creative_participants']"
          @add-filter="addFilter"
          />

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
const { 
  locale,
  setLocale
} = useI18n()


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

const emit = defineEmits(['scrollPosChanged','addedFilter'])

const addFilter = (type:string, md:object) => {
  console.log("addFilter: "
    + "type: " + type
    + "data: " + JSON.stringify(md)
  )
  emit("addedFilter", type, md)
}
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


const isShowLocale = (md:object) :boolean => {
  if (locale.value == 'en') {
    if (md && md.string && md.string.length) {
      //console.log("isShowLocale: true")
      return true
    }
  }
  //console.log("isShowLocale: false")
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

</style>