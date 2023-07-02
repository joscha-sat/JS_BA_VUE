<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-container style="display: flex; flex-direction: column">

        <div class="link">
            rhymes are checked by
            <a href="https://rhymebrain.com/api.html" target="_blank">RhymeBrain API</a>
        </div>

        <RhymesTask/>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.link {
    margin-left: auto;
}
</style>
