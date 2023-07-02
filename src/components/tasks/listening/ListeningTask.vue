<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import rainSound from '../../../assets/sounds/tasks/listening/rain.mp3'
import carSound from '../../../assets/sounds/tasks/listening/car.mp3'
import hammerSound from '../../../assets/sounds/tasks/listening/hammer.mp3'

import rainImage from '../../../assets/images/tasks/listening/rain.jpg'
import windImage from '../../../assets/images/tasks/listening/wind.jpg'
import fireImage from '../../../assets/images/tasks/listening/fire.png'

import carImg from '../../../assets/images/tasks/listening/car.png'
import airplaneImg from '../../../assets/images/tasks/listening/airplane.png'
import shipImg from '../../../assets/images/tasks/listening/ship.png'

import hammerImg from '../../../assets/images/tasks/listening/hammer.png'
import scissorImg from '../../../assets/images/tasks/listening/scissors.png'
import sawImg from '../../../assets/images/tasks/listening/saw.png'

import success from '../../../assets/sounds/tasks/success.mp3'
import fail from '../../../assets/sounds/tasks/fail.mp3'
import { useSoundHelperStore } from "@/stores/SoundHelper.store";

const voiceText = ref('Listen to the sound, then select what you have heard!');

const speechStore = useTextToSpeechStore();
const sounds = ref([rainSound, carSound, hammerSound]);
const currentIndex = ref(0);

const answers = ref([
    { id: 0, src: rainImage, title: 'rain', correct: true },
    { id: 0, src: windImage, title: 'wind', correct: false },
    { id: 0, src: fireImage, title: 'fire', correct: false },

    { id: 1, src: airplaneImg, title: 'airplane', correct: false },
    { id: 1, src: shipImg, title: 'ship', correct: false },
    { id: 1, src: carImg, title: 'car', correct: true },

    { id: 2, src: hammerImg, title: 'hammer', correct: true },
    { id: 2, src: sawImg, title: 'saw', correct: false },
    { id: 2, src: scissorImg, title: 'scissor', correct: false },
])

const clickImage = (clickedItem) => {
    const audio = ref();
    if (clickedItem.correct) {
        audio.value = new Audio(success)
        audio.value.play();
        nextSound();
    } else {
        audio.value = new Audio(fail)
        audio.value.play()
    }
}

const nextSound = () => {
    if (currentIndex.value < answers.value.length / 3 - 1) {
        currentIndex.value++;
        isPlayedOnce.value = false
    } else {
        currentIndex.value = 0;
        isPlayedOnce.value = false
    }
}

const previousSound = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        isPlayedOnce.value = false
    } else {
        currentIndex.value = answers.value.length / 3 - 1;
        isPlayedOnce.value = false
    }
}

const soundStore = useSoundHelperStore();
const { audioIsPlaying, isPlayedOnce } = storeToRefs(soundStore)

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>


    <div class="word-container">
        <!--    PREVIOUS CARD BUTTON   -->
        <v-btn :icon="'mdi-arrow-left-thick'" color="primary" @click="previousSound()"></v-btn>

        <!--  SOUND TO PLAY  -->
        <ListeningPlaySound :sound-src="sounds[currentIndex]"/>

        <!--    NEXT CARD BUTTON    -->
        <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextSound()"></v-btn>
    </div>


    <!--  TEXT WHAT TO DO  -->
    <div style="display: flex; align-items: center; gap: 1rem; justify-content: center">
        <h1>{{ voiceText }}</h1>
        <v-btn :icon="'mdi-volume-high'" color="primary" @click="speechStore.playVoice(voiceText)"></v-btn>
    </div>

    <template v-if="!audioIsPlaying && isPlayedOnce">

        <!-- ANSWERS -->
        <div class="container">
            <template v-for="(item, i) in answers" :key="i">
                <ImageCard
                  v-if="item.id === currentIndex"
                  :bottom-txt="item.title"
                  :src="item.src"
                  has-bottom-txt
                  @clickImg="clickImage(item)"
                  @voice="speechStore.playVoice(item.title)"
                />
            </template>
        </div>
    </template>


</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 1.5rem;

}

.word-container {
    display: flex;
    align-items: center;
}

h1 {
    text-align: center;
    margin-block: 2rem;
}
</style>
