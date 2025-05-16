#!/bin/sh
export NUXT_APP_KIOSK_SET_LIST_ID=d4130cb5-0101-463e-bf92-e9c1776778f7
export NUXT_APP_BASE_URL=/juryrundgang2025
npm run build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/staging/juryrundgang2025/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek.staging.kiosk.juryrundgang2025"
