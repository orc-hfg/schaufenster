/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AppSettingsListData {
  available_locales?: string[];
  catalog_subtitles?: {
    de?: string | null;
    en?: string | null;
  };
  /** @format uuid */
  media_entry_default_license_id?: string | null;
  contexts_for_entry_edit?: string[];
  contexts_for_entry_validation?: string[];
  copyright_notice_default_text?: string | null;
  featured_set_subtitles?: {
    de?: string | null;
    en?: string | null;
  };
  media_entry_default_license_usage_meta_key?: string | null;
  /** @format uuid */
  featured_set_id?: string | null;
  /** @format uuid */
  teaser_set_id?: string | null;
  /** @format int32 */
  id?: number;
  contexts_for_entry_extra?: string[];
  provenance_notices?: {
    de?: string | null;
    en?: string | null;
  };
  media_entry_default_license_usage_text?: string | null;
  time_zone?: string;
  updated_at?: any;
  welcome_titles?: {
    de?: string | null;
    en?: string | null;
  };
  welcome_texts?: {
    de?: string | null;
    en?: string | null;
  };
  sitemap?: any;
  copyright_notice_templates?: string[];
  catalog_titles?: {
    de?: string | null;
    en?: string | null;
  };
  support_urls?: {
    de?: string | null;
    en?: string | null;
  };
  contexts_for_collection_extra?: string[];
  edit_meta_data_power_users_group_id?: string | null;
  about_pages?: {
    de?: string | null;
    en?: string | null;
  };
  contexts_for_collection_edit?: string[];
  site_titles?: {
    de?: string | null;
    en?: string | null;
  };
  context_for_entry_summary?: string | null;
  created_at?: any;
  media_entry_default_license_meta_key?: string | null;
  default_locale?: string | null;
  /** @format uuid */
  splashscreen_slideshow_set_id?: string | null;
  catalog_context_keys?: string[];
  brand_texts?: {
    de?: string | null;
    en?: string | null;
  };
  contexts_for_dynamic_filters?: string[];
  brand_logo_url?: string | null;
  contexts_for_list_details?: string[];
  featured_set_titles?: {
    de?: string | null;
    en?: string | null;
  };
  ignored_keyword_keys_for_browsing?: string | null;
  section_meta_key_id?: string | null;
  context_for_collection_summary?: string | null;
}

export interface ContextKeysListParams {
  id?: string;
  context_id?: string;
  meta_key_id?: string;
  is_required?: boolean;
}

export type ContextKeysListData = {
  descriptions?: {
    de?: string | null;
    en?: string | null;
  };
  documentation_urls?: {
    de?: string | null;
    en?: string | null;
  };
  /** @format uuid */
  id: string;
  is_required: boolean;
  context_id: string;
  /** @format int32 */
  position: number;
  labels?: {
    de?: string | null;
    en?: string | null;
  };
  hints?: {
    de?: string | null;
    en?: string | null;
  };
  /** @format int32 */
  length_max?: number | null;
  /** @format int32 */
  length_min?: number | null;
  meta_key_id: string;
}[];

export interface ContextKeysDetailData {
  descriptions?: {
    de?: string | null;
    en?: string | null;
  };
  documentation_urls?: {
    de?: string | null;
    en?: string | null;
  };
  /** @format uuid */
  id: string;
  is_required: boolean;
  context_id: string;
  /** @format int32 */
  position: number;
  labels?: {
    de?: string | null;
    en?: string | null;
  };
  hints?: {
    de?: string | null;
    en?: string | null;
  };
  /** @format int32 */
  length_max?: number | null;
  /** @format int32 */
  length_min?: number | null;
  meta_key_id: string;
}

export type ContextsListData = {
  id: string;
  labels?: {
    de?: string | null;
    en?: string | null;
  };
  descriptions?: {
    de?: string | null;
    en?: string | null;
  };
}[];

export interface ContextsDetailData {
  id: string;
  labels?: {
    de?: string | null;
    en?: string | null;
  };
  descriptions?: {
    de?: string | null;
    en?: string | null;
  };
}

export interface KeywordsListParams {
  /** @format uuid */
  id?: string;
  meta_key_id?: string;
  term?: string;
  description?: string;
  rdf_class?: string;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  count?: number;
}

export interface KeywordsListData {
  keywords: {
    /** @format uuid */
    id: string;
    meta_key_id: string;
    term: string;
    description?: string | null;
    /** @format int32 */
    position?: number | null;
    external_uris: any[];
    external_uri?: string | null;
    rdf_class: string;
  }[];
}

export interface KeywordsDetailData {
  /** @format uuid */
  id: string;
  meta_key_id: string;
  term: string;
  description?: string | null;
  /** @format int32 */
  position?: number | null;
  external_uris: any[];
  external_uri?: string | null;
  rdf_class: string;
}

export interface MetaKeysListParams {
  id?: string;
  vocabulary_id?: string;
  meta_datum_object_type?: string;
  is_enabled_for_collections?: boolean;
  is_enabled_for_media_entries?: boolean;
  scope?: ScopeEnum;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  count?: number;
}

