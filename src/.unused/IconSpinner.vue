<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g :class="`dot-${i}`" v-for="i in 3" :key="i">
        <circle cx="12" cy="12" r="2" fill="black"/>
    </g>
</svg>
</template>

<style lang="scss" scoped>
svg {
    display: block;
    width: 100%;
    height: 100%;
}

@for $i from 1 through 3 {
    .dot-#{$i} {
        transform-origin: 50% 50%;
        rotate: #{$i * 120}deg;
        circle {
            animation: sway 1s ease-in-out -#{$i * 125}ms infinite;
        }
    }
}

@keyframes sway {
    0% {
        translate: 40% 0%;
    }
    50% {
        translate: -40% 0%;
    }
    100% {
        translate: 40% 0%;
    }
}

</style>