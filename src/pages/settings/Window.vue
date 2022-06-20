<template>
    <div class="settingsWindow flex flex-col gap-4 py-2 px-4">
        <section>
            <h2>Window-bar</h2>
            <div class="flex flex-row gap-3">
                <div>
                    <label>Button location</label>
                    <Button @click="ddBarButtonLocation.toggle" :icon="ddBarButtonLocation.icon.value">
                        {{ SettingsStore.window.windowBar.buttonLocation }}
                    </Button>
                    <DropdownMenu :open="ddBarButtonLocation.isOpen.value" @close="ddBarButtonLocation.close">
                        <MenuItem
                            v-for="location in SettingsStore.window.windowBar.buttonLocations"
                            :key="location"
                            @click="() => setBarButtonLocation(location)"
                        >
                            {{ location }}
                        </MenuItem>
                    </DropdownMenu>
                </div>
                <div>
                    <label>Button style</label>
                    <Button @click="ddBarButtonStyle.toggle" :icon="ddBarButtonStyle.icon.value">
                        {{ SettingsStore.window.windowBar.buttonStyle }}
                    </Button>
                    <DropdownMenu :open="ddBarButtonStyle.isOpen.value" @close="ddBarButtonStyle.close">
                        <MenuItem
                            v-for="style in SettingsStore.window.windowBar.buttonStyles"
                            :key="style"
                            @click="() => setBarButtonStyle(style)"
                        >
                            {{ style }}
                        </MenuItem>
                    </DropdownMenu>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import Button from "../../components/buttons/Button.vue";
import DropdownMenu from "../../components/menus/DropdownMenu.vue";
import useSettings from "../../stores/settingsStore";
import useDropdown from "../../composables/useDropdown";
import MenuItem from "../../components/menus/MenuItem.vue";

const SettingsStore = useSettings();
const ddBarButtonLocation = useDropdown();
const ddBarButtonStyle = useDropdown();

const setBarButtonStyle = (style: "trafficLights" | "icons") => {
    SettingsStore.window.windowBar.buttonStyle = style;
    ddBarButtonStyle.close();
};

const setBarButtonLocation = (location: "left" | "right") => {
    SettingsStore.window.windowBar.buttonLocation = location;
    ddBarButtonLocation.close();
};
</script>
<style scoped lang="sass">
section
    @apply flex flex-col gap-2

h2
    @apply headline
</style>
