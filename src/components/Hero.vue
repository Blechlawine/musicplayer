<template>
    <div class="hero h-1/6 p-4 flex flex-row items-end justify-start">
        <h1 class="headline">{{ props.title }}</h1>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
