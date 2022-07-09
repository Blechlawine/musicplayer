<template>
    <router-link replace class="px-2 py-1 hover:bg-highlight rounded" :class="computedClasses" :to="props.to">
        <slot></slot>
    </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const Router = useRouter();

const props = defineProps({
    to: {
        type: String,
        required: true,
    },
});

const active = computed(() => Router.currentRoute.value.path === props.to);
const computedClasses = computed(() => ({
    "text-accent": active.value,
}));
</script>
