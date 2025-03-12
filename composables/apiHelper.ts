
import { Api } from '../generated/API_fetch_xeio'
import { useFetch } from 'nuxt/app'

export const apiHelper = (baseUrl?: string) => {
    
    
    const getNewConfig = (baseUrl?:string) => {
      const config = {
        baseUrl: baseUrl || 'https://staging.madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'https://dev.madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'http://localhost:8080'
        //baseUrl: baseUrl || 'http://localhost:3104'
        ,
        //customFetch: useFetch
        //customFetch: (...fetchParams: Parameters<typeof fetch>) => $fetch(...fetchParams)
      }
      return config
    }
    const getNewApi = (apiConfig) => {    
      const api = new Api(apiConfig)
      return api
    }

    const apiConfig = getNewConfig(baseUrl)
    const api = getNewApi(apiConfig)
    //new Api(apiConfig)

    
    return {
        apiConfig,
        api,
        getNewApi,
        getNewConfig 
    }
}


