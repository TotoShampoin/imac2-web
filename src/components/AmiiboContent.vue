<script setup lang="ts">
import { computed } from "vue";
import { AmiiboType } from "@/composables/amiibos";

const { amiibo } = withDefaults(
    defineProps<{
        amiibo?: AmiiboType
    }>(), {}
);

const exists = computed(() => amiibo !== undefined)

// const properties = computed(() => Object.entries(amiibo!).map(prop => ({key: prop[0], value: prop[1]})));

const {
    name,
    image,
    amiiboSeries,
    character,
    head,
    release,
    gameSeries,
    tail,
    type
} = amiibo!;

const {
    au: release_au,
    eu: release_eu,
    na: release_na,
    jp: release_jp
} = release!;

const id = `${head}${tail}`;

</script>

<template>
    <article v-if="exists">
        <img v-bind:src="image" alt="">
        <div> <h1>Name</h1> <p>{{ name }}</p> </div>
        <div> <h1>Character</h1> <p>{{ character }} from the {{ gameSeries }} series</p> </div>
        <div> <h1>Series</h1> <p>{{ amiiboSeries }}</p> </div>
        <div> <h1>ID</h1> <p>{{ id }}</p> </div>
        <div> <h1>Type</h1> <p>{{ type }}</p> </div>
    </article>
</template>

<script lang="ts">

export default {}
</script>

<style scoped lang="scss">
article {
    display: block;
    width: 20rem;
    padding: .5rem;
    border: #AAA 1px solid;
    border-radius: 1rem;
}
div {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .5rem;
    > * {
        width: fit-content;
    }
}

h1, p {
    margin: 0;
    text-wrap: nowrap;
    overflow: auto;
}
h1 {
    padding: .25rem 1rem;
    border-radius: .25rem;
    background: #4C8;
    color: #FFF;
}

img {
    display: block;
    width: 100%;
    // height: 10rem;
    border-radius: .5rem;
    object-fit: cover;
    object-position: top;
}
</style>
