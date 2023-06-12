<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import happyDog from '@/assets/images/dog/happyDog.png';
import happyCat from '@/assets/images/cat/happyCat.png';
import bark from '../assets/sounds/dog/bark.mp3';
import meow from '../assets/sounds/cat/meow.mp3';


import { useSpeechSynthesis } from "@vueuse/core";
import { useMascotStore } from "@/stores/mascot.store";

const txt = ref();
const audioRef = ref<HTMLAudioElement>();

const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);

const mascotStore = useMascotStore();
const { isDog } = storeToRefs(mascotStore)

const test = () => {
    speech.value = useSpeechSynthesis(txt.value.textContent, {
        voice
    })
    speech.value.speak()
}
const playSound = () => {
    audioRef.value.play()
}

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <h1 ref="txt"
        style="display: flex; align-items: center; justify-content: center; gap: 1rem;text-align: center; margin-top: 1rem">
        {{ $t('GREETINGS') }}
        <v-btn icon="mdi-volume-high" @click="test"></v-btn>
    </h1>

    <div class="container">
        <div class="left"></div>

        <div class="content">
            <SelectTask/>
        </div>

        <div class="right">
            <img :src="isDog? happyDog : happyCat" alt="mascot" class="image" style="cursor: pointer"
                 @click="playSound">
            <audio ref="audioRef" :src="isDog? bark : meow"></audio>
        </div>
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
}

.left {
    flex-basis: 10%;
}

.content {
    flex-basis: 50%;
    display: flex;
    justify-content: center;

}

.right {
    flex-basis: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.image {
    height: 400px;

    object-fit: contain;
}
</style>



