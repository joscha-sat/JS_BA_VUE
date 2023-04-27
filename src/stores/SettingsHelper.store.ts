import { defineStore } from 'pinia';

export const useSettingsHelperStore = defineStore('settingsHelper', {
    state: () => ({
        selectedFontFamily: 'Calibri',
    }),

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {
        saveFontFamily() {
            document.body.setAttribute('data-font-family', this.selectedFontFamily.toLowerCase());
            localStorage.setItem('font-family', this.selectedFontFamily);
        },

        saveSettings() {
            this.saveFontFamily();
        },
    },
});
