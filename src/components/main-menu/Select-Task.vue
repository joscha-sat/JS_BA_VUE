<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useSpeechSynthesis } from "@vueuse/core";

const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);

const tasks = ref([
    'TASKS.LISTENING',
    'TASKS.RHYMES',
    'TASKS.SENTENCES_AND_WORDS',
    'TASKS.INITIAL_SOUND',
    'TASKS.PHONEMES',
]);

const test = (txt) => {
    speech.value = useSpeechSynthesis(txt, {
        voice
    })
    speech.value.speak()
}

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="flex">
        <v-card v-for="(task, i) in tasks" :key="i" style="display: flex; justify-content: space-between">
            <v-card-text class="v-txt">
                {{ $t(task) }}
            </v-card-text>
            <v-card-actions>
                <v-btn @click="test($t(task))">hear
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.flex {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    flex-grow: 1;
}

</style>
