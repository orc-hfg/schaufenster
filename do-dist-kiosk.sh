#!/bin/sh
export NUXT_APP_KIOSK_SET_ID=f9519557-5a60-4f5e-8fb4-a39e7ef3f6fb
export NUXT_APP_BASE_URL=/kiosk
npm run build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/staging/kiosk/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek.staging.kiosk"
