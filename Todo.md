# TODOs

# allgemein

## Header navbar Home immer an gleicher Stelle (border fehlt). (About View u.w.)

## "Statische" Seiten mit Designern besprechen > Layout und Styles für Headings etc. OK?

## CSS Variablen checken bzw. `.Spaces_Dimensions {}` in `vars.css` erklären > diese Variablen scheinen nicht anzukommen?

## Zitierbarkeit: meta-tags in <header> / bspw. Zotero (mehr Info von Víctor)

# page / view transitions

## setview->setlist: animation für slider image fehlt (fade out)
DONE fade out slide image; TODO fade out meta-info

## setview <-> filter: animation TBD

# Impressum view

# about view

# datenschutz view

# font-view

## GH: font-view: drop down (responsive) layout

## GH: font-view: fade header text if drop down is open

## GH: link to font developer (from json)
TODO: link und author ausfülllen

# menu-view

## Sprachwechsel findet nach schliessen des Menu statt
TBD kein aufblinken (wechsel) von button; kein btn active

## menu animation io gleich wie set view intro info mit blur layer und opacity

DONE: backdrop-filter blur(30px) zusätzlich zum Blur der durch verstecken der header navbar / project-counter / year-selector stattfindet.
backdrop filter auch für header; das ORC-Logo blurt dann komisch durch. Auch wenn ich den Blur zB auf 90px setze.
TODO: backdop kommt noch hart: TODO ani, wenn wir diesen wirklich möchten.

# Filter-View

## final layout

## show more / less icon layout
HH wenn icon eingefügt

# setview / project-view

## setview: meta info: show more / less icon layout / design
HH wenn icon eingefügt

## setview: meta info: projekt-titel auskommentieren / projekt unter titel ja / parent (vollständ), wenn im header abgeschnitten

## setview: meta-info: -> finales Layout: bitte Reihenfolge entsprechend anpassen
TBC HH Reihenfolge
AL Logik
DISKUSSION um Kommmentare

## GH: setview: BUG:
Bug in Safari: wenn man Bottom-Bar ausblendet, Meta-Info öffnet und wieder schließt, blendet sich die Bottom-Bar von alleine wieder ein. Sollte eigentlich ausgeblendet bleiben. In Chrome und Firefox taucht dieser bug nicht auf.

## GH: setview: btm bar: BUG: does not animate down, but left down, dep. on cur. slide position
Position / Animation von Button Bar sieht noch fehlerhaft aus, beim Schließen und öffnen der Meta-Infos, wenn aktives Thumbnail sich in der Mitte des Screens befindet.

## setview: meta info: "Quelle" / Link to Madek
AL Dann HH

### setview: audio zentrieren ( nicht 100% width / height, sondern wie image slide)


# GH: setview: filter: scroll to selected meta-key
Wenn man in einem Projekt einen Filter klickt, öffnet sich die Filter-Seite. Es kann aber sein, dass der gewählte Filter weiter unten auf der Seite steht und also nicht im Sichtfeld ist.

> Bitte automatisch zu gewähltem Filter scrollen (Sprung zum Anker?)

## setview: btm bar / nav-slider:
## setview: main-slider: subsub-set icon
DONE
HH style subsubset-enty in main-slider / nav-slider

### setview: btm-bar/nav-slider: position show more / less btns; cursor pointer auf btns

## navbar highlight color stimmt noch nicht im dark theme (check changed vars)

## setview: video player: AV progress farben (webkit/firefox)
TBC (AL) -> branch `setview_video-player_progress-bar`
1. richtiger component bearbeitet? 
2. CSS Variables unklar
3. weitere Tests machen 

## setview: video-player: overlay video play btn fehlt, wenn meta info aktiv
AL icon einfügen
HH positionierung

# project setlist

## GH: BUG: responsive column count: 1 col < 1024px; 2 cols < 1280px; 3 cols if projects


## setlist: animate in: von unten auch nur 10vh wie intro view

## setview: project title for meta info: move up some more, still visible if width < 1280

## setlist: project counter
TODO filter grey;

