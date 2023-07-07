<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import correct from '../../../assets/sounds/tasks/correct.mp3'
import fail from '../../../assets/sounds/tasks/fail.mp3'
import { useInitialSoundHelperStore } from "@/stores/InitialSoundHelper.store";

const initStore = useInitialSoundHelperStore();
const { images } = storeToRefs(initStore);

interface Letter {
    id: number;
    letter: string
}


const letters: Letter[] = reactive([
    { id: 0, letter: 'B' },
    { id: 1, letter: 'Q' },
    { id: 2, letter: 'K' },
    { id: 3, letter: 'P' },
    { id: 4, letter: 'G' },
])

const currentCard = ref(0);
const currentIndex = ref(0);


const nextCard = () => {
    if (currentCard.value < letters.length - 1) {
        currentCard.value++;
        nextLetter();
    } else {
        currentCard.value = 0;
    }
}

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
        previousLetter()
    } else {
        currentCard.value = letters.length - 1;
        previousLetter()
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
    if (draggedImage.value.letter.toLowerCase() === letters[currentCard.value].letter.toLowerCase()) {
        const index = images.findIndex((image) => image.id === draggedImage.value.id);
        if (index !== -1) {
            images.value.splice(index, 1);
        }
        const audio = new Audio(correct);
        audio.play()
    } else {
        const audio = new Audio(fail);
        audio.play()
    }
}

const nextLetter = () => {
    if (currentIndex.value < images.value.length / 5 - 1) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0;
    }
}

const previousLetter = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = images.value.length / 5 - 1;
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
                <span style="font-size: 200px; font-weight: bold">{{ letters[currentCard].letter }}</span>
            </v-card>

            <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextCard()"></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCard + 1 }} / {{ letters.length }}
            </h3>
        </div>

        <!--    BOTTOM IMAGE CARDS    -->
        <div class="image-flex">
            <template v-for="(image, index) in images"
                      :key="index">
                <ImageCard
                  v-if="image.id === currentIndex"
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
