<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div id="body">
        <header>
            <nav>
                <RouterLink to="/"><h1>Find Amiibo</h1></RouterLink>
                <RouterLink to="/favourite">Favourites</RouterLink>
            </nav>
        </header>
        <main>
            <RouterView />
        <footer>
            <p>&copy; TotoShampoin 2024</p>
        </footer>
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
    color: #000;
    padding: .5rem;
}
header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 80rem;
}
footer {
    padding: .5rem .75rem;
    p {
        margin: 0;
        font-size: .75rem;
    }
}
main {
    flex-grow: 1;
    overflow: auto;
}

a {
    padding: .25rem .5rem;
    border-radius: .375rem;
    background: #FFF5;
    color: inherit;
    text-decoration: none;
}
</style>
