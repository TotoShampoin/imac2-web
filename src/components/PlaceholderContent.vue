<script setup lang="ts">
</script>

<template>
    <article>
        <div class="image"></div>
        <div class="box">
            <div class="row"> <h1>Name</h1> <p></p> </div>
            <div class="row"> <h1>Character</h1> <p></p> </div>
            <div class="row"> <h1>Series</h1> <p></p> </div>
            <div class="row"> <h1>ID</h1> <p></p> </div>
            <div class="row"> <h1>Type</h1> <p></p> </div>
            <div class="row"> <h1>Release [AU]</h1> <p></p> </div>
            <div class="row"> <h1>Release [EU]</h1> <p></p> </div>
            <div class="row"> <h1>Release [JP]</h1> <p></p> </div>
            <div class="row"> <h1>Release [NA]</h1> <p></p> </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
article {
    position: relative;
    display: flex;
    margin: 1rem;
    padding: .5rem;
    gap: .5rem;
    background: #DDD;
    border-radius: 1rem;

    animation: blink 3s infinite;

    @media (max-width: 40rem) {
        flex-direction: column;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        33% {
            opacity: .5;
        }
        66% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
}
.image {
    width: 16rem;
    height: 22.5rem;
    background: #FFF;
    border-radius: .5rem;
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
}
h1, p {
    margin: 0;
    border-radius: .5rem;
}
h1 {
    display: block;
    padding: .25rem 1rem;
    background: #4C8;
    color: #FFF;
    background: #FFF;
}
p {
    display: block;
    width: 8rem;
    height: 1rem;
}
</style>
