<script setup lang="ts">
import { ref } from 'vue';
import Amiibo from '@/components/Amiibo.vue';

type AmiiboContent = {
    "amiiboSeries": string,
        "character": string,
        "gameSeries": string,
        "head": string,
        "image": string,
        "name": string,
        "release": {
            "au": string,
            "eu": string,
            "jp": string,
            "na": string
        },
        "tail": string,
        "type": string
}

const amiibos = ref<AmiiboContent[]>([]);

(async function() {
    const res = await fetch("https://www.amiiboapi.com/api/amiibo?name=mario");
    const json = await res.json() as {amiibo: AmiiboContent[]};
    amiibos.value = json.amiibo;
})();
</script>

<template>
    <h1>Amiibos</h1>
    <section>
        <Amiibo v-for="(data, index) in amiibos"
            :name="data.name" :image="data.image" :key="index"
        />
    </section>
</template>

<style>
h1 {
    margin: 0;
}
section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: .5rem;
    gap: .5rem;
}
</style>
