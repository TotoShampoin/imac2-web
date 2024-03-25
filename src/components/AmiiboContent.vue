<script setup lang="ts">
import { ref } from "vue";

import IconFavourite from "@/assets/icons/IconFavourite.vue";
import { useFavourites } from "@/store/favourites";
import { AmiiboType } from "@/store/amiibo";

const { amiibo } = defineProps<{
    amiibo: AmiiboType
}>();
const { addFavourite, isFavourite, removeFavourite } = useFavourites();

const {
    name, image, amiiboSeries, character, head, release, gameSeries, tail, type
} = amiibo;

const {
    au: release_au,
    eu: release_eu,
    na: release_na,
    jp: release_jp
} = release;

const release_date_au = new Date(release_au).toLocaleDateString();
const release_date_eu = new Date(release_eu).toLocaleDateString();
const release_date_na = new Date(release_na).toLocaleDateString();
const release_date_jp = new Date(release_jp).toLocaleDateString();

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
    <article>
        <div class="image">
            <img v-bind:src="image" alt="">
            <label class="favourite">
                <IconFavourite :filled="is_favourite" color="#FC0" />
                <input type="checkbox" :checked="is_favourite" v-on:change="toggleFavourite" />
            </label>
        </div>
        <div class="box">
            <div class="row"> <h1>Name</h1> <p>{{ name }}</p> </div>
            <div class="row"> <h1>Character</h1> <p>{{ character }} from {{ gameSeries }}</p> </div>
            <div class="row"> <h1>Series</h1> <p>{{ amiiboSeries }}</p> </div>
            <div class="row"> <h1>ID</h1> <p>{{ id }}</p> </div>
            <div class="row"> <h1>Type</h1> <p>{{ type }}</p> </div>
            <div class="row"> <h1>Release [AU]</h1> <p>{{ release_date_au }}</p> </div>
            <div class="row"> <h1>Release [EU]</h1> <p>{{ release_date_eu }}</p> </div>
            <div class="row"> <h1>Release [JP]</h1> <p>{{ release_date_jp }}</p> </div>
            <div class="row"> <h1>Release [NA]</h1> <p>{{ release_date_na }}</p> </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
article {
    position: relative;
    display: flex;
    margin: 1rem;
    padding: .5rem;
    gap: .5rem;
    border: #AAA 1px solid;
    border-radius: 1rem;

    @media (max-width: 40rem) {
        flex-direction: column;
    }
}
.image {
    position: relative;
}
.box {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
.row {
    display: flex;
    align-items: center;
    gap: .5rem;
    // padding: .5rem;
    > * {
        width: fit-content;
    }
}

h1, p {
    margin: 0;
    border-radius: .5rem;
}
h1 {
    padding: .25rem 1rem;
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
    cursor: pointer;
    input {
        display: none;
    }
}
</style>
