#!/bin/sh
export NUXT_APP_KIOSK_SET_ID=13ab489e-5051-42ef-b55b-b5051b6031df
export NUXT_APP_BASE_URL=/rundgang2025
npm run build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/staging/rundgang2025/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek.staging.kiosk.rundgang2025"
