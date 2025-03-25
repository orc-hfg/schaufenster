#!/bin/sh

export NUXT_APP_BASE_URL=/schaufenster/; nuxi build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/dev/schaufenster/nuxt-schaufenster/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek.dev.schaufenster"