# intro-view

## fix out animation timing

### mobile: text komprimiert in höhe
# lang parameter by url

# i18config als json





# DONE

## setview: audio nav bar preview fehler mit title des subsets
DONE: TBC (AL) -> HH Vorschlag: Container "nav_preview_audio" innerhalb von "nav_preview" absolut positionieren (branch `setview_video-player_progress-bar`).
## setlist: preview: wenn kein eigene entries im set, dann inhalt aus subset ? TDB: Marcel / Felix
DONE

## GH: setlist: preview: kein Bild: Rahmen auch zufällig positionieren und Größen-definieren
DONE: da jetzt eig. immer ein preview vorhande.

## about view: feinschliff
DONE
## about view: text-inhalte
DONE
## about view: icons
DONE
## about view: Email-Adressen im Fließtext maskieren (Spam-Schutz)
DONE
## datenschutz view: feinschliff
DONE
## datenschutz view: text-inhalte
DONE
## datenschutz view: Email-Adressen im Fließtext maskieren (Spam-Schutz)
DONE

## Impressum view: remove "zurück" for nav home/back
DONE
## Impressum view: Feinschliff
DONE
## Impressum view: Text-Inhalte
TBC (AL)
## impressum view: Email-Adressen im Fließtext maskieren (Spam-Schutz)
DONE
## about view: remove "zurück" for nav home/back
DONE
## setview: meta-info: animate show more/less for keywords/people/roles
DONE
## font-view: new drop down design, chevrons
DONE
# Content allgemein: Logos unter assets
DONE
## datenschutz view: remove "zurück" for nav home/back
DONE


## setview: meta info filter_tags: show all/less animation fehlt
DONE

## setview: meta-info: disable click for un-searchable filter tags
DONE

## setview: video player: progress click pos noch nicht korrekt
DONE

## pointer-events: none: bitte auf super headlines + project-counter anwenden. Dadurch sparen wir das aufwendig scroll imitieren + Projekte werden klickbar obwohl Text darüber liegt
DONE


### setlist: project counter: pointer-events:none
DONE
### setlist: project counter: mask-image-Technik
DONE
### setlist: project counter: Anzahl gezeigter Projekte 3 statt 4
DONE
### setlist: project counter: mask-image verfeinern
DONE
### setlist: project counter: text-shadow entfernen, bei schwarzem Text mix-blend-mode greyscale verwenden
DONE

## menu: about etc. after closing go back to menuview
## menu -> about etc: do fade (to dark more)
DONE: menu-view -> fonts-view: fade to dark mode


## menu: click does not match opened view
DONE: menu: click does not match opened view


## setview: meta info: init fehler (text wird nicht bis ... angezeigt)
DONE

## setview: meta info: final layout
DONE


## filter-view: scroll-content abgeschnitten! bitte 100vh
DONE: filter-view: scroll-content abgeschnitten: 100vh - 200px (padding before scroll)



# intro-view
DONE: intro-view: re-enable timeout

# setview / project-view

## setview: zoom (btm bar nav hide): animation back fehlt
DONE: zoom: animation back fixed
### setview: primäres set ist aufgeklappt (mit oder ohne buttons)
DONE: setview: primäres set ist aufgeklappt (mit oder ohne buttons)
## setview: 
DONE: BUG: after init jumps one position over next slide
### setview: navbar: hover position leicht nach rechts, nur für show more
DONE: setview: navbar: show-more: hover position leicht nach rechts (nicht für show-less)
## setview: on slide video / audio: btm bar hide macht kein zoom für das video / audio slide
DONE: setview: show_av_control does not set zoom
## setview: ani: meta-info: kein btns während der animation
DONE: setview: show meta_info ani: hide nav l/r btns
## setview: meta-info: hoover effekt fehlt in meta-info auf filter tags
DONE: setview: meta-info: hoover effekt fehlt in meta-info auf filter tags
## setview: meta info: mehr padding
DONE: more padding-right (80px) meta-info
## difference effekt mit satturation rausgedreht -> SW für Nav-Pfeile
DONE: mit filter: contrast(0) : Passt das so auch für helle und dunkle Hintergründe; Es hat nicht diese bunten Effekte, wie es der difference Filter hätte.
## setview: entry info animation noch smooth; flickering ist weg Juhu
DONE: smoothie ani show/hide meta-info
### fullscreen animation blockieren um springen zu unterbinden
DONE: fullscreen independant of btm_nav_hide
### als notfall animationen vorher , dann entry info
DONE: kein Notfall mehr nötig.
### setview: intro title: move text up/down with animation
DONE: setview: intro title: ani: move up/down text

