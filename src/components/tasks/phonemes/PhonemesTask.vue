<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import beach from '../../../assets/images/tasks/phonemes/beach.jpg'

const words = reactive([
    { id: 0, word: 'beach', src: beach }
]);

interface Array {
    id: number,
    word: string,
    list: number
}

const answers = ref([
    { index: 0, id: 0, word: 'beech', list: 1, correct: false },
    { index: 0, id: 1, word: 'beach', list: 1, correct: true },
    { index: 0, id: 2, word: 'baech', list: 1, correct: false },
    { index: 0, id: 3, word: 'baach', list: 1, correct: false },
])

const getList = (list) => {
    return answers.value.filter((item) => item.list === list)
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
    const answer = answers.value.find((answer) => answer.id == answerID);


    if (list === 2 && getList(2).length > 0) {
        getList(2).forEach((item) => item.list = 1)
    }

    answer.list = list;
    correct.value = answer.correct;
};
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <TitleWithSound title="Listen to the word and choose the right spelling"/>

    <div class="container">

        <ImageCard
          v-if="currentCard !== null"
          :src="words[currentCard].src"
          @clickImg="speechStore.playVoice(words[currentCard].word)"
          @voice="speechStore.playVoice(words[currentCard].word)"
        />


        <div class="drop-field" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
            <div
              v-for="answer in getList(2)"
              :key="answer.id"
              class='drag-el'
              draggable="true"
              @dragstart="dragStart($event, answer)"
            >
                {{ answer.word }}
            </div>
        </div>


        <div class="word-container" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
            <v-card v-for="(answer, index) in getList(1)" :key="index" draggable="true"
                    @dragstart="dragStart($event, answer)">
                <v-card-title>{{ answer.word }}</v-card-title>
            </v-card>
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

    .word-container {
        display: flex;
        gap: 1rem;

        padding-inline: 5rem;

        margin-top: 2rem;
    }

    .drop-field {
        margin-top: 2rem;
        border: 1px solid black;
        width: 400px;
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
