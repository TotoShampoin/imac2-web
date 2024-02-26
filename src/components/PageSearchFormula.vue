<script setup lang="ts">
import { computed, ref } from 'vue';


const {
    page, setPage,
    types
} = defineProps<{
    page: number,
    setPage: (new_page: number) => void,
    types: string[]
}>();
const search = defineModel("search");
const s_type = defineModel("type");

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
            <input class="input" type="search" placeholder="Game series">
            <select class="input" v-model="s_type">
                <option value="" selected>--- Type ---</option>
                <option v-for="t of types" :value="t">{{ t }}</option>
            </select>
        </div>
        <nav>
            <button class="input tiny" @click="setPage(page-1)">prev</button>
            <input class="input tiny" @change="setPage(parseInt((<HTMLInputElement>$event.target).value))" :value="page">
            <button class="input tiny" @click="setPage(page+1)">next</button>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.search-form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 20rem;
    margin: 1rem auto;
    gap: 1rem;
}
.input {
    display: block;
    width: 100%;
    padding: .5rem 1rem;
    font: inherit;
    grid-column: span 3;
    &.small {
        grid-column: span 2;
    }
    &.tiny {
        grid-column: span 1;
    }
}
.advanced {
    display: grid;
    grid-column: span 3;
    grid-row: span 2;
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
