// src/core/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../es';
import es from './es';

// Importamos los archivos de traducción


// Los recursos contienen las traducciones
const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  // Detecta el idioma del usuario
  .use(LanguageDetector)
  // Pasa el i18n a react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto si no se detecta ninguno
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // No es necesario para React
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;