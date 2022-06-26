<template>
    <div
        class="sidebar w-full h-full bg-bg flex flex-col select-none overflow-y-auto px-3 py-2 border-r-2 border-divider gap-2"
    >
        <slot></slot>
        <div
            class="sidebarHighlight absolute transition-transform bg-accent top-0 mt-2 left-0 w-1 rounded-r"
            :class="highlightClasses"
            :style="highlightStyle"
        ></div>
        <div
            class="sidebarHighlight absolute transition-transform bg-accent top-0 mt-2 -left-3 w-4 rounded-r blur-md"
            :class="highlightClasses"
            :style="highlightStyle"
        ></div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    highlightPosition: {
        type: Number,
        required: true,
    },
    highlightExpanded: {
        type: Boolean,
        required: true,
    },
});

const highlightClasses = computed(() => ({
    "h-8": props.highlightExpanded,
    "h-2": !props.highlightExpanded,
}));

const highlightStyle = computed(() => ({
    transform: `translateY(${props.highlightPosition}px)`,
}));
</script>
