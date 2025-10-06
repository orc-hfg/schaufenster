#!/bin/sh
export NUXT_APP_ROOT_SET_ID='ec8d67e0-e27b-44dc-8e10-3b6dc2cc340e'
export NUXT_APP_API_BASE_URL='https://madek.hfg-karlsruhe.de'
export API_BASE_URL='https://madek.hfg-karlsruhe.de'
export NUXT_APP_BASE_URL='/'
export PASSWORD_PROTECT='SF2025'
export NUXT_APP_USE_CACHED_DATA=1
export NUXT_APP_USE_CACHE_FILE='/home/madek/schaufenster_tree_data.json'

nuxi cleanup
npm run build

export SUSER=alex
export SPATH=/home/madek/schaufenster.hfg-karlsruhe.de/
export SSERVER=madek.hfg-karlsruhe.de
export SSERVICE=schaufenster.hfg-karlsruhe.de
ssh $SUSER@$SSERVER "sudo chown -R $SUSER:users $SPATH"
rsync -avz .output $SUSER@$SSERVER:$SPATH
ssh $SUSER@$SSERVER "sudo chown -R madek:users $SPATH"
ssh $SUSER@$SSERVER "sudo systemctl restart $SSERVICE"

