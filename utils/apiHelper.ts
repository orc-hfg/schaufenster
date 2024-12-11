import { Api } from '../generated/API_fetch_xeio'
import { defineNuxtModule } from 'nuxt/kit'
import { useFetch } from 'nuxt/app'

export const apiHelper = (baseUrl?: string) => {

    const apiConfig = {
        baseUrl: baseUrl || 'https://staging.madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'https://dev.madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'http://localhost:8080'
        //baseUrl: baseUrl || 'http://localhost:3104'
        ,
        //customFetch: useFetch
        //customFetch: (...fetchParams: Parameters<typeof fetch>) => $fetch(...fetchParams)
    }

    const api = new Api(apiConfig)

    return {
        apiConfig,
        api     
    }
}


export interface iAppSettings {
    available_locales: string[]
    default_locale: string
    
    context_for_collection_summary: string
    context_for_entry_summary: string

    contexts_for_collection_edit: string[]
    contexts_for_collection_extra: string[]

    
    contexts_for_entry_edit: string[]
    contexts_for_entry_extra: string[]
    contexts_for_entry_validation: string[]
  
    media_entry_default_license_meta_key: string
    media_entry_default_license_id: string
    media_entry_default_license_usage_meta_key: string
    media_entry_default_license_usage_text: string
  }
  export interface iCollection {
    id: string,
    get_metadata_and_previews: boolean,
    layout: string,
    responsible_user_id: string,
    creator_id: string,
    created_at: string,
    
  }
  export interface iMediaEntry {
    id: string,
    creator_id: string,
    responsible_user_id: string,
    is_published: boolean,
    created_at: string,
    updated_at: string,
    meta_data_updated_at: string,
    edit_session_updated_at: string,
    get_full_size?: boolean,
    get_metadata_and_previews?: boolean,
  }

  export interface iPreview {
    id: string
    thumbnail: string
    media_type: string
    media_file_id: string
    width: number
    height: number
  }
 
  export interface iMediaFile {
    id: string,
    media_entry_id: string,
    creator_id: string,
    filename: string,
    size: number,
    content_type: string,
    previews: iPreview[]
  }
  export interface iMetaData {
    id: string
    media_entry_id: string
    collection_id: string
    meta_key_id: string
    type: string
    'string': string
    'json': string
  }
  export interface iKeyword {
    id: string,
    meta_key_id: string,
    term: string
  }
  export interface iContext {
    id: string,
    labels: any,
    descriptions: any,
  }
  export interface iContextKey {
    id: string
    context_id: string
    meta_key_id: string
    is_required: boolean
    length_max: number
    length_min: number
    position: number
    labels: any
    descriptions: any
    hints:any
  }
  export interface iMetaKey {
    id: string
    is_extensible_list: boolean
    meta_datum_object_type: string
    keywords_alphabetical_order: boolean
    position: number
    is_enabled_for_media_entries: boolean
    is_enabled_for_collections: boolean
    vocabulary_id: string
    labels: any
  
  }
  export interface iVocabulary {
    id: string
  
  }
  export interface iPerson {
    id: string
    first_name: string
    last_name: string
    searchable: string
    subtype: string
  }

  export interface iGroup {
    id: string
    name: string
    institutional_id: string
    institutional_name: string
    searchable: string
    type: string
    person_id: string
  }

  export interface iUser {
    id: string
    email: string
    person_id: string
    institutional_id: string
    first_name: string
    last_name: string
    searchable: string
    accepted_usage_terms_id: string
  }

  export interface iMLObj {
    de: string,
    en: string
  }
  
  
  export interface iPublishableResult {
    failed: boolean,
    failedKeys: string[],
    publishable: boolean
  }


export interface iMediaEntriesQueryFilterByPermissionsData {
  public: boolean;
  responsible_user: string;
  entrusted_to_user: string;
  entrusted_to_group: string;
}
export interface iMediaEntriesQueryFilterByPermissions {
  key: string;
  value: string;
  /*
  public: boolean;
  responsible_user: string;
  entrusted_to_user: string;
  entrusted_to_group: string;
  */
}
export const queryPermissionsData2FilterBy = (data: iMediaEntriesQueryFilterByPermissionsData) : iMediaEntriesQueryFilterByPermissions[] => {
    const result = [] as iMediaEntriesQueryFilterByPermissions[];
    let k: keyof iMediaEntriesQueryFilterByPermissions
    for (const [k,v] of Object.entries(data)) {
      const perm = {
        key: k,
        value: v as string
      } as iMediaEntriesQueryFilterByPermissions
      result.push(perm)
    }
    
    return result
}
export interface iMediaEntriesQueryFilterByMetaData {
  key: string;
  not_key: string;
  type: string;
  value: string;
  match: string;
}

export interface iMediaEntriesQueryFilterByMediaFile {
  key: string;
  value: string;
  /*
    id: string,
    media_entry_id: string,
    creator_id: string,
    filename: string,
    size: number,
    content_type: string,
  */
  
}

export interface iMediaEntriesQueryFilterByMediaEntry {
  creator_id?: string;
  responsible_user_id?: string;
  is_published?: boolean;
}
export interface iMediaEntriesQueryFilterBy {
  search?: string;
  media_files?: iMediaEntriesQueryFilterByMediaFile[]
  media_entry?: iMediaEntriesQueryFilterByMediaEntry;
  meta_data?: iMediaEntriesQueryFilterByMetaData[];
  //permissions_data?: iMediaEntriesQueryFilterByPermissionsData[];
  permissions?: iMediaEntriesQueryFilterByPermissions[];
}
export interface iMediaEntriesQuery {
  
  /** @format int32 */
  count?: number;
  filter_by_data?: iMediaEntriesQueryFilterBy;
  //filter_by?: iMediaEntriesQueryFilterBy | string;
  filter_by?: string;

  public_get_metadata_and_previews?: boolean;
  public_get_full_size?: boolean;
  me_get_metadata_and_previews?: boolean;
  me_get_full_size?: boolean;

  /** @format uuid */
  collection_id?: string;
  order?:
      | "manual_asc"
      | "title_desc"
      | "desc"
      | "asc"
      | "stored_in_collection"
      | "last_change"
      | "title_asc"
      | "manual_desc";
  /** @format int32 */
  page?: number;
  
  full_data?: boolean;
}

export const buildMEQuery = (query: iMediaEntriesQuery) => {
  if (!!query.filter_by_data) {
      console.log("has filterBy data")
      
      query.filter_by = JSON.stringify(query.filter_by_data)
      delete query.filter_by_data
      const { filter_by_data, ...result } = query
      return result
  }
  /*
  if (!!query.filter_by) {
      console.log("has filterBy data")
      
      query.filter_by = JSON.stringify(query.filter_by)
      
      return query
  }*/
  return query
}

export interface iEntryUserPermission {
  id: string,
  user_id: string,
  get_metadata_and_previews: boolean
  get_full_size: boolean
  edit_metadata: boolean
  edit_permissions: boolean
}

export interface iEntryGroupPermission {
  id: string,
  group_id: string,
  get_metadata_and_previews: boolean
  get_full_size: boolean
  edit_metadata: boolean
}

export interface iCollectionUserPermission {
  id: string,
  user_id: string,
  get_metadata_and_previews: boolean,
  edit_metadata_and_relations: boolean,
  edit_permissions: boolean
}

export interface iCollectionGroupPermission {
  id: string,
  group_id: string,
  get_metadata_and_previews: boolean,
  edit_metadata_and_relations: boolean
}
export interface iPagingState {
  page: number
  count: number
}
