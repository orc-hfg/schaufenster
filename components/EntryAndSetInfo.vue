<template>    
  <div class="entry_info"
    @scroll="scrolled"
    @wheel="scrolled">
        <!-- TODO mobile theme: different layout meta-data; show more/less sizes; btn paddings -->
    <div v-if="!activeEntryId || !currentTree || !currentTree.entries_meta_data">
      No meta data yet.
    </div>
  
    <div class="entry_info_panel" 
      @scroll="scrolled"
      @wheel="scrolled"
      v-else>
  
      <div class="section_entry">
        <div class="meta_info top_gap">
          <br/>  
          <br/>
        </div>
  
        <MetaDatumView
          v-if="isShowParentSetTitle() && isShowLocale(currentTree.cols_meta_data[parentSetId]['madek_core:title_en'])"
          :title="$t('meta_info.label_project_parent_title')"
          :md="currentTree.cols_meta_data[parentSetId]['madek_core:title_en']"/>
        <MetaDatumView
          v-else-if="isShowParentSetTitle()"
          :title="$t('meta_info.label_project_parent_title')"
          :md="currentTree.cols_meta_data[parentSetId]['madek_core:title']"/>

        <MetaDatumView
          v-if="isShowLocale(currentTree.cols_meta_data[activeSetId]['creative_work:project_subtitle_en'])"
          :title="$t('meta_info.label_project_subtitle')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:project_subtitle_en']"/>
        <MetaDatumView
          v-else
          :title="$t('meta_info.label_project_subtitle')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:subtitle']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_authors')"
          :is-selectable="true"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:authors']"
          @add-filter="addFilter"/>
  
        <MetaDatumView
          v-if="isShowLocale(currentTree.cols_meta_data[activeSetId]['creative_work:description_en'])"
          :title="$t('meta_info.label_project_description')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:description_en']"/>
        <MetaDatumView
          v-else
          :title="$t('meta_info.label_project_description')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:description']"/>
  
        <MetaDatumView
          v-if="isShowLocale(currentTree.entries_meta_data[activeEntryId]['media_object:title_en'])"
          :title="$t('meta_info.label_media_title')"
          :md="currentTree.entries_meta_data[activeEntryId]['media_object:title_en']"/>
        <MetaDatumView
          v-else
          :title="$t('meta_info.label_media_title')"
          :md="currentTree.entries_meta_data[activeEntryId]['madek_core:title']"/>
  
        <!-- HH wird nicht mehr benötigt, Lizenz wird individuell ausgegeben -->
        <!--
        <div class="meta_info" >
          <div class="meta_title">
            {{$t('meta_info.label_copyright')}}
          </div>
          <div class="filter_content">
            <span v-for="(term,idx) in getMDLicenceList()">{{ (idx !== 0 ? ', ' : '') + term }}</span>
          </div>
        </div> -->
        
        <MetaDatumView
          :title="$t('meta_info.label_copyright')"
          :md="currentTree.entries_meta_data[activeEntryId]['madek_core:copyright_notice']"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_program_of_study')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:program_of_study']"
          :is-selectable="true"
          @add-filter="addFilter"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_semester')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:semester']"
          :is-selectable="true"
          @add-filter="addFilter"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_category')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:project_category']"
          :is-selectable="true"
          @add-filter="addFilter"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_keywords')"
          :md="currentTree.cols_meta_data[activeSetId]['madek_core:keywords']"
          :is-selectable="true"
          @add-filter="addFilter"/>

        <MetaDatumView
          :title="$t('meta_info.label_project_participants')"
          :md="currentTree.cols_meta_data[activeSetId]['creative_work:other_creative_participants']"
          :is-selectable="true"
          @add-filter="addFilter"/>

        <!-- HH Personen von Medieneinträgen dürfen keine Buttons sein: sie können nicht gefiltert werden. 
          Ref.: https://cloud.hfg-karlsruhe.de/s/37o3rtHMSZ425q3
          Ausgabe als string, comma seperated.
        -->
        <!-- <MetaDatumView
        :title="$t('meta_info.label_authors')"
        :md="currentTree.entries_meta_data[activeEntryId]['media_object:creator_of_media_object']"
        :is-selectable="true"
        @add-filter="addFilter"/> -->
        <div class="meta_info" v-if="getMDMediaCreatorsList().length">
          <div class="meta_title">
            {{$t('meta_info.label_media_authors')}}
          </div>
          <div class="filter_content">
            <span v-for="(term,idx) in getMDMediaCreatorsList()">{{ (idx !== 0 ? ', ' : '') + term }}</span>
          </div>
        </div>

        <!-- HH Lizenz mit Fallback -->
        <div class="meta_info">
          <div class="meta_title">
            {{$t('meta_info.label_license')}}
          </div>
          <div class="filter_content">
            <span v-if="getMDLicence()">
              {{ getMDLicence() }}
            </span>
            <span v-else>
              {{ $t('meta_info.license_fallback') }}
            </span>
          </div>
        </div>

        <MetaDatumView
          :title="$t('meta_info.label_project_leader')"
          :md="currentTree.cols_meta_data[activeSetId]['institution:project_leader']"
          :is-selectable="true"
          @add-filter="addFilter"/>
          
          <MetaDatumViewMaterial
          :title="$t('meta_info.label_project_material')"
          :mdSource="currentTree.cols_meta_data[activeSetId]"
          />

        <!-- link to entry in madek -->
        <div class="meta_info">
          <div class="meta_title">
            {{$t('meta_info.label_madek_source')}}
          </div>
          <div class="filter_content">
            <a class="btn_round"
              :href="useRuntimeConfig().public.apiBaseUrl + '/entries/' + activeEntryId">
              {{$t('meta_info.label_madek_source_link')}}
              <IconsLink/>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>  
