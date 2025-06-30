import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from './en/en.json'
import translationPT from './pt_BR/pt_BR.json'

const resources = {
  en: {
    translation: translationEN
  },
  pt_BR: {
    translation: translationPT
  }
}

const storagedLanguage = localStorage.getItem('@Danti:CurrentUserLanguage')

i18n.use(initReactI18next).init({
  resources,
  lng: storagedLanguage || 'pt_BR',
  fallbackLng: 'pt_BR',
  interpolation: {
    escapeValue: false,
    defaultVariables: {
      max_upload_size: '25',
      size_type: 'MB'
    }
  }
})
export default i18n
