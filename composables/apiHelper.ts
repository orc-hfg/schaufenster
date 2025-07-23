
import { Api } from '../generated/API_fetch_xeio'
import { useFetch } from 'nuxt/app'

export const apiHelper = (baseUrl?: string) => {
    
    
    const getNewConfig = (baseUrl?:string) => {
      
      const config = {
        
        baseUrl: baseUrl
          || process.env.API_BASE_URL 
          || process.env.NUXT_APP_API_BASE_URL 
          || 'https://madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'https://staging.madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'https://dev.madek.hfg-karlsruhe.de'
        //baseUrl: baseUrl || 'http://localhost:8080'
        //baseUrl: baseUrl || 'http://localhost:3104'
        ,
        //customFetch: useFetch
        //customFetch: (...fetchParams: Parameters<typeof fetch>) => $fetch(...fetchParams)
      }
      console.error("use api base url: " + config.baseUrl + ":" + process.env.API_BASE_URL 
          + ":" +  process.env.NUXT_APP_API_BASE_URL  )
      return config
    }
    const getNewApi = (apiConfig) => {    
      const api = new Api(apiConfig)
      return api
    }

    const apiConfig = undefined // getNewConfig(baseUrl)
    const api = undefined // getNewApi(apiConfig)
    
    return {
        apiConfig,
        api,
        getNewApi,
        getNewConfig 
    }
}


