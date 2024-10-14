<template>
  <div>
    <div class="project_counter_highlight" >
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line hightlight">
        <div class="back_layer_blur"
          v-show="treeInfoIdx == idx"
          :style="getBlurLineStyle(treeInfoIdx, idx)">
        </div>
        <div class="content">&nbsp;</div>
      </div>
      <div class="project_counter_line">&nbsp;</div>
    </div>
    <div class="project_counter" 
      :style="info_tree_style">
      
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      
      
      <div v-for="(treeInfo,idx) in sortedTrees"
        class="project_counter_line"
        :class="{highlight: treeInfoIdx == idx}"  
        :id="'treeInfo_' + treeInfo.col_id"
        :style="getTreeInfoLineStyle(treeInfoIdx, idx)">

        <!-- <div class="back_layer_blur"
          v-show="treeInfoIdx == idx"
          :style="getBlurLineStyle(treeInfoIdx, idx)">
        </div> -->
        <div class="content">
          <div class="cell">
            {{ treeInfo.colTitlesMap[treeInfo.col_id] }}
          </div>
          <div class="cell"
            v-for="author in treeInfo.cols_authors[treeInfo.col_id]">
            {{ author }}  
          </div>
        </div>
        
      </div>
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps([
    'settype',
    'sortedTrees',
    'treeInfoIdx'])

const {
    MATCH_DIPLOM
} = treeHelper()



const color = props.settype == MATCH_DIPLOM ? '#FF4D00' : '#2C2C2C'
const set_type_color = ref(color)

const info_tree_style = ref({'color': ''})
info_tree_style.value['color'] = color

const OPACITY_DIFF_3 = 0.0
const OPACITY_DIFF_2 = 0.10; // 0.05
const OPACITY_DIFF_1 = 0.30; // 0.15

const getDiffOpacity = (diff) => {
  let opval = 0.0;
  if (diff >= 3) {
    opval = OPACITY_DIFF_3
  }
  else if (diff >= 2) {
    opval = OPACITY_DIFF_2
  } else if (diff >= 1) {
    opval = OPACITY_DIFF_1
  } else if (diff == 0) {
    opval = 1.0
  }
  return opval
}
const getBlurLineStyle = (treeInfoIdx:number, idx:number, ): {} => {
  const diff = (treeInfoIdx - idx)
  const style = getTreeInfoLineStyle(treeInfoIdx, idx)
  const opval = getDiffOpacity(diff)
  style['background-color'] = 'rgba(243,242,239, ' + opval + ')'
  return style
}
const getTreeInfoLineStyle = (treeInfoIdx:number, idx:number, ): {} => {
  const diff = (treeInfoIdx - idx)
  const opval = getDiffOpacity(diff)
  return { opacity: opval, 
    'border-color': set_type_color.value }
}

</script>
<style>


.project_counter {
  /* clip-path: margin-box; */
  display: block;
  
  /* border:  1px solid blue; */
  position: fixed;
  bottom: 0px;
  left: -16px;
  
  /* width: 650px; */
  width: 35vw;
  height: 240px;

  padding-left: 48px;

  overflow-y: scroll;

  z-index: 980;
  transition: all 800ms ease-out;

  /* direction: rtl; */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.project_counter::-webkit-scrollbar {
  display: none;
}


.project_counter_line {
  user-select: none;
  transition: opacity 550ms linear;
  
  /* border: 1px solid red; */
  display: block;
  
  width: fit-content;
  height: 48px;
  opacity: 0;
  /* direction: ltr; */
}


.project_counter .project_counter_line.highlight {
  border-radius: 9999px;
  border: 1px solid red;
  backdrop-filter: blur(15px);
  background-color: rgba(255,255,255, 0.4)
}


.back_layer_blur {
  display: block;
  position: relative;
  top:0px; left: 0px;
  width: 100%; height: 48px;
  background-color: var(--Colors-background-default, #F3F2EF);
  filter: blur(90px);
}

.content {
  display: inline-block;
  position: relative;
  top:-48px;
  top: 0px;
  left: 0px;
  height: 48px;
  width: fit-content;
  
  display: flex;
  padding: 0 20px;
  align-items: center;

  
}
.cell {
  /* border: 1px solid green; */
  display: inline-block;
  width: fit-content;
  overflow: hidden;
  height: 48px;
  padding: var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);

  font-size: 20px;
  font-weight: 400;
  line-height: 48px;
}

</style>