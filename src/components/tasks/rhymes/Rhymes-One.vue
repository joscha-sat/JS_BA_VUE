<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import WordsService from "@/api/Words.service";
import mouseSrc from "@/assets/images/tasks/rhymes/mouse.png";
import ballSrc from "@/assets/images/tasks/rhymes/ball.png";
import treeSrc from "@/assets/images/tasks/rhymes/tree.png";
import sunSrc from "@/assets/images/tasks/rhymes/sun.png";
import fishSrc from "@/assets/images/tasks/rhymes/fish.png";
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";

interface RhymeResponse {
    word: string,
    score: number,
    numSyllables: number
}

const wordsToBeRhymedTo = ref([
    { id: 0, src: mouseSrc, title: 'Mouse' },
    { id: 1, src: ballSrc, title: 'Ball' },
    { id: 2, src: treeSrc, title: 'Tree' },
    { id: 3, src: sunSrc, title: 'Sun' },
    { id: 4, src: fishSrc, title: 'Fish' },
]);

const rhymesArray = ref();
const enteredWord = ref();
const currentCard = ref(0);
const doesItRhyme = ref();

const check = async (currentCard: number) => {
    const rhymes = await WordsService.geRhymes(wordsToBeRhymedTo.value[currentCard].title);
    rhymesArray.value = rhymes.data.map((items: RhymeResponse) => items.word.toLowerCase());

    if (enteredWord.value)
        doesItRhyme.value = rhymesArray.value.includes(enteredWord.value.toLowerCase());
};

const nextCard = () => {
    if (currentCard.value < wordsToBeRhymedTo.value.length - 1) {
        currentCard.value++;
        doesItRhyme.value = null;
    } else {
        currentCard.value = 0;
        doesItRhyme.value = null;
    }
}

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
        doesItRhyme.value = null;
    } else {
        currentCard.value = wordsToBeRhymedTo.value.length - 1;
        doesItRhyme.value = null;
    }
}

const txtToSpeech = useTextToSpeechStore();

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="container">

        <div class="word-container">
            <!--    PREVIOUS CARD BUTTON   -->
            <v-btn :icon="'mdi-arrow-left-thick'" color="primary" @click="previousCard()"></v-btn>

            <!--    CARD WORD TO RHYME TO    -->
            <ImageCard
              v-if="currentCard !== null"
              :bottom-txt="wordsToBeRhymedTo[currentCard].title"
              :src="wordsToBeRhymedTo[currentCard].src"
              has-bottom-txt
              @voice="txtToSpeech.playVoice(wordsToBeRhymedTo[currentCard].title)"
            />

            <!--    NEXT CARD BUTTON    -->
            <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextCard()"></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            {{ currentCard + 1 }} / {{ wordsToBeRhymedTo.length }}
        </div>

        <!--    USER TEXT INPUT    -->

        <v-text-field
          v-model="enteredWord"
          append-icon="mdi-volume-high"
          class="input"
          label="Enter your rhyme"
          @click:append="txtToSpeech.playVoice(enteredWord)"
        >
        </v-text-field>


        <!--    CHECK RESULT BUTTON    -->
        <v-btn color="primary" @click="check(currentCard)">Check if my word rhymes</v-btn>

        <div v-if="doesItRhyme === true">
            YES WELL DONE!
        </div>
        <div v-if="doesItRhyme === false">
            TRY AGAIN! UNKNOWN WORD OR NO RHYME.
        </div>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    width: min(40rem, 100%);
    margin: auto;

    .word-container {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .input {
        margin-block: 2rem;
    }
}

</style>
