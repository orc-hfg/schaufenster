<template>
  <div>
    <!-- <div id="dummy"></div> -->
    <div class="project_counter" 
      :class="props.settype">
    <!-- :style="info_tree_style" -->
      
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      
      <div class="project_counter_line">&nbsp;</div>
      <div class="project_counter_line">&nbsp;</div>
      
      <div v-for="(treeInfo,idx) in sortedTrees"
        class="project_counter_line"
        :id="'treeInfo_' + treeInfo.col_id">
        <!-- :style="info_tree_style"> -->

        <!-- <div class="back_layer_blur"
          :style="getBlurLineStyle(treeInfoIdx, idx)">
        </div> -->
        <div class="content">
          <!-- :class="getLineClass(treeInfoIdx, idx)"> -->
          <div class="cell">
            {{ treeInfo.colTitlesMap[treeInfo.col_id] }}
          </div>
          
          <!-- HH Bitte prüfen! -->
          <div class="cell"
            v-for="(author, authorIdx) in (treeInfo.cols_authors?.[treeInfo.col_id] || []).slice(0, 3)">
            {{ author }}
          </div>
          <div class="cell" v-if="treeInfo.cols_authors?.[treeInfo.col_id]?.length > 3">
            ...
          </div>
          <!-- <div class="cell"
            v-for="author in treeInfo.cols_authors[treeInfo.col_id]">
            {{ author }}  
          </div> -->
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

// HH deaktiviert, siehe Kommentar Zeile 52
// const {
//     MATCH_DIPLOM
// } = treeHelper()


// HH Vorschlag: statt color per JS zu setzen, dem project_counter mit `:class="props.settype"` eine CSS-Klasse zuweisen.
// Dann können wir per CSS beliebig viele Eigenschaften steueren: Farbe, mix-blend-mode, etc.
// const color = props.settype == MATCH_DIPLOM ? '#FF4D00' : '#2C2C2C'
  
// const info_tree_style = ref({'color': ''})
// info_tree_style.value['color'] = color

// HH deaktiviert, wird ggf. nicht mehr gebraucht, stattdessen Kombination aus Maskierung und mix-blend-mode)
// const getLineClass = (treeInfoIdx:number, idx:number, ): {} => {
//   const diff = (treeInfoIdx - idx)
  
//     return { highlight: (diff == 0) };
// }

</script>
<style>

.project_counter {
  clip-path: margin-box;
  display: block;
  
  /* border:  1px solid blue; */
  position: fixed;
  bottom: 0;

  /* HH gibt es einen bestimmten Grund, warum das Element nach links verschoben wird? 
   * Der Abstand vom Rand könnte doch auch nur über padding geregelt werden, oder?
  */
  /* left: -16px; */
  left: 0;
  /* padding-left: 48px; */
  padding-left: 32px;
  
  /* width: 650px; */
  width: calc(100vw + 32px);
  height: 180px;

  overflow-y: scroll;
  z-index: 980;
  /* transition: all 800ms ease-out; */
  pointer-events: none;
  user-select: none;
  
  /*	für das ausblenden oben und unten: */
  /* mask-image: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%); */
}

/* HH Stil über die CSS-Klasse steuern 
 * inkl. Maske, weil Orange etwas mehr Kontrast braucht.
 * Maske verfeinert in Richtung der von den Designern vorgeschlagenen Werte 10 / 30 / 100
 */
.project_counter.projekt {
  mix-blend-mode: difference;
  filter: contrast(0.5);
  color: white;
  mask-image: linear-gradient(0deg, rgba(0,0,0,0) 15%,rgba(0,0,0,1) 25%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%);
}
.project_counter.diplom {
  color: var(--Primitives-color-identity-Signal-Red);
  mask-image: linear-gradient(0deg, rgba(0,0,0,0) 15%,rgba(0,0,0,1) 25%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%);
}

/* HH Helper zum visualisieren der Maske */
/* #dummy {
  display: block;
  content: '';
  position: absolute;
  z-index: 100;
  width: 3em;
  height: 180px;
  background: linear-gradient(0deg, red 15%,green 25%, green 40%, yellow 50%, yellow 70%, orange 80%, red 100%);
  bottom: 0;
  left: 0;
} */

.project_counter_line {
  /* transition: opacity 550ms linear; */
  /* border: 1px solid red; */
  /* pointer-events: none; */
  display: block;  
  width: fit-content;
  height: 48px;
}

[data-layout="mobile"] {
  .project_counter {
    padding-left: 0;
    border: 1px solid;
    width: 100%;
    .content {
      padding: 0;
    }
    .cell:last-of-type {
      display: none;
    }
  }
}

.content {
  display: flex;
  position: relative;
  top:0px;
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
  padding: var(--padding-item-horizontal-M, 12px);
  justify-content: center;
  align-items: center;
  gap: var(--margin-navbar-institution-logo-right, 10px);

  font-size: 20px;
  font-weight: 400;
}

/* HH wird nicht mehr verwendet, stattdessen mix-blend-mode wenn props.settype = projekt */
/* .highlight {
  text-shadow: var(--Colors-background-default, #F3F2EF) 0px 0 24px;
} */

</style>