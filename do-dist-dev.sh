#!/bin/sh

export NUXT_APP_BASE_URL=/sfdev/; nuxi build

rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/schaufenster-dev/nuxt-schaufenster/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek-sf-dev"
