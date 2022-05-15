<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    design: {
        type: String,
        default: "trafficlight",
        validator: (value: string) => ["icons", "trafficlight"].includes(value),
    },
});

const minimize = () => {
    window.api.minimizeWindow();
};

const maximize = () => {
    window.api.maximizeWindow();
};

const close = () => {
    window.api.closeWindow();
};

const buttonClasses = computed(() => ({
    "w-4": true,
    "h-4": true,
    flex: true,
    "rounded-full": true,
    "p-0.5": true,
}));

const minimizeClasses = computed(() => ({
    "bg-amber-500": props.design === "trafficlight",
    ...buttonClasses.value,
}));
const maximizeClasses = computed(() => ({
    "bg-green-500": props.design === "trafficlight",
    ...buttonClasses.value,
}));
const closeClasses = computed(() => ({
    "bg-red-500": props.design === "trafficlight",
    ...buttonClasses.value,
}));
</script>

<template>
    <div class="flex flex-row gap-2 region-no-drag text-bg">
        <button @click="minimize" :class="minimizeClasses">
            <span class="material-icons text-[12px] opacity-0 hover:opacity-75">minimize</span>
        </button>
        <button @click="maximize" :class="maximizeClasses">
            <span class="material-icons text-[12px] opacity-0 hover:opacity-75">maximize</span>
        </button>
        <button @click="close" :class="closeClasses">
            <span class="material-icons text-[12px] opacity-0 hover:opacity-75">close</span>
        </button>
    </div>
</template>
