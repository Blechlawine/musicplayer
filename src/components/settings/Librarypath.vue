<script setup lang="ts">
import { ref } from "vue";
import useLibary from "../../stores/libraryStore";
import IconButton from "../buttons/IconButton.vue";
import MenuItem from "../menus/MenuItem.vue";
import ContextMenu from "../window/ContextMenu.vue";
import EditModal from "../modals/EditModal.vue";
import TextInput from "../inputs/TextInput.vue";

const LibraryStore = useLibary();

const { LibraryPath } = defineProps<{
    LibraryPath: ILibraryPath;
}>();

const editModalOpen = ref(false);
const contextMenuOpen = ref(false);
const path = ref(LibraryPath.path);
const name = ref(LibraryPath.name);

const openRightClickMenu = () => {
    contextMenuOpen.value = true;
};

const deleteMe = () => {
    LibraryStore.deleteLibraryPath(LibraryPath);
};

const updateMe = () => {
    LibraryStore.updateLibraryPath(LibraryPath, { path: path.value, name: name.value });
};
</script>

<template>
    <ContextMenu :open="contextMenuOpen" @close="() => contextMenuOpen = false">
        <MenuItem
            @click="
                () => {
                    editModalOpen = true;
                }
            "
        >
            Edit
        </MenuItem>
        <MenuItem @click="() => deleteMe()"> Delete </MenuItem>
    </ContextMenu>
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
