#!/bin/sh
export NUXT_APP_ROOT_SET_ID='75a2d948-fefa-405f-b8c4-40d7de7c0ddf'
export NUXT_APP_API_BASE_URL='https://staging.madek.hfg-karlsruhe.de'
export NUXT_APP_BASE_URL='/schaufenster'
export NUXT_APP_USE_CACHED_DATA=1
#export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_dev_tree_data.json'
export NUXT_APP_USE_CACHE_FILE='sf_staging_tree_data.json'

npm run dev