export enum ScopeEnum {
  Use = "use",
  View = "view",
}

export interface MetaKeysListData {
  "meta-keys": {
    descriptions?: {
      de?: string | null;
      en?: string | null;
    };
    meta_datum_object_type?: string;
    is_extensible_list?: boolean;
    is_enabled_for_collections?: boolean;
    allowed_rdf_class?: string | null;
    documentation_urls?: {
      de?: string | null;
      en?: string | null;
    };
    vocabulary_id: string;
    is_enabled_for_media_entries?: boolean;
    id: string;
    /** @format int32 */
    position?: number;
    /** @format int32 */
    position_2?: number;
    labels?: {
      de?: string | null;
      en?: string | null;
    };
    hints?: {
      de?: string | null;
      en?: string | null;
    };
    keywords_alphabetical_order?: boolean;
    enabled_for_public_view?: boolean;
    text_type?: string;
    allowed_people_subtypes?: string[];
    id_2?: string;
    labels_2?: any;
    descriptions_2?: any;
    io_mappings?: any;
    enabled_for_public_use?: boolean;
  }[];
}

export enum MetaKeysListParams1ScopeEnum {
  Use = "use",
  View = "view",
}

export interface MetaKeysDetailData {
  descriptions?: {
    de?: string | null;
    en?: string | null;
  };
  meta_datum_object_type?: string;
  is_extensible_list?: boolean;
  is_enabled_for_collections?: boolean;
  allowed_rdf_class?: string | null;
  documentation_urls?: {
    de?: string | null;
    en?: string | null;
  };
  vocabulary_id: string;
  is_enabled_for_media_entries?: boolean;
  id: string;
  /** @format int32 */
  position?: number;
  /** @format int32 */
  position_2?: number;
  labels?: {
    de?: string | null;
    en?: string | null;
  };
  hints?: {
    de?: string | null;
    en?: string | null;
  };
  keywords_alphabetical_order?: boolean;
  enabled_for_public_view?: boolean;
  text_type?: string;
  allowed_people_subtypes?: string[];
  id_2?: string;
  labels_2?: any;
  descriptions_2?: any;
  io_mappings?: any;
  enabled_for_public_use?: boolean;
}

export enum PeopleSubtypeEnum {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export interface PeopleListParams {
  subtype?: SubtypeEnum;
  institutional_id?: string;
  searchable?: string;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  count?: number;
  pseudonym?: string;
  last_name?: string;
  first_name?: string;
  /** @format int32 */
  page?: number;
  full_data?: boolean;
  description?: string;
}

export enum SubtypeEnum {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export interface PeopleListData {
  people: {
    subtype: PeopleSubtypeEnum;
    institutional_id?: string | null;
    searchable?: string;
    external_uris?: string[];
    /** @format uuid */
    id: string;
    pseudonym?: string | null;
    updated_at?: any;
    last_name?: string | null;
    first_name?: string | null;
    created_at?: any;
    external_uri?: string | null;
    description?: string | null;
  }[];
}

export enum PeopleListParams1SubtypeEnum {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export enum SubtypeEnum1 {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export interface PeopleDetailData {
  subtype: SubtypeEnum1;
  institutional_id?: string | null;
  external_uris: string[];
  /** @format uuid */
  id: string;
  pseudonym?: string | null;
  updated_at: any;
  last_name?: string | null;
  first_name?: string | null;
  created_at: any;
  external_uri?: string | null;
  description?: string | null;
}

export enum CollectionsDefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum CollectionsLayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum CollectionsSortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export interface CollectionsListParams {
  me_edit_permission?: boolean;
  /** @format int32 */
  count?: number;
  me_edit_metadata_and_relations?: boolean;
  me_get_metadata_and_previews?: boolean;
  collection_id?: string;
  /** @format uuid */
  clipboard_user_id?: string;
  order?: string;
  /** @format uuid */
  responsible_delegation_id?: string;
  /** @format int32 */
  page?: number;
  /** @format uuid */
  workflow_id?: string;
  /** @format uuid */
  responsible_user_id?: string;
  /** @format uuid */
  creator_id?: string;
  full_data?: boolean;
  public_get_metadata_and_previews?: boolean;
}

export interface CollectionsListData {
  collections: 
    CollectionDetailData[] };
  // {
    // default_resource_type?: CollectionsDefaultResourceTypeEnum;
    // get_metadata_and_previews?: boolean;
    // edit_session_updated_at?: any;
    // is_master?: boolean;
    // /** @format uuid */
    
