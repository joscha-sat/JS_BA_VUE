<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useSpeechSynthesis } from "@vueuse/core";
import clap from '../../../assets/sounds/tasks/clap.mp3'
import Syllable from "@/classes/Syllable.class";

import banana from '../../../assets/images/tasks/syllables/banana.png';
import caterpillar from '../../../assets/images/tasks/syllables/caterpillar.png';
import dog from '../../../assets/images/tasks/syllables/dog.png';
import happy from '../../../assets/images/tasks/syllables/happy.png';
import sun from '../../../assets/images/tasks/syllables/sun.png';
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";

const syllables: Syllable[] = reactive([
    { id: 0, syllables: 3, word: 'Banana', src: banana },
    { id: 1, syllables: 2, word: 'Happy', src: happy },
    { id: 2, syllables: 1, word: 'Dog', src: dog },
    { id: 3, syllables: 2, word: 'Sunshine', src: sun },
    { id: 4, syllables: 4, word: 'Caterpillar', src: caterpillar }
])


const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore)

const audio = ref();
const maxRepetitions = ref(3);
let playCount = 0;

const enteredSyllableNumber = ref()
const answerCorrect = ref(false);

const checkAnswer = () => {
    if (Number(enteredSyllableNumber.value) === syllables[currentCard.value].syllables) {
        answerCorrect.value = true
    } else {
        answerCorrect.value = false
    }
}

const playAudio = () => {

    maxRepetitions.value = syllables[currentCard.value].syllables;

    audio.value = new Audio(clap);
    setTimeout(() => {
        audio.value.play();
    }, 300)
    audio.value.addEventListener('ended', restartAudio);
};

const restartAudio = () => {
    playCount++;
    if (playCount < maxRepetitions.value) {
        audio.value.currentTime = 0;
        audio.value.play();
    } else {
        audio.value.removeEventListener('ended', restartAudio);
        playCount = 0;
    }
};

const speak = async (text) => {
    playAudio();
    speech.value = useSpeechSynthesis(text, { voice, rate: 0.1 });
    speech.value.speak();

};

const currentCard = ref(0);

const nextCard = () => {
    if (currentCard.value < syllables.length - 1) {
        currentCard.value++;
    } else {
        currentCard.value = 0;
    }
    enteredSyllableNumber.value = null;
}

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
    } else {
        currentCard.value = syllables.length - 1;
    }
    enteredSyllableNumber.value = null;
}
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="container">

        <TitleWithSound title="How many syllables do the words have?"/>

        <div class="slider-container">
            <v-btn :icon="'mdi-arrow-left-thick'" color="primary" @click="previousCard()"></v-btn>

            <ImageCard
              v-if="currentCard !== null"
              :bottom-txt="syllables[currentCard].word"
              :src="syllables[currentCard].src"
              has-bottom-txt
              @clickImg="speak(syllables[currentCard].word)"
              @voice="speak(syllables[currentCard].word)"
            />

            <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextCard()"></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCard + 1 }} / {{ syllables.length }}
            </h3>
        </div>

        <!--   NUMBER OF SYLLABLES INPUT     -->
        <v-text-field
          v-model="enteredSyllableNumber"
          class="mt-8 input"
          placeholder="Enter the number of syllables!"
          type="number"
        >
        </v-text-field>

        <v-btn color="primary" @click="checkAnswer">
            check answer
        </v-btn>

        <div class="mt-5">
            Feedback: {{ answerCorrect }}
        </div>

    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    width: min(60rem, 100%);
    margin: auto;

    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .input {
        margin: auto;
    }
}
</style>
