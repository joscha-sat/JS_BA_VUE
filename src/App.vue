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

<script lang="ts" setup>

</script>
