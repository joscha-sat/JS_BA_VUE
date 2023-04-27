<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { useTheme } from 'vuetify';

const color = ref();
const theme = useTheme();

watch(color, (newColor) => {
    theme.themes.value.light.colors.primary = newColor;
    theme.themes.value.dark.colors.primary = newColor;
    localStorage.setItem('primary-color', newColor);
});

onMounted(() => {
    const storedColor = localStorage.getItem('primary-color');

    if (storedColor) {
        color.value = storedColor;
    }
});
</script>


<!-- HTML ----------------------------------------------------------//-->
<template>
    <!-- expansion panel with color theme picker -->

    <ExpansionPanel :title='$t("SETTINGS.THEME_PICKER")'>
        <v-color-picker v-model='color' style='margin: auto'></v-color-picker>
    </ExpansionPanel>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>


</style>
