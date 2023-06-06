<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>


import { useSpeechSynthesis } from "@vueuse/core";

const txt = ref();

const speechStore = useTextToSpeechStore();
const { speech, voices, voice } = storeToRefs(speechStore);


const test = () => {


    speech.value = useSpeechSynthesis(txt.value.textContent, {
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
