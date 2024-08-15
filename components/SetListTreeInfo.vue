<template>
    <div class="tree_info" 
      :style="info_tree_style">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div v-for="(treeInfo,idx) in sortedTrees" :id="'treeInfo_' + treeInfo.col_id"
          :style="getTreeInfoLineStyle(treeInfoIdx, idx)">
        <span>
          {{ treeInfo.colTitlesMap[treeInfo.col_id] }}
          &nbsp;
        </span>
        <span v-for="author in treeInfo.cols_authors[treeInfo.col_id]">
          {{ author }}
          &nbsp;
        </span>
      </div>
      <!-- <div class="tree_info_blur"></div> -->
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


const info_tree_style = ref({'color': ''})

const color = props.settype == MATCH_DIPLOM ? '#FF4D00' : '#2C2C2C'
  
  info_tree_style.value['color'] = color

const TREE_INFO_OPACITY_DIFF_2 = 0.15; // 0.05
const TREE_INFO_OPACITY_DIFF_1 = 0.45; // 0.15

const getTreeInfoLineStyle = (treeInfoIdx:number, idx:number, ): {} => {
  const diff = (treeInfoIdx - idx)
  const opval = diff >= 2 ? TREE_INFO_OPACITY_DIFF_2 
    : (diff >= 1 ? TREE_INFO_OPACITY_DIFF_1 : 1)
  return { opacity: opval }
}

</script>
<style>
.tree_info {
  position: fixed;
  bottom: 32px;
  
  height: 136px;
  width: calc(100vw - 4rem);
  overflow-y: auto;

  font-size: 20px;
  z-index: 980;
  transition: all 1s linear;

  /* display: inline-flex; */
  padding: 0px 0px 16px 32px;
  /* flex-direction: column; */
  /* justify-content: flex-end; */
  /* align-items: flex-start; */
  /* gap: -64px; */

}
.tree_info * {
  font-size: 32px;
  line-height: 48px;
}
/* .tree_info_blur {
  position: fixed;
  bottom: 16px;
  left: 32px;
  
  height: 162px;
  
  width: calc(100vw - 64px);

  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%) ;
} */

</style>