export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de',
    messages: {
        de: {
            intro: {
                title1: "Projektarchiv",
                title2: "der",
                title3: "Hochschule",
                title4: "für Gestaltung ",
                title5: "Karlsruhe",
                title: "Projektarchiv der Hochschule für Gestaltung Karlsruhe"
            },
            menu: {
                about: "Über",
                label_de: "de",
                label_en: "en",
                fonts: "Schriften",
                impressum: "Impressum",
                dsa: "Datenschutz"
            }
        },
        en: {
            intro: {
                title1: "Project archive",
                title2: "der",
                title3: "Hochschule",
                title4: "für Gestaltung ",
                title5: "Karlsruhe",
            },
            menu: {
                about: "About",
                label_de: "de",
                label_en: "en",
                fonts: "Fonts",
                impressum: "Impressum",
                dsa: "DSA"
            }
        }
    }
}))