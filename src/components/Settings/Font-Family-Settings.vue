<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
const selectedFontFamily = ref('Calibri');
const items = ['Calibri', 'Roboto', 'Helvetica'];

watch(selectedFontFamily, newValue => {
    document.body.setAttribute('data-font-family', newValue.toLowerCase());
    localStorage.setItem('font-family', selectedFontFamily.value);
});

onMounted(() => {
    const storedFont = localStorage.getItem('font-family');

    if (storedFont) {
        document.body.setAttribute('data-font-family', storedFont.toLowerCase());
        selectedFontFamily.value = storedFont;
    }
});
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




