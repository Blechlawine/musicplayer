<template>
    <div class="home w-full h-full relative">
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
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Sidebar from "../components/Sidebar.vue";
import SidebarLink from "../components/SidebarLink.vue";
import { SidebarSection as SidebarSectionType } from "../types/ui";
import IconButton from "../components/buttons/IconButton.vue";

const sidebarSections: SidebarSectionType[] = reactive([
    // TODO: turn into store
    {
        title: "Recommended",
        open: true,
        entries: [
            { label: "Home", icon: "home", link: "landing" },
            {
                label: "Favourites",
                icon: "favorite",
                link: "favourites",
            },
        ],
    },
]) as SidebarSectionType[];
</script>
<style lang="sass" scoped>
.home
    display: grid
    grid-template-columns: var(--sideBarWidth) 1fr
    grid-template-rows: 1fr
    grid-template-areas: "sidebar routerview"
    gap: 0

    .routerView
        grid-area: routerview
        height: calc(100vh - 52px)

        &::-webkit-scrollbar-track
            @apply mb-20

    .sidebar
        grid-area: sidebar
    
</style>