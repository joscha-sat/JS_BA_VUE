<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useSpeechSynthesis } from "@vueuse/core";

const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);
import listening from '../../assets/images/tasks/listening.png';
import rhymes from '../../assets/images/tasks/rhymes.png';
import words from '../../assets/images/tasks/words.jpg';
import iSound from '../../assets/images/tasks/initialSound.png';
import syllables from '../../assets/images/tasks/syllables.jpg';
import phonemes from '../../assets/images/tasks/phonemes.png';
import router from "@/router";

const tasks = ref([
    { i18n: 'TASKS.LISTENING', src: listening, to: 'listening' },
    { i18n: 'TASKS.RHYMES', src: rhymes, to: 'rhymes' },
    { i18n: 'TASKS.SENTENCES_AND_WORDS', src: words, to: 'sentences_and_words' },
    { i18n: 'TASKS.SYLLABLES', src: syllables, to: 'syllables' },
    { i18n: 'TASKS.INITIAL_SOUND', src: iSound, to: 'initial_sound' },
    { i18n: 'TASKS.PHONEMES', src: phonemes, to: 'phonemes' }
]);

const playVoice = (txt) => {
    speech.value = useSpeechSynthesis(txt, {
        voice
    })
    speech.value.speak()
}

const toTask = (to: string) => {
    console.log('clicked')
    router.push({
        path: to
    })
}

</script>


<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="grid">
        <ImageCard
          v-for="(task, i) in tasks"
          :key="i"
          :src="task.src"
          :title="$t(task.i18n)"
          @clickImg="toTask(task.to)"
          @voice="playVoice($t(task.i18n))"
        />
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.grid {
    display: grid;
    gap: 1rem;

    grid-template-columns: repeat(
    auto-fit,
        minmax(min(max(100% / 3 - 1rem, 10rem), 100%), 1fr)
  );


}

</style>
