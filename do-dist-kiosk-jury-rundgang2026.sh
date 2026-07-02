#!/bin/sh
export NUXT_APP_API_BASE_URL=https://madek.hfg-karlsruhe.de
export PASSWORD_PROTECT=Nominierungen2026
export NUXT_APP_KIOSK_SET_LIST_ID=917c5260-3045-4fbf-81c9-58464c756c8f
export NUXT_APP_BASE_URL=/nominierungen
export NUXT_APP_USER_TOKEN=
export NUXT_APP_KIOSK_INTRO_TEXT_LINES='Nominierungen::der::Förder-::gesellschaft::ZKM/HfG'
export NUXT_APP_KIOSK_INFO_H_1="Diese virtuelle Präsentation zeigt alle von den Lehrenden der Hochschule für Gestaltung Karlsruhe (HfG) für die Preise der Fördergesellschaft ZKM/HfG nominierten Studierendenprojekte. Die Preisverleihung findet im Rahmen des Rundgangs an der HfG statt. Einige der nominierten Projekte sind beim Rundgang ausgestellt. Die Projektdaten der virtuellen Präsentation stammen aus dem digitalen Archiv der HfG."
export NUXT_APP_KIOSK_INFO_P_1="  "
export NUXT_APP_KIOSK_INFO_H_2="Das Typo-Feature"
export NUXT_APP_KIOSK_INFO_P_2="Schriftgestaltung hat an der HfG eine lange Tradition. Mit dem Typo Feature – den großen Titelschriften, deren Font zufällig wechselt – geben wir Studierenden die Möglichkeit, von ihnen gestaltete Schriften auf Schaufenster zu präsentieren."
export NUXT_APP_KIOSK_INFO_H_3="Über diese Website"
export NUXT_APP_KIOSK_INFO_P_3="Diese Website ist die Kiosk-Version von Schaufenster. Schaufenster wurde 2024/2025 vom Team des HfG Open Resource Center mit Unterstützung durch die Stiftung Innovation in der Hochschullehre und in Zusammenarbeit mit den Designern Marcel Strauß und Felix Plachtzik entwickelt."
#export NUXT_APP_SWR_TTL=2592000

#export NUXT_APP_USE_CACHED_DATA=1
#export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_kiosk_nom2026_tree_data.json'

#export NUXT_APP_USE_CACHE_FILE='~/sf_kiosk_nom2025_tree_data.json'

nuxi cleanup
#npm run dev

npm run build

export SUSER=alex
#export SUSER=hherold

export SPATH=/home/madek/sf_kiosk_nom2026/
export SSERVICE=madek.sf_kiosk_nom2026
ssh $SUSER@madek.hfg-karlsruhe.de "sudo chown -R $SUSER:users $SPATH"
rsync -avz .output $SUSER@madek.hfg-karlsruhe.de:$SPATH
ssh $SUSER@madek.hfg-karlsruhe.de "sudo chown -R madek:users $SPATH"
ssh $SUSER@madek.hfg-karlsruhe.de "sudo systemctl restart $SSERVICE"
