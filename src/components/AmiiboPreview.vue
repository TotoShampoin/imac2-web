<script setup lang="ts">
import { AmiiboType } from '@/composables/amiibos';
import { RouterLink } from 'vue-router';
import IconFavourite from '@/assets/icons/IconFavourite.vue';
import { ref } from 'vue';
import { addFavourite, isFavourite, removeFavourite } from '@/composables/favourites';

const { amiibo } = withDefaults(
    defineProps<{
        amiibo: AmiiboType
    }>(), {}
);

const { name, image, head, tail } = amiibo!;

const link = `/amiibo/${head}${tail}`;

const is_favourite = ref<boolean>(isFavourite(`${head}${tail}`));
function toggleFavourite() {
    is_favourite.value = !is_favourite.value;
    if(is_favourite.value) {
        addFavourite(`${head}${tail}`);
    } else {
        removeFavourite(`${head}${tail}`);
    }
}

</script>

<template>
    <article>
        <RouterLink :to="link">
            <img v-bind:src="image" alt="">
        </RouterLink>
        <h1>{{ name }}</h1>
        <label class="favourite">
            <IconFavourite class="fav-icon" :filled="is_favourite" color="#FC0" />
            <input type="checkbox" :checked="is_favourite" v-on:change="toggleFavourite" />
        </label>
    </article>
</template>

<script lang="ts">

export default {}
</script>

<style scoped lang="scss">
article {
    position: relative;
    // display: flex;
    // flex-direction: column;
    display: grid;
    grid-template-areas:
        "image image"
        "name favourite";
    grid-template-columns: auto min-content;
    gap: .5rem;
    width: 11rem;
    padding: .5rem;
    border: #AAA 1px solid;
    border-radius: 1rem;
}

h1 {
    grid-area: name;
    margin: 0;
    text-wrap: nowrap;
    overflow: auto;
}


a {
    grid-area: image;
    display: block;
    color: inherit;
    text-decoration: inherit;
}
img {
    display: block;
    width: 100%;
    height: 10rem;
    border-radius: .5rem;
    object-fit: cover;
    object-position: top;
}

.favourite {
    display: block;
    grid-area: favourite;
    width: 1.5rem;
    height: 1.5rem;
    .fav-icon {
        display: block;
        width: 100%;
        height: 100%;
    }
    input {
        display: none;
    }
}
</style>
