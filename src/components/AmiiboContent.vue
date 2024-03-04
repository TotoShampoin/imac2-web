<script setup lang="ts">
import { computed, ref } from "vue";
import { AmiiboType } from "@/composables/amiibos";
import { addFavourite, isFavourite, removeFavourite } from "@/composables/favourites";
import IconFavourite from "@/assets/icons/IconFavourite.vue";

const { amiibo } = defineProps<{
    amiibo?: AmiiboType
}>();

const exists = computed(() => amiibo !== undefined)

// const properties = computed(() => Object.entries(amiibo!).map(prop => ({key: prop[0], value: prop[1]})));

const {
    name, image, amiiboSeries, character, head, release, gameSeries, tail, type
} = amiibo!;

const {
    au: release_au,
    eu: release_eu,
    na: release_na,
    jp: release_jp
} = release!;

const id = `${head}${tail}`;

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
    <article v-if="exists">
        <img v-bind:src="image" alt="">
        <div> <h1>Name</h1> <p>{{ name }}</p> </div>
        <div> <h1>Character</h1> <p>{{ character }} from the {{ gameSeries }} series</p> </div>
        <div> <h1>Series</h1> <p>{{ amiiboSeries }}</p> </div>
        <div> <h1>ID</h1> <p>{{ id }}</p> </div>
        <div> <h1>Type</h1> <p>{{ type }}</p> </div>
        <label class="favourite">
            <IconFavourite class="fav-icon" :filled="is_favourite" color="#FC0" />
            <input type="checkbox" :checked="is_favourite" v-on:change="toggleFavourite" />
        </label>
    </article>
</template>

<style scoped lang="scss">
article {
    position: relative;
    display: block;
    // width: 20rem;
    width: min(min-content, 100%);
    margin: 1rem;
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
    // text-wrap: nowrap;
    // overflow: auto;
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

.favourite {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: block;
    grid-area: favourite;
    width: 2.5rem;
    height: 2.5rem;
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
