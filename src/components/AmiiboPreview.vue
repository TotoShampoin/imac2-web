<script setup lang="ts">
import { AmiiboContent } from "@/types/Amiibo";

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
    width: 11rem;
    padding: .5rem;
    border: #AAA 1px solid;
    border-radius: 1rem;
}

h1 {
    margin: 0;
    text-wrap: nowrap;
    overflow: auto;
}

img {
    display: block;
    width: 100%;
    height: 10rem;
    border-radius: .5rem;
    object-fit: cover;
    object-position: top;
}
</style>
