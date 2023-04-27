import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';
import { useSettingsHelperStore } from '@/stores/SettingsHelper.store';

export const useOnLoadHelperStore = defineStore('onLoadHelper', () => {
    // STATE ------------------------------------------------------------------------------------------ |>
    const theme = useTheme();
    const settingsStore = useSettingsHelperStore();
    const { selectedFontFamily } = storeToRefs(settingsStore);

    // GETTER | COMPUTED ------------------------------------------------------------------------------ |>

    // ACTIONS | FUNCTIONS ---------------------------------------------------------------------------- |>

    const setPrimaryColor = () => {
        const color = localStorage.getItem('primary-color');
        if (color) {
            theme.themes.value.light.colors.primary = color;
            theme.themes.value.dark.colors.primary = color;
        }
    };

    const setFontSize = () => {
        const fontSize = localStorage.getItem('fontSize');
        if (fontSize) document.body.style.fontSize = `${fontSize}px`;
    };

    const setFontFamily = () => {
        const fontFamily = localStorage.getItem('font-family');
        if (fontFamily) document.body.setAttribute('data-font-family', fontFamily.toLowerCase());
        selectedFontFamily.value = fontFamily;
    };

    const setThemeMode = () => {
        const selectedTheme = localStorage.getItem('mode');
        if (selectedTheme && selectedTheme === 'light') {
            theme.global.name.value = 'light';
        } else if (selectedTheme && selectedTheme === 'dark') {
            theme.global.name.value = 'dark';
        }
    };

    // RETURN --------------------------------------------------------------------------------------- |>
    return { setPrimaryColor, setFontSize, setFontFamily, setThemeMode };
});
