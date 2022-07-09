<template>
    <div class="hero h-1/6 p-4 flex flex-row items-end justify-start">
        <div class="flex flex-row items-center gap-4">
            <IconButton @click="back">arrow_back</IconButton>
            <h1 class="headline">{{ props.title }}</h1>
            <p>{{ props.subTitle }}</p>
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import IconButton from "./buttons/IconButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
    },
});

const back = () => {
    router.back();
};
</script>
