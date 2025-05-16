#!/bin/sh
export NUXT_APP_KIOSK_SET_LIST_ID=f9519557-5a60-4f5e-8fb4-a39e7ef3f6fb
#13ab489e-5051-42ef-b55b-b5051b6031df
export NUXT_APP_BASE_URL=/rundgang2025
npm run build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/staging/rundgang2025/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek.staging.kiosk.rundgang2025"
