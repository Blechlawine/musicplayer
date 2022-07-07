<template>
    <button
        class="flex flex-row items-center py-2 gap-2 justify-center transition-colors h-min w-max"
        :class="classes"
        @click="click"
    >
        <slot></slot>
        <span class="material-icons" v-if="props.icon">{{ props.icon }}</span>
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
    icon: {
        type: String as PropType<string | undefined>,
    },
    dense: {
        type: Boolean,
        default: false,
    },
});

const classes = computed(() => ({
    "px-4": !props.icon,
    "pl-4": props.icon && !props.dense,
    "pl-3": props.icon && props.dense,
    "pr-2": props.icon,
    "py-2": !props.dense,
    "py-1": props.dense,
    "rounded-full": props.rounded,
    "rounded-lg": !props.rounded,
    outlined: props.outlined,
    filled: !props.outlined,
    primary: props.color === "primary",
    plain: props.color === "plain",
    "text-sm": props.dense,
    "text-md": !props.dense,
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
