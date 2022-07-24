<template>
    <div class="absolute flex items-center justify-center w-full h-screen top-0 left-0 bg-darker backdrop-blur-md" v-if="open">
        <div class="modal flex flex-col gap-2 p-3 bg-overlay border-divider border-2 rounded-lg">
            <p>{{ props.title }}</p>
            <slot></slot>
            <div class="actions flex flex-row gap-2 justify-end">
                <Button color="plain" @click="cancel">Cancel</Button>
                <Button color="primary" @click="save">Save</Button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from "../buttons/Button.vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    open: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["save", "cancel", "close"]);

const save = () => {
    emit("save");
    emit("close");
};

const cancel = () => {
    emit("cancel");
    emit("close");
};
</script>
