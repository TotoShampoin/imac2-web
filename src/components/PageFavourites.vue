<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import AmiiboCollection from '@/components/AmiiboCollection.vue';
import LoadIcon from '@/components/LoadIcon.vue';
import { getFavourites, isFavourite } from '@/composables/favourites';
import { useAmiiboDatabase } from '@/store/amiibo';

const favourites = ref<string[]>(getFavourites());

const amiibo_store = useAmiiboDatabase();
const { AMIIBO_DATABASE, is_loading } = storeToRefs(amiibo_store);
const { fillWithNAmiibos } = amiibo_store;

fillWithNAmiibos(...favourites.value);

const favourite_amiibos = computed(() => {
    return AMIIBO_DATABASE.value.filter(amiibo => isFavourite(`${amiibo.head}${amiibo.tail}`));
});

</script>

<template>
    <AmiiboCollection :amiibos="favourite_amiibos"/>
    <LoadIcon :shown="is_loading" />
</template>

<style lang="scss" scoped>
</style>
