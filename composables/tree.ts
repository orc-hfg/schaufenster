import { iTree } from './tree';

import { ref, reactive, toRefs } from 'vue'

import {
    type CollectionDetailData,
    type CollectionMediaEntryArcsDetailData,
    type CollectionMediaEntryArcDetailData,
    type CollectionMetaDataRelatedDetailData,
    type CollectionsListData,
    type MediaEntryDetailData,
    type CollectionCollectionArcDetailData,
} from "../generated/data-contracts";

import { type iCollection, type iPreview } from "../utils/apiHelper";
import { type iGenMetaData, madekHelper } from "../utils/madekHelper";

import { useMetadataStore } from "../stores/metadata_store";


const {
    RKEY_ENTRY,
    RKEY_COLLECTION,
    MD_TYPE_KEYWORDS,
    MD_TYPE_PEOPLE,
    MD_TYPE_ROLES,

    MD_KEYWORDS,
    MD_PEOPLE,

    api,
    initMadek,
    checkAllLoaded,
    
} = madekHelper();
  
export interface iTreeNode {
    col_id: string,
    collection: CollectionDetailData,
    col_arc: CollectionCollectionArcDetailData,
    depth: number,
  
    parent_id: string,
    //col_meta_data: iGenMetaData,
    entries: {
      [key:string]: MediaEntryDetailData
    } 
    //entriesMDMap: {},
    arcs: CollectionMediaEntryArcDetailData[],
    coverId: string,
  }

  export interface iTree {
    col_id: string,
    collection: CollectionDetailData,
    //col_meta_data: iGenMetaData,
    edges: {
      [key:string]: {
        [key:string]: iTreeNode
      }
    },
    up: {
      [key:string]: string
    },
    // enable filters
    colTitlesMap: {},
    colKeywordMap: {},
    colPeopleMap: {},
    colRolesMap: {},
    // meta-data
    entryTitlesMap: {
      [key:string]: string
    },
    entries_meta_data: {
      [key:string]: iGenMetaData
    },
    cols_meta_data: {
      [key:string]: iGenMetaData
    },
    previews: {
      [key:string]: iPreview
    },
    previewsLarge: {
      [key:string]: iPreview
    },
    cols_authors: {
      [key:string]: string[]
    },
    entries_authors: {
      [key:string]: string[]
    },
    year: number

  }


  export interface iTreeState {
    loading: number;
    treeMapper: {
      [key:string]: {
        [key:string]: iTree  
      }
    };
    

    treeList: {
      [key:string]: iTree
    };
    filterCount: number,
    filtersMap: {};
    filteredTreeList: {
      [key:string]: iTree
    };
  }

  const state = reactive<iTreeState>({
    loading: 0,
    treeMapper: {},
    
    treeList: {},
    filterCount: 0,
    filtersMap: {},
    filteredTreeList: {},
  })

