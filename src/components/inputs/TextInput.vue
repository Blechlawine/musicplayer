<template>
    <div class="flex flex-col items-start">
        <label class="">{{props.label}}</label>
        <input class="bg-overlay py-2 px-4 outline-none focus:border-accent border-2 border-divider rounded-lg w-full" type="text" @input="onInput" :value="props.modelValue" @focus="activate" @blur="deactivate" />
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
});

const active = ref(false);

const empty = computed(() => props.modelValue === "" && !active.value);

const onInput = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const activate = () => {
    active.value = true;
};

const deactivate = () => {
    active.value = false;
};
</script>
