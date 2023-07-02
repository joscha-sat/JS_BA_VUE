<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import WordsService from "@/api/Words.service";
import rainImage from "@/assets/images/tasks/listening/rain.jpg";
import windImage from "@/assets/images/tasks/listening/wind.jpg";
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";
import RhymeService from "@/api/Rhyme.service";


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
    const rhymes = await RhymeService.geRhymes(wordsToBeRhymedTo.value[currentCard].title);
    rhymesArray.value = rhymes.data.map((items: Word) => items.word.toLowerCase());

    if (enteredWord.value)
        doesItrhyme.value = rhymesArray.value.includes(enteredWord.value.toLowerCase());
};

const next = () => {
    if (currentCard.value < wordsToBeRhymedTo.value.length - 1) {
        currentCard.value++;
    } else {
        currentCard.value = 0;
    }
}

const back = () => {
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
        <ImageCard
          v-if="currentCard !== null"
          :bottom-txt="wordsToBeRhymedTo[currentCard].title"
          :src="wordsToBeRhymedTo[currentCard].src"
          has-bottom-txt
          @voice="txtToSpeech.playVoice(wordsToBeRhymedTo[currentCard].title)"
        />

        <v-btn @click="next()">next</v-btn>
        <v-btn @click="back()">back</v-btn>


        <v-text-field v-model="enteredWord" label="Enter your rhyme"></v-text-field>

        <v-btn @click="check(currentCard)">Check if my word rhymes</v-btn>

        {{ doesItrhyme }}
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    width: min(60rem, 100%);
    margin: auto;
}
</style>
