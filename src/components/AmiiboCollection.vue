<script setup lang="ts">
import PlaceholderCollection from '@/components/PlaceholderCollection.vue';
import AmiiboPreview from '@/components/AmiiboPreview.vue';
import { AmiiboType } from '@/store/amiibo';
import { computed, ref } from 'vue';

const { amiibos } = defineProps<{
    amiibos: AmiiboType[];
}>();

const x = ref(0);
const y = ref(0);
const hovering = ref<AmiiboType | undefined>(undefined);

window.addEventListener('mousemove', (e) => {
    x.value = e.clientX + 16;
    y.value = e.clientY + 16;
});


const flyer_class = computed(() => `flyer ${hovering.value ? 'hovering' : ''}`);

</script>

<template>
    <section>
        <AmiiboPreview v-for="data of amiibos" 
            @mouseover="hovering = data"
            @mouseleave="hovering = undefined"
            :amiibo="data" :key="data.head+data.tail" />
    </section>
    <div :class="flyer_class" :style="`--x: ${x}px; --y: ${y}px`">
        <p>{{ hovering?.name }}</p>
        <p>{{ hovering?.amiiboSeries }}</p>
    </div>
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

.flyer {
    display: none;
    position: fixed;
    top: var(--y);
    left: var(--x);
    padding: .5rem 1rem;
    background: #FFF;
    border-radius: .5rem;
    // border: #4C8 .125rem solid;
    box-shadow:
        inset 0 0 0 .125rem #FFF,
        inset 0 0 0 .25rem #4C8;
    pointer-events: none;
    &.hovering {
        display: block;
    }
    p {
        margin: 0;
    }
}
</style>
