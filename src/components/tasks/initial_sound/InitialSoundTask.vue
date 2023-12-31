<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import correct from '../../../assets/sounds/tasks/correct.mp3'
import fail from '../../../assets/sounds/tasks/fail.mp3'
import bear from "@/assets/images/tasks/initialSound/bear.png";
import panda from "@/assets/images/tasks/initialSound/panda.png";
import butterfly from "@/assets/images/tasks/initialSound/butterfly.png";
import balloon from "@/assets/images/tasks/initialSound/balloon.png";
import pizza from "@/assets/images/tasks/initialSound/pizza.png";
import pirate from "@/assets/images/tasks/initialSound/pirate.png";
import queen from "@/assets/images/tasks/initialSound/queen.png";
import paint from "@/assets/images/tasks/initialSound/paint.png";
import quiz from "@/assets/images/tasks/initialSound/quiz.png";
import quicksand from "@/assets/images/tasks/initialSound/quicksand.jpg";
import key from "@/assets/images/tasks/initialSound/key.png";
import koala from "@/assets/images/tasks/initialSound/koala.png";
import clown from "@/assets/images/tasks/initialSound/clown.png";
import circle from "@/assets/images/tasks/initialSound/circle.png";
import cinema from "@/assets/images/tasks/initialSound/cinema.png";
import bicycle from "@/assets/images/tasks/initialSound/bicycle.png";
import boat from "@/assets/images/tasks/initialSound/boat.png";
import popcorn from "@/assets/images/tasks/initialSound/popcorn.png";
import puzzle from "@/assets/images/tasks/initialSound/puzzle.png";
import pumpkin from "@/assets/images/tasks/initialSound/pumpkin.png";
import gameboy from "@/assets/images/tasks/initialSound/gameboy.png";
import glue from "@/assets/images/tasks/initialSound/glue.png";
import guitar from "@/assets/images/tasks/initialSound/guitar.png";
import gold from "@/assets/images/tasks/initialSound/gold.png";
import kangaroo from "@/assets/images/tasks/initialSound/kangaroo.png";


interface Letter {
    id: number;
    letter: string
}

const images = ref([
    { id: 0, src: bear, text: 'bear', correctLetter: true },
    { id: 0, src: panda, text: 'panda', correctLetter: false },
    { id: 0, src: butterfly, text: 'butterfly', correctLetter: true },
    { id: 0, src: balloon, text: 'balloon', correctLetter: true },
    { id: 0, src: pizza, text: 'pizza', correctLetter: false },

    { id: 1, src: popcorn, text: 'popcorn', correctLetter: true },
    { id: 1, src: boat, text: 'boat', correctLetter: false },
    { id: 1, src: bicycle, text: 'bicycle', correctLetter: false },
    { id: 1, src: pumpkin, text: 'pumpkin', correctLetter: true },
    { id: 1, src: puzzle, text: 'puzzle', correctLetter: true },


    { id: 2, src: pirate, text: 'pirate', correctLetter: false },
    { id: 2, src: queen, text: 'queen', correctLetter: true },
    { id: 2, src: paint, text: 'paint', correctLetter: false },
    { id: 2, src: quiz, text: 'quiz', correctLetter: true },
    { id: 2, src: quicksand, text: 'quicksand', correctLetter: true },

    { id: 3, src: cinema, text: 'cinema', correctLetter: false },
    { id: 3, src: clown, text: 'clown', correctLetter: false },
    { id: 3, src: key, text: 'key', correctLetter: true },
    { id: 3, src: circle, text: 'circle', correctLetter: false },
    { id: 3, src: koala, text: 'koala', correctLetter: true },

    { id: 4, src: guitar, text: 'guitar', correctLetter: true },
    { id: 4, src: kangaroo, text: 'kangaroo', correctLetter: false },
    { id: 4, src: glue, text: 'glue', correctLetter: true },
    { id: 4, src: gold, text: 'gold', correctLetter: true },
    { id: 4, src: gameboy, text: 'gameboy', correctLetter: true },
])

const letters: Letter[] = reactive([
    { id: 0, letter: 'B / b' },
    { id: 1, letter: 'P / p' },
    { id: 2, letter: 'Q / q' },
    { id: 3, letter: 'K / k' },
    { id: 4, letter: 'G / g' },
])

const currentCardIndex = ref(0);

const nextCard = () => {
    if (currentCardIndex.value < letters.length - 1) {
        currentCardIndex.value++;
    } else {
        currentCardIndex.value = 0;
    }
}

const previousCard = () => {
    if (currentCardIndex.value > 0) {
        currentCardIndex.value--;
    } else {
        currentCardIndex.value = letters.length - 1;
    }
}

const speak = (txt) => {
    const speechStore = useTextToSpeechStore();
    speechStore.playVoice(txt)
}

const draggedImage = ref();

const dragStart = (image) => {
    draggedImage.value = image
};

const drop = () => {
    if (draggedImage.value.correctLetter) {
        // if the words starts with the letter, remove it from the array
        const index = images.value.findIndex((image) => image.id === draggedImage.value.id);
        if (index !== -1) {
            images.value = images.value.filter((item) => item.text !== draggedImage.value.text);
        }
        const audio = new Audio(correct);
        audio.play()
    } else {
        const audio = new Audio(fail);
        audio.play()
    }
}
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <TitleWithSound title="Drag and drop all images that start with the given letter to the top"/>

    <div class="container mt-5">

        <!--   TOP LETTER CARD     -->
        <div class="slider-container">

            <v-btn :icon="'mdi-arrow-left-thick'" color="primary" @click="previousCard()"></v-btn>

            <v-card class="top-card" @drop="drop()" @dragover.prevent>
                <span style="font-size: 200px; font-weight: bold">{{ letters[currentCardIndex].letter }}</span>
            </v-card>

            <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextCard()"></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCardIndex + 1 }} / {{ letters.length }}
            </h3>
        </div>

        <!--    BOTTOM IMAGE CARDS    -->
        <div class="image-flex">
            <template v-for="(image, index) in images" :key="index">
                <ImageCard
                  v-if="image.id === currentCardIndex"
                  :src="image.src"
                  draggable="true"
                  @clickImg="speak(image.text)"
                  @dragstart="dragStart(image)"
                  @voice="speak(image.text)"
                />
            </template>

        </div>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.container {
    display: flex;
    justify-content: center;
    flex-direction: column;

    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }
}

.image-flex {
    margin-top: 5rem;
    justify-content: center;
    display: flex;
    gap: 2rem;
}

.top-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
    padding: 2rem;
}


</style>
