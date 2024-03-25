<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import PlaceholderContent from '@/components/PlaceholderContent.vue';
import AmiiboContent from '@/components/AmiiboContent.vue';
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
    <section v-if="!is_loading">
        <template v-if="amiibo">
            <AmiiboContent :amiibo="amiibo" />
        </template>
        <template v-else>
            <h1>Amiibo not found</h1>
        </template>
    </section>
    <section v-else>
        <PlaceholderContent />
    </section>
</template>

<style lang="scss" scoped>
section {
    display: grid;
    place-items: center;
}
</style>
