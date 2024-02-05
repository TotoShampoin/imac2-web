<script setup lang="ts">
import { getOneAmiibo, AmiiboType } from '@/composables/amiibos';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AmiiboContent from './AmiiboContent.vue';

const route = useRoute();
const id = route.params.id as string;
const amiibo = ref<AmiiboType>();

async function loadAmiibo() {
    amiibo.value = await getOneAmiibo(id);
}
loadAmiibo();

</script>

<template>
    <section>
        <AmiiboContent :amiibo="amiibo" />
    </section>
</template>

<style lang="scss" scoped>
section {
    display: grid;
    place-items: center;
}
</style>
