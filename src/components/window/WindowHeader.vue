<template>
    <div
        class="region-drag flex flex-row justify-between p-2 px-4 w-full items-center border-b-2 border-b-divider z-50 bg-bg"
    >
        <div class="flex flex-row gap-4 items-center">
            <WindowButtons v-if="SettingsStore.window.windowBar.buttonLocation === 'left'"></WindowButtons>
            <p>Musicplayer</p>
            <div>
                <IconButton @click="toggleAppMenu">expand_more</IconButton>
                <DropdownMenu :open="appMenuOpen" @close="closeAppMenu">
                    <div class="flex flex-row">
                        <MenuItem @mousein="() => (openSubMenu = 'edit')">Edit</MenuItem>
                        <DropdownMenu
                            :open="openSubMenu === 'edit'"
                            :clickAway="false"
                            @close="() => (openSubMenu = '')"
                        >
                            <MenuItem @click="openSettings">Settings</MenuItem>
                        </DropdownMenu>
                    </div>
                    <div class="flex flex-row">
                        <MenuItem @mousein="() => (openSubMenu = 'library')">Library</MenuItem>
                        <DropdownMenu
                            :open="openSubMenu === 'library'"
                            :clickAway="false"
                            @close="() => (openSubMenu = '')"
                        >
                            <MenuItem @click="rescanLibrary">Rescan Library</MenuItem>
                        </DropdownMenu>
                    </div>
                </DropdownMenu>
            </div>
        </div>
        <WindowButtons v-if="SettingsStore.window.windowBar.buttonLocation === 'right'"></WindowButtons>
    </div>
</template>
<script setup lang="ts">
import WindowButtons from "./WindowButtons.vue";
import IconButton from "../buttons/IconButton.vue";
import DropdownMenu from "../menus/DropdownMenu.vue";
import MenuItem from "../menus/MenuItem.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useSettings from "../../stores/settingsStore";

const appMenuOpen = ref(false);
const openSubMenu = ref("");

const router = useRouter();
const SettingsStore = useSettings();

const toggleAppMenu = () => {
    appMenuOpen.value = !appMenuOpen.value;
};

const closeAppMenu = () => {
    appMenuOpen.value = false;
    openSubMenu.value = "";
};

const openSettings = () => {
    router.push("/settings");
    closeAppMenu();
};

const rescanLibrary = () => {
    closeAppMenu();
};
</script>
