<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import rainSound from '../../../assets/sounds/tasks/listening/rain.mp3'

import rainImage from '../../../assets/images/tasks/listening/rain.jpg'
import windImage from '../../../assets/images/tasks/listening/wind.jpg'
import fireImage from '../../../assets/images/tasks/listening/fire.png'

import success from '../../../assets/sounds/tasks/success.mp3'
import fail from '../../../assets/sounds/tasks/fail.mp3'
import { useSpeechSynthesis } from "@vueuse/core";

const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);

const answers = ref([
    { id: 0, src: rainImage, title: 'rain' },
    { id: 1, src: windImage, title: 'wind' },
    { id: 2, src: fireImage, title: 'fire' }
])

const clickImage = (clickedItem) => {
    const audio = ref();
    if (clickedItem.title === 'rain') {
        audio.value = new Audio(success)
        audio.value.play()
    } else {
        audio.value = new Audio(fail)
        audio.value.play()
    }
}

const playVoice = (txt) => {
    speech.value = useSpeechSynthesis(txt, {
        voice
    })
    speech.value.speak()
}
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <ListeningPlaySound :sound-src="rainSound"/>

    <div class="container">
        <ImageCard
          v-for="(item, i) in answers"
          :key="i"
          :bottom-txt="item.title"
          :src="item.src"
          has-bottom-txt
          @clickImg="clickImage(item)"
          @voice="playVoice(item.title)"
        />
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 1.5rem;
}
</style>