export const treeHelper = () => {

    const collectionsAll = new Map<string, iCollection>()

    const RID:string = 'root'
    const MATCH_DIPLOM = 'diplom'
    const MATCH_PROJECTS = 'projekt'
    const FILTERS_KEYWORD = 'keywords'
    const FILTERS_PEOPLE = 'people'

    const useTree = useState('tree')

    const getOrCreateTree = (treeType:string, treeId: string):iTree => {
        state.treeMapper[treeType] = state.treeMapper[treeType] || {}
        const tree = state.treeMapper[treeType][treeId] = state.treeMapper[treeType][treeId] || {
            col_id: treeId,
            collection: collectionsAll.get(treeId),
            edges: {},
            colTitlesMap: {},
            // colAuthorsMap
            colKeywordMap: {},
            colPeopleMap: {},
            colRolesMap: {},
            entryTitlesMap: {},
            // entryAuthorsMap
            entries_meta_data: {},
            cols_meta_data: {},

            cols_authors: {},
            entries_authors: {},
            
            previews: {},
            previewsLarge: {},
        } as iTree
        return tree
    }

    const getTreeTitle = (treeType:string, col_id:string) => {
      if (state.treeMapper[treeType]
        && state.treeMapper[treeType][col_id]) {
    
        const tree = state.treeMapper[treeType][col_id];
        return tree.colTitlesMap[col_id];
      }
      return undefined
    }


    const updateFilters = (treeType: string) => {
      state.filteredTreeList = {}
      state.filterCount = 0;
      if (state.filtersMap[FILTERS_KEYWORD]) {
        for (const kwId in state.filtersMap[FILTERS_KEYWORD]) {
          state.filterCount++;
          for (const kwInfo of state.filtersMap[FILTERS_KEYWORD][kwId]) {
            state.filteredTreeList[kwInfo.treeId] = state.treeMapper[treeType][kwInfo.treeId]
          }
        }
       }

       if (state.filtersMap[FILTERS_PEOPLE]) {
        for (const kwId in state.filtersMap[FILTERS_PEOPLE]) {
          state.filterCount++;
          for (const kwInfo of state.filtersMap[FILTERS_PEOPLE][kwId]) {
            state.filteredTreeList[kwInfo.treeId] = state.treeMapper[treeType][kwInfo.treeId]
          }
        }
       }
       
       if (state.filterCount == 0) {
        console.log("updateFilters: fc: " + state.filterCount)
        state.filteredTreeList = {};
        for(const treeId in state.treeMapper[treeType]) {
          state.filteredTreeList[treeId] = state.treeMapper[treeType][treeId]
        }
       }
    }

    // watch(() => state.loading, () => {
    //   console.error("TREE: loading: " + state.loading)
    //   //useTree.value = state.treeMapper
    // })

    const buildMDRelatedMap = (resp_data): {} => {
      const result = {}
      //console.dir(resp_data)
      resp_data.forEach(mdMap => {
        const md = mdMap['meta-data']

        const md_key = md.meta_key_id
        
        result[md_key] = md

        // TODO filter only relevant data
        
        if (md.type == MD_TYPE_PEOPLE) {
          result[md_key].selectedPeople = mdMap[MD_PEOPLE]
        }
        else if (md.type == MD_TYPE_KEYWORDS) {
          result[md_key].selectedKeywords = mdMap[MD_KEYWORDS]
        }
        else if (md.type == MD_TYPE_ROLES) {
          result[md_key].selectedRoles = []
            /* if (force) {
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
            } */
            //this.metaDataRMap[resKey][resId][md.meta_key_id].selectedRoles = mdMap[MD_ROLES]
        }
        // TODO roles
      });
      //console.dir(result['madek_core:title'])
      return result;
    }

    const buildEntryMetaData = async (tree: iTree, treeNode: iTreeNode, entryId: string) => {
      //console.log("buildEntryMetaData: " + entryId)

      try {
        
        const resp_previews = (await api.api.mediaEntryPreviewDetail(entryId)).data
        // get latest video preview image
        resp_previews.sort((a,b) => { 
          return ('' + a.filename).localeCompare(b.filename)
        }).forEach(preview => {
          if (preview.media_type == 'image') {
            if (preview.thumbnail == 'small') {
              tree.previews[entryId] = preview
              //console.error("found entry with image small " + entryId)
            } else if (preview.thumbnail == 'large') {
              tree.previewsLarge[entryId] = preview
              //console.error("found entry with image large" + entryId)
            }
          }
          else if (preview.media_type == 'audio') {
            tree.previewsLarge[entryId] = preview
            console.error("found entry with audio " + entryId)
          }

          else if (preview.media_type == 'video') {
            tree.previewsLarge[entryId] = preview
            //console.error("found entry with video " + entryId + "has pv small" + JSON.stringify(tree.previews[entryId]))
          }

        })
        
      } catch (error) {
        console.error("Could not get preview data for entry " + entryId + " : " + error)
      }
        
    
      const resp = (await api.api.mediaEntryMetaDataRelatedDetail(entryId, {})).data
      //console.log("buildEntryMetaData: " +  entryId + " got meta data. "
        //+ " md" + JSON.stringify(resp)
        //+ "loading: " + state.loading);

      const mdMap = buildMDRelatedMap(resp) as iGenMetaData

     

      tree.entryTitlesMap[entryId] = mdMap['madek_core:title'].string
      
      const authors = [] as string[]
      if (mdMap['madek_core:authors'] && mdMap['madek_core:authors'].selectedPeople) {
        mdMap['madek_core:authors'].selectedPeople.forEach(element => {
          const author = element.first_name + ' ' + (element.last_name || '')
          authors.push(author)
        });
      }
      
      tree.entries_authors[entryId] = authors
      tree.entries_meta_data[entryId] = mdMap
      
    }

  const buildSubTreeEntries = async (tree: iTree, treeNode: iTreeNode) => {
  
    const entry_query = {
      public_get_metadata_and_previews: true,
      collection_id: treeNode.collection.id,
      full_data: true,
      order: 'manual_asc',
      related_meta_data: true,
      //related_previews: true,
      //related_files: true,
    }
    state.loading++
    const entries_resp =  (await api.api.mediaEntriesList(entry_query)).data;
    //const entries_resp =  (await api.api.mediaEntriesRelatedDataList(entry_query)).data;
    state.loading--
    const arcs = entries_resp.col_arcs
    const entries = entries_resp.media_entries
    
    treeNode.arcs = arcs || []
    treeNode.entries = treeNode.entries || {}
    
    /* console.log("buildSubTreeEntries: "
      + treeNode.collection.id
      + " loading: " + state.loading) */

    if (!arcs?.length) {
      /* console.log("buildSubTreeEntries: "
          + treeNode.collection.id + ":"
          + "ABORT: No entries in set") */
      return
    }
    let coverArc = undefined
    const coverArcC = 
      arcs?.find(e => e.cover == true)
    const coverArcH = 
      arcs?.find(e => e.highlight == true)
    const coverArcP = 
      arcs?.find(e => e.position == 0)
    const coverArcF = 
     arcs?.find(e => typeof e !== 'undefined')
    coverArc = coverArcC || coverArcH || coverArcP || coverArcF
  
    /* console.log("buildSubTreeEntries: "
      + treeNode.collection.id + ":"
      + " found set cover: " 
      + " : " + JSON.stringify(coverArc)) */
      
    treeNode.coverId = coverArc?.media_entry_id;


   for await (const entry of entries) {
      if (entry.get_metadata_and_previews == true) {
        treeNode.entries[entry.id] = entry
        await buildEntryMetaData(tree, treeNode, entry.id)
      } else {
        console.error("buildSubTreeEntries: hidden entry: " + entry.id + ":" + entry.get_metadata_and_previews)
      }
    }
    //console.log("buildSubTreeEntries: col: " + treeNode.collection.id + " added count: " + entries.length)
  
  }

  const getOrCreateObject = (obj, key) => {
    obj[key] = obj[key] || {}
    return obj
  }
  
  const buildSubTree = async (
        treeType: string,
        treeId: string,
        parent_id: string, //iCollection,
        depth: number | 0
      ) => {
        state.loading++
        /* console.log("buildSubTree: "
          + " Ttype: " + treeType
          + " Tid: " + treeId 
          + " P: " + parent.id 
          + " D: " + depth); */
        
      
      
        state.loading++
        const ccas_resp_data = await (await api.api.collectionCollectionArcsList({ parent_id: parent_id })).data
        state.loading--
        const ccas = ccas_resp_data["collection-collection-arcs"]
        
      
        if (ccas.length == 0) {
          state.loading--
          return;
        }
        const edgesParent = //getOrCreateObject(state.treeMapper[treeType][treeId].edges,parent_id)
        state.treeMapper[treeType][treeId].edges[parent_id] =
          state.treeMapper[treeType][treeId].edges[parent_id] || {}
      
        
        // console.log("buildSubTree: " + ccas.length)
        for await (const cca of ccas) {

          const cid = cca.child_id
          const pid = cca.parent_id
          const childCol = collectionsAll.get(cid);
                     
          if (!childCol || ! childCol.id) {
            const msg = "buildSubTree: invisible or invalid collection for child_id: " 
              + cid
              + " collecction: " + JSON.stringify(childCol)
            //console.log(msg)
          } else {

            state.treeMapper[treeType][treeId].up[cid] = pid

            edgesParent[cid] = {
              col_id: childCol.id,
              parent_id: pid,
              collection: childCol,
              depth: (depth + 1),
              col_arc: cca
            } as iTreeNode
            //console.log(" new Tree node ")
            //console.dir(state.treeMapper[treeType][treeId].edges[parent_id][cid])
            await buildSubTree(treeType, treeId, childCol.id, depth + 1)
          }
        }
        
        state.loading--
  };
      

  const buildTree = async(treeType:string, col_id: string) => {
    const treeId = col_id
    
    const tree = getOrCreateTree(treeType, treeId)
    tree.edges[RID] = tree.edges[RID] || {}
    tree.edges[RID][treeId] = {
      parent_id: RID,
      collection: collectionsAll.get(treeId),
      depth: 0
    } as iTreeNode
    tree.up = {}
    tree.up[treeId] = RID
    await buildSubTree(treeType, treeId, col_id, 0)
    /* console.log("builtTree finished sub trees:"
      + " Ttype: " + treeType
      + " Tid: " + treeId
      + " loading:" + state.loading
    ) */
    //console.dir(state.treeMapper[treeType][treeId])
  }

  const buildCollectionMetaData = async (
        treeType:string, 
        treeId: string,
        parentId:string,
        clientId: string) => {
      
        //const md_store = useMetadataStore();
        /* console.log("buildCollectionMetaData: "
          + " Tyoe: " + treeType
          + " Tid: " + treeId
          + " Pid: " + parentId
            + " clientId: "+ clientId) */

        if (!clientId) {
          console.log("buildCollectionMetaData: Abort: invalid clientId"
            + " Tyoe: " + treeType
            + " Tid: " + treeId
            + " Pid: " + parentId
              + " clientId: "+ clientId)
          return;
        }

        const resp_data = await (await api.api.collectionMetaDataRelatedDetail(clientId, {})).data
        const mdMap = buildMDRelatedMap(resp_data)
        //state.col_meta_data = state.col_meta_data || {}
        //state.col_meta_data[clientId] = mdMap
        //useColsMD.value = useColsMD.value || {}
        //useColsMD.value = state.col_meta_data
        //console.log("buildCollectionMD: mdMap " + JSON.stringify(mdMap['madek_core:title']))

        // for the filters
        state.treeMapper[treeType][treeId].cols_meta_data 
          = state.treeMapper[treeType][treeId].cols_meta_data || {}
        state.treeMapper[treeType][treeId].cols_meta_data[clientId] = mdMap;

        for (const metaKey in mdMap) {
          state.treeMapper[treeType][treeId].colKeywordMap[metaKey] 
            = state.treeMapper[treeType][treeId].colKeywordMap[metaKey] || {}

          state.treeMapper[treeType][treeId].colPeopleMap[metaKey] 
            = state.treeMapper[treeType][treeId].colPeopleMap[metaKey] || {}

          state.treeMapper[treeType][treeId].colRolesMap[metaKey]
            = state.treeMapper[treeType][treeId].colRolesMap[metaKey] || {}
        
              
          const md = mdMap[metaKey]
          if (metaKey == 'madek_core:title') {
            state.treeMapper[treeType][treeId].colTitlesMap[clientId] = md.string
          }
          else if (metaKey == 'madek_core:authors') {
            const authors = [] as string[]
            md.selectedPeople.forEach(element => {
              const author = element.first_name + ' ' + (element.last_name || '')
              authors.push(author)
            });
            state.treeMapper[treeType][treeId].cols_authors[clientId] = authors
            // store authors
          }

          if (md.selectedKeywords && md.selectedKeywords.length) {
            for (const kw of md.selectedKeywords) {
              state.treeMapper[treeType][treeId].colKeywordMap[metaKey][kw.id] = 
                state.treeMapper[treeType][treeId].colKeywordMap[metaKey][kw.id] || 
                  { term: kw.term, col_ids: [] }
              state.treeMapper[treeType][treeId].colKeywordMap[metaKey][kw.id].col_ids.push(clientId)
            }
          }
        
          if (md.selectedPeople && md.selectedPeople.length) {
            for (const p of md.selectedPeople) {
              state.treeMapper[treeType][treeId].colPeopleMap[metaKey][p.id] = 
                state.treeMapper[treeType][treeId].colPeopleMap[metaKey][p.id] || 
                  { name: p.searchable, col_ids: [] }
              state.treeMapper[treeType][treeId].colPeopleMap[metaKey][p.id].col_ids.push(clientId)
            }
          }
  
          if (md.selectedRoles && md.selectedRoles.length) {
            for (const role of md.selectedRoles) {
              state.treeMapper[treeType][treeId].colRolesMap[metaKey][role.person_id] = 
                state.treeMapper[treeType][treeId].colRolesMap[metaKey][role.person_id] || 
                  { 
                    name: role.person.first_name + ' ' + role.person.last_name,
                    col_ids: [],
                    role: role
                  }
              state.treeMapper[treeType][treeId].colRolesMap[metaKey][role.person_id].col_ids.push(clientId)
            }
          }
        
        }
        
      }

    const buildTreeMetaData = async (treeType: string, treeId: string) => {

      const tree = state.treeMapper[treeType][treeId]
      /* console.log("buildTreeMetaData " 
        + " Ttype " + treeType
        + " Tid " + treeId) */
      //console.dir(tree)
    
    //await buildSubTreeEntries(tree, state.treeMapper[treeType][treeId].edges[RID][treeId])
    //await buildCollectionMetaData(treeType,treeId,RID,treeId);

      for (const parentId in tree.edges) {
        for (const clientId in tree.edges[parentId]) {
          /*console.log("search tree " + treeId 
          + " P: " + parentId
          + " CI: " + clientId) */
          const treeNode = state.treeMapper[treeType][treeId].edges[parentId][clientId]
          await buildSubTreeEntries(tree, treeNode)
          await buildCollectionMetaData(treeType, treeId, parentId, clientId)
        }
      }
    }


    
    const getParent = (treeType: string, treeId: string, colId: string): string|undefined => {
      let result = undefined
      if (state.treeMapper
        && state.treeMapper[treeType]
        && state.treeMapper[treeType][treeId]
        && state.treeMapper[treeType][treeId].up
      ) {
        result = state.treeMapper[treeType][treeId].up[colId]
        
      }
      
      return result;
    }

    const getPath2Root = (treeType: string, treeId: string, colId: string): string[] => {
      const result = [] as string[]

      let ccol_id: string = colId;
      while(state.treeMapper[treeType][treeId].up[ccol_id]) {
        result.push(ccol_id)
        ccol_id = state.treeMapper[treeType][treeId].up[ccol_id]
      }
      return result
    }


    const fetch_cols_all = async () => {
      const cols_query = {
          full_data: false,
          public_get_metadata_and_previews: true,
          page: 0,
          size: 10000,
        };
        const cols_data = (await api.api.collectionsList(cols_query)).data as CollectionsListData;
      
        cols_data.collections.forEach((colEl:CollectionDetailData) => {
          collectionsAll.set(colEl.id, colEl);
        });
      
      console.log(" got collections all " + cols_data.collections.length + ":" + collectionsAll.size);
    }

    const initTrees = async (keyword_match:string) => {
      const filterBy = JSON.stringify({ meta_data: [{ key: "any", match: keyword_match} ]})
      const cols_query_match = {
          full_data: false,
          public_get_metadata_and_previews: true,
          page: 0,
          size: 10000,
          filter_by: filterBy // '{"meta_data": [{ "key": "any", "match": "Diplom" }]}'
        };
        const cols_data = (await api.api.collectionsList(cols_query_match)).data as CollectionsListData;
        
        for await (const colEl of cols_data.collections) {
          await buildTree(keyword_match, colEl.id)
          useTree.value = state.treeMapper
          console.log("finished build tree " + colEl.id)
        }
        for await (const colEl of cols_data.collections) {
          await buildTreeMetaData(keyword_match, colEl.id)
          useTree.value = state.treeMapper
          //useTreeVal = state.treeMapper
          //useState('tree-' + keyword_match + '_' + colEl.id, () => { return state.treeMapper[keyword_match][colEl.id] })
          console.log("finished build tree meta_data " + colEl.id)
          
        }

        //useState('tree-' + keyword_match, () => { return state.treeMapper[keyword_match] })
        console.log("finished build tree all " + keyword_match)
        useTree.value = state.treeMapper
        //useState('tree', () => { return state.treeMapper })
        //console.dir(state.treeMapper)
    }
     
    const initTree = async () => {
      console.log("initTree: ")
      
      await fetch_cols_all()

      await initTrees(MATCH_DIPLOM)
      await initTrees(MATCH_PROJECTS)

      
      console.log(" built collections map " 
        + " All: " + collectionsAll.size
        + " Diplom: " + Object.keys(state.treeMapper[MATCH_DIPLOM]).length
        + " Project: " + Object.keys(state.treeMapper[MATCH_PROJECTS]).length
      );
      
      return state.treeMapper;

    };
    
      
    return {
        MATCH_DIPLOM,
        MATCH_PROJECTS,
        RID,
        FILTERS_KEYWORD,
        FILTERS_PEOPLE,
        collectionsAll,
        

        
        buildTree,
        buildSubTree,
        initTree,
        buildCollectionMetaData,
        buildTreeMetaData,

        getTreeTitle,
        getParent,
        getPath2Root,
        updateFilters,

        ...toRefs(state),
    }
}