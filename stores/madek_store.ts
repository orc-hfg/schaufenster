import { 
    type AppSettingsListData
} from '../generated/data-contracts';

import { apiHelper } from '../composables/apiHelper';
import { defineStore } from 'pinia'
import { Api } from '~/generated/API_fetch_xeio';

const { getNewApi, getNewConfig } = apiHelper()

export const useMadekStore = defineStore('madek', {

    state: () => ({
        loaded: false as boolean,
        appSettings: {} as AppSettingsListData,
        api: {} as Api<unknown>,
        //apiH: apiHelper

    }),
    getters: {

    },
    actions: {
        /*getApi() {
            return this.api
        },*/
        reset() {
            this.loaded = false
            this.appSettings = {} as AppSettingsListData
        },
        initApi(apiBaseUrl:string) {
            this.api = getNewApi(getNewConfig(apiBaseUrl))
        },
        async initPublic() {
            const api = this.api

            try{
                //console.error(" get app settings " 
                //    + api + ":" + api.api);
                const resp = (await api.api.appSettingsList())
                //console.error(" got app settings: resp: ")
                
                //console.dir(resp)
                //const data = (resp.data)
                this.appSettings = resp.data // (await api.api.appSettingsList()).data
                //console.error("got app settings response data " + this.appSettings)
            } catch(ex) {
                console.error("Could not load madek app settings." + ex)
                throw ex
            }

        },
      
        async metaDataDetail(id:string) {
            return this.api.api.metaDataDetail(id)
        }


    }
})

