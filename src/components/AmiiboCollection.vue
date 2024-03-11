<script setup lang="ts">
import AmiiboPreview from '@/components/AmiiboPreview.vue';
import { AmiiboType } from '@/composables/amiibos';

const { amiibos } = defineProps<{
    amiibos: AmiiboType[];
}>();
</script>

<template>
    <section>
        <AmiiboPreview v-for="data of amiibos" 
            :amiibo="data" :key="data.head+data.tail" />
    </section>
</template>

<style lang="scss" scoped>
section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem 0;
    gap: .5rem;
}
</style>
