<script setup lang="ts">
export type AmiiboContent = {
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


const { amiibo } = withDefaults(
    defineProps<{
        amiibo: AmiiboContent
    }>(), {}
);

const { name, image } = amiibo;

</script>

<template>
    <article>
        <h1>{{ name }}</h1>
        <img v-bind:src="image" alt="">
    </article>
</template>

<script lang="ts">

export default {}
</script>

<style scoped lang="scss">
article {
    display: block;
    width: 16rem;
    padding: .5rem;
    border: #AAA 1px solid;
    border-radius: 1rem;
}

h1 {
    margin: 0;
}

img {
    display: block;
    width: 100%;
    height: 24rem;
    border-radius: .5rem;
    object-fit: cover;
    object-position: top;
}
</style>
