   

import { ref, reactive, toRefs } from 'vue'



import { apiHelper, type iPerson, type iMLObj } from './apiHelper';
import { errorHelper } from './errorHelper';
import { 
    //type AppSettingsListData,
    //type ContextsDetailData,
    type ContextKeysDetailData,
    type MetaKeysDetailData, 
    type KeywordsDetailData,
    type PeopleDetailData,
    type MetaDataRoleDetailData,
    //type MediaEntryMetaDatumPeopleDetailData
} from '../generated/data-contracts';

import { useMadekStore } from '../stores/madek_store';
//import { useMetadataStore } from '../stores/metadata_store';

export enum MLType {
    labels = 'labels',
    descriptions = 'descriptions',
    hints = 'hints'
}

      
export interface iGenMetaData {
    [key: string]: iGenMetaDatum,
}
export interface iGenMetaDatum {
    meta_key_id: string,
    type: string,
    "string": string,
    "json": string,
    selectedKeywords: Array<KeywordsDetailData>,
    selectedPeople: Array<PeopleDetailData>,
    selectedRoles: Array<MetaDataRoleDetailData>,
}


export interface iMadekState {
    madekLoading: boolean;
   
    imgCache: Map<string, string>;
    previewCache: Map<string, Map<string, string>>;

    //userCache: Map<string, iUser>;
    peopleCache: Map<string, iPerson>;
}

const state = reactive<iMadekState>({
    madekLoading: true,
   
    imgCache: new Map<string, string>(),
    previewCache: new Map<string, Map<string, string>>(),

    //userCache: new Map<string, iUser>(),
    peopleCache: new Map<string, iPerson>(),
})




