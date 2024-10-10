
# TODOs

# problems
[
## setview: states: btm bar hide vs. zoom vs. video/audio-controls vs. btm-bar-btn

1. switch to video slide
2. hide btm nav slider
3. switch btn nav btn state (- -> +)
4. show video control
5. We are not in zoom state
6. if toggle btm-bar-btn (+ -> -)
7. hide video control
8. show btm-bar
9. if toggle btm-bar again (- -> +)
10. hide btm-bar, set zoom state
11. show a/v-control
]

# allgemein

## Header navbar Home immer an gleicher Stelle (border fehlt). (About View u.w.)


# page / view transitions

## setview<->setlist page animation; blinken/flackern ist das der page-enter-leave-fade-effekt

## setview->setlist: animation für slider image fehlt (fade out)

## setview <-> filter: animation TBD


# font-view

## font-view: design in figma

## link to font developer (from json)

## text für font auswahlseite definiert in Figma


# menu-view

## menu: about etc. after closing go back to menuview

## menu -> about etc: do fade (to dark more)

## menu: click does not match opened view

## gleiche logik wie intro  für schriftgrößen / no scrolling / fit to screen

DONE: Fit to screen
DONE: animate in: move 10vh up; out: 10vh down; and opacity
DONE: no logo move, but fade

## menu nicht orc logo sondern den Dot nav-home

DONE: home icon ohne mix blend

## menu animation io gleich wie set view intro info mit blur layer und opacity

DONE: backdrop-filter blur(30px) zusätzlich zum Blur der durch verstecken der header navbar / project-counter / year-selector stattfindet.
backdrop filter auch für header; das ORC-Logo blurt dann komisch durch. Auch wenn ich den Blur zB auf 90px setze.
TODO: backdop kommt noch hart: TODO ani, wenn wir diesen wirklich möchten.

## menu sprachwahl: menu faded aus, danach wird erst die sprache gesetzt

DONE: 500ms delay with menu close on locale switch

# Filter-View

## Filter Navbar Home Btn animation nicht von oben

DONE: filter: home faded ein, sonstige ui faehrt nacht oben raus.

## show more / less icon einfügen

## setview -> filter: animation TBD

## filter -> setview: animation

### setview->filter-view: von oben / nach oben / show-meta-info-btn und title nach oben animieren

## filter: hide impossible combinations

DONE: filter: make impossible combination impossible to click; cursor default;

## show all on active filter tag (on init)

DONE: filter: show all for meta_key if has selected filter-tags

## filter project list: line statt hr; volle breite

## scrollbar ausblenden alle browser

DONE: filter: hide scrollbar for all browsers

## filter navbar mit padding ohne transarenz; graue linie als abschluss

## filter width more responsive

DONE: filter: left/right margin 10vw; content is each 40vw minus a gap of 24px each

## filter intro animation weniger translate (nur 10vh)

DONE: filter: intro ani auf 20vh gesetzt, damit er sicher aus dem Bild ist

## filter zahl näher an text

DONE: filter: tag counter: removed number padding

# setview / [landing page im projekt]

## setview: on slide video / audio: btm bar hide macht kein zoom für das video / audio slide

DONE: setview: show_av_control does not set zoom

## setview: ani: meta-info: kein btns während der animation

DONE: setview: show meta_info ani: hide nav l/r btns

## setview: meta info: mehr padding

DONE: more padding-right (80px) meta-info

## setview: meta info: show more / less icon einfügen

## hoover effekt fehlt in meta-info auf filter tags


## setview theme switch läuft unterschiedlich lang (animation timing wo kein timing sein sollte)

## difference effekt mit satturation rausgedreht -> SW für Nav-Pfeile

DONE: mit filter: contrast(0) : Passt das so auch für helle und dunkle Hintergründe; Es hat nicht diese bunten Effekte, wie es der difference Filter hätte.

## setview: entry info animation noch smooth; flickering ist weg Juhu

DONE: smoothie ani show/hide meta-info

### fullscreen animation blockieren um springen zu unterbinden

DONE: fullscreen independant of btm_nav_hide

### als notfall animationen vorher , dann entry info

DONE: kein Notfall mehr nötig.

### setview: meta info: init fehler (text wird nicht bis ... angezeigt)

### setview: meta info keyowords show all/less animation fehlt

### setview: intro title: move text up/down with animation

DONE: setview: intro title: ani: move up/down text

### setview: audio zentrieren ( nicht 100% width / height, sondern wie image slide)

### setview: bug theme setting by audio or image

Teilweise wird das Theme nicht auf dark gesetzt, obwohl zu einem audio slide navigiert wurde.

### bug: div

### setview: primäres set ist aufgeklappt (mit oder ohne buttons)


## setview: btm bar / nav-slider:

### position show more / less; cursor pointer auf btns;

### hover position leicht nach rechts, nur für show more

## navbar highlight color stimmt noch nicht im dark theme (check changed vars)


## setview: video player

### no auto play if first element is video

DONE: setview: no auto play if first element is video

### video bar erst einblenden, wenn set info blur aufgelöst

DONE: setview: video bar erst einblenden, wenn set info blur aufgelöst

## setview: title intro blend: vertical zentrieren

DONE: setview: title intro blend: vertical zentrieren und nach 50 Zeichen abgeschnitten

## audio video player : play state is wrong (switch auto play / non auto play)

## AV progress farben; progress click pos noch nicht korrekt

## video play btn fehlt, wenn meta info aktiv;

## video mute btn fehlt noch

## audio nav bar preview fehler mit title des subsets

## next/prev btn 50% von preview box (nicht von view height)

## btm bar nav hide ( zoom ): animation back fehlt

## slide video/audio gleich groß, wie wie image slide

DONE: setview: slide video/audio gleich groß, wie wie image slide

# project setlist

## setlist: preview: wenn kein eigene entries im set, dann inhalt aus subset ? TDB: Marcel / Felix

## setlist: preview: kein Bild: Rahmen auch zufällig positionieren und Größen-definieren

## setlist: animate in: von unten auch nur 10vh wie intro view

## setlist: project counter

### setlist: project counter: width: 35vw

### setlist: project counter: opacity am Rand gegen null: Gradient meine ich; beispiel aus figma

Nur Highlight Zeile hat hintergrund mit blur und opacity und border round. Andere Zeilen besitzen nur opacity.
Move old pc to branch.

# intro-view

## intro-view: re-enable timeout

### mobile: text komprimiert in höhe


# lang parameter by url
