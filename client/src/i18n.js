import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';
import az from './locales/az.json';

// Initialize i18next
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ru: { translation: ru },
        az: { translation: az },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
        escapeValue: false, // React already escapes by default
    },
});

export default i18n;