export const madekHelper = () => {

    const RKEY_ENTRY = 'media_entry_id'
    const RKEY_COLLECTION = 'collection_id'

    const MKEY_TITLE = 'madek_core:title'
    const MKEY_AUTHORS = 'madek_core:authors'

    const MD_TYPE_KEYWORDS = 'MetaDatum::Keywords'
    const MD_TYPE_PEOPLE = 'MetaDatum::People'
    const MD_TYPE_ROLES = 'MetaDatum::Roles'
    const MD_TYPE_TEXT = 'MetaDatum::Text'
    const MD_TYPE_TEXT_DATE = 'MetaDatum::TextDate'
    const MD_TYPE_JSON = 'MetaDatum::JSON'

    
    const MD_KEYWORDS = 'keywords'
    const MD_PEOPLE = 'people'
    const MD_ROLES = 'roles'

    const MD_KEYWORDS_DATA = 'md_keywords'
    const MD_PEOPLE_DATA = 'md_people'
    const MD_ROLES_DATA = 'md_roles'


    const { api } = apiHelper()
    

    const { handle_error } = errorHelper()

    const initMadek = async () => {

        const madek_store = useMadekStore()
        try {
            await madek_store.initPublic()
            
        }
        catch(ex) {
            console.error("Could not load app settings", ex)
            handle_error("Could not load app settings",ex)
        }
    }

    const getContext = (context_id: string) => {
        const madek = useMadekStore()
        return madek.contextsMap.get(context_id)
    }


    const getContextKeysForContext = (context_id:string) => {
        const madek = useMadekStore()
        const result = new Array<ContextKeysDetailData>()
        const cks = madek.contextKeysMap_context_id_meta_key_id.get(context_id)?.forEach(ck => {
            result.push(ck)
        })
        const sorted = result.sort((a,b) => {
            return a.position - b.position
        })
        
        return sorted
    }

    const getMetaKey = (meta_key_id: string):MetaKeysDetailData|undefined => {
        const madek = useMadekStore()
        const result = madek.publicMetaKeysMap.get(meta_key_id)
        //console.log("public got mk: " + meta_key_id + ":" + JSON.stringify(result))
        return result
    }

    const checkAllLoaded = () => {
        let result = true;
        
        const madek = useMadekStore()
     

        if (!madek.appSettings.default_locale) {
          result = false
        }
        
        if (madek.contextsMap.size == 0) {
          result = false
        }
        /*
        if (madek.keywordsMap.size == 0) {
            return false
        }
            */
        if (madek.publicMetaKeysMap.size == 0) {
            result = false
        }

        state.madekLoading = !result
        return result;
    }

    const DEFAULT_LOCALE = 'de'
    enum ML_LOCS {
        de = 'de',
        en = 'en'
    }
    const getDefaultLocale = (): string => {
        const madek = useMadekStore()
        return madek.appSettings.default_locale || DEFAULT_LOCALE
    }

    

    const getMLValue = (data: object, type: MLType) : string|undefined =>{
        const loc = getDefaultLocale()
        if (!data
            || !data[type]
            || !data[type][loc]) {
                console.debug('getMLValue: no value for ' + type + ' and locale: ' + loc)
                return undefined
        }
        return data[type][loc]
    }
    const getContextML = (context_id: string, type: MLType): string|undefined => {
        const madek = useMadekStore()
        
        const context = madek.contextsMap.get(context_id)
        if (!context || !context.id) {
            console.error("No such context: " + context_id )
            return context_id
        }
        return getMLValue(context, type)
    }
/*
    const getMLObj = (data: object, type: string) :iMLObj|undefined => {

        if (type === 'labels') {
            return data.labels as iMLObj
        } else if (type === 'descriptions') {
            return data.descriptions as iMLObj
        } else {
            console.error('invalid/unknnown ML type')
            return undefined
        }
    }*/

    const getMetaKeyML = (meta_key_id: string, type: MLType): string|undefined => {
        const mk = getMetaKey(meta_key_id)
        if (!mk || !mk.id) {
            console.error("No such meta-key: " + meta_key_id )
            return undefined
        }
        return getMLValue(mk, type)
    }
    /*
    const getMetaKeyKeywords = (meta_key_id: string) => {
        const madek = useMadekStore()
        return madek.keywordsByMetaKeyMap.get(meta_key_id)
    }*/


    const getMetaData = (resKey: string, resId: string, cbOk:any, cbError: any) => {
        if (!resId) {
            console.log("ABORT: invalid resource id.")
            cbOk(null)
            return
        }
        if (resKey === 'collection_id') {
            api.api.collectionMetaDataDetail(resId, {})
            .then(resp => cbOk(resp.data))
            .catch(error => {
                handle_error('getMetaData:', error)
                cbError(error)
            })
        }
        else if (resKey === 'media_entry_id') {
            api.api.mediaEntryMetaDataDetail(resId, {})
            .then(resp => cbOk(resp.data))
            .catch(error => {
                handle_error('getMetaData:', error)
                cbError(error)
            })
        }
        else {
            console.error("getMetaData: unsupported resource key.")
        }
    }

    const getMetaDataRelated = (resKey: string, resId: string, cbOk:any, cbError: any) => {
        if (!resId) {
            console.log("getMetaDataRelated: ABORT: invalid resource id.")
            cbOk(null)
            return
        }
        if (resKey === RKEY_COLLECTION) {
            api.api.collectionMetaDataRelatedDetail(resId, {})
            .then(resp => cbOk(resp.data))
            .catch(error => {
                handle_error('getMetaDataRelated:', error)
                cbError(error)
            })
        }
        else if (resKey === RKEY_ENTRY) {
            api.api.mediaEntryMetaDataRelatedDetail(resId, {})
            .then(resp => cbOk(resp.data))
            .catch(error => {
                handle_error('getMetaDataRelated:', error)
                cbError(error)
            })
        }
        else {
            console.error("getMetaDataRelated: unsupported resource key.")
        }
    }
    const getCollectionMetaDataText = (col_id: string, meta_key_id: string, cbOK: any) => {
        const mkid = encodeURIComponent(meta_key_id)
        api.api.collectionMetaDatumDetail(col_id, mkid)
            .then(resp => {
                const val = resp.data.meta_data.string
                cbOK(val)
            })
            .catch(error => handle_error('getCollectionMetaDataText', error))
    }


    const getEntryMetaDataText = (e_id: string, meta_key_id: string, cbOK: any) => {
        const mkid = encodeURIComponent(meta_key_id)
        api.api.mediaEntryMetaDatumDetail(e_id, mkid)
            .then(resp => {
                const val = resp.data.meta_data.string
                cbOK(val)
            })
            .catch(error => handle_error('getEntryMetaDataText', error))
    }

    const getMetaDataText = (resourceKey: string, resourceId: string, meta_key_id:string, cbOk:any) => {
        const mkid = encodeURIComponent(meta_key_id)
        if (resourceKey === RKEY_COLLECTION) {
            api.api.collectionMetaDatumDetail(resourceId, mkid)
            .then(resp => cbOk(resp.data))
            .catch(error => handle_error('getMetaDataText', error))
        }
        else if (resourceKey === RKEY_ENTRY) {
            api.api.mediaEntryMetaDatumDetail(resourceId, mkid)
            .then(resp => cbOk(resp.data))
            .catch(error => handle_error('getMetaDataText', error))
        }
        else {
            console.error("getMetaDataText: unsupported resource key.")
        }
    }

    


    const getCollectionTitle =(col_id: string, cbOK: any) => {
        getCollectionMetaDataText(col_id, MKEY_TITLE, cbOK)
    }
    const getEntryTitle = (id: string, cbOK: any) => {
        getEntryMetaDataText(id, MKEY_TITLE, cbOK)
    }

    const getMetaKeyObjectType = (meta_key_id: string) => {
        const metaKey = getMetaKey(meta_key_id)
        if (metaKey && metaKey.meta_datum_object_type) {
              return metaKey.meta_datum_object_type
        }
        return undefined
    }
    const isMetaKeyObjectType = (meta_key_id: string, type: string) => {
        const metaKey = getMetaKey(meta_key_id)
        if (metaKey && metaKey.meta_datum_object_type &&
            metaKey.meta_datum_object_type === type) {
              return true
        }
        return false;
    }


    const getMetaDataExtended = (resourceKey: string, resourceId: string,
        metaKeyId: string, cbOk:any, onError: any) => {

        const mkid = encodeURIComponent(metaKeyId)

        if (resourceKey === RKEY_COLLECTION) {
            api.api.collectionMetaDatumDetail(resourceId, mkid)
                .then(resp => cbOk(resp.data))
                .catch(error => {
                    if (onError) onError(error) 
                })
        }
        else if (resourceKey === RKEY_ENTRY) {
            api.api.mediaEntryMetaDatumDetail(resourceId, mkid)
                .then(resp => cbOk(resp.data))
                .catch(error => {
                    if (onError) onError(error) 
                })
        }
        else {
            console.error("Invalid resource key")
        }

    }  


    const loadResourceMetaData = (resKey:string, resId:string, into_meta_data: any, cbFinished:any) => {
        /*
        mdStore.getCachedMetaDataRelated(resKey, resId, true, (data) => {
            console.log("got meta data related: " + JSON.stringify(data))
            data.forEach(md => {
                into_meta_data[md.meta_key_id] = md
            })
            debugger
        }, (error) => {
            console.error("Could not get meta data related: " + JSON.stringify(error))
        })
        */
        getMetaDataRelated(resKey, resId, (json) => {
            console.log("got meta data related: " + JSON.stringify(json))
            
            json.forEach(mdMap => {
                const md = mdMap.meta_data
                into_meta_data[md.meta_key_id] = md
                if (isMetaKeyObjectType( md.meta_key_id, MD_TYPE_PEOPLE)) {
                    const mdpeople = mdMap[MD_PEOPLE]
                    into_meta_data[md.meta_key_id].selectedPeople = mdpeople
                }
                else if (isMetaKeyObjectType( md.meta_key_id, MD_TYPE_KEYWORDS)) {
                    const mdkws = mdMap[MD_KEYWORDS]
                    into_meta_data[md.meta_key_id].selectedKeywords = mdkws
                }
                // TODO roles
            });
            console.log("got meta data related: into: " + JSON.stringify(into_meta_data))
            if (cbFinished) cbFinished()
        }, (error:any) => {
            console.error("Could not get meta data related: " + JSON.stringify(error))
        })
        
    }
   
    const createiGenMetaData = () => {
        const md : iGenMetaData = {
           //data: new Map<string, iGenMetaDatum>()
        }
        return md
    }
     
      
    const getMLText = (obj: iMLObj) => {
        return obj[getDefaultLocale()]
    }

    const asyncApplyPreviewData = (entryId:string, cb:any, size?: string|'small') => {

        size = size || 'small'
        if (state.previewCache.has(entryId)
            && state.previewCache.get(entryId)?.has(size)) {
            
                console.log("Preview for " + entryId + " size: " + size + " already cached")
                const imgData = state.previewCache.get(entryId)?.get(size)
                cb(imgData)
                return
        }
        if (!state.previewCache.has(entryId)) {
            state.previewCache.set(entryId, new Map<string,string>())
        }
        
        api.api.mediaEntryPreviewDataStreamDetail(entryId, { size: size })
            .then(resp => resp.blob())
            .then(blob => {
                console.log("Preview for " + entryId + " size: " + size + "got blob")
                const imgData = URL.createObjectURL(blob)

                state.previewCache.get(entryId)?.set(size, imgData)
                //state.imgCache.set(entryId, imgData)
                //console.log("assigned loaded image for " + entryId)
                cb(imgData)
            })
            .catch(error => {
                //state.previewCache.get(entryId)?.set(size, undefined)
                console.log("Preview for " + entryId + " size: " + size + "got blob")
                cb(undefined)
            })
          
    }



    return {
        DEFAULT_LOCALE,
        ML_LOCS,
        MLType,

        RKEY_ENTRY,
        RKEY_COLLECTION,

        MKEY_TITLE,
        MKEY_AUTHORS,

        MD_TYPE_PEOPLE,
        MD_TYPE_KEYWORDS,
        MD_TYPE_ROLES,
        MD_TYPE_TEXT,
        MD_TYPE_TEXT_DATE,
        MD_TYPE_JSON,

        MD_PEOPLE,
        MD_KEYWORDS,
        MD_ROLES,

        MD_PEOPLE_DATA,
        MD_KEYWORDS_DATA,
        MD_ROLES_DATA,
        
        api,

        initMadek,
        getContextKeysForContext,
        checkAllLoaded,

        getDefaultLocale,
        getContext,
        
        
        //getMetaKeyKeywords,
        getMLText,
        getContextML,
        getMetaKeyML,
        //getMetaKeyObjectType,
        //isMetaKeyObjectType,
        getMetaKey,

        getCollectionMetaDataText,
        getEntryMetaDataText,

        getMetaData,
        getMetaDataRelated,
        getMetaDataExtended,

        getMetaDataText,
        
        getCollectionTitle,
        getEntryTitle,

        loadResourceMetaData,

        createiGenMetaData,

        //asyncApplyPreviewData,

        ...toRefs(state),
    }
}