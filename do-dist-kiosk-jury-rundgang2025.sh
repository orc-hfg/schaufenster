#!/bin/sh
export NUXT_APP_API_BASE_URL=https://madek.hfg-karlsruhe.de
export PASSWORD_PROTECT=Nominierungen2025
export NUXT_APP_KIOSK_SET_LIST_ID=faf2824d-0472-4681-ad59-2f5e531cc047
export NUXT_APP_BASE_URL=/nominierungen
export NUXT_APP_USER_TOKEN=3BDPWSQGRE0F9QZG3ZR6Z0GFDAFJKRDQ
export NUXT_APP_KIOSK_INTRO_TEXT_LINES='Nominierungen::der::Förder-::gesellschaft::ZKM/HfG'
export NUXT_APP_KIOSK_INFO_H_1="Diese virtuelle Präsentation zeigt alle von den Lehrenden der Hochschule für Gestaltung Karlsruhe (HfG) für die Preise der Fördergesellschaft ZKM/HfG 2025 nominierten Studierendenprojekte. Die Preisverleihung findet im Rahmen des Rundgangs am 24. Juli an der HfG statt. Einige der nominierten Projekte sind beim Rundgang ausgestellt. Die Projektdaten der virtuellen Präsentation stammen aus dem digitalen Archiv der HfG."
export NUXT_APP_KIOSK_INFO_P_1="  "
export NUXT_APP_KIOSK_INFO_H_2="Das Typo-Feature"
export NUXT_APP_KIOSK_INFO_P_2="Schriftgestaltung hat an der HfG eine lange Tradition. Mit dem Typo Feature – den großen Titelschriften, deren Font zufällig wechselt – geben wir Studierenden die Möglichkeit, von ihnen gestaltete Schriften auf Schaufenster zu präsentieren."
export NUXT_APP_KIOSK_INFO_H_3="Über diese Website"
export NUXT_APP_KIOSK_INFO_P_3="Diese Webseite ist die Kiosk-Version von Schaufenster. Schaufenster wurde 2024/2025 vom Team des HfG Open Resource Center mit Unterstützung durch die Stiftung Innovation in der Hochschullehre und in Zusammenarbeit mit den Designern Marcel Strauß und Felix Plachtzik entwickelt."
#export NUXT_APP_SWR_TTL=2592000
export NUXT_APP_USE_CACHED_DATA=1
#npm run dev

npm run build
rsync -avz .output alex@madek.hfg-karlsruhe.de:/home/madek/sf_kiosk_nom2025/
ssh alex@madek.hfg-karlsruhe.de "sudo systemctl restart madek.sf_kiosk_nom2025"
