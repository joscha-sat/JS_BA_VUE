<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import beach from '../../../assets/images/tasks/phonemes/beach.jpg'

const words = reactive([
    { id: 0, fullWord: 'beach', src: beach }
])
const currentCard = ref(0);
const input = ref();


const correct = ref(false);

const checkAnswer = () => {
    correct.value = input.value.toLowerCase() === words[currentCard.value].fullWord.toLowerCase();
}

// whenever the input changes, check the result
// watch(input, () => {
//     checkAnswer()
// })

const speechStore = useTextToSpeechStore();

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <TitleWithSound title="Listen to the word and write it in the text-field"/>

    <div class="container">

        <ImageCard
          v-if="currentCard !== null"
          :src="words[currentCard].src"
          @clickImg="speechStore.playVoice(words[currentCard].fullWord)"
          @voice="speechStore.playVoice(words[currentCard].fullWord)"
        />

        <div class="input">
            <v-text-field v-model="input" @change="checkAnswer"></v-text-field>

            <v-btn color="primary" @click="checkAnswer">
                check my answer
                <v-icon>mdi-voulme-high</v-icon>
            </v-btn>
        </div>

    </div>


    {{ correct }}

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    margin-top: 2rem;

    .input {
        margin-top: 2rem;
        width: min(30rem, 100%);
    }
}
</style>
