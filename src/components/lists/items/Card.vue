<template>
    <div class="card p-2 rounded-lg bg-overlay w-full h-max flex flex-col gap-1 select-none" :class="computedClasses">
        <div class="aspect-square w-full relative rounded-md" v-if="props.image !== undefined">
            <img
                :src="props.image"
                class="rounded-md absolute left-0 top-0 blur-lg w-full aspect-square"
                v-if="props.image !== ''"
            />
            <img :src="props.image || albumIcon" class="rounded-md absolute left-0 top-0 w-full aspect-square" />
        </div>
        <div class="p-2" :class="{ 'pt-3': props.image !== undefined }">
            <p class="text-lg font-medium text-ellipsis w-full whitespace-nowrap overflow-hidden">
                <slot name="title"></slot>
            </p>
            <p class="text-xs">
                <slot name="details"></slot>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import albumIcon from "../../../assets/album.svg";

const props = defineProps({
    clickable: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    },
});

const computedClasses = computed(() => ({
    "hover:bg-highlight": props.clickable,
    "cursor-pointer": props.clickable,
    "transition-colors": props.clickable,
}));
</script>
