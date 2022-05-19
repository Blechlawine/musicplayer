<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick, Ref } from "vue";

const props = defineProps({
    value: {
        type: Number,
        default: 0,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 0,
    },
    handleSize: {
        type: String,
        default: "large",
        validator: (value: string) => ["small", "large"].includes(value),
    },
    alwaysShowHandle: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(["update:value", "onChangeEnd"]);

const mouseDownX = ref(0);
const distanceMouseMoved = ref(0);
const minX = ref(0);
const maxX = ref(0);
const sliderRef: Ref<HTMLDivElement | null> = ref(null);

const handleStyles = computed(() => ({
    "margin-left": `${handlePosition.value}px`,
    width: props.handleSize === "small" ? "18px" : "1.5rem", // 1.5rem == 24px
    height: props.handleSize === "small" ? "18px" : "1.5rem", // 1.5rem == 24px
    top: props.handleSize === "small" ? "-5px" : "-8px",
    left: props.handleSize === "small" ? "-9px" : "-12px",
}));
const handleClasses = computed(() => ({
    "opacity-0": !props.alwaysShowHandle,
    handle: true,
    absolute: true,
    "rounded-full": true,
    "border-4": true,
    "border-white": true,
    "hover:border-accent": true,
    "bg-bg": true,
    "transition-opacity": true,
}));
const sliderClasses = computed(() => ({
    slider: true,
    "h-2": true,
    "m-3": true,
    relative: true,
    "rounded-full": true,
    "bg-divider": !props.alwaysShowHandle,
    "bg-white": props.alwaysShowHandle,
    "hover:bg-white": !props.alwaysShowHandle,
    "transition-colors": true,
}));
const sliderFillStyles = computed(() => ({
    width: `${handlePosition.value || 0}px`,
}));
const handlePosition = computed(() => scale(props.value, props.min, props.max, minX.value, maxX.value));

onMounted(() => {
    window.addEventListener("resize", resize);
    nextTick(resize);
});
onUnmounted(() => {
    window.removeEventListener("resize", resize);
});

const handleMouseDown = (event: any) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    mouseDownX.value = event.clientX;
    const relativeX = mouseDownX.value - sliderRef.value!.getBoundingClientRect().left;
    setHandlePosition(Math.max(Math.min(relativeX, maxX.value), minX.value));
};
const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    emit("onChangeEnd", props.value);
};
const handleMouseMove = (event: any) => {
    distanceMouseMoved.value = event.clientX - mouseDownX.value;
    const relativeX = mouseDownX.value + distanceMouseMoved.value - sliderRef.value!.getBoundingClientRect().left;
    setHandlePosition(Math.max(Math.min(relativeX, maxX.value), minX.value));
};
const setHandlePosition = (x: number) => {
    const calculated = scale(x, minX.value, maxX.value, props.min, props.max);
    emit("update:value", calculated);
};
const resize = () => {
    maxX.value = sliderRef.value!.clientWidth - 4;
};
const scale = (valueIn: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return ((valueIn - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};
</script>
<template>
    <div :class="sliderClasses" ref="sliderRef" @mousedown="handleMouseDown">
        <div class="sliderfill bg-accent rounded-full h-full" :style="sliderFillStyles"></div>
        <div class="sliderfill bg-accent rounded-full h-full absolute blur-lg top-0" :style="sliderFillStyles"></div>
        <div :class="handleClasses" :style="handleStyles"></div>
    </div>
</template>

<style lang="sass">
.slider
    width: calc(100% - 24px)

    &:hover > .handle
        opacity: 1
</style>
