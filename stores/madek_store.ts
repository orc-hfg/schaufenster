import { 
    type AppSettingsListData,
    type KeywordsDetailData,
    type ContextKeysDetailData,
    type ContextsDetailData,
    type MetaKeysDetailData,
    type VocabulariesDetailData } from '../generated/data-contracts';

import { apiHelper } from '../utils/apiHelper';
import { defineStore } from 'pinia'

const { api } = apiHelper()


export const useMadekStore = defineStore('madek', {

    state: () => ({
        loaded: false as boolean,
        appSettings: {} as AppSettingsListData,
        contextsMap: new Map<string, ContextsDetailData>(),

        contextKeysMap_context_id_meta_key_id: new Map<string, Map<string, ContextKeysDetailData>>(),

        publicMetaKeysMap: new Map<string, MetaKeysDetailData>(),
        publicVocabularies: new Map<string, VocabulariesDetailData>(),

        keywords: new Array<KeywordsDetailData>(),
        keywordsMap: new Map<string, KeywordsDetailData>(),
        //keywordsByMetaKeyMap: new Map<string, Array<KeywordsDetailData>>(),
    
    }),
    getters: {

    },
    actions: {

        reset() {
            this.loaded = false
            this.appSettings = {} as AppSettingsListData
            this.contextsMap.clear()
            this.contextKeysMap_context_id_meta_key_id.clear()
            
            this.publicMetaKeysMap.clear()
            this.publicVocabularies.clear()

            this.keywords.length = 0
            this.keywordsMap.clear()
            //this.keywordsByMetaKeyMap.clear()
        },
        async initPublic() {
            this.reset()
            try{
  
                this.appSettings = (await api.api.appSettingsList()).data
                
                const contexts = (await api.api.contextsList()).data
                contexts?.map((c: ContextsDetailData) => {
                    this.contextsMap.set(c.id, c)
                })
                
                const contextKeys = (await api.api.contextKeysList()).data
                contextKeys?.map((c: ContextKeysDetailData) => {
                    if (!this.contextKeysMap_context_id_meta_key_id.has(c.context_id)) {
                        this.contextKeysMap_context_id_meta_key_id.set(c.context_id, new Map<string,ContextKeysDetailData>())
                    }

                    this.contextKeysMap_context_id_meta_key_id.get(c.context_id)?.set(c.meta_key_id, c)
                })

                const pubMKeys = (await api.api.metaKeysList()).data['meta-keys']
                pubMKeys?.map((m: MetaKeysDetailData) => {
                    this.publicMetaKeysMap.set(m.id, m)
                })

                this.loaded = true
            } catch(ex) {
                console.error("Could not load madek app settings." + JSON.stringify(ex))
                throw ex
            }
        },
      


    }
})

