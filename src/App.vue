<template>
    <v-app>
        <v-app-bar :elevation='2' color='primary'>
            <template #append>
                <v-btn :to='"/settings"' icon='mdi-cog' variant='plain'></v-btn>
                <v-btn icon='mdi-theme-light-dark' variant='plain' @click='toggleTheme()'></v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang='ts' setup>
import { useTheme } from 'vuetify';

const theme = useTheme();
const initialLoadingHelperStore = useOnLoadHelperStore();

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
    localStorage.setItem('mode', theme.global.name.value);
};

onMounted(() => {
    // set primary color on load --> from old session (localStorage)
    initialLoadingHelperStore.setPrimaryColor();

    // set font size on load from --> old session (localStorage)
    initialLoadingHelperStore.setFontSize();

    // set font family on load --> from old session (localStorage)
    initialLoadingHelperStore.setFontFamily();

    // set theme mode on load --> from old session (localStorage)
    initialLoadingHelperStore.setThemeMode();

});
</script>

<style lang='scss'>
@use "style" as *;
</style>
