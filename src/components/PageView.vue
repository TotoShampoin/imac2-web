<script setup lang="ts">
import { getOneAmiibo, AmiiboType } from '@/composables/amiibos';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AmiiboContent from './AmiiboContent.vue';
import LoadIcon from './LoadIcon.vue';

const route = useRoute();
const id = route.params.id as string;

const amiibo = ref<AmiiboType>();
const loading = ref<boolean>(false);

async function loadAmiibo() {
    amiibo.value = await getOneAmiibo(id);
    loading.value = true;
}
loadAmiibo();

</script>

<template>
    <section>
        <AmiiboContent :amiibo="amiibo" />
    </section>
    <LoadIcon :shown="!loading" />
</template>

<style lang="scss" scoped>
section {
    display: grid;
    place-items: center;
}
</style>
