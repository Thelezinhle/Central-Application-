// src/config/i18n.js
// Configuration for multi-language support using i18next

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import esTranslation from '../locales/es/translation.json';
import frTranslation from '../locales/fr/translation.json';
import ptTranslation from '../locales/pt/translation.json';
import arTranslation from '../locales/ar/translation.json';
import zhTranslation from '../locales/zh/translation.json';
import hiTranslation from '../locales/hi/translation.json';

const resources = {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    fr: { translation: frTranslation },
    pt: { translation: ptTranslation },
    ar: { translation: arTranslation },
    zh: { translation: zhTranslation },
    hi: { translation: hiTranslation },
};

i18n
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // React integration
    .init({
        resources,
        fallbackLng: 'en', // Default language
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false, // React already handles XSS
        },
    });

export default i18n;
