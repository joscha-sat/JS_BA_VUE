<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

const tutorialText = ref('On your screen you see an image card representing a word. You can listen to the word by clicking on the image or the volume button. Below you see four words and an empty drop are. Only one word is the correct spelling to the wanted word. Drag and drop the word with the correct spelling into the drop area. You can change the word with the arrow keys')

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <HelpMeBtn/>
    <v-container>
        <PhonemesTask/>

        <TutorialDialog :txt="tutorialText"/>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
