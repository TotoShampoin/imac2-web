<script setup lang="ts">
import AmiiboPreview from '@/components/AmiiboPreview.vue';
import LoadIcon from "@/components/LoadIcon.vue";
import { computed, ref } from 'vue';
import { getAllAmiibos, AmiiboType } from "@/composables/amiibos";
import { PAGE_SIZE } from "@/composables/constants";
import PageSearchFormula from './PageSearchFormula.vue';


// === AMIIBOS ===

const amiibo_database = ref<AmiiboType[]>([]);
async function loadDatabase() {
    amiibo_database.value = await getAllAmiibos();
}
loadDatabase();

const amiibo_types = computed(() => 
    amiibo_database.value
        .map(amiibo => amiibo.type)
        .filter((amiibo, idx, array) => array.indexOf(amiibo) === idx)
        .sort()
)

const amiibo_series = computed(() =>
    amiibo_database.value
        .map(amiibo => amiibo.gameSeries)
        .filter((amiibo, idx, array) => array.indexOf(amiibo) === idx)
        .sort()
)


// === SEARCH ===

const search = ref<string>("");
const s_type = ref<string>("");
const s_series = ref<string>("");

const amiibos = computed(() => 
    amiibo_database.value
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
    if((new_page + 1) * PAGE_SIZE < amiibos.value.length || new_page > 0) {
        page.value = new_page;
    }
}

// === RESULT ===

const shown_amiibos = computed(() => amiibos.value.slice(page.value * PAGE_SIZE, (page.value + 1) * PAGE_SIZE));

</script>

<template>
    <PageSearchFormula
        :page="page" :set-page="setPage"
        v-model:search="search"
        v-model:type="s_type"
        v-model:game="s_series"
        :types="amiibo_types"
        :series="amiibo_series" />
    <section>
        <AmiiboPreview v-for="data of shown_amiibos" 
            :amiibo="data" :key="data.head+data.tail" />
    </section>
    <LoadIcon :shown="amiibo_database.length === 0" />
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
