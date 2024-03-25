<script setup lang="ts">
import { computed, ref } from 'vue';


const {
    page, setPage,
    types, series, sorts
} = defineProps<{
    page: number,
    setPage: (new_page: number) => void,
    types: string[],
    series: string[],
    sorts: string[],
}>();
const search = defineModel<string>("search");
const s_type = defineModel<string>("type");
const s_game = defineModel<string>("game");
const s_sort = defineModel<string>("sort");
const s_descending = defineModel<boolean>("descending");

const use_advanced = ref<boolean>(false);
const advanced_htmlclass = computed(() => `advanced ${use_advanced.value ? "show" : "hide"}`)
function toggleAdvanced() {
    use_advanced.value = !use_advanced.value;
    if(!use_advanced.value) {
        s_type.value = "";
    }
}

</script>

<template>
    <header class="search-form">
        <input class="input small" type="search" placeholder="Search" v-model="search" />
        <button class="input tiny" @click="toggleAdvanced">Adv.</button>
        <div :class="advanced_htmlclass">
            <select class="input" v-model="s_game">
                <option value="" selected>--- Game series ---</option>
                <option v-for="t of series" :value="t">{{ t }}</option>
            </select>
            <select class="input" v-model="s_type">
                <option value="" selected>--- Type ---</option>
                <option v-for="t of types" :value="t">{{ t }}</option>
            </select>
            <select class="input small" v-model="s_sort">
                <option v-for="t of sorts" :value="t">Sort by {{ t.toLowerCase() }}</option>
            </select>
            <button v-if="s_sort == 'Random'" class="input tiny" @click="s_descending = !s_descending">↺</button>
            <input v-else class="input tiny" type="checkbox" v-model="s_descending" data-what="order" />
        </div>
        <nav>
            <button class="input tiny" @click="setPage(page-1)">◄</button>
            <input class="input tiny" @change="setPage(parseInt((<HTMLInputElement>$event.target).value))" :value="page">
            <button class="input tiny" @click="setPage(page+1)">►</button>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.search-form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 18rem;
    margin: 1rem auto;
    gap: .5rem;
}
.input {
    display: block;
    width: 100%;
    padding: .25rem .75rem;
    font: inherit;
    grid-column: span 3;
    border: none;
    border-radius: .25rem;
        border-bottom: .125rem solid #4C8;
    &.small {
        grid-column: span 2;
    }
    &.tiny {
        grid-column: span 1;
    }

    &:is(input[type="checkbox"]) {
        appearance: none;
        margin: 0;
        color: #396;
        &:checked {
            background-color: #4C8;
            color: black;
        }
        /* THIS IS NOT GOOD CSS CODE */
        &[data-what=order]::after {
            display: block;
            width: 100%;
            text-align: center;
            content: "▲";
        }
        &[data-what=order]:checked::after {
            content: "▼";
        }
    }
    &:is(button) {
        background-color: #4C8;
        font-weight: bold;
        cursor: pointer;
    }
    &:focus {
        outline: .125rem solid #4C8;
        outline-offset: .125rem;
    }
}
.advanced {
    display: grid;
    grid-column: span 3;
    grid-row: span 3;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    &.hide {
        display: none;
    }
}
nav {
    display: grid;
    grid-column: span 3;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    input {
        text-align: center;
    }
}

</style>
