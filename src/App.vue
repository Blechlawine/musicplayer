<script setup lang="ts">
import { reactive } from "vue";
import WindowHeader from "./components/window/WindowHeader.vue";
import Musicplayer from "./components/Musicplayer.vue";
import ContextMenu from "./components/window/ContextMenu.vue";
import useContextMenu from "./stores/contextMenuStore";
import Sidebar from "./components/Sidebar.vue";
import SidebarLink from "./components/SidebarLink.vue";
import { SidebarSection as SidebarSectionType } from "./types/ui";
import IconButton from "./components/buttons/IconButton.vue";

const contextMenu = useContextMenu();

const sidebarSections: SidebarSectionType[] = reactive([
    // TODO: turn into store
    {
        title: "Recommended",
        open: true,
        entries: [
            { label: "Home", icon: "home", link: "/" },
            {
                label: "Favourites",
                icon: "favorite",
                link: "/favourites",
            },
        ],
    },
]) as SidebarSectionType[];
</script>

<template>
    <div class="app text-white bg-bg h-full relative">
        <ContextMenu class="absolute" @close="(e) => (contextMenu.isOpen = false)"></ContextMenu>
        <WindowHeader class="windowHeader"></WindowHeader>
        <Sidebar class="sidebar">
            <div class="sidebarSection flex flex-col gap-3" v-for="section in sidebarSections" :key="section.title">
                <div class="sidebarSectionHeader w-full flex flex-row justify-between pl-3 h-6">
                    <div class="title">{{ section.title }}</div>
                    <IconButton class="toggle" @click="(e) => (section.open = !section.open)">
                        {{ section.open ? "expand_less" : "expand_more" }}
                    </IconButton>
                </div>
                <div v-if="section.open" class="entries">
                    <SidebarLink :entry="entry" v-for="entry in section.entries" :key="entry.label"></SidebarLink>
                </div>
            </div>
        </Sidebar>
        <router-view class="routerView overflow-y-auto pb-20"></router-view>
        <Musicplayer></Musicplayer>
    </div>
</template>

<style lang="sass">
@import "./styles/font.sass"

.material-icons
    @include iconFont()

.app
    --sideBarWidth: 300px
    display: grid
    grid-template-columns: var(--sideBarWidth) 1fr
    grid-template-rows: 52px 1fr
    grid-template-areas: "windowHeader windowHeader" "sidebar routerview"
    gap: 0

    .windowHeader
        grid-area: windowHeader

    .routerView
        grid-area: routerview
        height: calc(100vh - 52px)

        &::-webkit-scrollbar-track
            @apply mb-20

    .sidebar
        grid-area: sidebar
</style>
