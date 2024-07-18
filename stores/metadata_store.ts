

import { apiHelper,
    //type iCollection, 
    type iMediaFile,
    //type iMetaData,
    type iPreview
 } from '../utils/apiHelper';
import { defineStore } from 'pinia'
import { madekHelper, type iGenMetaData } from '../utils/madekHelper';
import { errorHelper } from '../utils/errorHelper';


const { api } = apiHelper()
const {
    RKEY_ENTRY, RKEY_COLLECTION,
    MD_TYPE_KEYWORDS,
    MD_TYPE_PEOPLE,
    MD_TYPE_ROLES,

    MD_KEYWORDS,
    MD_PEOPLE,
    MD_ROLES,
    isMetaKeyObjectType,
} = madekHelper()
const { handle_error } = errorHelper()

export interface iMetaDataMap {
    [key: string]: iGenMetaData,
}
export interface iResourceMetaDataMap {
    [key: string]: iMetaDataMap,
}
export interface iFileMap {
    [key: string]: iMediaFile,
}
export interface iPreviewMap {
    [key: string]: iPreview,
}
export interface iResourcePreviewMap {
    [key: string]: iPreviewMap,
}


export const useMetadataStore = defineStore('metadata', {

    state: () => ({
        metaDataMap: {} as iResourceMetaDataMap,
        metaDataRMap: {} as iResourceMetaDataMap,
        
        fileMap: {} as iFileMap,
        previewMap: {} as iResourcePreviewMap,


    }),
    getters: {},
    actions: {
        reset() {

        },
      
       
        checkResourceId(resId: string) {
            if (!resId) {
                const msg = `ERROR: invalid resource id [${resId}]`
                console.error(msg)
                throw msg
            }
        },
        checkResourceKey(resKey:string) {
            switch(resKey) {
                case RKEY_COLLECTION:
                case RKEY_ENTRY:
                    return
                default:
                    const msg = `ERROR: invalid resource key [${resKey}]`
                    console.error(msg)
                    throw msg
            }

        },
        getApiMetaData(resKey: string, resId: string, cbOk:any, cbError: any) {
            this.checkResourceId(resId)
            this.checkResourceKey(resKey)

            switch(resKey) {
                case RKEY_COLLECTION:
                    api.api.collectionMetaDataDetail(resId, {})
                    .then(resp => {
                        cbOk(resp.data.meta_data) // ['meta-data'])
                    })
                    .catch(error => {
                        handle_error('getMetaData:', error)
                        cbError(error)
                    })
                    break;
                case RKEY_ENTRY:
                    api.api.mediaEntryMetaDataDetail(resId, {})
                    .then(resp => {
                        cbOk(resp.data.meta_data) // ['meta-data'])
                    })
                    .catch(error => {
                        handle_error('getMetaData:', error)
                        cbError(error)
                    })
                    break;
            }
        },
        getCachedMetaData(resKey: string, resId: string, cbOk:any, cbError:any) {
            
            if (!this.metaDataMap[resKey]) {
                this.metaDataMap[resKey] = {} as iMetaDataMap
            }
            if (!this.metaDataMap[resKey][resId]) {
                this.metaDataMap[resKey][resId] = {} as iGenMetaData
                this.getApiMetaData(resKey, resId, (data) => {

                    data.forEach((md:iGenMetaData) => {
                        this.metaDataMap[resKey][resId][md.meta_key_id] = md
                    })
                    cbOk(this.metaDataMap[resKey][resId])
                    
                }, (error:any) => {
                    cbError(error)
                })
            }
            else {
                //console.log(`already cached meta data: ${resKey} / ${resId} `)
                cbOk(this.metaDataMap[resKey][resId])
            }
        },

        getApiMetaDataRelated(resKey: string, resId: string, cbOk:any, cbError: any) {
            this.checkResourceId(resId)
            this.checkResourceKey(resKey)

            switch(resKey) {
                case RKEY_COLLECTION:
                    api.api.collectionMetaDataRelatedDetail(resId, {})
                    .then(resp => {
                        cbOk(resp.data)
                    })
                    .catch(error => {
                        handle_error('getCMDRelated:', error)
                        cbError(error)
                    })
                    break;
                case RKEY_ENTRY:
                    api.api.mediaEntryMetaDataRelatedDetail(resId, {})
                    .then(resp => {
                        //console.log("got entry md " + resId + " : ")
                        cbOk(resp.data)
                    })
                    .catch(error => {
                        
                        console.error("got error entry md " + resId + " : "+ JSON.stringify(error))
                        console.trace()
                        handle_error('getCMDRelated:', error)
                        cbError(error)
                    })
                    break;
            }
        },
        getCachedMetaDataRelated(resKey: string, resId: string, force: boolean, cbOk:any, cbError:any) {
            
            this.metaDataRMap[resKey] = this.metaDataRMap[resKey] || {} as iMetaDataMap

            if (!this.metaDataRMap[resKey][resId] || force) {
                this.metaDataRMap[resKey][resId] = {} as iGenMetaData
            
                const onOk = (data) => {

                    try {
                        data.forEach(mdMap => {
                            const md = mdMap['meta-data']
                            this.metaDataRMap[resKey][resId][md.meta_key_id] = md
    
                            debugger
                            if (md.type == MD_TYPE_PEOPLE) {
                                this.metaDataRMap[resKey][resId][md.meta_key_id].selectedPeople = mdMap[MD_PEOPLE]
                            }
                            else if (md.type == MD_TYPE_KEYWORDS) {
                                this.metaDataRMap[resKey][resId][md.meta_key_id].selectedKeywords = mdMap[MD_KEYWORDS]
                            }
                            else if (md.type = MD_TYPE_ROLES) {
                                this.metaDataRMap[resKey][resId][md.meta_key_id].selectedRoles = []
                                if (force) {
                                    api.api.metaDataDetail(md.id).then(resp => {
                                        const data = resp.data;
                                        //console.log("got roles data: " + JSON.stringify(data))
                                        const md_role_ids = data.value
                                        md_role_ids.forEach(role_item => {
                                            const md_role_id = role_item.id
                                            //console.log(" got md role id " + md_role_id)
                                            api.api.metaDataRoleDetail(md_role_id).then(resp => {
                                                const roleData = resp.data
                                                //console.log("got md role data: " + JSON.stringify(roleData))
                                                
                                                api.api.peopleDetail(roleData.person_id).then(resp => {
                                                    const pData = resp.data
                                                    //console.log("got md role person data: " + JSON.stringify(pData))
                                                    roleData.person = pData
                                                    //roleData.searchable = pData.first_name + ' ' + pData.last_name;
                                                    this.metaDataRMap[resKey][resId][md.meta_key_id].selectedRoles.push(roleData)
                                                }).catch(error => {
                                                    console.error("could not get md role people data: " + error)
                                                    throw error
                                                }) 
                                            }).catch(error => {
                                                console.error("could not get md role data: ")
                                                throw error
                                            })
                                        })
    
                                    })
                                }
                                //this.metaDataRMap[resKey][resId][md.meta_key_id].selectedRoles = mdMap[MD_ROLES]
                            }
                            // TODO roles
                        });
                    } catch(error) {

                        console.error("got error on md caching:" + error + ":"  + error.stack)
                        console.trace()
                    }
                    
                    
                    cbOk(this.metaDataRMap[resKey][resId])
                    
                }
                const onError = (error) => {
                    console.trace()
                    cbError(error)
                }
                this.getApiMetaDataRelated(resKey, resId, onOk, onError)
            }
            else {
                //console.log(`already cached meta data: ${resKey} / ${resId} : ${JSON.stringify(this.metaDataRMap[resKey][resId])}`)
                cbOk(this.metaDataRMap[resKey][resId])
            }
        },


    }

})