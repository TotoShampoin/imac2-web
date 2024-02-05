<script setup lang="ts">
const { shown } = defineProps<{
    shown: boolean
}>();
</script>

<template>
<div class="load-icon" v-if="shown">
    <p>Loading</p>
</div>
</template>

<style lang="scss" scoped>
.load-icon {
    position: fixed;
    top: 0; left: 0;
    width: 100dvw; height: 100dvh;
    display: grid;
    place-items: center;
    pointer-events: none;
    p {
        padding: .75rem 2rem;
        border-radius: .5rem;
        background: #FFF;
    }
}
</style>
