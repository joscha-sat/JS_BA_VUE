<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>


defineProps({
    title: String,
    src: String
})

defineEmits(['voice', 'toTask'])
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-card class="card">
        <v-card-title
          style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; overflow-wrap: break-word">
            {{ title }}

            <v-btn @click="$emit('voice')">
                <v-icon>mdi-volume-high</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>

        </v-card-text>
        <v-img
          :src="src"
          class="img"
          style="cursor: pointer"
          width="100%"
          @click="$emit('toTask')"
        >
        </v-img>
    </v-card>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.card {
    width: min(25rem, 100%);

    // disables overflow
    .v-card-title {
        white-space: normal;
    }
}

.img {
    padding: 1rem;
}
</style>
