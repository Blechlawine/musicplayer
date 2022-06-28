<template>
    <div class="card p-2 rounded-lg bg-overlay w-full h-max flex flex-col gap-1" :class="computedClasses">
        <p class="text-lg font-medium text-ellipsis w-full">
            <slot name="title"></slot>
        </p>
        <p class="text-xs">
            <slot name="details"></slot>
        </p>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    clickable: {
        type: Boolean,
        default: true,
    },
});

const computedClasses = computed(() => ({
    "hover:bg-highlight": props.clickable,
    "cursor-pointer": props.clickable,
    "transition-colors": props.clickable,
}));
</script>