</template>
<script setup lang="ts">

const { 
  locale
} = useI18n()

const runtimeConfig = useRuntimeConfig()

//TODO animation in vs out

const props = defineProps([
    'activeEntryId',
    'activeSetId',
    'currentTree',
    'parentSetId'
])

const emit = defineEmits(['scrollPosChanged','addedFilter'])

const addFilter = (type:string, md:object) => {
  /* console.log("addFilter:"
    + " type: " + type
    + " data: " + JSON.stringify(md)
  ) */
  emit("addedFilter", type, md)
}
//const entry_info_hidden = ref(false)

const scrolled = (event) => {
  const pos = document.getElementsByClassName('entry_info')[0].scrollTop
  emit('scrollPosChanged',[pos])
}


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
  if (props.currentTree.colTitlesMap[pid].length > runtimeConfig.public.SET_VIEW_PROJECT_TITLE_MAX_LENGTH) {
    return true
  }
  return false
}

const isShowActiveSetTitle = ():boolean => {
  if (props.parentSetId !== props.activeSetId) {
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


// HH Eintrag Lizenz vorhanden?
const getMDLicence = ():string => {
  const mdMap = props.currentTree.entries_meta_data[props.activeEntryId]
  let resultText = ''
  if (mdMap['rights:licence']) {
    resultText = mdMap['rights:licence'].selectedKeywords[0].term
  }
  return resultText
}

// HH Personen von Medieneinträgen dürfen keine Buttons sein: sie können nicht gefiltert werden. 
const getMDMediaCreatorsList = ():string[] => {
  const mdMap = props.currentTree.entries_meta_data[props.activeEntryId]
  let list = [] as string[]
  if (mdMap['media_object:creator_of_media_object']) {
    mdMap['media_object:creator_of_media_object'].selectedPeople.forEach(kw => {
      list.push(kw.searchable)
    })
  }
  console.log("getMDMediaCreatorsList: " + list)
  return list
}

</script>
<style>

.entry_info {
  position: fixed;
  top: 0px;
  left: 50vw;
  width: 50vw;
  height: 100vh;

  overflow-y: auto;

  scrollbar-width: 0px;
  scrollbar-color: transparent;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  z-index: 10;
  
  background-color: var(--Colors-background-default);
  justify-content: center;
}

.entry_info::-webkit-scrollbar {
  visibility: hidden;
}

/* 
 * toggle meta data 
 */

.entry_info {
  transition: all 300ms ease-in;
  /* transition-delay: 300ms; */
}
.entry_info.hidden {
  transform: translateX(50vw);
  transition: all 300ms ease-out;
  /* "Kaugummi"-Effekt verhindern */
  /* Siehe https://cloud.hfg-karlsruhe.de/index.php/f/1918387 */
  visibility: hidden;
}

.entry_info_panel {
  /* border: 1px solid red; */
  width: calc(100% - 80px);
  margin:auto;
  padding: var(--spacing-between-items-M, 12px) var(--spacing-between-items-M,12px);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-meta-info-between-sections, 80px);
    flex-shrink: 0;
    margin-bottom: 5rem;
}

[data-layout="mobile"] {

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
.meta_info.top_gap {
  height: 15vh;
}
[data-layout="mobile"] {
  .meta_info.top_gap {
    height: 48px;
  }
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
      
  color: var(--Colors-text-primary, #2C2C2C);
  
  /* Body */
  font-family: "Instrument Sans";
  font-size: var(--font-body-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-body-line-height, 24px); /* 120% */
}

.filter_content {

}

.btn_round {
  user-select: none;

  display: flex;
  /* height: var(--dimension-button-height-M, 48px); */
  height: var(--dimension-button-height-S, 32px);
  padding: var(--padding-item-vertical-S, 8px) var(--padding-item-horizontal-M, 12px);
  align-items: center;
  gap: var(--spacing-item-inner, 8px);

  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--Colors-filter-chip-fill-outline, #CAC9C2);

  color: var(--Colors-text-primary, #2C2C2C);
  text-decoration: none;
    
  font-family: "Instrument Sans";
  font-size: var(--font-body-font-size, 20px);
  font-style: normal;
  font-weight: 400; letter-spacing: 0.02rem;
  line-height: var(--font-body-line-height, 24px); /* 120% */
}

.btn_round:hover {
    background: var(--Colors-filter-chip-fill-hover, #E7E6E1);
}

</style>