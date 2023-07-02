<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import listening from '../../assets/images/tasks/listening.png'

const props = defineProps({
    soundSrc: String,
})

const audioIsPlaying = ref(false);

const playSound = () => {
    // avoid playing sound multiple times at once
    if (!audioIsPlaying.value) {
        audioIsPlaying.value = true;
        const audio = new Audio(props.soundSrc);
        audio.addEventListener('ended', () => {
            audioIsPlaying.value = false;
        });
        audio.play()
    }

}

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <div class="imgContainer">
        <v-img
          :src="listening"
          class="img"
          max-height="350px"
          style="cursor: pointer"
          width="100%"
          @click="playSound"
        >
        </v-img>

        <v-btn :icon="'mdi-play'" color="primary" style="transform: scale(2.5)" @click="playSound"></v-btn>
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    margin: auto;
    width: min(23em, 100%);
}
</style>
