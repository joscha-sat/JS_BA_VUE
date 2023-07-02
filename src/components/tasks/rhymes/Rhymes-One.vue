<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import WordsService from "@/api/Words.service";
import rainImage from "@/assets/images/tasks/listening/rain.jpg";
import windImage from "@/assets/images/tasks/listening/wind.jpg";
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";


interface Word {
    word: string,
    score: number,
    numSyllables: number
}

const wordsToBeRhymedTo = ref([
    { id: 0, src: rainImage, title: 'Mouse' },
    { id: 1, src: windImage, title: 'Ball' },
]);
const enteredWord = ref();
const rhymesArray = ref();

const currentCard = ref(0);

const doesItrhyme = ref(false);

const check = async (currentCard: number) => {
    const rhymes = await WordsService.geRhymes(wordsToBeRhymedTo.value[currentCard].title);
    rhymesArray.value = rhymes.data.map((items: Word) => items.word.toLowerCase());

    if (enteredWord.value)
        doesItrhyme.value = rhymesArray.value.includes(enteredWord.value.toLowerCase());
};

const nextCard = () => {
    if (currentCard.value < wordsToBeRhymedTo.value.length - 1) {
        currentCard.value++;
    } else {
        currentCard.value = 0;
    }
}

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
    } else {
        currentCard.value = wordsToBeRhymedTo.value.length - 1;
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
