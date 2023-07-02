import { defineStore } from 'pinia';

export const useSoundHelperStore = defineStore('soundHelper', {
    state: () => ({
        audioIsPlaying: false,
        isPlayedOnce: false,
    }),

    // GETTER -------------------------------------------------------------------- //>
    getters: {},

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {
        playSound(src: string) {
            // avoid playing sound multiple times at once
            if (!this.audioIsPlaying) {
                this.audioIsPlaying = true;
                const audio = new Audio(src);
                audio.addEventListener('ended', () => {
                    this.audioIsPlaying = false;
                });
                audio.play().then();
            }
            this.isPlayedOnce = true;
        },
    },
});
