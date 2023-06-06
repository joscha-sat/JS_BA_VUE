<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>


import { useSpeechSynthesis } from "@vueuse/core";

const txt = ref();
const text = ref();

const speechStore = useTextToSpeechStore();
const { speech, voices, voice } = storeToRefs(speechStore);


const test = () => {
    text.value = txt.value.textContent;

    speech.value = useSpeechSynthesis(text, {
        voice
    })
    speech.value.speak()
}


</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-container>
        <div ref="txt">
            {{ $t('GENERAL.SAVE') }}
        </div>

        <v-btn @click="test">
            click
        </v-btn>

    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
