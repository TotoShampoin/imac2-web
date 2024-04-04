<script setup lang="ts">
import { VNodeRef, computed, defineProps, ref, watch, withDefaults } from "vue";
const props = withDefaults(
    defineProps<{
        filled?: boolean;
        color?: string;
    }>(), {
        filled: false,
        color: "black"
    }
);

const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const filled = computed(() => props.filled);
const color = computed(() => props.color);

const svg_class = ref<string>("");
const show_filled = ref<boolean>(filled.value);

watch(() => props.filled, async () => {
    svg_class.value = "animate";
    await delay(500 / 4);
    show_filled.value = filled.value;
    await delay(500 * 3 / 4);
    svg_class.value = "";
});


</script>

<template>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="svg_class">
    <template v-if="show_filled">
        <path d="M14.0177 2.69889C13.1923 1.02659 10.8077 1.02659 9.98234 2.69889L8.06497 6.5839L3.77761 7.20689C1.93211 7.47506 1.19522 9.743 2.53063 11.0447L5.633 14.0688L4.90063 18.3388C4.58538 20.1768 6.5146 21.5785 8.16526 20.7107L12 18.6947L15.8347 20.7107C17.4854 21.5785 19.4146 20.1768 19.0994 18.3388L18.367 14.0688L21.4694 11.0447C22.8048 9.743 22.0679 7.47506 20.2224 7.20689L15.935 6.5839L14.0177 2.69889Z" 
            :fill="color" stroke="white"/>
    </template>
    <template v-else>
        <path d="M14.0177 2.69889C13.1923 1.02659 10.8077 1.02659 9.98234 2.69889L8.06497 6.5839L3.77761 7.20689C1.93211 7.47506 1.19522 9.743 2.53063 11.0447L5.633 14.0688L4.90063 18.3388C4.58538 20.1768 6.5146 21.5785 8.16526 20.7107L12 18.6947L15.8347 20.7107C17.4854 21.5785 19.4146 20.1768 19.0994 18.3388L18.367 14.0688L21.4694 11.0447C22.8048 9.743 22.0679 7.47506 20.2224 7.20689L15.935 6.5839L14.0177 2.69889ZM10.5807 8.26518L12 5.38933L13.4193 8.26518C13.7471 8.92925 14.3806 9.38954 15.1134 9.49603L18.2871 9.95719L15.9906 12.1957C15.4603 12.7126 15.2183 13.4574 15.3435 14.1873L15.8857 17.3481L13.047 15.8558C12.3915 15.5112 11.6085 15.5112 10.953 15.8558L8.11434 17.3481L8.65648 14.1873C8.78166 13.4574 8.53968 12.7126 8.00938 12.1957L5.71288 9.95719L8.88657 9.49603C9.61942 9.38954 10.2529 8.92925 10.5807 8.26518Z" 
            :fill="color" stroke="white"/>
    </template>
</svg>

</template>

<style lang="scss" scoped>
svg {
    display: block;
    width: 100%;
    height: 100%;
}

.animate {
    animation: bounce 0.5s;
}

@keyframes bounce {
    0% {
        transform: scale(1);
    }
    25% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}

</style>
