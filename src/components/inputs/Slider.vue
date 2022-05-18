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
});

const emit = defineEmits(["update:value", "onChangeEnd"]);

const mouseDownX = ref(0);
const distanceMouseMoved = ref(0);
const minX = ref(0);
const maxX = ref(0);
const sliderRef: Ref<HTMLDivElement | null> = ref(null);

const handleStyles = computed(() => ({
    "margin-left": `${handlePosition.value}px`,
}));
const sliderFillStyles = computed(() => ({
    width: `${handlePosition.value}px`,
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
    <div class="slider h-2 m-3 relative rounded-full bg-overlay" ref="sliderRef" @mousedown="handleMouseDown">
        <div class="sliderfill bg-accent rounded-full h-full" :style="sliderFillStyles"></div>
        <div class="sliderfill bg-accent rounded-full h-full absolute blur-lg top-0" :style="sliderFillStyles"></div>
        <div class="handle absolute rounded-full border-4 border-white bg-bg w-6 h-6" :style="handleStyles"></div>
    </div>
</template>

<style lang="sass">
.slider
    width: calc(100% - 24px)

    .handle
        top: -8px
        left: -10px
</style>
