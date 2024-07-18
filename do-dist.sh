#!/bin/sh

npm run build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/schaufenster/nuxt-schaufenster/
