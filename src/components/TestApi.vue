<template>
    <pre>{{ content }}</pre>
</template>

<script lang="ts">
    const content = await fetch("https://www.amiiboapi.com/api/amiibo").then(res => res.text());

    export default {
        name: "TestApi",
        setup() {
            return {
                content
            }
        }
    }
</script>
