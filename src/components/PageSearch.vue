<script setup lang="ts">
import AmiiboPreview from '@/components/AmiiboPreview.vue';
import LoadIcon from "@/components/LoadIcon.vue";
import { computed, ref } from 'vue';
import { getAllAmiibos, AmiiboType } from "@/composables/amiibos";
import { PAGE_SIZE } from "@/composables/constants";


// === AMIIBOS ===

const amiibo_database = ref<AmiiboType[]>([]);
async function loadDatabase() {
    amiibo_database.value = await getAllAmiibos();
}
loadDatabase();


// === SEARCH ===

const search = ref<string>("");


const amiibos = computed(() => 
    amiibo_database.value
        .filter(amiibo => amiibo.name.includes(search.value))
);


// === PAGE SYSTEM ===

const page = ref<number>(0);
function nextPage() {
    if((page.value + 1) * PAGE_SIZE < amiibos.value.length) {
        page.value++;
    }
}
function prevPage() {
    if(page.value > 0) {
        page.value--;
    }
}
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
    <header>
        <input type="search" placeholder="Search" v-model="search" />
    </header>
    <!-- TODO: Make page management into a component, somehow -->
    <nav>
        <button @click="prevPage">prev</button>
        <input @change="setPage((<HTMLInputElement>$event.target).value)" :value="page">
        <button @click="nextPage">next</button>
    </nav>
    <section>
        <AmiiboPreview v-for="(data, index) in shown_amiibos" 
            :amiibo="data" :key="data.head+data.tail" />
    </section>
    <LoadIcon :shown="amiibo_database.length === 0" />
</template>

<style lang="scss" scoped>
input[type=search] {
    display: block;
    width: 100%;
    max-width: 20rem;
    margin: 1rem auto;
    padding: .5rem 1rem;
    font: inherit;
}
nav {
    display: flex;
    justify-content: center;
    gap: .5rem;
    margin: 1rem;
    button, input {
        display: block;
        width: 4rem;
        height: 2rem;
        margin: 0;
        padding: 0;
        text-align: center;
    }
}

section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem 0;
    gap: .5rem;
}
</style>
