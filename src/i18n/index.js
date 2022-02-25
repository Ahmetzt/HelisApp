import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

Vue.use(VueI18n)

const messages = { en: en, tr: tr };
const i18n = new VueI18n({
    // locale: localStorage.getItem('Lang') || process.env.VUE_APP_I18N_LOCALE,
    locale: localStorage.getItem('Lang') || 'tr',
    messages,
});

export default i18n;