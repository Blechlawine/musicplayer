<script setup lang="ts">
import { onMounted, nextTick, computed, ref } from "vue";
import DropdownMenu from "../menus/DropdownMenu.vue";

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
});
const emit = defineEmits(["close"]);

const x = ref(0);
const y = ref(0);

onMounted(() => {
    nextTick(() => {
        window.addEventListener("mousemove", updatePos);
        window.addEventListener("keydown", (event) => {
            if (event.code === "Escape") {
                emit("close");
            }
        });
    });
});

const updatePos = (e: MouseEvent) => {
    if (!props.open) {
        x.value = e.clientX;
        y.value = e.clientY;
    }
};

const position = computed(() => ({
    left: x.value,
    top: y.value,
}));
</script>

<template>
    <Teleport to="#mainFrame">
        <DropdownMenu class="absolute" :open="props.open" :offset="position" @close="() => emit('close')">
            <slot></slot>
        </DropdownMenu>
    </Teleport>
</template>
