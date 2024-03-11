<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div id="body">
        <header>
            <RouterLink to="/"><h1>Find Amiibo</h1></RouterLink>
            <RouterLink to="/favourite">Favourites</RouterLink>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #4C8;
    color: #FFF;
    padding: .5rem;
}
main {
    flex-grow: 1;
    overflow: auto;
}
</style>
