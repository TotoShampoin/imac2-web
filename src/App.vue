<script setup lang="ts">
import { ref } from 'vue';
import Amiibo, { AmiiboContent } from '@/components/Amiibo.vue';

const amiibos = ref<AmiiboContent[]>([]);

async function loadAmiibos(query: string = "") {
    const res = await fetch(`https://www.amiiboapi.com/api/amiibo?name=${query}`);
    const json = await res.json() as {amiibo: AmiiboContent[]};
    return json.amiibo;
}

loadAmiibos("mario")
    .then(loaded => amiibos.value = loaded);

</script>

<template>
    <h1>Amiibos</h1>
    <input type="text" >
    <section>
        <Amiibo v-for="(data, index) in amiibos" :amiibo="data" :key="index" />
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
