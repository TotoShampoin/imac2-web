<script setup lang="ts">
import { computed } from "vue";
import { AmiiboType } from "@/composables/amiibos";

const { amiibo } = withDefaults(
    defineProps<{
        amiibo?: AmiiboType
    }>(), {}
);

const exists = computed(() => amiibo !== undefined)

// const properties = computed(() => Object.entries(amiibo!).map())

const {
    name,
    image
} = amiibo!;

</script>

<template>
    <article v-if="exists">
        <img v-bind:src="image" alt="">
        <div>
            <h1>Name</h1>
            <p>{{ name }}</p>
        </div>
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
