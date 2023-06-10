<template>
    <v-app>
        <v-app-bar :elevation='2' color='primary'>
            <template #append>
                <v-btn :to='"/settings"' icon='mdi-cog' variant='plain'></v-btn>
                <v-btn icon='mdi-theme-light-dark' variant='plain' @click='toggleTheme()'></v-btn>
                <v-btn icon='mdi-account-voice' variant='plain' @click='toggleLanguage()'></v-btn>
                <v-btn :icon=' isDog ? "mdi-cat" : "mdi-dog"' variant='plain' @click='toggleMascot()'></v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang='ts' setup>
import { useTheme } from 'vuetify';
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";
import i18n from "../i18n";
import { storeToRefs } from "pinia";
import { useMascotStore } from "@/stores/mascot.store";


const theme = useTheme();
const initialLoadingHelperStore = useOnLoadHelperStore();
const speechStore = useTextToSpeechStore();
const { voice, voices } = storeToRefs(speechStore)

const mascotStore = useMascotStore();
const { isDog } = storeToRefs(mascotStore)

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
    localStorage.setItem('mode', theme.global.name.value);
};

const toggleMascot = () => {


    isDog.value = !isDog.value
}


const toggleLanguage = () => {
    if (i18n.global.locale.value === 'en') {
        i18n.global.locale.value = "de"
        voice.value = voices.value.find(
          (voice) =>
            voice.name ===
            'Microsoft Conrad Online (Natural) - German (Germany)'
        );
        console.log(voice.value)
    } else {
        i18n.global.locale.value = "en"
        console.log(voices.value)
        voice.value = voices.value.find(
          (voice) =>
            voice.name ===
            'Microsoft Ryan Online (Natural) - English (United Kingdom)'
        );

        console.log(voice.value)
    }
}

onMounted(() => {
    // set primary color on load --> from old session (localStorage)
    initialLoadingHelperStore.setPrimaryColor();

    // set font size on load from --> old session (localStorage)
    initialLoadingHelperStore.setFontSize();

    // set font family on load --> from old session (localStorage)
    initialLoadingHelperStore.setFontFamily();

    // set theme mode on load --> from old session (localStorage)
    initialLoadingHelperStore.setThemeMode();

    // set voices
    speechStore.onMounted();
});
</script>

<style lang='scss'>
@use "style" as *;
</style>
