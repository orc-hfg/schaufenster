#!/bin/sh
export NUXT_APP_API_BASE_URL=https://madek.hfg-karlsruhe.de
export API_BASE_URL=https://madek.hfg-karlsruhe.de
#export PASSWORD_PROTECT=Grad26
export NUXT_APP_KIOSK_SET_LIST_ID=c7355d5b-e05f-46a1-87a5-3604b66d0195
export NUXT_APP_BASE_URL=/app
export NUXT_APP_USER_TOKEN=3BDPWSQGRE0F9QZG3ZR6Z0GFDAFJKRDQ
export NUXT_APP_KIOSK_INTRO_TEXT_LINES='Graduierten-::ausstellung::Hochschule::für Gestaltung::Karlsruhe'
#export NUXT_APP_KIOSK_INFO_H_1='Rundgang Online ist die digitale Ausstellung zum Rundgang an der Hochschule für Gestaltung Karlsruhe. Der Rundgang 2025 findet vom 24. – 27. Juli an der HfG statt. Die digitale Ausstellung gibt einen Einblick in die dort präsentierten Projekte.'
export NUXT_APP_KIOSK_INFO_P_1="Die Hochschule für Gestaltung Karlsruhe zeigt auf grad.hfg-karlsruhe.de Abschlussarbeiten und Diplomprojekte ihrer aktuellen Graduiertenausstellung sowie Einblicke in die Ausstellungen der vergangenen Jahre. \
Alle Projekte, die hier zu sehen sind, können auch im Projektarchiv der HfG unter https://madek.hfg-karlsruhe.de eingesehen und recherchiert werden. \
Kontakt: orc@hfg-karlsruhe.de"
#export NUXT_APP_KIOSK_INFO_H_2="Das Typo-Feature"
#export NUXT_APP_KIOSK_INFO_P_2="Schriftgestaltung hat an der HfG eine lange Tradition. Mit dem Typo Feature – den großen Titelschriften, deren Font zufällig wechselt – geben wir Studierenden die Möglichkeit, von ihnen gestaltete Schriften auf Schaufenster zu präsentieren."
#export NUXT_APP_KIOSK_INFO_H_3="Über diese Website"
#export NUXT_APP_KIOSK_INFO_P_3="Diese Website ist die Kiosk-Version von Schaufenster. Schaufenster wurde 2024/2025 vom Team des HfG Open Resource Center mit Unterstützung durch die Stiftung Innovation in der Hochschullehre und in Zusammenarbeit mit den Designern Marcel Strauß und Felix Plachtzik entwickelt."

export NUXT_APP_SET_ORDER='date'
export NUXT_APP_USE_CACHED_DATA=false
export NUXT_APP_USE_CACHE_FILE='/home/madek/sf_kiosk_grad2026_tree_data.json'
#export NUXT_APP_USE_CACHE_FILE='sf_kiosk_artka2026_tree_data.json'

nuxi cleanup

#npm run dev
npm run build

export SUSER=alex
#export SUSER=hherold
export UISERVER=madek.hfg-karlsruhe.de
export SPATH=/home/madek/sf_kiosk/grad2026/
export SSERVICE=madek.sf_kiosk_grad2026
ssh $SUSER@$UISERVER "sudo chown -R $SUSER:users $SPATH"
rsync -avz .output $SUSER@$UISERVER:$SPATH
ssh $SUSER@$UISERVER "sudo chown -R madek:users $SPATH"
ssh $SUSER@$UISERVER "sudo systemctl restart $SSERVICE"
