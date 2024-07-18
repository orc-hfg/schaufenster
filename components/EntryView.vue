<template>
    <div>
        <p>Entry: {{ entry.id }}
            <br/>
            T: <span>{{ currentTree.entryTitlesMap[entry.id] }}</span>
            <br/>
            ATS: <span>{{ currentTree.entries_authors && currentTree.entries_authors[entry.id] }}</span>
            <br/>
            Media Type: {{ currentTree.previewsLarge[entry.id]?.media_type }}
            <br/>
            H/V: {{ currentTree.previewsLarge[entry.id]?.width / currentTree.previewsLarge[entry.id]?.height }} }}
            <br/>
            <div v-if="currentTree.previewsLarge[entry.id]?.media_type == 'audio'">
                AF
                <audio controls>
                    <source :src="previewLargeUrl(entry.id)" type="audio/mpeg">
                </audio> 
            </div>
            <div v-if="currentTree.previewsLarge[entry.id]?.media_type == 'video'">
                S: <img :src="previewUrl(entry.id)" style="width: 100px; height: auto"/>
                VF
                <video controls  style="width: 320px; height: auto" >
                    <source :src="previewLargeUrl(entry.id)">
                </video>
            </div>
            <div v-if="currentTree.previewsLarge[entry.id]?.media_type == 'image'">
                <!-- <img :src="previewUrl4Entry(entry.id)" style="width: 100px; height: auto"/> -->
                S: <img :src="previewUrl(entry.id)" style="width: 100px; height: auto"/>
                L: <img :src="previewLargeUrl(entry.id)" style="width: 100px; height: auto"/>
            </div>
            <div v-if="currentTree.previews[entry.id]?.media_type == 'document'">
            DF
            </div>

            <!-- EMD: {{ currentTree.entries_meta_data[entry.id] }}             -->
            <!-- PVS {{ currentTree.previews[entry.id] }}<br/> -->
            <!-- PVL {{ currentTree.previewsLarge[entry.id] }}<br/> -->
            
        <!-- E: {{ entry }} -->
        </p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['currentTree', 'entry'])
const { apiConfig } = apiHelper()
const apiBaseUrl = apiConfig.baseUrl + '/api-v2/'

const previewUrl4Entry = (eId: string): string => {
  return apiBaseUrl + 'media-entry/' + eId + '/preview/data-stream'
}

const previewUrl = (eId: string): string => {
  const pid = props.currentTree.previews[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}
const previewLargeUrl = (eId: string): string => {
  const pid = props.currentTree.previewsLarge[eId]?.id
  return apiBaseUrl + 'previews/' + pid + '/data-stream'
}

</script>
