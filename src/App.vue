<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import AmiiboSearch from './components/AmiiboSearch.vue';

</script>

<template>
    <div id="body">
        <header>
            <RouterLink to="/"><h1>Find your Amiibo</h1></RouterLink>
            <!-- <nav>
                <RouterLink to="/">Home</RouterLink>
            </nav> -->
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<style lang="scss" scoped>
#body {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
h1 {
    margin: 0;
    font-size: 1.5rem;
}
header {
    background: #4C8;
    color: #FFF;
    padding: .5rem;
}
main {
    flex-grow: 1;
    overflow: auto;
}
</style>
