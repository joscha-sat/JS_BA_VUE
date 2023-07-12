<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useDialogHelperStore } from "@/stores/DialogHelper.store";

defineProps({
    title: String,
    txt: String
})

const dialogHelper = useDialogHelperStore();
const { visible } = storeToRefs(dialogHelper)


const speechStore = useTextToSpeechStore();

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-dialog v-model="visible" width="40dvw">
        <v-card style="padding: 0.75rem">
            <v-card-title>
                {{ title }}
                <v-btn color="primary" @click="speechStore.playVoice(title)">
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                {{ txt }}
                <v-btn color="primary" @click="speechStore.playVoice(txt)">
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" variant="flat" @click="dialogHelper.closeDialog()">ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
