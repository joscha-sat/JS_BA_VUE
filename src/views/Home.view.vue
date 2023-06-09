<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>


import { useSpeechSynthesis } from "@vueuse/core";

const txt = ref();

const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);


const test = () => {

    speech.value = useSpeechSynthesis(txt.value.textContent, {
        voice
    })
    speech.value.speak()
}


</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-container style="display: flex; align-items: center; gap: 0.5rem">
        <div ref="txt">
            {{ $t('GREETINGS') }}
        </div>

        <v-btn icon="mdi-play" @click="test"></v-btn>

    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
