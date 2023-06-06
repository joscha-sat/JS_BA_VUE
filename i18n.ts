import { createI18n } from 'vue-i18n';
import en from './src/locales/en.json';
import de from './src/locales/de.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        de,
    },
});

export default i18n;
