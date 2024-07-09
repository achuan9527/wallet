import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh from './zh.json';
import ph from './ph.json';
import vi from './vi.json';
const lng = localStorage.getItem('lang')
  ? JSON.parse(localStorage.getItem('lang')!)
  : 'en';
i18n.on('initialized', () => {});
i18n.on('languageChanged', () => {});
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // ns: ['common', 'error', 'menu'],
    // defaultNS: 'common',
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      ph: {
        translation: ph,
      },
      vi: {
        translation: vi,
      },
    },
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
