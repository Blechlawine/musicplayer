<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import useContextMenu from "../../stores/contextMenuStore";
import useLibary from "../../stores/libraryStore";
import IconButton from "../buttons/IconButton.vue";
import EditModal from "../modals/EditModal.vue";
import TextInput from "../inputs/TextInput.vue";

const ContextMenu = useContextMenu();
const LibraryStore = useLibary();

const { LibraryPath } = defineProps<{
    LibraryPath: ILibraryPath;
}>();

const contextMenuContent = ref([]) as Ref<IContextMenuEntry[]>;
const editModalOpen = ref(false);
const path = ref(LibraryPath.path);
const name = ref(LibraryPath.name);

onMounted(() => {
    contextMenuContent.value = [
        {
            label: "Edit",
            action: () => {
                editModalOpen.value = true;
            },
        },
        {
            label: "Delete",
            action: () => {
                deleteMe();
            },
        },
    ];
});

const openRightClickMenu = () => {
    ContextMenu.open(contextMenuContent.value);
};

const deleteMe = () => {
    LibraryStore.deleteLibraryPath(LibraryPath);
};

const updateMe = () => {
    LibraryStore.updateLibraryPath(LibraryPath, { path: path.value, name: name.value });
};
</script>

<template>
    <div
        class="libraryPath flex flex-row gap-2 px-3 py-2 rounded cursor-default hover:bg-highlight"
        @contextmenu="openRightClickMenu"
    >
        <p>{{ LibraryPath?.name }}:</p>
        <p>{{ LibraryPath?.path }}</p>
        <IconButton @click="openRightClickMenu"> more_vert </IconButton>
        <EditModal
            :open="editModalOpen"
            @close="() => (editModalOpen = false)"
            @save="updateMe"
            title="Edit LibraryPath"
        >
            <TextInput class="w-96" v-model="name" label="Name"></TextInput>
            <TextInput class="w-96" v-model="path" label="Path"></TextInput>
        </EditModal>
    </div>
</template>
