import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import frTranslation from "../locales/fr/translation.json";
import arbTranslation from "../locales/arb/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: frTranslation,
      },
      arb: {
        translation: arbTranslation,
      },
      // Add more languages as needed
    },
    fallbackLng: "fr", // Set your default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
