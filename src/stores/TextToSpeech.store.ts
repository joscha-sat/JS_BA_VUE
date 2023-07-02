import { defineStore } from 'pinia';
import { useSpeechSynthesis } from '@vueuse/core';
import i18n from '../../i18n';

interface SpeechStore {
    voice: SpeechSynthesisVoice | undefined;
    speech: ReturnType<typeof useSpeechSynthesis>;
    synth: SpeechSynthesis;
    voices: SpeechSynthesisVoice[];
    filteredVoices: SpeechSynthesisVoice[];
}

export const useTextToSpeechStore = defineStore('textToSpeech', {
    state: (): SpeechStore => ({
        voice: undefined as SpeechSynthesisVoice | undefined,
        speech: useSpeechSynthesis(''),
        synth: window.speechSynthesis,
        voices: [] as SpeechSynthesisVoice[],
        filteredVoices: [] as SpeechSynthesisVoice[],
    }),

    actions: {
        // load voices onMounted in component
        async onMounted() {
            await this.loadVoices();

            // only display german and english
            this.filteredVoices = this.voices.filter(
                (voice) => voice.lang === 'de-DE' || voice.lang === 'en-GB'
            );

            // default voice
            if (i18n.global.locale.value === 'en') {
                this.voice = this.voices.find(
                    (voice) =>
                        voice.name === 'Microsoft Ryan Online (Natural) - English (United Kingdom)'
                );
            } else {
                this.voice = this.voices.find(
                    (voice) => voice.name === 'Microsoft Conrad Online (Natural) - German (Germany)'
                );
            }
        },

        loadVoices() {
            return new Promise<void>((resolve) => {
                if (this.synth.getVoices().length > 0) {
                    this.voices = this.synth.getVoices();
                    resolve();
                } else {
                    this.synth.onvoiceschanged = () => {
                        this.voices = this.synth.getVoices();
                        resolve();
                    };
                }
            });
        },

        playVoice(txt) {
            this.speech.value = useSpeechSynthesis(txt, {
                voice: this.voice,
            });
            this.speech.value.speak();
        },
    },
});
