<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup></script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <v-container class="container">
        <slot class="left" name="left"></slot>
        <slot class="right" name="right"></slot>
    </v-container>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    max-width: min(90rem, 100%);
}
</style>
