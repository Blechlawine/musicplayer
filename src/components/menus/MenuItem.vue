<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["click", "mousein"]);
</script>

<template>
    <div
        class="menuItem flex flex-rwo gap-2 items-center hover:bg-highlight cursor-pointer p-3 whitespace-nowrap h-6 w-full justify-start"
        @click="(e) => emit('click', e)"
        @mouseover="(e) => emit('mousein', e)"
    >
        <slot></slot>
    </div>
</template>
