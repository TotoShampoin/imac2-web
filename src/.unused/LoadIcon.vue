<script setup lang="ts">
import IconSpinner from "@/assets/icons/IconSpinner.vue"

const { shown } = defineProps<{
    shown: boolean
}>();
</script>

<template>
<div class="load-layer" v-if="shown">
    <div class="load-icon">
        <IconSpinner />
    </div>
</div>
</template>

<style lang="scss" scoped>
.load-layer {
    position: fixed;
    top: 0; left: 0;
    width: 100dvw; height: 100dvh;
    display: grid;
    place-items: center;
    pointer-events: none;
    .load-icon {
        box-sizing: content-box;
        width: 8rem;
        height: 8rem;
        padding: 1rem;
        border-radius: 2rem;
        background: #FFF;
        border: #4C8 .25rem solid;
    }
}
</style>
