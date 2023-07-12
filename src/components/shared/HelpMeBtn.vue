<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
const speechStore = useTextToSpeechStore();
const btnTxt = ref('click here for help!');

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div>
        <v-btn color="primary">
            {{ btnTxt }}
        </v-btn>
        <v-icon color="primary" style="margin-left: 0.25rem" @click="speechStore.playVoice(btnTxt)">
            mdi-volume-high
        </v-icon>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
