#!/bin/sh
export NUXT_APP_API_BASE_URL=https://madek.hfg-karlsruhe.de
export PASSWORD_PROTECT=Kiosk2025
export NUXT_APP_KIOSK_SET_LIST_ID=13621247-d80e-407f-9c44-43dfe7407a2e
export NUXT_APP_BASE_URL=/rundgang
export NUXT_APP_KIOSK_INTRO_TEXT_LINES='Rundgang 2025::der::Hochschule::für Gestaltung::Karlsruhe'
export NUXT_APP_KIOSK_INFO_H_1='Rundgang Online ist die digitale Ausstellung zum Rundgang an der Hochschule für Gestaltung Karlsruhe. Der Rundgang 2025 findet vom 24. – 27. Juli an der HfG statt. Die digitale Ausstellung gibt einen Einblick in die dort präsentierten Projekte.
Die Projektdaten stammen aus dem digitalen Archiv der HfG und können auch im Projektarchiv der HfG unter https://madek.hfg-karlsruhe.de. eingesehen und detaillierter recherchiert werden.
Mehr Informationen zum Studium an der HfG: https://hfg-karlsruhe.de'
export NUXT_APP_KIOSK_INFO_P_1="  "
export NUXT_APP_KIOSK_INFO_H_2="Das Typo-Feature"
export NUXT_APP_KIOSK_INFO_P_2="Schriftgestaltung hat an der HfG eine lange Tradition. Mit dem Typo Feature – den großen Titelschriften, deren Font zufällig wechselt – geben wir Studierenden die Möglichkeit, von ihnen gestaltete Schriften auf Schaufenster zu präsentieren."
export NUXT_APP_KIOSK_INFO_H_3="Über diese Website"
export NUXT_APP_KIOSK_INFO_P_3="Diese Webseite ist die Kiosk-Version von Schaufenster. Schaufenster wurde 2024/2025 vom Team des HfG Open Resource Center mit Unterstützung durch die Stiftung Innovation in der Hochschullehre und in Zusammenarbeit mit den Designern Marcel Strauß und Felix Plachtzik entwickelt."

export NUXT_APP_USE_CACHED_DATA=1
#export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_kiosk_nom2025_tree_data.json'
export NUXT_APP_USE_CACHE_FILE='/home/alx/sf_kiosk_rundgang_tree_data.json'

npm run dev

#npm run build
#rsync -avz .output alex@madek.hfg-karlsruhe.de:/home/madek/rundgang2025/
#ssh alex@madek.hfg-karlsruhe.de "sudo systemctl restart madek.kiosk.rundgang"
