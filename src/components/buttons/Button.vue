<template>
    <button class="flex flex-row items-center justify-center py-2 px-4 transition-colors h-min w-max" :class="classes" @click="click">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">
import { computed, PropType } from "vue";

const emit = defineEmits(["click"]);

const props = defineProps({
    color: {
        type: String as PropType<"primary" | "plain">,
        default: "primary",
        validator: (value: string) => ["primary", "plain"].includes(value),
    },
    outlined: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
});

const classes = computed(() => ({
    "rounded-full": props.rounded,
    "rounded-lg": !props.rounded,
    outlined: props.outlined,
    filled: !props.outlined,
    primary: props.color === "primary",
    plain: props.color === "plain",
}));

const click = (e: any) => {
    emit("click", e);
};
</script>

<style scoped lang="sass">
.outlined
    @apply text-black border-2

.filled
    @apply text-white border-2 border-transparent

.primary.outlined
    @apply border-accent hover:text-accent

.primary.filled
    @apply bg-accent hover:bg-accent-dark

.plain.outlined
    @apply hover:text-accent border-divider hover:bg-highlight

.plain.filled
    @apply hover:bg-highlight
</style>
