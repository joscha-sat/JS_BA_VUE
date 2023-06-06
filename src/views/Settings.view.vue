<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-container>

        <v-card class="card" color="bg">
            <!-- TITLE -->
            <v-card-title>
                {{ $t('SETTINGS.TITLE') }}
            </v-card-title>

            <!-- CONTENT -->
            <v-card-text class="cardText">
                <!-- PRIMARY COLOR PICKER -->
                <div class="block">
                    <ColorThemePicker/>
                </div>

                <!-- FONT SIZE SETTER -->
                <div class="block">
                    <FontSizeSettings/>
                </div>

                <!-- FONT FAMILY SELECTOR -->
                <div class="block">
                    <FontFamilySettings/>
                </div>
            </v-card-text>

            <SaveCancelButtons/>
        </v-card>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.card {
    margin: auto;
    width: min(35rem, 100%);
}

.cardText {
    padding-bottom: 0;
}

.maTop {
    margin-top: 1.5rem;
}
</style>
