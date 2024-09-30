export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de',
    messages: {
        de: {
            intro: {
                title1: "Schaufenster",
                title2: "der",
                title3: "Hochschule",
                title4: "für Gestaltung ",
                title5: "Karlsruhe",
                title: "Projektarchiv der Hochschule für Gestaltung Karlsruhe"
            },
            menu: {
                about: "Info",
                label_de: "de",
                label_en: "en",
                fonts: "Schriften",
                impressum: "Impressum",
                dsa: "Datenschutz"
            },
            filter: {
                btn_apply_label: "Anwenden",
                btn_close_label: "Filter zurücksetzen",
                label_projects: "Projekte",
                label_filter_keywords: "Schlagworte",
                label_filter_authors: "Autor/innen",
                label_filter_participants: "Mitwirkende",
                label_filter_progofstudy: "Fachbereich",
                label_filter_project_type: "Projekt-Kategorie",
                label_filter_project_leader: "Betreuer/in",
                label_filter_semester: "Semester",
            },
            setlist: {
                intro_title_project: "Alle",
                intro_title_project2: "Projekte",
                intro_title_diplom: "Abschluss-",
                intro_title_diplom2:"arbeiten",

                btn_title_menu: "Menu",
                btn_title_toggle_project: "Alle Projekte",
                btn_title_toggle_diplom: "Abschlussarbeiten",
                btn_title_filter: "Filter",
                btn_title_filter_reset: "Reset",
            },
            setview: {
                
                btn_title_nav_back: "Zurück",
                btn_title_nav_parent_set: "Über-Set",
                btn_title_nav_current_set: "Aktuelles Set",
                btn_title_nav_info: "Medien-Informationen",
                btn_title_btm_bar_hide: "Navigation ausblenden",
                btn_title_btm_bar_show: "Navigation einblenden",
                btn_title_btm_bar_set_show_all: "Alle Set-Elemente anzeigen",
                btn_title_btm_bar_set_show_less: "Weniger Set-Elemente anzeigen",
                btn_title_audio_video_play: "Abspielen",
                btn_title_audio_video_pause: "Pausieren",
                btn_title_audio_video_mute: "Leise",
                btn_title_audio_video_unmute: "Laut",
                btn_title_audio_video_progress: "Fortschritt",
            },
            meta_info: {
                error_no_data: "Warte auf Meta-Daten...",
                label_title: "Titel",
                label_title_en: "Titel (en)",
                label_authors: "Medienersteller (Autor)",
                label_copyright: "Copyright",
                label_license: "Lizenz",

                label_project_parent_title: "Titel [Wurzel-Projekt]",
                label_project_title: "Titel [Projekt]",
                label_project_title_en: "Titel [Projekt, EN]",
                label_project_subtitle: "Untertitel [Projekt]",
                label_project_subtitle_en: "Untertitel [Projekt, EN]",

                label_project_authors: "Autor/in",
                label_project_category: "Kategorie",
                label_project_keywords: "Schlagworte",
                label_project_leader: "Betreuer/innen",
                label_project_semester: "Zeitraum",
                label_project_program_of_study: "Studiengang",
                
                label_project_description: "Beschreibung",
                label_project_description_en: "Beschreibung [EN]",
                label_project_participants: "Mitwirkende",
                label_project_extra: "Weiteres",
            }
        },
        en: {
            intro: {
                title1: "Schaufenster",
                title2: "of",
                title3: "Karlsruhe",
                title4: "University",
                title5: "of Arts and Design",
            },
            menu: {
                about: "Info",
                label_de: "de",
                label_en: "en",
                fonts: "Fonts",
                impressum: "Imprint",
                dsa: "Privacy Policy"
            },
            setlist: {
                intro_title_project: "All",
                intro_title_project2: "Projects",
                intro_title_diplom: "Graduation",
                intro_title_diplom2: "Projects",
                
                btn_title_menu: "Menu",
                btn_title_toggle_project: "All Projects",
                btn_title_toggle_diplom: "Graduation Projects",
                btn_title_filter: "Filter",
                btn_title_filter_reset: "Reset",
            },
            
        }
    }
}))