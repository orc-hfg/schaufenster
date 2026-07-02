#!/bin/sh
export NUXT_APP_API_BASE_URL=https://madek.hfg-karlsruhe.de
export API_BASE_URL=https://madek.hfg-karlsruhe.de
export PASSWORD_PROTECT=ArtKA26
export NUXT_APP_KIOSK_SET_LIST_ID=d10b9d55-d495-41a5-acdb-7a49818dbc4b
export NUXT_APP_BASE_URL=/artka2026
export NUXT_APP_USER_TOKEN=3BDPWSQGRE0F9QZG3ZR6Z0GFDAFJKRDQ
export NUXT_APP_KIOSK_INTRO_TEXT_LINES='Art Karlsruhe 2026::Positionen der::Hochschule::für Gestaltung::Karlsruhe'
#export NUXT_APP_KIOSK_INFO_H_1='Rundgang Online ist die digitale Ausstellung zum Rundgang an der Hochschule für Gestaltung Karlsruhe. Der Rundgang 2025 findet vom 24. – 27. Juli an der HfG statt. Die digitale Ausstellung gibt einen Einblick in die dort präsentierten Projekte.'
export NUXT_APP_KIOSK_INFO_P_1="Diese Präsentation zeigt ausschließlich die auf dem academy:square der Art Karlsruhe 2026 ausgestellten studentischen Projekte der Hochschule für Gestaltung. Die Auswahl der Positionen wurde von einer Jury getroffen. Die Projektdaten stammen aus dem digitalen Archiv der HfG."
#export NUXT_APP_KIOSK_INFO_H_2="Das Typo-Feature"
#export NUXT_APP_KIOSK_INFO_P_2="Schriftgestaltung hat an der HfG eine lange Tradition. Mit dem Typo Feature – den großen Titelschriften, deren Font zufällig wechselt – geben wir Studierenden die Möglichkeit, von ihnen gestaltete Schriften auf Schaufenster zu präsentieren."
#export NUXT_APP_KIOSK_INFO_H_3="Über diese Website"
#export NUXT_APP_KIOSK_INFO_P_3="Diese Website ist die Kiosk-Version von Schaufenster. Schaufenster wurde 2024/2025 vom Team des HfG Open Resource Center mit Unterstützung durch die Stiftung Innovation in der Hochschullehre und in Zusammenarbeit mit den Designern Marcel Strauß und Felix Plachtzik entwickelt."

export NUXT_APP_USE_CACHED_DATA=1
export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_kiosk_artka2026_tree_data.json'
#export NUXT_APP_USE_CACHE_FILE='sf_kiosk_artka2026_tree_data.json'

nuxi cleanup

#npm run dev
npm run build

export SUSER=alex
#export SUSER=hherold
export UISERVER=madek.hfg-karlsruhe.de
export SPATH=/home/madek/sf_kiosk/artka2026/
export SSERVICE=madek.sf_kiosk_artka2026
ssh $SUSER@$UISERVER "sudo chown -R $SUSER:users $SPATH"
rsync -avz .output $SUSER@$UISERVER:$SPATH
ssh $SUSER@$UISERVER "sudo chown -R madek:users $SPATH"
ssh $SUSER@$UISERVER "sudo systemctl restart $SSERVICE"
