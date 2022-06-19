<template>
    <div class="settings">
        <Sidebar class="sidebar">
            <SidebarLink :entry="entry" v-for="entry in SidebarStore.settings" :key="entry.label"></SidebarLink>
        </Sidebar>
        <router-view class="routerView overflow-y-auto pb-20"></router-view>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Sidebar from "../components/Sidebar.vue";
import SidebarLink from "../components/SidebarLink.vue";
import useSidebar from "../stores/sideBarStore";

const SidebarStore = useSidebar();
</script>
<style lang="sass" scoped>
.settings
    display: grid
    grid-template-columns: var(--sideBarWidth) 1fr
    grid-template-rows: 1fr
    grid-template-areas: "sidebar routerview"
    gap: 0

    .routerView
        grid-area: routerview

        &::-webkit-scrollbar-track
            @apply mb-20

    .sidebar
        grid-area: sidebar
</style>
