import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

// import translationEng from "../locales/en/translation.json";
// import translationEsp from "../locales/es/translation.json";



i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: {
          "Max15": "Must be 15 characters max",
          "Required": "Required",
          "changeTheme": "Toggle Theme",
          "Title": "make your trip",
          "Name": "Name",
          "DateStart": "Date Start",
          "DateEnd": "Date End",
          "Save": "Save",
          "All": "All",
          "Confirmed": "Confirmed",
          "Unconfirmed": "Unconfirmed",
          "Removed": "Delete",
          "ConfirmedOne": "Confirmed",
          "Logout": "Logout",
        }
      },
      it: {
        translations: {
          "Max15": "Massimo 15 caratteri",
          "Required": "Richiesto",
          "changeTheme": "Cambia Tema",
          "Title": "prepara il tuo viaggio",
          "Name": "Nome",
          "DateStart": "Data inizio",
          "DateEnd": "Data fine",
          "Save": "Invia",
          "All": "Tutti",
          "Confirmed": "Confermati",
          "Unconfirmed": "Non confermati",
          "Removed": "Rimuovi",
          "ConfirmedOne": "Confermato",
          "Logout": "Esci",
        }
      },
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;
