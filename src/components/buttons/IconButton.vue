<script setup lang="ts">
import { computed, PropType } from "vue";

const emit = defineEmits(["click"]);

const props = defineProps({
    size: {
        type: String as PropType<"small" | "medium" | "large">,
        default: "small",
        validator: (value: string) => ["small", "medium", "large"].includes(value),
    },
    highlight: {
        type: Boolean,
        default: false,
    },
});

const buttonStyles = computed(() => {
    switch (props.size) {
        case "medium":
            return {
                width: "36px",
                height: "36px",
            };
        case "large":
            return {
                width: "48px",
                height: "48px",
            };
        default:
            return {
                width: "24px",
                height: "24px",
            };
    }
});

const iconStyles = computed(() => ({
    ...buttonStyles.value,
    "font-size": props.size === "small" ? "24px" : props.size === "medium" ? "36px" : "48px",
}));

const computedClasses = computed(() => ({
    "bg-white": props.highlight,
    "text-bg": props.highlight,
    "fill-bg": props.highlight,
}));
</script>

<template>
    <div
        class="iconButton region-no-drag rounded cursor-pointer hover:bg-highlight"
        :style="buttonStyles"
        @click.prevent="(e) => emit('click', e)"
    >
        <span class="material-icons rounded-sm" :class="computedClasses" :style="iconStyles">
            <slot></slot>
        </span>
    </div>
</template>
