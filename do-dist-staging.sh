#!/bin/sh
export NUXT_APP_ROOT_SET_ID='75a2d948-fefa-405f-b8c4-40d7de7c0ddf'
export NUXT_APP_API_BASE_URL='https://madek.hfg-karlsruhe.de'
export API_BASE_URL='https://madek.hfg-karlsruhe.de'
export NUXT_APP_BASE_URL='/schaufenster'
#export NUXT_APP_USE_CACHED_DATA=1
#export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_dev_tree_data.json'

# export SUSER=alex
export SUSER=hherold

npm run build
rsync -avz .output $SUSER@dev.madek.hfg-karlsruhe.de:/srv/staging/schaufenster/
ssh $SUSER@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek.staging.schaufenster"
