import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

export const LANGS = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'Français' },
  { id: 'ar', label: 'العربية' },
];

// Order: language chosen manually (localStorage "lang") -> browser language -> English.
// Nothing is cached automatically, so the browser language keeps being followed
// until the visitor picks a language from the menu.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, fr: { translation: fr }, ar: { translation: ar } },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'ar'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: { order: ['localStorage', 'navigator'], lookupLocalStorage: 'lang', caches: [] },
    interpolation: { escapeValue: false },
  });

export function setLanguage(id) {
  try { localStorage.setItem('lang', id); } catch { /* storage blocked */ }
  return i18n.changeLanguage(id);
}

function sync() {
  const lng = i18n.resolvedLanguage || 'en';
  const root = document.documentElement;
  root.lang = lng;
  root.dir = i18n.dir(lng);
  document.title = i18n.t('meta.title');
  const set = (sel, v) => document.querySelector(sel)?.setAttribute('content', v);
  set('meta[name="description"]', i18n.t('meta.description'));
  set('meta[property="og:title"]', i18n.t('meta.title'));
  set('meta[property="og:description"]', i18n.t('meta.description'));
}
i18n.on('languageChanged', sync);
sync();

export default i18n;