    // default_context_id?: string | null;
    /** @format uuid */
    // id: string;
    // updated_at?: any;
    // layout?: CollectionsLayoutEnum;
    /** @format uuid */
    // clipboard_user_id?: string | null;
    // created_at?: any;
    // /** @format uuid */
    // responsible_delegation_id?: string | null;
    // sorting?: CollectionsSortingEnum;
    // /** @format uuid */
    // workflow_id?: string | null;
    // meta_data_updated_at?: any;
    // /** @format uuid */
    // responsible_user_id?: string | null;
    // /** @format uuid */
    // creator_id?: string;
  // }[];
//}

export enum DefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum CollectionCreatePayloadDefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum CollectionCreatePayloadLayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum CollectionCreatePayloadSortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export interface CollectionCreatePayload {
  default_resource_type?: CollectionCreatePayloadDefaultResourceTypeEnum;
  get_metadata_and_previews?: boolean;
  is_master?: boolean;
  /** @format uuid */
  default_context_id?: string | null;
  layout?: CollectionCreatePayloadLayoutEnum;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  sorting?: CollectionCreatePayloadSortingEnum;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_user_id?: string;
}

export interface CollectionCreateData {
  default_resource_type?: DefaultResourceTypeEnum;
  get_metadata_and_previews?: boolean;
  edit_session_updated_at?: any;
  is_master?: boolean;
  /** @format uuid */
  default_context_id?: string | null;
  /** @format uuid */
  id: string;
  updated_at?: any;
  layout?: LayoutEnum;
  /** @format uuid */
  clipboard_user_id?: string | null;
  created_at?: any;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  sorting?: SortingEnum;
  /** @format uuid */
  workflow_id?: string | null;
  meta_data_updated_at?: any;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  creator_id?: string;
}

export enum DefaultResourceTypeEnum1 {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum1 {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum1 {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export interface CollectionDetailData {
  default_resource_type?: CollectionsDefaultResourceTypeEnum;
  get_metadata_and_previews?: boolean;
  edit_session_updated_at?: any;
  is_master?: boolean;
  /** @format uuid */
  default_context_id?: string | null;
  /** @format uuid */
  id: string;
  updated_at?: any;
  layout?: CollectionsLayoutEnum;
  /** @format uuid */
  clipboard_user_id?: string | null;
  created_at?: any;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  sorting?: CollectionsSortingEnum;
  /** @format uuid */
  workflow_id?: string | null;
  meta_data_updated_at?: any;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  creator_id?: string;
}

export enum DefaultResourceTypeEnum2 {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum2 {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum2 {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum CollectionUpdatePayloadLayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum CollectionUpdatePayloadSortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum CollectionUpdatePayloadDefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export interface CollectionUpdatePayload {
  layout?: CollectionUpdatePayloadLayoutEnum;
  is_master?: boolean;
  sorting?: CollectionUpdatePayloadSortingEnum;
  /** @format uuid */
  default_context_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  default_resource_type?: CollectionUpdatePayloadDefaultResourceTypeEnum;
}

export interface CollectionUpdateData {
  default_resource_type?: DefaultResourceTypeEnum2;
  get_metadata_and_previews?: boolean;
  edit_session_updated_at?: any;
  is_master?: boolean;
  /** @format uuid */
  default_context_id?: string | null;
  /** @format uuid */
  id: string;
  updated_at?: any;
  layout?: LayoutEnum2;
  /** @format uuid */
  clipboard_user_id?: string | null;
  created_at?: any;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  sorting?: SortingEnum2;
  /** @format uuid */
  workflow_id?: string | null;
  meta_data_updated_at?: any;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  creator_id?: string;
}

export enum DefaultResourceTypeEnum3 {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum3 {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum3 {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export interface CollectionDeleteData {
  default_resource_type?: DefaultResourceTypeEnum3;
  get_metadata_and_previews?: boolean;
  edit_session_updated_at?: any;
  is_master?: boolean;
  /** @format uuid */
  default_context_id?: string | null;
  /** @format uuid */
  id: string;
  updated_at?: any;
  layout?: LayoutEnum3;
  /** @format uuid */
  clipboard_user_id?: string | null;
  created_at?: any;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  sorting?: SortingEnum3;
  /** @format uuid */
  workflow_id?: string | null;
  meta_data_updated_at?: any;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  creator_id?: string;
}

export interface CollectionMetaDataDetailParams {
  updated_after?: string;
  meta_keys?: string;
  collectionId: string;
}

export type CollectionMetaDataDetailData = any;

export interface CollectionMetaDataRelatedDetailParams {
  updated_after?: string;
  meta_keys?: string;
  collectionId: string;
}

export type CollectionMetaDataRelatedDetailData = any;

export type CollectionMetaDatumDetailData = any;

export type CollectionMetaDatumDeleteData = any;

export type CollectionMetaDatumTextCreateData = any;

export type CollectionMetaDatumTextUpdateData = any;

export type CollectionMetaDatumTextDateCreateData = any;

export type CollectionMetaDatumTextDateUpdateData = any;

export type CollectionMetaDatumJsonCreateData = any;

export type CollectionMetaDatumJsonUpdateData = any;

export type CollectionMetaDatumKeywordDetailData = any;

export type CollectionMetaDatumKeywordCreateData = any;

export type CollectionMetaDatumKeywordDeleteData = any;

export type CollectionMetaDatumPeopleDetailData = any;

export type CollectionMetaDatumPeopleCreateData = any;

export type CollectionMetaDatumPeopleDeleteData = any;

export type CollectionMetaDatumRoleCreateData = any;

export interface CollectionCustomUrlCreateData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface CollectionCustomUrlUpdateData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface CollectionCustomUrlDeleteData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export type CollectionEditSessionsDetailData = {
  /** @format uuid */
  id: string;
  /** @format uuid */
  user_id: string;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}[];

export interface CollectionEditSessionsCreateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  user_id: string;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface CollectionPermsDetailData {
  "media-resource": {
    /** @format uuid */
    id: string;
    /** @format uuid */
    creator_id: string;
    get_metadata_and_previews?: boolean;
    /** @format uuid */
    responsible_user_id?: string | null;
    /** @format uuid */
    clipboard_user_id?: string | null;
    /** @format uuid */
    workflow_id?: string | null;
    /** @format uuid */
    responsible_delegation_id?: string | null;
  };
  users: {
    /** @format uuid */
    user_id: string;
    get_metadata_and_previews: boolean;
    edit_permissions: boolean;
    /** @format uuid */
    delegation_id?: string | null;
    edit_metadata_and_relations: boolean;
    /** @format uuid */
    id: string;
    /** @format uuid */
    updator_id?: string | null;
    updated_at: any;
    /** @format uuid */
    collection_id: string;
    created_at: any;
  }[];
  groups: {
    /** @format uuid */
    id: string;
    /** @format uuid */
    updator_id?: string | null;
    /** @format uuid */
    collection_id: string;
    /** @format uuid */
    group_id: string;
    get_metadata_and_previews: boolean;
    edit_metadata_and_relations: boolean;
    created_at: any;
    updated_at: any;
  }[];
}

export interface CollectionPermsResourcesDetailData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  creator_id: string;
  get_metadata_and_previews?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  clipboard_user_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export interface CollectionPermsResourcesUpdatePayload {
  get_metadata_and_previews?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  clipboard_user_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export interface CollectionPermsResourcesUpdateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  creator_id: string;
  get_metadata_and_previews?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  clipboard_user_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export interface CollectionPermsResourceUpdateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  creator_id: string;
  get_metadata_and_previews?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  clipboard_user_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export enum CollectionPermsResourceUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
}

export enum CollectionPermsResourceUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
}

export type CollectionPermsUsersDetailData = {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  edit_metadata_and_relations: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  updated_at: any;
  /** @format uuid */
  collection_id: string;
  created_at: any;
}[];

export interface CollectionPermsUserDetailData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  edit_metadata_and_relations: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  updated_at: any;
  /** @format uuid */
  collection_id: string;
  created_at: any;
}

export interface CollectionPermsUserCreatePayload {
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  edit_permissions: boolean;
}

export interface CollectionPermsUserCreateData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  edit_metadata_and_relations: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  updated_at: any;
  /** @format uuid */
  collection_id: string;
  created_at: any;
}

export interface CollectionPermsUserDeleteData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  edit_metadata_and_relations: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  updated_at: any;
  /** @format uuid */
  collection_id: string;
  created_at: any;
}

export interface CollectionPermsUserUpdateData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  edit_metadata_and_relations: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  updated_at: any;
  /** @format uuid */
  collection_id: string;
  created_at: any;
}

export enum CollectionPermsUserUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditPermissions = "edit_permissions",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export enum CollectionPermsUserUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditPermissions = "edit_permissions",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export type CollectionPermsGroupsDetailData = {
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  collection_id: string;
  /** @format uuid */
  group_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  created_at: any;
  updated_at: any;
}[];

export interface CollectionPermsGroupDetailData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  collection_id: string;
  /** @format uuid */
  group_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  created_at: any;
  updated_at: any;
}

export interface CollectionPermsGroupCreatePayload {
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
}

export interface CollectionPermsGroupCreateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  collection_id: string;
  /** @format uuid */
  group_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  created_at: any;
  updated_at: any;
}

export interface CollectionPermsGroupDeleteData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  collection_id: string;
  /** @format uuid */
  group_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  created_at: any;
  updated_at: any;
}

export interface CollectionPermsGroupUpdateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  collection_id: string;
  /** @format uuid */
  group_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  created_at: any;
  updated_at: any;
}

export enum CollectionPermsGroupUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export enum CollectionPermsGroupUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export interface CollectionMediaEntryArcsDetailData {
  "collection-media-entry-arcs": {
    cover?: boolean | null;
    /** @format uuid */
    id: string;
    /** @format int32 */
    position?: number | null;
    /** @format uuid */
    media_entry_id: string;
    updated_at: any;
    /** @format uuid */
    collection_id: string;
    /** @format double */
    order?: number | null;
    created_at: any;
    highlight: boolean;
  }[];
}

export type CollectionMediaEntryArcCreateData = any;

export type CollectionMediaEntryArcUpdateData = any;

export type CollectionMediaEntryArcDeleteData = any;

export type CollectionCollectionArcDetailData = any;

export type CollectionCollectionArcCreateData = any;

export type CollectionCollectionArcUpdateData = any;

export type CollectionCollectionArcDeleteData = any;

export interface CollectionMediaEntryArcsListParams {
  /** @format uuid */
  collection_id?: string;
  /** @format uuid */
  media_entry_id?: string;
}

export type CollectionMediaEntryArcsListData = any;

export interface CollectionMediaEntryArcDetailData {
  cover?: boolean | null;
  /** @format uuid */
  id: string;
  /** @format int32 */
  position?: number | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  /** @format uuid */
  collection_id: string;
  /** @format double */
  order?: number | null;
  created_at: any;
  highlight: boolean;
}

export type CollectionMediaEntryArcsDetail2Data = any;

export interface CollectionCollectionArcsListParams {
  /** @format uuid */
  child_id?: string;
  /** @format uuid */
  parent_id?: string;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  count?: number;
}

export type CollectionCollectionArcsListData = any;

export type CollectionCollectionArcsDetailData = any;

export interface CustomUrlsListParams {
  full_data?: boolean;
  id?: string;
  /** @format uuid */
  media_entry_id?: string;
  /** @format uuid */
  collection_id?: string;
}

export interface EditSessionsListParams {
  full_data?: boolean;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  count?: number;
  /** @format uuid */
  id?: string;
  /** @format uuid */
  media_entry_id?: string;
  /** @format uuid */
  collection_id?: string;
}

export interface FavoriteMediaEntriesListData {
  media_entry_ids: string[];
}

export interface FavoriteCollectionsListData {
  collection_ids: string[];
}

export interface FullTextsListParams {
  full_data?: boolean;
  /** @format uuid */
  media_resource_id?: string;
  text?: string;
  page?: string;
  count?: string;
}

export interface MediaEntriesListParams {
  me_edit_metadata?: boolean;
  public_get_full_size?: boolean;
  me_edit_permissions?: boolean;
  /** @format int32 */
  count?: number;
  filter_by?: string;
  me_get_metadata_and_previews?: boolean;
  me_get_full_size?: boolean;
  /** @format uuid */
  collection_id?: string;
  order?: string;
  /** @format int32 */
  page?: number;
  full_data?: boolean;
  public_get_metadata_and_previews?: boolean;
}

export interface MediaEntriesListData {
  media_entries: {
    get_metadata_and_previews?: boolean;
    edit_session_updated_at?: any;
    get_full_size?: boolean;
    /** @format uuid */
    id: string;
    updated_at?: any;
    is_published?: boolean;
    created_at?: any;
    /** @format uuid */
    responsible_delegation_id?: string | null;
    meta_data_updated_at?: any;
    /** @format uuid */
    responsible_user_id?: string;
    /** @format uuid */
    creator_id?: string;
  }[];
  col_arcs?: {
    /** @format uuid */
    media_entry_id: string;
    /** @format uuid */
    id: string;
    /** @format double */
    order?: number | null;
    /** @format int32 */
    position?: number | null;
    created_at: any;
    updated_at: any;
  }[];
}

export interface MediaEntriesRelatedDataListParams {
  me_edit_metadata?: boolean;
  public_get_full_size?: boolean;
  me_edit_permissions?: boolean;
  /** @format int32 */
  count?: number;
  filter_by?: string;
  me_get_metadata_and_previews?: boolean;
  me_get_full_size?: boolean;
  /** @format uuid */
  collection_id?: string;
  order?: string;
  /** @format int32 */
  page?: number;
  full_data?: boolean;
  public_get_metadata_and_previews?: boolean;
}

export interface MediaEntriesRelatedDataListData {
  media_entries: {
    get_metadata_and_previews?: boolean;
    edit_session_updated_at?: any;
    get_full_size?: boolean;
    /** @format uuid */
    id: string;
    updated_at?: any;
    is_published?: boolean;
    created_at?: any;
    /** @format uuid */
    responsible_delegation_id?: string | null;
    meta_data_updated_at?: any;
    /** @format uuid */
    responsible_user_id?: string;
    /** @format uuid */
    creator_id?: string;
  }[];
  meta_data: {
    json?: string | null;
    string?: string | null;
    /** @format uuid */
    other_media_entry_id?: string | null;
    /** @format uuid */
    id: string;
    /** @format uuid */
    media_entry_id?: string | null;
    /** @format uuid */
    collection_id?: string | null;
    type: string;
    meta_key_id: string;
    meta_data_updated_at: any;
  }[][];
  media_files: {
    /** @format int32 */
    width?: number | null;
    /** @format int32 */
    height?: number | null;
    /** @format uuid */
    uploader_id: string;
    /** @format uuid */
    id: string;
    extension: string;
    /** @format uuid */
    media_entry_id: string;
    updated_at: any;
    media_type?: string | null;
    conversion_profiles: any[];
    access_hash: string;
    created_at: any;
    meta_data?: string | null;
    /** @format int32 */
    size: number;
    guid: string;
    content_type: string;
    filename: string;
  }[];
  previews: {
    /** @format int32 */
    width?: number | null;
    /** @format int32 */
    height?: number | null;
    /** @format uuid */
    id: string;
    thumbnail: string;
    updated_at: any;
    media_type: string;
    conversion_profile?: string | null;
    created_at: any;
    /** @format uuid */
    media_file_id: string;
    content_type: string;
    filename: string;
  }[][];
  col_arcs?: {
    /** @format uuid */
    media_entry_id: string;
    /** @format uuid */
    id: string;
    /** @format double */
    order?: number | null;
    /** @format int32 */
    position?: number | null;
    created_at: any;
    updated_at: any;
  }[];
  col_meta_data?: {
    json?: string | null;
    string?: string | null;
    /** @format uuid */
    other_media_entry_id?: string | null;
    /** @format uuid */
    id: string;
    /** @format uuid */
    media_entry_id?: string | null;
    /** @format uuid */
    collection_id?: string | null;
    type: string;
    meta_key_id: string;
    meta_data_updated_at: any;
  }[];
}

export interface MediaEntryCreatePayload {
  file?: {
    filename: string;
    "content-type": string;
    tempfile: any;
    /** @format int64 */
    size: number;
  };
}

export interface MediaEntryCreateParams {
  copy_me_id?: string;
  collection_id?: string;
}

export interface MediaEntryDetailData {
  get_metadata_and_previews?: boolean;
  edit_session_updated_at?: any;
  get_full_size?: boolean;
  /** @format uuid */
  id: string;
  updated_at?: any;
  is_published?: boolean;
  created_at?: any;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  meta_data_updated_at?: any;
  /** @format uuid */
  responsible_user_id?: string;
  /** @format uuid */
  creator_id?: string;
}

export interface MediaEntryPublishUpdateData {
  get_metadata_and_previews?: boolean;
  edit_session_updated_at?: any;
  get_full_size?: boolean;
  /** @format uuid */
  id: string;
  updated_at?: any;
  is_published?: boolean;
  created_at?: any;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  meta_data_updated_at?: any;
  /** @format uuid */
  responsible_user_id?: string;
  /** @format uuid */
  creator_id?: string;
}

export interface MediaEntryPreviewDetailParams {
  size?: string;
  mediaEntryId: string;
}

export interface MediaEntryPreviewDetailData {
  /** @format int32 */
  width?: number | null;
  /** @format int32 */
  height?: number | null;
  /** @format uuid */
  id: string;
  thumbnail: string;
  updated_at: any;
  media_type: string;
  conversion_profile?: string | null;
  created_at: any;
  /** @format uuid */
  media_file_id: string;
  content_type: string;
  filename: string;
}

export interface MediaEntryPreviewDataStreamDetailParams {
  size?: string;
  mediaEntryId: string;
}

export interface MediaEntryMetaDataDetailParams {
  updated_after?: string;
  meta_keys?: string;
  mediaEntryId: string;
}

export type MediaEntryMetaDataDetailData = any;

export interface MediaEntryMetaDataRelatedDetailParams {
  updated_after?: string;
  meta_keys?: string;
  mediaEntryId: string;
}

export type MediaEntryMetaDataRelatedDetailData = any;

export type MediaEntryMetaDatumDetailData = any;

export type MediaEntryMetaDatumDeleteData = any;

export type MediaEntryMetaDatumTextCreateData = any;

export type MediaEntryMetaDatumTextUpdateData = any;

export type MediaEntryMetaDatumTextDateCreateData = any;

export type MediaEntryMetaDatumTextDateUpdateData = any;

export type MediaEntryMetaDatumJsonCreateData = any;

export type MediaEntryMetaDatumJsonUpdateData = any;

export type MediaEntryMetaDatumKeywordDetailData = any;

export type MediaEntryMetaDatumKeywordCreateData = any;

export type MediaEntryMetaDatumKeywordDeleteData = any;

export type MediaEntryMetaDatumPeopleDetailData = any;

export type MediaEntryMetaDatumPeopleCreateData = any;

export type MediaEntryMetaDatumPeopleDeleteData = any;

export type MediaEntryMetaDatumRoleDetailData = any;

export type MediaEntryMetaDatumRoleDeleteData = any;

export type MediaEntryMetaDatumRoleCreateData = any;

export interface MediaEntryCustomUrlDetailData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface MediaEntryCustomUrlCreateData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface MediaEntryCustomUrlUpdateData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface MediaEntryCustomUrlDeleteData {
  id: string;
  is_primary: boolean;
  /** @format uuid */
  creator_id: string;
  /** @format uuid */
  updator_id: string;
  updated_at: any;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export type MediaEntryEditSessionsDetailData = {
  /** @format uuid */
  id: string;
  /** @format uuid */
  user_id: string;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}[];

export interface MediaEntryEditSessionsCreateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  user_id: string;
  created_at: any;
  /** @format uuid */
  media_entry_id?: string | null;
  /** @format uuid */
  collection_id?: string | null;
}

export interface MediaEntryFavoriteDetailData {
  /** @format uuid */
  user_id: string;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryFavoriteCreateData {
  /** @format uuid */
  user_id: string;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryFavoriteDeleteData {
  /** @format uuid */
  user_id: string;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryMediaFileDetailData {
  previews: any;
  /** @format uuid */
  id: string;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  media_type?: string | null;
  created_at: any;
  /** @format int32 */
  size: number;
  content_type: string;
  filename: string;
}

export interface MediaEntryPermsDetailData {
  "media-resource": {
    /** @format uuid */
    id: string;
    /** @format uuid */
    creator_id: string;
    is_published: boolean;
    get_metadata_and_previews?: boolean;
    get_full_size?: boolean;
    /** @format uuid */
    responsible_user_id?: string | null;
    /** @format uuid */
    responsible_delegation_id?: string | null;
  };
  users: {
    /** @format uuid */
    user_id: string;
    get_metadata_and_previews: boolean;
    edit_metadata: boolean;
    edit_permissions: boolean;
    /** @format uuid */
    delegation_id?: string | null;
    get_full_size: boolean;
    /** @format uuid */
    id: string;
    /** @format uuid */
    updator_id?: string | null;
    /** @format uuid */
    media_entry_id: string;
    updated_at: any;
    created_at: any;
  }[];
  groups: {
    get_metadata_and_previews: boolean;
    edit_metadata: boolean;
    get_full_size: boolean;
    /** @format uuid */
    group_id: string;
    /** @format uuid */
    id: string;
    /** @format uuid */
    updator_id?: string | null;
    /** @format uuid */
    media_entry_id: string;
    updated_at: any;
    created_at: any;
  }[];
}

export interface MediaEntryPermsResourcesDetailData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  creator_id: string;
  is_published: boolean;
  get_metadata_and_previews?: boolean;
  get_full_size?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export interface MediaEntryPermsResourcesUpdatePayload {
  get_metadata_and_previews?: boolean;
  get_full_size?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export interface MediaEntryPermsResourcesUpdateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  creator_id: string;
  is_published: boolean;
  get_metadata_and_previews?: boolean;
  get_full_size?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export interface MediaEntryPermsResourceUpdateData {
  /** @format uuid */
  id: string;
  /** @format uuid */
  creator_id: string;
  is_published: boolean;
  get_metadata_and_previews?: boolean;
  get_full_size?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export enum MediaEntryPermsResourceUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  GetFullSize = "get_full_size",
}

export enum MediaEntryPermsResourceUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  GetFullSize = "get_full_size",
}

export type MediaEntryPermsUsersDetailData = {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  get_full_size: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}[];

export interface MediaEntryPermsUserDetailData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  get_full_size: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryPermsUserCreatePayload {
  get_metadata_and_previews: boolean;
  get_full_size: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
}

export interface MediaEntryPermsUserCreateData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  get_full_size: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryPermsUserDeleteData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  get_full_size: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryPermsUserUpdateData {
  /** @format uuid */
  user_id: string;
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
  /** @format uuid */
  delegation_id?: string | null;
  get_full_size: boolean;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export enum MediaEntryPermsUserUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  EditPermissions = "edit_permissions",
  GetFullSize = "get_full_size",
}

export enum MediaEntryPermsUserUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  EditPermissions = "edit_permissions",
  GetFullSize = "get_full_size",
}

export type MediaEntryPermsGroupsDetailData = {
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  get_full_size: boolean;
  /** @format uuid */
  group_id: string;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}[];

export interface MediaEntryPermsGroupDetailData {
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  get_full_size: boolean;
  /** @format uuid */
  group_id: string;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryPermsGroupCreatePayload {
  get_metadata_and_previews: boolean;
  get_full_size: boolean;
  edit_metadata: boolean;
}

export interface MediaEntryPermsGroupCreateData {
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  get_full_size: boolean;
  /** @format uuid */
  group_id: string;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryPermsGroupDeleteData {
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  get_full_size: boolean;
  /** @format uuid */
  group_id: string;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export interface MediaEntryPermsGroupUpdateData {
  get_metadata_and_previews: boolean;
  edit_metadata: boolean;
  get_full_size: boolean;
  /** @format uuid */
  group_id: string;
  /** @format uuid */
  id: string;
  /** @format uuid */
  updator_id?: string | null;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  created_at: any;
}

export enum MediaEntryPermsGroupUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  GetFullSize = "get_full_size",
}

export enum MediaEntryPermsGroupUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  GetFullSize = "get_full_size",
}

export interface MediaFileDetailData {
  previews: any;
  /** @format uuid */
  id: string;
  /** @format uuid */
  media_entry_id: string;
  updated_at: any;
  media_type?: string | null;
  created_at: any;
  /** @format int32 */
  size: number;
  content_type: string;
  filename: string;
}

export type MetaDataDetailData = any;

export type MetaDataRoleDetailData = any;

export interface RolesListParams {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  count?: number;
}

export interface RolesListData {
  roles: {
    /** @format uuid */
    id: string;
    meta_key_id: string;
    labels: {
      de?: string | null;
      en?: string | null;
    };
    /** @format uuid */
    creator_id?: string;
    created_at?: any;
    updated_at?: any;
  }[];
}

export interface RolesDetailData {
  /** @format uuid */
  id: string;
  meta_key_id: string;
  labels: {
    de?: string | null;
    en?: string | null;
  };
  /** @format uuid */
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface UsersListParams {
  autocomplete?: string;
  /** @format uuid */
  institutional_id?: string;
  searchable?: string;
  email?: string;
  /** @format int32 */
  count?: number;
  /** @format uuid */
  person_id?: string;
  institution?: string;
  notes?: string;
  /** @format int32 */
  page?: number;
  full_data?: boolean;
}

export interface UsersListData {
  users: {
    autocomplete?: string;
    institutional_id?: string | null;
    settings?: any;
    searchable?: string;
    is_deactivated?: boolean;
    /** @format uuid */
    id: string;
    email?: string;
    /** @format uuid */
    person_id?: string;
    /** @format uuid */
    accepted_usage_terms_id?: string | null;
    updated_at?: any;
    institution?: string | null;
    created_at?: any;
    notes?: string | null;
    login?: string;
    last_signed_in_at?: any;
  }[];
}

export interface UsersDetailData {
  autocomplete?: string;
  institutional_id?: string | null;
  settings?: any;
  searchable?: string;
  is_deactivated?: boolean;
  /** @format uuid */
  id: string;
  email?: string;
  /** @format uuid */
  person_id?: string;
  /** @format uuid */
  accepted_usage_terms_id?: string | null;
  updated_at?: any;
  institution?: string | null;
  created_at?: any;
  notes?: string | null;
  login?: string;
  last_signed_in_at?: any;
}

export interface GroupsListParams {
  institutional_id?: string;
  institutional_name?: string;
  searchable?: string;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  count?: number;
  /** @format uuid */
  person_id?: string;
  name?: string;
  type?: string;
  /** @format int32 */
  page?: number;
  full_data?: boolean;
}

export interface GroupsListData {
  groups: {
    /** @format uuid */
    id: string;
    name?: string;
    type?: string;
    institutional_id?: string | null;
    institutional_name?: string | null;
    /** @format uuid */
    person_id?: string | null;
    searchable?: string;
  }[];
}

export interface GroupsDetailData {
  /** @format uuid */
  id: string;
  name?: string;
  type?: string;
  institutional_id?: string | null;
  institutional_name?: string | null;
  /** @format uuid */
  person_id?: string | null;
  searchable?: string;
}

export interface UsageTermsListParams {
  full_data?: boolean;
}

export type UsageTermsListData = {
  /** @format uuid */
  id: string;
  title?: string;
  version?: string;
  intro?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}[];

export interface UsageTermsDetailData {
  /** @format uuid */
  id: string;
  title?: string;
  version?: string;
  intro?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface VocabulariesListParams {
  /** @format int32 */
  page?: number;
}

export interface VocabulariesListData {
  vocabularies: {
    id: string;
    enabled_for_public_view: boolean;
    enabled_for_public_use: boolean;
    /** @format int32 */
    position: number;
    labels?: {
      de?: string | null;
      en?: string | null;
    };
    descriptions?: {
      de?: string | null;
      en?: string | null;
    };
    admin_comment?: string | null;
  }[];
}

export interface VocabulariesDetailData {
  id: string;
  enabled_for_public_view: boolean;
  enabled_for_public_use: boolean;
  /** @format int32 */
  position: number;
  labels?: {
    de?: string | null;
    en?: string | null;
  };
  descriptions?: {
    de?: string | null;
    en?: string | null;
  };
  admin_comment?: string | null;
}

export interface WorkflowsListParams {
  full_data?: boolean;
}

export type WorkflowsListData = {
  /** @format uuid */
  id: string;
  name?: string;
  is_active?: boolean;
  configuration?: any;
  /** @format uuid */
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
}[];

export interface WorkflowsCreatePayload {
  name: string;
  is_active?: boolean;
  configuration?: any;
}

export interface WorkflowsCreateData {
  /** @format uuid */
  id: string;
  name?: string;
  is_active?: boolean;
  configuration?: any;
  /** @format uuid */
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface WorkflowsDetailData {
  /** @format uuid */
  id: string;
  name?: string;
  is_active?: boolean;
  configuration?: any;
  /** @format uuid */
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface WorkflowsUpdatePayload {
  name?: string;
  is_active?: boolean;
  configuration?: any;
}

export interface WorkflowsUpdateData {
  /** @format uuid */
  id: string;
  name?: string;
  is_active?: boolean;
  configuration?: any;
  /** @format uuid */
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface WorkflowsDeleteData {
  /** @format uuid */
  id: string;
  name?: string;
  is_active?: boolean;
  configuration?: any;
  /** @format uuid */
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
}