## setview: meta-info: material: alles als text liste (auch die keywords)


# setview: video

## setview: video player: main slider: next/prev btn 50% von preview box (nicht von view height)
DONE: setview: video player: main slider: next/prev btn 50% von preview box (nicht von view height)
### no auto play if first element is video
DONE: setview: no auto play if first element is video
### video bar erst einblenden, wenn set info blur aufgelöst
DONE: setview: video bar erst einblenden, wenn set info blur aufgelöst
## setview: title intro blend: vertical zentrieren
DONE: setview: title intro blend: vertical zentrieren und nach 50 Zeichen abgeschnitten
## slide video/audio gleich groß, wie wie image slide
DONE: setview: slide video/audio gleich groß, wie wie image slide
## setview: a/v-player: play state is wrong (switch auto play / non auto play)
DONE: setview: a/v-player: play state in sync with video/audio play state
## setview: video mute btn fehlt noch
DONE: video mute/unmute btn and function
## setview: nav-slider: subsub-set: no more preview: now boxes
DONE: setview: nav-slider: subsub-set: no more preview: now boxes
DONE: fix hover/active set states


# filter-view

## setview: meta-info: if not selectable: show as text (nicht als button)
DONE

## filter navbar mit padding ohne transarenz; graue linie als abschluss
DONE: filter-view: navbar mit padding ohne transarenz; graue linie als abschluss
## filter-view: project list: line statt hr; volle breite
DONE: filter-view: project list: line statt hr; volle breite
DONE: filter-view: text-input: border style
## setview -> filter: animation TBD
DONE: setview->filter: ani: fade and move in; show-info-btn /meta-info-title move-out
## filter -> setview: animation
DONE: filter->setview: ani: fade and move out; show-info-btn /meta-info-title move-in
## Filter Navbar Home Btn animation nicht von oben
DONE: filter: home faded ein, sonstige ui faehrt nacht oben raus.
### setview->filter-view: von oben / nach oben / show-meta-info-btn und title nach oben animieren
DONE: setview->filter-view: ani: meta-info-title: move-up/down
DONE: setview->filter-view: ani: meta-info-show-btn: move-up/down
## filter: disable impossible combinations
DONE: filter: make impossible combination impossible to click; cursor default;
## show all on active filter tag (on init)
DONE: filter: show all for meta_key if has selected filter-tags
## scrollbar ausblenden alle browser
DONE: filter: hide scrollbar for all browsers
## filter width more responsive
DONE: filter: left/right margin 10vw; content is each 40vw minus a gap of 24px each
## filter intro animation weniger translate (nur 10vh)
DONE: filter: intro ani auf 20vh gesetzt, damit er sicher aus dem Bild ist
## filter zahl näher an text
DONE: filter: tag counter: removed number padding



# menu-view
## menu-view: gleiche logik wie intro  für schriftgrößen / no scrolling / fit to screen
DONE: Fit to screen
DONE: animate in: move 10vh up; out: 10vh down; and opacity
DONE: no logo move, but fade
## menu-view: menu nicht orc logo sondern den Dot nav-home
DONE: home icon ohne mix blend
## menu sprachwahl: menu faded aus, danach wird erst die sprache gesetzt
DONE: 500ms delay with menu close on locale switch


# fonts-view

## font-view: design in figma
DONE: font-view: design in figma
## font-view: test-text für font definiert in Figma
DONE: font-view: test-text für font definiert in Figma
