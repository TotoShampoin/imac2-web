<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import AmiiboCollection from '@/components/AmiiboCollection.vue';
import { useFavourites } from '@/store/favourites';
import { useAmiiboDatabase } from '@/store/amiibo';
import PlaceholderCollection from '@/components/PlaceholderCollection.vue';

const { favourites } = storeToRefs(useFavourites());
const { isFavourite } = useFavourites();

const amiibo_store = useAmiiboDatabase();
const { AMIIBO_DATABASE, is_loading } = storeToRefs(amiibo_store);
const { fillWithNAmiibos } = amiibo_store;

fillWithNAmiibos(...favourites.value);

const favourite_amiibos = computed(() => {
    return AMIIBO_DATABASE.value.filter(amiibo => isFavourite(`${amiibo.head}${amiibo.tail}`));
});

</script>

<template>
    <template v-if="!is_loading">
        <AmiiboCollection :amiibos="favourite_amiibos" />
    </template>
    <template v-else>
        <PlaceholderCollection />
    </template>
</template>

<style lang="scss" scoped>
</style>
