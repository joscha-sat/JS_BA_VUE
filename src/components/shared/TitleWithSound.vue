<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
defineProps({
    title: String
})

const speechStore = useTextToSpeechStore();
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="title">
        <h1> {{ title }}</h1>
        <v-btn :icon="'mdi-volume-high'" color="primary" @click="speechStore.playVoice(title)">
        </v-btn>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    margin-top: 2rem;
}
</style>
