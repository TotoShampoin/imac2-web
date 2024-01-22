<script setup lang="ts">
import { computed, ref } from 'vue';
import AmiiboPreview from '@/components/AmiiboPreview.vue';
import { AmiiboContent } from "@/types/Amiibo";
import { getAmiibos } from "@/composables/getAmiibos";

const amiibo_database = ref<AmiiboContent[]>([]);

const is_loading = ref<boolean>(false);
const loading_icon_style = computed(() => is_loading.value ? "grid" : "none");

async function loadDatabase() {
    is_loading.value = true;
    amiibo_database.value = await getAmiibos();
    is_loading.value = false;
}
loadDatabase();

async function searchAmiibos(query: string = "") {
    is_loading.value = true;
    const loaded = await getAmiibos(query);
    amiibo_database.value = loaded;
    is_loading.value = false;
}

</script>

<template>
    <header>
        <input type="search" placeholder="Search" @change="searchAmiibos((<HTMLInputElement>$event.target).value)" >
    </header>
    <section>
        <AmiiboPreview v-for="(data, index) in amiibo_database" 
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
    margin: auto;
    padding: .5rem 1rem;
    font: inherit;
}
section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: .5rem;
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
