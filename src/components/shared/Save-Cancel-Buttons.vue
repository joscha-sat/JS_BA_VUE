<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
const router = useRouter();

defineEmits(['save'])
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-card-actions>
        <!-- SAVE BTN -->
        <v-btn class="flex-grow-1" color="primary" variant="flat" @click="$emit('save')">
            {{ $t('GENERAL.SAVE') }}
        </v-btn>

        <!-- CANCEL BTN -->
        <v-btn class="flex-grow-1" color="cancel" variant="flat" @click="router.back()">
            {{ $t('GENERAL.BACK') }}
        </v-btn>
    </v-card-actions>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped></style>
