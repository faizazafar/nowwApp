import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ar } from './translations';
// const { languageDetectorPlugin } = require("../utils/languageDetectorPlugin");

const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,
    },
};

i18n.use(initReactI18next)
    // .use(languageDetectorPlugin)
    .init({
        resources,
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        react: {
            useSuspense: false,
        },
    });

export default i18n;
