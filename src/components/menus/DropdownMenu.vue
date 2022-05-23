<script setup lang="ts">
import { defineEmits, PropType, computed } from "vue";

const emit = defineEmits(["close"]);

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    clickAway: {
        type: Boolean,
        default: true,
    },
    offset: {
        type: Object as PropType<{ top: number; left: number }>,
        default: () => ({
            top: 0,
            left: 0,
        }),
    },
});

const menuStyle = computed(() => ({
    "margin-left": `${props.offset.left}px`,
    "margin-top": `${props.offset.top}px`,
}));
</script>
<template>
    <div class="wrapper" v-if="props.open">
        <div class="menu absolute min-w-[100px] min-h-[25px] py-1 flex flex-col rounded bg-bg shadow-md z-30" :style="menuStyle">
            <slot></slot>
        </div>
        <div v-if="props.clickAway" class="clickAway absolute left-0 top-0 right-0 bottom-0 w-screen h-screen z-20" @click="(e) => emit('close')"></div>
    </div>
</template>
