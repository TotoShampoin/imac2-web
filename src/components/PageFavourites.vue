<script setup lang="ts">
import { computed, ref } from 'vue';
import AmiiboCollection from './AmiiboCollection.vue';
import { AmiiboType, getAllAmiibos, getNAmiibos } from '@/composables/amiibos';
import LoadIcon from './LoadIcon.vue';
import { getFavourites, isFavourite } from '@/composables/favourites';

const favourites = ref<string[]>(getFavourites());

const amiibo_database = ref<AmiiboType[]>([]);
async function loadDatabase() {
    amiibo_database.value = await getNAmiibos(...favourites.value);
}
loadDatabase();

const favourite_amiibos = computed(() => {
    return amiibo_database.value.filter(amiibo => isFavourite(`${amiibo.head}${amiibo.tail}`));
});

</script>

<template>
    <AmiiboCollection :amiibos="favourite_amiibos"/>
    <LoadIcon :shown="amiibo_database.length === 0" />
</template>

<style lang="scss" scoped>
</style>
