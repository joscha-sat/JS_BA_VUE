<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { useSettingsHelperStore } from "@/stores/SettingsHelper.store";

const items = ['Calibri', 'Roboto', 'Helvetica'];

const settingsStore = useSettingsHelperStore();
const { selectedFontFamily } = storeToRefs(settingsStore);

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div>
        <v-card-title class='title pa-0'>{{ $t('SETTINGS.FONT_FAMILY') }}</v-card-title>
        <v-select id='font-family-select' v-model='selectedFontFamily' :items='items' class="mt-1">
        </v-select>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
</style>




