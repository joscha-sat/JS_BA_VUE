<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import beach from '../../../assets/images/tasks/phonemes/beach.jpg'
import cloud from '../../../assets/images/tasks/phonemes/cloud.png'

const words = reactive([
    { id: 0, word: 'beach', src: beach },
    { id: 1, word: 'cloud', src: cloud }
]);

const answers = reactive([
    { index: 0, id: 0, word: 'beech', list: 1, correct: false },
    { index: 0, id: 1, word: 'beach', list: 1, correct: true },
    { index: 0, id: 2, word: 'baech', list: 1, correct: false },
    { index: 0, id: 3, word: 'baach', list: 1, correct: false },


    { index: 1, id: 0, word: 'claud', list: 1, correct: false },
    { index: 1, id: 1, word: 'cluod', list: 1, correct: false },
    { index: 1, id: 2, word: 'clowed', list: 1, correct: false },
    { index: 1, id: 3, word: 'cloud', list: 1, correct: true },
])

const getList = (list) => {
    return answers.filter((item) => item.list === list)
}

const currentCard = ref(0);
const input = ref();

const correct = ref(false);

const speechStore = useTextToSpeechStore();

const dragStart = (event, answer) => {
    event.dataTransfer.setData('answerID', answer.id);
}

const onDrop = (event, list) => {

    const answerID = event.dataTransfer.getData('answerID');
    const answer = answers.find((answer) => answer.id == answerID);


    if (list === 2 && getList(2).length > 0) {
        getList(2).forEach((item) => item.list = 1)
    }

    answer.list = list;
    correct.value = answer.correct && answer.list === 2;
};

const nextCard = () => {
    if (currentCard.value < answers.length / 4 - 1) {
        currentCard.value++;
    } else {
        currentCard.value = 0;
    }
}

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
    } else {
        currentCard.value = answers.length / 4 - 1;
    }
}
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <TitleWithSound title="Listen to the word and choose the right spelling"/>

    <div class="container">

        <div class="slider-container">

            <v-btn :icon="'mdi-arrow-left-thick'" color="primary" @click="previousCard()"></v-btn>

            <ImageCard
              v-if="currentCard !== null"
              :src="words[currentCard].src"
              @clickImg="speechStore.playVoice(words[currentCard].word)"
              @voice="speechStore.playVoice(words[currentCard].word)"
            />

            <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextCard()"></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCard + 1 }} / {{ words.length }}
            </h3>

        </div>

        <!--    DROP ZONE    -->

        <div
          :class="[{'drop-field-correct': correct, 'drop-field-incorrect': getList(2).length > 0 && !correct }]"
          class="drop-field"
          @drop="onDrop($event, 2)"
          @dragenter.prevent
          @dragover.prevent
        >
            <div
              v-for="answer in getList(2)"
              :key="answer.id"
              class='drag-el'
              draggable="true"
              @dragstart="dragStart($event, answer)"
            >
                <h1>
                    {{ answer.word }}
                </h1>
            </div>

            <span v-if="getList(2).length < 1" style="color: #ccc">drop your word here</span>
        </div>


        <div class="word-container" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
            <template
              v-for="(answer, index) in getList(1)"
              :key="index"
            >
                <v-card
                  v-if="answer.index === currentCard"
                  class="card"
                  draggable="true"
                  @dragstart="dragStart($event, answer)"
                >
                    <v-card-title>{{ answer.word }}</v-card-title>
                </v-card>
            </template>

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

    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .card {
        padding-inline: 0.75rem;
        padding-block: 0.25rem;

        &:hover {
            cursor: grab;
        }
    }

    .drag-el:hover {
        cursor: grab;
    }

    .word-container {
        display: flex;
        gap: 1rem;

        padding-inline: 5rem;

        margin-top: 2rem;
    }

    .drop-field {
        margin-top: 2rem;
        border: 2px dashed #ccc;
        width: 400px;
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .drop-field.active-line {
        background-color: lightblue;
    }

    .drop-field span {
        cursor: pointer;
    }

    .drop-field-correct {
        background-color: #78af78;
    }

    .drop-field-incorrect {
        background-color: lightcoral;
    }
}
</style>
