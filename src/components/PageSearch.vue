<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import AmiiboCollection from '@/components/AmiiboCollection.vue';
import PageSearchFormula from '@/components/PageSearchFormula.vue';
import { PAGE_SIZE } from "@/constants";
import { AmiiboType, useAmiiboDatabase, getAmiiboDate } from '@/store/amiibo';
import { useSearchSession } from '@/store/search-session';
import PlaceholderCollection from './PlaceholderCollection.vue';


const sorts: {[key: string]: (a: AmiiboType, b: AmiiboType) => number} = {
    "Name": (a, b) => a.name.localeCompare(b.name),
    "Game Series": (a, b) => a.gameSeries.localeCompare(b.gameSeries),
    "Amiibo Series": (a, b) => a.amiiboSeries.localeCompare(b.amiiboSeries),
    "Release" : (a, b) => getAmiiboDate(a).getTime() - getAmiiboDate(b).getTime(),
    "Random": (a, b) => Math.random() - 0.5,
}

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

const { loadSearches, saveSearches } = useSearchSession();

const search = ref<string>("");
const s_type = ref<string>("");
const s_series = ref<string>("");
const s_sort = ref<string>("Release");
const s_descending = ref<boolean>(false);

search.value = loadSearches().search || "";
s_type.value = loadSearches().type || "";
s_series.value = loadSearches().series || "";
s_sort.value = loadSearches().sort || "Release";
s_descending.value = loadSearches().descending || false;

watch([search, s_type, s_series, s_sort, s_descending], () => {
    setPage(1);
    saveSearches({
        search: search.value,
        type: s_type.value,
        series: s_series.value,
        sort: s_sort.value,
        descending: s_descending.value,
    });
});

const amiibos = computed(() => 
    AMIIBO_DATABASE.value
        .filter(amiibo => 
            amiibo.name.includes(search.value) &&
            amiibo.type.includes(s_type.value) &&
            amiibo.gameSeries.includes(s_series.value)
        ).sort((a, b) => s_descending.value ? sorts[s_sort.value](b, a) : sorts[s_sort.value](a, b))
);


// === PAGE SYSTEM ===

const page = ref<number>(0);
function setPage(new_page: number | string) {
    if(typeof new_page === "string") {
        new_page = parseInt(new_page);
    }
    let actual_new_page = new_page - 1;

    page.value = Math.min(
        Math.max(actual_new_page, 0),
        Math.ceil(amiibos.value.length / PAGE_SIZE) - 1
    );
}

// === RESULT ===

const shown_amiibos = computed(() => 
    amiibos.value
        .slice(page.value * PAGE_SIZE, (page.value + 1) * PAGE_SIZE)
);

</script>

<template>
    <PageSearchFormula
        :page="page+1" :set-page="setPage"
        v-model:search="search"
        v-model:type="s_type"
        v-model:game="s_series"
        v-model:sort="s_sort"
        v-model:descending="s_descending"
        :types="amiibo_types"
        :series="amiibo_series"
        :sorts="Object.keys(sorts)" />
    <template v-if="!is_loading">
        <AmiiboCollection :amiibos="shown_amiibos" />
    </template>
    <template v-else>
        <PlaceholderCollection />
    </template>
</template>

<style lang="scss" scoped></style>
