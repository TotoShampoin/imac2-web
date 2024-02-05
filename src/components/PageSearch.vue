<script setup lang="ts">
import { computed, ref } from 'vue';
import AmiiboPreview from '@/components/AmiiboPreview.vue';
import { getAllAmiibos, AmiiboType } from "@/composables/amiibos";

const PAGE_SIZE = 24;

const is_loading = ref<boolean>(false);
const loading_icon_style = computed(() => 
    is_loading.value ? "grid" : "none"
);


const amiibo_database = ref<AmiiboType[]>([]);
const search = ref<string>("");
const page = ref<number>(0);

const amiibos = computed(() => 
    amiibo_database.value
        .filter(amiibo => amiibo.name.includes(search.value))
);
const shown_amiibos = computed(() => amiibos.value.slice(page.value * PAGE_SIZE, (page.value + 1) * PAGE_SIZE));


async function loadDatabase() {
    is_loading.value = true;
    amiibo_database.value = await getAllAmiibos();
    is_loading.value = false;
}
loadDatabase();

function searchAmiibos(query: string = "") {
    search.value = query;
}

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

</script>

<template>
    <header>
        <input type="search" placeholder="Search" @input="searchAmiibos((<HTMLInputElement>$event.target).value)" />
        <nav>
            <button @click="prevPage">prev</button>
            <input @change="setPage((<HTMLInputElement>$event.target).value)" :value="page">
            <button @click="nextPage">next</button>
        </nav>
    </header>
    <section>
        <AmiiboPreview v-for="(data, index) in shown_amiibos" 
            :amiibo="data" :key="data.head+data.tail" />
    </section>
    <div class="overlay">
        <div>Loading</div>
    </div>
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
    * {
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

.overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100dvw; height: 100dvh;
    display: v-bind(loading_icon_style);
    place-items: center;
    pointer-events: none;
    div {
        padding: .75rem 2rem;
        border-radius: .5rem;
        background: #FFF;
    }
}
</style>
