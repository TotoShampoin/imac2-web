<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import AmiiboCollection from '@/components/AmiiboCollection.vue';
import LoadIcon from "@/components/LoadIcon.vue";
import PageSearchFormula from '@/components/PageSearchFormula.vue';
import { PAGE_SIZE } from "@/constants";
import { useAmiiboDatabase } from '@/store/amiibo';
import PlaceholderCollection from './PlaceholderCollection.vue';


// === AMIIBOS ===

const amiibo_store = useAmiiboDatabase();
const { AMIIBO_DATABASE, is_loading } = storeToRefs(amiibo_store);
const { fillWithAllAmiibos } = amiibo_store;

fillWithAllAmiibos();

const amiibo_types = computed(() => 
    AMIIBO_DATABASE.value
        .map(amiibo => amiibo.type)
        .filter((amiibo, idx, array) => array.indexOf(amiibo) === idx)
        .sort()
)

const amiibo_series = computed(() =>
    AMIIBO_DATABASE.value
        .map(amiibo => amiibo.gameSeries)
        .filter((amiibo, idx, array) => array.indexOf(amiibo) === idx)
        .sort()
)


// === SEARCH ===

const search = ref<string>("");
const s_type = ref<string>("");
const s_series = ref<string>("");

const amiibos = computed(() => 
    AMIIBO_DATABASE.value
        .filter(amiibo => 
            amiibo.name.includes(search.value) &&
            amiibo.type.includes(s_type.value) &&
            amiibo.gameSeries.includes(s_series.value)
        )
);


// === PAGE SYSTEM ===

const page = ref<number>(0);
function setPage(new_page: number | string) {
    if(typeof new_page === "string") {
        new_page = parseInt(new_page);
    }
    // if(
    //     new_page >= 0 &&
    //     new_page < Math.ceil(amiibos.value.length / PAGE_SIZE)
    // ) {
    //     page.value = new_page;
    // } else {
    // }

    let actual_new_page = new_page - 1;

    page.value = Math.min(
        Math.max(actual_new_page, 0),
        Math.ceil(amiibos.value.length / PAGE_SIZE) - 1
    );
}

// === RESULT ===

const shown_amiibos = computed(() => amiibos.value.slice(page.value * PAGE_SIZE, (page.value + 1) * PAGE_SIZE));

</script>

<template>
    <PageSearchFormula
        :page="page+1" :set-page="setPage"
        v-model:search="search"
        v-model:type="s_type"
        v-model:game="s_series"
        :types="amiibo_types"
        :series="amiibo_series" />
    <template v-if="!is_loading">
        <AmiiboCollection :amiibos="shown_amiibos" />
    </template>
    <template v-else>
        <PlaceholderCollection />
    </template>
</template>

<style lang="scss" scoped></style>
