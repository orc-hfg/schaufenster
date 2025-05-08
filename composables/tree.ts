import { Api } from '~/generated/API_fetch_xeio';

import {
  type CollectionDetailData,
  type CollectionMediaEntryArcDetailData,
  type CollectionsListData,
  type MediaEntryDetailData,
  type CollectionCollectionArcDetailData,
} from "../generated/data-contracts";

import { 
  MD_TYPE_KEYWORDS,
  MD_TYPE_PEOPLE,
  MD_TYPE_ROLES,

  MD_KEYWORDS,
  MD_PEOPLE,

  type iGenMetaData,
  type iCollection,
  type iPreview
} from "../utils/madekTypes"

const { getNewApi, getNewConfig } = apiHelper()

export interface iTreeNode {
  col_id: string;
  collection: CollectionDetailData;
  col_arc: CollectionCollectionArcDetailData;
  depth: number;

  parent_id: string;
  //col_meta_data: iGenMetaData,
  entries: {
    [key: string]: MediaEntryDetailData;
  };
  //entriesMDMap: {},
  arcs: CollectionMediaEntryArcDetailData[];
  coverId: string;
}
export interface iColSearchable {
  id:string,
  name: string,
  col_ids: string[],
  keyword: {},
  person: {},
  role: {},
}
export interface iTree {
  col_id: string;
  collection: CollectionDetailData;
  //col_meta_data: iGenMetaData,
  edges: {
    [key: string]: {
      [key: string]: iTreeNode;
    };
  };
  up: {
    [key: string]: string;
  };
  // enable filters
  colTitlesMap: {
    [key: string]: string;
  };
  colKeywordMap: {
    [key: string]: {
      [key: string]: iColSearchable
    };
  };
  colPeopleMap: {
    [key: string]: {
      [key: string]: iColSearchable
    };
  };
  colRolesMap: {
    [key: string]: {
      [key: string]: iColSearchable
    };
  };
  // meta-data
  entryTitlesMap: {
    [key: string]: string;
  };
  entries_meta_data: {
    [key: string]: iGenMetaData;
  };
  cols_meta_data: {
    [key: string]: iGenMetaData;
  };
  previews: {
    [key: string]: iPreview;
  };
  previewsLarge: {
    [key: string]: iPreview;
  };
  previewsAudio: {
    [key: string]: iPreview[];
  };
  previewsVideo: {
    [key: string]: iPreview[];
  };
  cols_authors: {
    [key: string]: string[];
  };
  cols_participants: {
    [key: string]: string[];
  };
  cols_semesters: {
    [key: string]: {};
  };
  cols_semesters_en: {
    [key: string]: {};
  };
  cols_departments: {
    [key: string]: string[];
  }
  entries_authors: {
    [key: string]: string[];
  };
  previewDirection: string;
  previewPlacement: string;
  previewstyle: {
    [key: string]: string
  };
  year: string;
}

export interface iTreeFilter {
  id: string,
  name: string,
  meta_key: string,
  col_ids: string[],
  treeId: string,
  count: number,
}
export interface iFilterCountMap {
  [key: string]: iTreeFilter
}
export interface iFilterTypeMap {
    [key: string]: iTreeFilter[];
}
export interface iFiltersMap {
  [key: string]: iFilterTypeMap
}
export interface iTreeMap {
  [key: string]: iTree;
}

export interface iTreeState {
  loading: number;
  //apiH: Api<unknown>;
  treeMapper: {
    [key: string]: iTreeMap;
  };

  treeList: iTreeMap
  /*{
    [key: string]: iTree;
  };*/
  filterCount: number;
  filtersMap: iFiltersMap;
   /*{
    [key: string]: {
      [key: string]: iTreeFilter[];
    };
  };*/
  newFiltersMap: iFiltersMap;

  //filtersText: string;
  filtersTitle: string;
  newFiltersTitle: string;
  filteredTreeList: {
    [key: string]: iTree;
  };
  newFilteredTreeList: {
    [key: string]: iTree;
  };
}

const state = reactive<iTreeState>({
  loading: 0,
  //apiH: {} as Api<unknown>,
  treeMapper: {},

  treeList: {},
  filterCount: 0,
  filtersMap: {},
  newFiltersMap: {},
  //filtersText: "",
  filtersTitle: "",
  newFiltersTitle: "",
  filteredTreeList: {},
  newFilteredTreeList: {}
});

