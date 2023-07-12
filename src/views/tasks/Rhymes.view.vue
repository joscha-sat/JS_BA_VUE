<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import HelpMeBtn from "@/components/shared/HelpMeBtn.vue";
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="header">

        <HelpMeBtn/>

        <div>
            rhymes are checked by
            <a href="https://rhymebrain.com/api.html" target="_blank">RhymeBrain API</a>
        </div>
    </div>

    <v-container>
        <RhymesTask/>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;

    padding: 1rem;
}
</style>
