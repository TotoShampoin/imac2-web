<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import AmiiboContent from './AmiiboContent.vue';
import LoadIcon from './LoadIcon.vue';
import { useAmiiboDatabase } from '@/store/amiibo';

const route = useRoute();
const id = route.params.id as string;

const amiibo_store = useAmiiboDatabase();
const { AMIIBO_DATABASE, is_loading } = storeToRefs(amiibo_store);
const { fillWithOneAmiibo } = amiibo_store;

fillWithOneAmiibo(id);

const amiibo = computed(() => AMIIBO_DATABASE.value.find(amiibo => id === `${amiibo.head}${amiibo.tail}`));


</script>

<template>
    <section>
        <AmiiboContent :amiibo="amiibo" />
    </section>
    <LoadIcon :shown="is_loading" />
</template>

<style lang="scss" scoped>
section {
    display: grid;
    place-items: center;
}
</style>
