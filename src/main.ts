import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import i18n from '../i18n';

const pinia = createPinia();

loadFonts();

createApp(App).use(router).use(pinia).use(i18n).use(vuetify).mount('#app');
