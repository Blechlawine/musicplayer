<script setup lang="ts">
import { computed } from "vue";
import useSettings from "../../stores/settingsStore";

const SettingsStore = useSettings();
const design = computed(() => SettingsStore.window.windowBar.buttonStyle);
const location = computed(() => SettingsStore.window.windowBar.buttonLocation);

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
    "w-4": design.value === "trafficLights",
    "h-4": design.value === "trafficLights",
    "w-6": design.value === "icons",
    "h-6": design.value === "icons",
    flex: true,
    "items-center": true,
    "justify-center": true,
    "rounded-full": true,
    "p-0.5": true,
    "hover:bg-highlight": design.value === "icons",
}));

const iconClasses = computed(() => ({
    "opacity-0": design.value === "trafficLights",
    "hover:opacity-75": design.value === "trafficLights",
    "opacity-75": design.value === "icons",
    "text-white": design.value === "icons",
}));

const minimizeClasses = computed(() => ({
    "bg-amber-500": design.value === "trafficLights",
    "order-1": location.value === "right",
    "order-2": location.value === "left",
    ...buttonClasses.value,
}));
const maximizeClasses = computed(() => ({
    "bg-green-500": design.value === "trafficLights",
    "order-2": location.value === "right",
    "order-3": location.value === "left",
    ...buttonClasses.value,
}));
const closeClasses = computed(() => ({
    "bg-red-500": design.value === "trafficLights",
    "hover:bg-red-500": design.value === "icons",
    "order-3": location.value === "right",
    "order-1": location.value === "left",
    ...buttonClasses.value,
}));
</script>

<template>
    <div class="flex flex-row gap-2 region-no-drag text-bg">
        <button @click="minimize" :class="minimizeClasses">
            <span class="material-icons text-[12px]" :class="iconClasses">minimize</span>
        </button>
        <button @click="maximize" :class="maximizeClasses">
            <span class="material-icons text-[12px]" :class="iconClasses">maximize</span>
        </button>
        <button @click="close" :class="closeClasses">
            <span class="material-icons text-[12px]" :class="iconClasses">close</span>
        </button>
    </div>
</template>
