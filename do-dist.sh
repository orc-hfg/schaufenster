#!/bin/sh

npm run build
rsync -avz .output alex@dev.madek.hfg-karlsruhe.de:/srv/schaufenster/nuxt-schaufenster/
ssh alex@dev.madek.hfg-karlsruhe.de "sudo systemctl restart madek-schaufenster"
