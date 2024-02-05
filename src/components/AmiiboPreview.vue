<script setup lang="ts">
import { AmiiboType } from '@/composables/amiibos';
import { RouterLink } from 'vue-router';

const { amiibo } = withDefaults(
    defineProps<{
        amiibo: AmiiboType
    }>(), {}
);

const { name, image, head, tail } = amiibo!;

const link = `/amiibo/${head}${tail}`;

</script>

<template>
    <RouterLink :to="link">
        <article>
            <h1>{{ name }}</h1>
            <img v-bind:src="image" alt="">
        </article>
    </RouterLink>
</template>

<script lang="ts">

export default {}
</script>

<style scoped lang="scss">
a {
    display: block;
    color: inherit;
    text-decoration: inherit;
}

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