export const treeHelper = () => {
  const collectionsAll = new Map<string, iCollection>();

  const RID: string = "root";
  const MATCH_DIPLOM = "diplom";
  const MATCH_PROJECTS = "projekt";
  const MATCH_VAL_MAGISTER = "Magisterarbeit";
  const MATCH_VAL_DIPLOM = "Diplomarbeit";
  const MATCH_VAL_PROJECT = "projekt";
  const FILTERS_KEYWORD = "keywords";
  const FILTERS_PEOPLE = "people";
  const FILTERS_ROLES = "roles";

  const MK_TITLE = 'madek_core:title'

  const MK_AUTHORS = 'madek_core:authors'
  const MK_PROJECT_TYPE = 'institution:project_category'
  const MK_KEYWORDS = 'madek_core:keywords'
  const MK_PROJECT_LEADER = 'institution:project_leader'
  const MK_SEMESTER = 'institution:semester'
  const MK_PROGRAM_OF_STUDY = 'institution:program_of_study'
  const MK_PARTICIPANTS = 'creative_work:other_creative_participants'
  
  const MK_MATERIAL = 'creative_work:material'
  const MK_DIMENSION = 'creative_work:dimension'
  const MK_DURATION = 'creative_work:duration'
  const MK_FORMAT = 'creative_work:format'
  
  const MK_COPYRIGHT = 'madek_core:copyright_notice'
  const MK_LICENCE = 'rights:licence'
  const MK_CREATOR = 'media_object:creator_of_media_object'

  const MK_GRADUATE_TYPE = 'institution:​graduation-project-type'
  
  
  const MK_DEPARTMENTS = 'institution:​field_of_study'

  let apiH = {} as Api<unknown>
  const useTree = useState("tree");

  const getOrCreateTree = (treeType: string, treeId: string): iTree => {
    state.treeMapper[treeType] = state.treeMapper[treeType] || {};
    const tree = (state.treeMapper[treeType][treeId] =
      state.treeMapper[treeType][treeId] ||
      ({
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
        cols_participants: {},
        cols_semesters: {},
        cols_semesters_en: {},
        cols_departments: {},
        entries_authors: {},

        previews: {},
        previewsLarge: {},
        previewsAudio: {},
        previewsVideo: {},
      } as iTree));
    return tree;
  };

  const getTreeTitle = (treeType: string, col_id: string) => {
    if (state.treeMapper[treeType] && state.treeMapper[treeType][col_id]) {
      const tree = state.treeMapper[treeType][col_id];
      return tree.colTitlesMap[col_id];
    }
    return undefined;
  };

  const getMapCount = (data:object):number => {
    if (!data || typeof data !== 'object') {
      return 0
    }
    return Object.keys(data).length
  }

  const getFilterCount = (filter_string: string, filtersMap: iFiltersMap):number => {
    let filterCount = 0;

    // and filter
    if (filter_string && filter_string.length) {
      filterCount++;
    }

    filterCount += getMapCount(filtersMap[FILTERS_KEYWORD])
    filterCount += getMapCount(filtersMap[FILTERS_PEOPLE])
    filterCount += getMapCount(filtersMap[FILTERS_ROLES])
    
    return filterCount
  }
  const updateFilters = (treeMap: iTreeMap, filtersTitle: string, filtersMap: iFiltersMap):iTreeMap => {
    const filteredTreeList = {} as iTreeMap;
    
    state.filterCount = getFilterCount(filtersTitle, filtersMap)
    //console.log("updateFilters: filtersMap: " + JSON.stringify(filtersMap));
    


    
    for (const treeId in treeMap) {
      const tree = treeMap[treeId];
      

      if (filtersTitle.length > 0) {
        const filterString = filtersTitle.toLocaleLowerCase();

        const title = tree.colTitlesMap[tree.col_id].toLocaleLowerCase();

        if (title.indexOf(filterString) > -1) {
          console.log("text search: found md title text: "+ title)
          filteredTreeList[treeId] = tree;  
        }
        //TODO search also sub-set-titles ?
        
        // TODO search other metadata from text
        for (const mkey in tree.colKeywordMap) {
          for (const kwid in tree.colKeywordMap[mkey]) {
            const kw = tree.colKeywordMap[mkey][kwid].name.toLocaleLowerCase()

            if (kw.indexOf(filterString) > -1) {
              console.log("text search: found kw " + kw)
              filteredTreeList[treeId] = tree;  
            }
          }
        }

        for (const mkey in tree.colPeopleMap) {
          for (const pid in tree.colPeopleMap[mkey]) {
            const name = tree.colPeopleMap[mkey][pid].name.toLocaleLowerCase()

            if (name.indexOf(filterString) > -1) {
              console.log("text search: found person " + name)
              filteredTreeList[treeId] = tree;  
            }
          }
        }

        for (const mkey in tree.colRolesMap) {
          for (const rpid in tree.colRolesMap[mkey]) {
            const name = tree.colRolesMap[mkey][rpid].name.toLocaleLowerCase()

            if (name.indexOf(filterString) > -1) {
              console.log("text search: found role " + name)
              filteredTreeList[treeId] = tree;  
            }
          }
        }

      }
      else {
        //console.log("no filter text, so tree is in list")
        filteredTreeList[treeId] = tree;
      }

      

      for (const id in filtersMap[FILTERS_KEYWORD]) {
        //console.log(" check kw " + JSON.stringify(filtersMap[FILTERS_KEYWORD][id]));
        
        // if found meta_key
        const mtKey = filtersMap[FILTERS_KEYWORD][id].meta_key

        if (!tree.colKeywordMap[mtKey]
          || !tree.colKeywordMap[mtKey][id]) {
          console.log(" kw " + id + " not in tree: delete");
          delete filteredTreeList[treeId];
          
        }
        
      }

      for (const id in filtersMap[FILTERS_PEOPLE]) {
        //console.log(" check person " + id);
        let found = false;
        // if found in any meta_key
        for (const mtKey in tree.colPeopleMap) {
          if (tree.colPeopleMap[mtKey][id]) {
            found = true;
          }
        }
        if (found == false) {
          //console.log(" person " + id + " not in tree: delete");
          delete filteredTreeList[treeId];
        }
      }

      for (const id in filtersMap[FILTERS_ROLES]) {
        //console.log(" check role person " + id);
        let found = false;
        // if found in any meta_key
        for (const mtKey in tree.colRolesMap) {
          if (tree.colRolesMap[mtKey][id]) {
            found = true;
          }
        }
        if (found == false) {
          //console.log(" role person " + id + " not in tree: delete");
          delete filteredTreeList[treeId];
        }
      }
    }


    return filteredTreeList;
  };

  // watch(() => state.loading, () => {
  //   console.error("TREE: loading: " + state.loading)
  //   //useTree.value = state.treeMapper
  // })

  const buildMDRelatedMap = async (resp_data):Promise<iGenMetaData> => {
    const result = {};
    //console.log("buildMDRelatedMap: resp data:")
    //console.dir(resp_data)
    for await (const mdMap of resp_data) {
    //resp_data.forEach((mdMap) => {
      const md = mdMap["meta-data"];

      const md_key = md.meta_key_id;

      result[md_key] = md;

      // TODO filter only relevant data

      if (md.type == MD_TYPE_PEOPLE) {
        result[md_key].selectedPeople = mdMap[MD_PEOPLE];
      } else if (md.type == MD_TYPE_KEYWORDS) {
        result[md_key].selectedKeywords = mdMap[MD_KEYWORDS];
      } else if (md.type == MD_TYPE_ROLES) {
        result[md_key].selectedRoles = [];
        const md_role_data = (await apiH.api.metaDataDetail(md.id)).data
        const md_role_ids = md_role_data.value
        //console.log("got roles data: " + md_role_data + " ids: "+ md_role_ids)
        for await (const role_item of md_role_ids) {
            const md_role_id = role_item.id
            //console.log(" got md role id " + md_role_id)
            const roleData = (await apiH.api.metaDataRoleDetail(md_role_id)).data
            //console.log("got md role data: " + JSON.stringify(roleData))
            const pData = (await apiH.api.peopleDetail(roleData.person_id)).data
            //console.log("got md role person data: " + JSON.stringify(pData))
            roleData.person = pData
            result[md_key].selectedRoles.push(roleData)  
        }
      }
    }
    //console.log("buildMDRelatedMap: result ")
    //console.dir(result['madek_core:title'])
    //console.dir(result['creative_work:other_creative_participants'])
    return result;
  };

  const getMDPeopleNameList = (mdMap: iGenMetaData, mkey:String):string[] => {
    const authors = [] as string[];
    if (
      mdMap[mkey] &&
      mdMap[mkey].selectedPeople
    ) {
      mdMap[mkey].selectedPeople.forEach((element) => {
        const author = element.first_name + " " + (element.last_name || "");
        authors.push(author);
      });
    }
    return authors
  }
  
  const getMDRolesNameList = (mdMap: iGenMetaData, mkey:string):string[] => {
    const authors = [] as string[];
    if (
      mdMap[mkey] &&
      mdMap[mkey].selectedRoles
    ) {
      mdMap[mkey].selectedRoles.forEach((element) => {
        const role = element.person.first_name + " " + (element.person.last_name || "");
        authors.push(role);
      });
    }
    return authors
  }

  const buildEntryMetaData = async (
    tree: iTree,
    treeNode: iTreeNode,
    entryId: string
  ) => {
    //console.log("buildEntryMetaData: " + entryId)

    try {
      const resp_previews = (await apiH.api.mediaEntryPreviewDetail(entryId))
        .data;
      // get latest video preview image
      resp_previews
        .sort((a, b) => {
          return ("" + a.filename).localeCompare(b.filename);
        })
        .forEach((preview) => {
          if (preview.media_type == "image") {
            if (preview.thumbnail == "small") {
              tree.previews[entryId] = preview;
              //console.error("found entry with image small " + entryId)
            } else if (preview.thumbnail == "x_large") {
              tree.previewsLarge[entryId] = preview;
              //console.error("found entry with image large" + entryId)
            }
          } else if (preview.media_type == "audio") {
            //tree.previewsLarge[entryId] = preview;
            tree.previewsAudio[entryId] = tree.previewsAudio[entryId] || [];
            tree.previewsAudio[entryId].push(preview)
            //console.error("found entry with audio " + entryId)
          } else if (preview.media_type == "video") {
            //tree.previewsLarge[entryId] = preview;
            tree.previewsVideo[entryId] = tree.previewsVideo[entryId] || [];
            tree.previewsVideo[entryId].push(preview)
            //console.error("found entry with video " + entryId)
          } else if (preview.media_type == "document") {

            console.error("found entry with document " + entryId);
          } else {
            console.error(
              "found entry with unknown media type: " + preview.media_type
            );
          }
        });
    } catch (error) {
      console.error(
        "Could not get preview data for entry " + entryId + " : " + error
      );
    }

    try {
      const resp = (await apiH.api.mediaEntryMetaDataRelatedDetail(entryId, {}))
        .data;
    //console.log("buildEntryMetaData: " +  entryId + " got meta data. "
    //+ " md" + JSON.stringify(resp)
    //+ "loading: " + state.loading);

    
      const mdMap = (await buildMDRelatedMap(resp)) as unknown as iGenMetaData;

      tree.entryTitlesMap[entryId] = mdMap[MK_TITLE].string;
      tree.entries_authors[entryId] = getMDPeopleNameList(mdMap, MK_AUTHORS);
      
      

      tree.entries_meta_data[entryId] = mdMap;
    } catch(error) {
      console.error("Error: " + error + ":" + error.stack)
      
    }
  };

  const buildSubTreeEntries = async (tree: iTree, treeNode: iTreeNode) => {

    const col = treeNode.collection
    const sorting = treeNode.collection.sorting || "desc"
    // collection sorting to api sorting order mapping
    //"created_at DESC" "desc"
    //"created_at ASC" "asc"
    //"last_change"
    //"title ASC" "title_asc"
    //"title DESC" "title_desc"
    //"manual ASC" "manual_asc"
    //"manual DESC" "manual_desc"
    const sorting_order = sorting.replace('created_at ','').replace(' ','_').toLowerCase()
    //console.log("buildSubTreeEntries: "
    //  + " col.id "+ treeNode.collection.id 
    //  + " sorting: " + sorting + " query-order: " + sorting_order)
      
    const entry_query = {
      public_get_metadata_and_previews: true,
      collection_id: treeNode.collection.id,
      full_data: true,
      order: sorting_order,
      related_meta_data: true,
      //related_previews: true,
      //related_files: true,
    };
    state.loading++;
    const entries_resp = (await apiH.api.mediaEntriesList(entry_query)).data;
    //const entries_resp =  (await apiH.api.mediaEntriesRelatedDataList(entry_query)).data;
    state.loading--;
    const arcs = entries_resp.col_arcs;
    const entries = entries_resp.media_entries;

    treeNode.arcs = arcs || [];
    treeNode.entries = treeNode.entries || {};

    /* console.log("buildSubTreeEntries: "
      + treeNode.collection.id
      + " loading: " + state.loading) */

    if (!arcs?.length) {
      /* console.log("buildSubTreeEntries: "
          + treeNode.collection.id + ":"
          + "ABORT: No entries in set") */
      return;
    }
    let coverArc = undefined;
    const coverArcC = arcs?.find((e) => e.cover == true);
    const coverArcH = arcs?.find((e) => e.highlight == true);
    const coverArcP = arcs?.find((e) => e.position == 0);
    const coverArcF = arcs?.find((e) => typeof e !== "undefined");
    coverArc = coverArcC || coverArcH || coverArcP || coverArcF;

    /* console.log("buildSubTreeEntries: "
      + treeNode.collection.id + ":"
      + " found set cover: " 
      + " : " + JSON.stringify(coverArc)) */

    treeNode.coverId = coverArc?.media_entry_id;

    for await (const entry of entries) {
      if (entry.get_metadata_and_previews == true) {
        treeNode.entries[entry.id] = entry;
        await buildEntryMetaData(tree, treeNode, entry.id);

        if (entry.get_full_size == true) {
          try {
            const mf = (await apiH.api.mediaEntryMediaFileDetail(entry.id)).data
            if (mf.media_type == 'document') {
              //console.error("got doc and download allowed");
              treeNode.entries[entry.id].media_type_doc = true
            }
          } catch(error) {
            console.error("could not get me file data", error)
          }
          
        }
      } else {
        console.error(
          "buildSubTreeEntries: hidden entry: " +
            entry.id +
            ":" +
            entry.get_metadata_and_previews
        );
      }
    }
    //console.log("buildSubTreeEntries: col: " + treeNode.collection.id + " added count: " + entries.length)
  };

  const getOrCreateObject = (obj, key) => {
    obj[key] = obj[key] || {};
    return obj;
  };

  const buildSubTree = async (
    treeType: string,
    treeId: string,
    parent_id: string, //iCollection,
    depth: number | 0
  ) => {
    //state.loading++;
    /* console.log("buildSubTree: "
          + " Ttype: " + treeType
          + " Tid: " + treeId 
          + " P: " + parent.id 
          + " D: " + depth); */

    //state.loading++;
    const ccas_resp_data = await (
      await apiH.api.collectionCollectionArcsList({ parent_id: parent_id })
    ).data;
    //state.loading--;
    const ccas = ccas_resp_data["collection-collection-arcs"];

    // if (ccas.length == 0) {
    //   state.loading--;
    //   return;
    // }
    const edgesParent = //getOrCreateObject(state.treeMapper[treeType][treeId].edges,parent_id)
      (state.treeMapper[treeType][treeId].edges[parent_id] =
        state.treeMapper[treeType][treeId].edges[parent_id] || {});

    // console.log("buildSubTree: " + ccas.length)
    for await (const cca of ccas) {
      const cid = cca.child_id;
      const pid = cca.parent_id;
      const childCol = collectionsAll.get(cid);

      if (!childCol || !childCol.id) {
        /*const msg =
          "buildSubTree: invisible or invalid collection for child_id: " +
          cid +
          " collecction: " +
          JSON.stringify(childCol);*/
        //console.log(msg)
      } else {
        state.treeMapper[treeType][treeId].up[cid] = pid;

        edgesParent[cid] = {
          col_id: childCol.id,
          parent_id: pid,
          collection: childCol,
          depth: depth + 1,
          col_arc: cca,
        } as iTreeNode;
        //console.log(" new Tree node ")
        //console.dir(state.treeMapper[treeType][treeId].edges[parent_id][cid])
        await buildSubTree(treeType, treeId, childCol.id, depth + 1);
      }
    }

    //state.loading--;
  };

  const buildTree = async (treeType: string, col_id: string) => {
    const treeId = col_id;

    const tree = getOrCreateTree(treeType, treeId);
    tree.edges[RID] = tree.edges[RID] || {};
    tree.edges[RID][treeId] = {
      parent_id: RID,
      collection: collectionsAll.get(treeId),
      depth: 0,
    } as iTreeNode;
    tree.up = {};
    tree.up[treeId] = RID;
    await buildSubTree(treeType, treeId, col_id, 0);
    /* console.log("builtTree finished sub trees:"
      + " Ttype: " + treeType
      + " Tid: " + treeId
      + " loading:" + state.loading
    ) */
    //console.dir(state.treeMapper[treeType][treeId])
  };

  const buildCollectionMetaData = async (
    treeType: string,
    treeId: string,
    parentId: string,
    clientId: string
  ) => {
    
    /* console.log("buildCollectionMetaData: "
          + " Tyoe: " + treeType
          + " Tid: " + treeId
          + " Pid: " + parentId
            + " clientId: "+ clientId) */

    if (!clientId) {
      console.log(
        "buildCollectionMetaData: Abort: invalid clientId" +
          " Tyoe: " +
          treeType +
          " Tid: " +
          treeId +
          " Pid: " +
          parentId +
          " clientId: " +
          clientId
      );
      return;
    }

    const resp_data = await (
      await apiH.api.collectionMetaDataRelatedDetail(clientId, {})
    ).data;
    const mdMap = (await buildMDRelatedMap(resp_data));
    
    const tree = state.treeMapper[treeType][treeId]

    // for the filters
    tree.cols_meta_data =
      tree.cols_meta_data || {};
    tree.cols_meta_data[clientId] = mdMap;

    for (const metaKey in mdMap) {
      
      const md = mdMap[metaKey];
      if (metaKey == MK_TITLE) {
        tree.colTitlesMap[clientId] = md.string;
      } else if (metaKey == MK_AUTHORS) {
        tree.cols_authors[clientId] = getMDPeopleNameList(mdMap, MK_AUTHORS)
      } else if (metaKey == MK_PARTICIPANTS) {
        tree.cols_participants[clientId] = getMDRolesNameList(mdMap, MK_PARTICIPANTS)
        //console.log("got participants: " + tree.cols_participants[clientId])
      } else if (metaKey == MK_SEMESTER) {
        const sy = md.selectedKeywords[0].term.split('/')[0]
        const sem = sy.split(' ')[0]
          .replace('Sommersemester','SoSe')
          .replace('Wintersemester','WiSe')
        const year = sy.split(' ')[1]
        tree.cols_semesters[clientId] = year + ' ' + sem
        // i18 for semester keywords
        //const sem_en = sy.split(' ')[0]
        //  .replace('Sommersemester','SuSe')
        //  .replace('Wintersemester','WiSe')
        //tree.cols_semesters_en[clientId] = year + ' ' + sem_en
        
        //tree.cols_semesters[clientId] = md.selectedKeywords[0].term
      /* } else if (metaKey == MK_PROGRAM_OF_STUDY) {
        
        tree.cols_departments[clientId] = tree.cols_departments[clientId] || []
        md.selectedKeywords.forEach(kw => {
          tree.cols_departments[clientId].push(kw.term)
        })
        console.log("found program of study: " + JSON.stringify(tree.cols_departments[clientId])) */
      }
      // TODO mitwirkende
      // TODO year / from semester

      if (md.selectedKeywords && md.selectedKeywords.length) {
        tree.colKeywordMap[metaKey] =
        tree.colKeywordMap[metaKey] || {};
        for (const kw of md.selectedKeywords) {
          tree.colKeywordMap[metaKey][kw.id]
            = tree.colKeywordMap[metaKey][kw.id]
            || { name: kw.term, col_ids: [] };
          tree.colKeywordMap[metaKey][kw.id].col_ids.push(clientId);
        }
      }

      if (md.selectedPeople && md.selectedPeople.length) {
        tree.colPeopleMap[metaKey] =
        tree.colPeopleMap[metaKey] || {};
        for (const p of md.selectedPeople) {
          tree.colPeopleMap[metaKey][p.id]
           = tree.colPeopleMap[metaKey][p.id] || {
            name: p.searchable,
            col_ids: [],
          };
          tree.colPeopleMap[metaKey][p.id].col_ids.push(clientId);
        }
      }

      if (md.selectedRoles && md.selectedRoles.length) {
        tree.colRolesMap[metaKey] =
        tree.colRolesMap[metaKey] || {};
        for (const role of md.selectedRoles) {
          const prid = role.person.id
          //console.log("got role person: "+ prid)
          tree.colRolesMap[metaKey][prid] 
          = tree.colRolesMap[metaKey][prid] || {
            name: role.person.first_name + " " + role.person.last_name,
            col_ids: [],
            role: role,
            person: role.person
          };
          tree.colRolesMap[metaKey][prid].col_ids.push(clientId);
        }
      }
    }
  };

  const buildTreeMetaData = async (treeType: string, treeId: string) => {
    const tree = state.treeMapper[treeType][treeId];
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
        const treeNode =
          state.treeMapper[treeType][treeId].edges[parentId][clientId];
        await buildSubTreeEntries(tree, treeNode);
        await buildCollectionMetaData(treeType, treeId, parentId, clientId);
      }
    }
  };

  const getParent = (
    treeType: string,
    treeId: string,
    colId: string
  ): string | undefined => {
    let result = undefined;
    if (
      state.treeMapper &&
      state.treeMapper[treeType] &&
      state.treeMapper[treeType][treeId] &&
      state.treeMapper[treeType][treeId].up
    ) {
      result = state.treeMapper[treeType][treeId].up[colId];
    }

    return result;
  };

  const getPath2Root = (
    treeType: string,
    treeId: string,
    colId: string
  ): string[] => {
    const result = [] as string[];

    let ccol_id: string = colId;
    while (state.treeMapper[treeType][treeId].up[ccol_id]) {
      result.push(ccol_id);
      ccol_id = state.treeMapper[treeType][treeId].up[ccol_id];
    }
    return result;
  };

  const fetch_cols_all = async () => {
    const cols_query = {
      full_data: true,
      public_get_metadata_and_previews: true,
      page: 0,
      size: 10000,
    };
    const cols_data = (await apiH.api.collectionsList(cols_query))
      .data as CollectionsListData;

    cols_data.collections.forEach((colEl: CollectionDetailData) => {
      collectionsAll.set(colEl.id, colEl);
    });

    console.log(
      " got collections all " +
        cols_data.collections.length +
        ":" +
        collectionsAll.size
    );
  };

  const initTree = async (treeType:string, colId:string) => {
    if (!collectionsAll.size) {
      await fetch_cols_all()
    }
    await buildTree(treeType, colId);
    await buildTreeMetaData(treeType, colId);
    useTree.value = state.treeMapper;
    //return state.treeMapper;

  }
  const initTrees = async (keyword_match: string, treeType:string) => {
    /*const filterBy = JSON.stringify({
      meta_data: [{ key: "any", match: keyword_match }],
    });
    const cols_query_match = {
      full_data: false,
      public_get_metadata_and_previews: true,
      page: 0,
      size: 10000,
      filter_by: filterBy,
    };
    const cols_data = (await apiH.api.collectionsList(cols_query_match))
      .data as CollectionsListData;

    console.log("got cols for keyword: " + keyword_match + ":" + treeType)
    
    //console.dir(cols_data)

    for await (const colEl of cols_data.collections) {
      if (CHILD_IDS_SCHAUFENSTER[colEl.id]
        //|| keyword_match !== MATCH_PROJECTS
        ) {
        //console.log("found col id in schaufenster set ids: " + colEl.id)
        initTree(treeType, colEl.id)
        //console.log("finished build tree and meta_data " + colEl.id);
      } else {
        console.log("set not in schaufenster set ids: " + colEl.id)
      }
    }
  

    //useState('tree-' + keyword_match, () => { return state.treeMapper[keyword_match] })
    */
    for (const colId in CHILD_IDS_SCHAUFENSTER) {
      await initTree(treeType, colId)
      console.log("finished build tree and meta_data " + colId + " as " + treeType);
    }
    console.log("finished build tree all " + keyword_match);
    useTree.value = state.treeMapper;
    //console.dir(state.treeMapper)
  };

  //const COL_ID_SCHAUFENSTER = '75a2d948-fefa-405f-b8c4-40d7de7c0ddf'
  const DATA_COL_COL_ARC = "collection-collection-arcs"
  const CHILD_IDS_SCHAUFENSTER = {} as {[key:string]: string};

  const buildRootChildList = async (root_set_id:string) => {
    const ccas_resp_data = await (
      await apiH.api.collectionCollectionArcsList({ parent_id: root_set_id })
    ).data;
    
    const ccas = ccas_resp_data["collection-collection-arcs"];
    
    const ccass =  ccas.slice(0, useRuntimeConfig().public.MAX_PROJECT_COUNT);

    console.log("initTree: schaufenster col count:" + ccass.length)
    for await (const cca of ccass) {
      CHILD_IDS_SCHAUFENSTER[cca.child_id] = cca.child_id
    }   
    console.log("buildRootChildList: schaufenster col count:" 
     + Object.keys(CHILD_IDS_SCHAUFENSTER).length)
     + " all : " + ccas.length
  }
  const initApi = (apiBaseUrl:string) => {
    apiH = getNewApi(getNewConfig(apiBaseUrl))
  }
  const initForest = async (root_set_id:string) => {
    console.log("initForest: ");

    await fetch_cols_all();
    await buildRootChildList(root_set_id)
    

    await initTrees(MATCH_VAL_PROJECT, MATCH_PROJECTS);


    //TODO just copy the trees
    for (const treeId in state.treeMapper[MATCH_PROJECTS]) {
      console.log("scan tree for kw " + treeId)
      const tree = state.treeMapper[MATCH_PROJECTS][treeId]
      //console.dir(tree)
      let found = false
      for (const metaKey in tree.colKeywordMap) {
        //console.log("scan tree for kw " + treeId + ":" + metaKey)
        for (const kwId in tree.colKeywordMap[metaKey]) {
          
          const data = tree.colKeywordMap[metaKey][kwId]
          //console.log("scan tree for kw " + treeId + ":" + metaKey + ":" + kwId + ":" + data.name)

          if (data.name.indexOf(MATCH_VAL_DIPLOM) > -1
            || data.name.indexOf(MATCH_VAL_MAGISTER) > -1) {
              found = true
              /*console.error("found magister or diplom in projekt md: " 
                + " treeId:" + treeId
                + " MK:" + metaKey
                + " kwId:" + kwId
                + " data: " + JSON.stringify(data))*/
          }
        }
      }
      if (found) {
        console.log("found magister or diplom in projekt md: " 
          + " treeId:" + treeId)
        getOrCreateTree(MATCH_DIPLOM, treeId)
        state.treeMapper[MATCH_DIPLOM][treeId] = tree
        useTree.value = state.treeMapper;
      }
      
    }

    //await initTrees(MATCH_VAL_DIPLOM, MATCH_DIPLOM);
    //await initTrees(MATCH_VAL_MAGISTER, MATCH_DIPLOM);

    console.log(
      " built collections map " +
        " All: " +
        collectionsAll.size +
        " Project: " +
        Object.keys(state.treeMapper[MATCH_PROJECTS]).length
        + " Diplom: " +
        Object.keys(state.treeMapper[MATCH_DIPLOM]).length 
    );

    return state.treeMapper;
  };

  return {
    MATCH_DIPLOM,
    MATCH_PROJECTS,
    RID,
    FILTERS_KEYWORD,
    FILTERS_PEOPLE,
    FILTERS_ROLES,

    MK_AUTHORS,
    MK_KEYWORDS,
    MK_PARTICIPANTS,
    MK_SEMESTER,
    MK_TITLE,

    MK_PROGRAM_OF_STUDY,
    MK_PROJECT_LEADER,
    MK_PROJECT_TYPE,
    MK_DEPARTMENTS,

    collectionsAll,

    buildTree,
    buildSubTree,
    initApi,
    initTree,
    initForest,
    buildCollectionMetaData,
    buildTreeMetaData,

    getTreeTitle,
    getParent,
    getPath2Root,
    getMapCount,
    getFilterCount,
    updateFilters,

    ...toRefs(state),
  };
};
