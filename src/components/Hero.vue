<template>
    <div class="hero h-1/6 flex flex-row items-end justify-start">
        <h1>{{ props.title }}</h1>
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
