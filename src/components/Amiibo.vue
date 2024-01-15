<script setup lang="ts">
withDefaults(
    defineProps<{
        name: string,
        image?: string
    }>(), {
    image: "https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
}
);
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
