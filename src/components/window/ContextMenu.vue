<script setup lang="ts">
import { onMounted, nextTick, computed, ref } from "vue";
import useContextMenu from "../../stores/contextMenuStore";
import DropdownMenu from "../menus/DropdownMenu.vue";
import MenuItem from "../menus/MenuItem.vue";

const contextMenu = useContextMenu();

const subMenuOpen = ref("");

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
        <div class="flex flex-row" v-for="item in contextMenu.content" :key="item.label">
            <MenuItem
                @click="
                    (e) => {
                        item.action();
                        if (!item.children) contextMenu.isOpen = false;
                        else subMenuOpen = item.label;
                    }
                "
                @mousein="
                    () => {
                        if (item.children) subMenuOpen = item.label;
                    }
                "
            >
                {{ item.label }}
            </MenuItem>
            <DropdownMenu v-if="item.children" :open="subMenuOpen == item.label" :clickAway="false">
                <MenuItem
                    v-for="child in item.children"
                    :key="child.label"
                    @click="
                        (e) => {
                            child.action();
                            contextMenu.isOpen = false;
                        }
                    "
                >
                    {{ child.label }}
                </MenuItem>
            </DropdownMenu>
        </div>
    </DropdownMenu>
</template>
