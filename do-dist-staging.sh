#!/bin/sh
export NUXT_APP_ROOT_SET_ID='75a2d948-fefa-405f-b8c4-40d7de7c0ddf'
export NUXT_APP_API_BASE_URL='https://madek.hfg-karlsruhe.de'
export API_BASE_URL='https://madek.hfg-karlsruhe.de'
export NUXT_APP_BASE_URL='/schaufenster'
#export NUXT_APP_USE_CACHED_DATA=1
#export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_dev_tree_data.json'

nuxi cleanup
npm run build


export SUSER=alex
export SPATH=/srv/staging/schaufenster/
export SSERVER=dev.madek.hfg-karlsruhe.de
export SSERVICE=madek.staging.schaufenster
ssh $SUSER@$SSERVER "sudo chown -R $SUSER:users $SPATH"
rsync -avz .output $SUSER@$SSERVER:$SPATH
ssh $SUSER@$SSERVER "sudo chown -R madek:users $SPATH"
ssh $SUSER@$SSERVER "sudo systemctl restart $SSERVICE"
