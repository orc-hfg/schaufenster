<template>
    <div class="meta_info" v-if="notEmpty(mdSource)">
        <div class="meta_title"
            v-if="notEmpty(mdSource)">
            {{ title }}
        </div>        
        <ul v-if="notEmpty(mdSource)">
            <li v-if="getMDMaterial(mdSource).length">
                <span v-for="(term,idx) in getMDMaterial(mdSource)">
                    {{ (idx !== 0 ? ', ' : '') + term }}
                </span>
            </li>
            <li v-if="mdSource['creative_work:dimension']">
                {{ mdSource['creative_work:dimension'].string }}
            </li>
            <li v-if="mdSource['creative_work:duration']">
                {{ mdSource['creative_work:duration'].string }}
            </li>
            <li v-if="mdSource['creative_work:format']">
                {{ mdSource['creative_work:format'].string }}
            </li>         
        </ul>
    </div> 
</template>
<script setup lang="ts">

const props = defineProps([
    'title',
    'mdSource',
])

const notEmpty = (mdMap:object) => {
  if (mdMap['creative_work:material']
    || mdMap['creative_work:dimension']
    || mdMap['creative_work:duration']
    || mdMap['creative_work:format']) {
    return true
  }
  return false
}

const getMDMaterial = (mdMap:object) => {
  const list: string[] = []
  if (mdMap['creative_work:material']) {
    mdMap['creative_work:material'].selectedKeywords.forEach(kw => {
      list.push(kw.term)
    })
  }
  return list
}

</script>

<style scoped>

ul {
    margin: 0;
    padding: 0;
    padding-left: 1em;
}
/* li::marker {
    color: var(--Colors-text-secondary, #CAC9C2)
} */

</style>