<script setup lang="ts">

</script>

<template>
    <section>
        <div v-for="id in 20" :key="id" :class="`placeholder placeholder--${id}`">
            <div class="placeholder__image"></div>
            <div class="placeholder__text"></div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem auto;
    gap: .5rem;

    max-width: 72rem;
}

.placeholder {
    display: flex;
    flex-direction: column;
    width: 11rem;
    padding: .5rem;
    gap: .5rem;
    border-radius: 1rem;
    background: #DDD;
    &__image {
        width: 100%;
        height: 10rem;
        background: #FFF;
        border-radius: .5rem;
    }
    &__text {
        width: 100%;
        height: 1.5rem;
    }

    @for $i from 1 through 20 {
        &--#{$i} {
            animation: blink 2s infinite;
            animation-delay: $i * .05s;
        }
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
</style>
