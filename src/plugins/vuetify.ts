// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

// light theme
const light = {
    dark: false,
    colors: {
        primary: '#3b807a',
        cancel: '#e7e7e7',
        bg: '#f5f5f5',
    },
};

// dark theme
const dark = {
    dark: true,
    colors: {
        primary: '#5acbc3',
        cancel: '#383838',
        bg: '#262626',
    },
};

export default createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            light,
            dark,
        },
    },
});
