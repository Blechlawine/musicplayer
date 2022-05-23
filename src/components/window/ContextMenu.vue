<script setup lang="ts">
import { onMounted, nextTick, computed } from "vue";
import useContextMenu from "../../stores/contextMenuStore";
import DropdownMenu from "../menus/DropdownMenu.vue";
import MenuItem from "../menus/MenuItem.vue";

const contextMenu = useContextMenu();

onMounted(() => {
    nextTick(() => window.addEventListener("mousemove", updatePos));
});

const updatePos = (e: MouseEvent) => {
    if (!contextMenu.isOpen) {
        contextMenu.pos.x = e.clientX;
        contextMenu.pos.y = e.clientY;
    }
};

const position = computed(() => ({
    left: contextMenu.pos.x,
    top: contextMenu.pos.y,
}));
</script>

<template>
    <DropdownMenu :open="contextMenu.isOpen" :offset="position" @close="() => (contextMenu.isOpen = false)">
        <MenuItem
            v-for="item in contextMenu.content"
            :key="item.label"
            @click="
                (e) => {
                    item.action();
                    contextMenu.isOpen = false;
                }
            "
        >
            {{ item.label }}
        </MenuItem>
    </DropdownMenu>
</template>
