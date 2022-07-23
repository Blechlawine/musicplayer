<template>
    <div class="home w-full h-full relative">
        <Sidebar class="sidebar" :highlightPosition="highlightPosition" :highlightExpanded="highlightExpanded">
            <div
                ref="sections"
                class="sidebarSection flex flex-col gap-3"
                v-for="section in SidebarStore.main"
                :key="section.title"
                :data-active="section.entries.some((e) => e.link === router.currentRoute.value.path)"
                :data-open="section.open"
            >
                <div class="sidebarSectionHeader w-full flex flex-row justify-between pl-3 h-6">
                    <div class="title">{{ section.title }}</div>
                    <IconButton
                        class="toggle"
                        @click="
                            (e) => {
                                toggleSection(e.target, section);
                            }
                        "
                    >
                        {{ section.open ? "expand_less" : "expand_more" }}
                    </IconButton>
                </div>
                <div v-show="section.open" class="entries">
                    <SidebarLink
                        ref="entries"
                        v-for="entry in section.entries"
                        :entry="entry"
                        :key="entry.label"
                        :data-active="entry.link === router.currentRoute.value.path"
                        @activeChanged="moveHighlight"
                    ></SidebarLink>
                </div>
            </div>
        </Sidebar>
        <router-view class="routerView overflow-y-auto pb-20"></router-view>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, Ref, nextTick } from "vue";
import Sidebar from "../components/Sidebar.vue";
import SidebarLink from "../components/SidebarLink.vue";
import useSidebar from "../stores/sideBarStore";
import useTracks from "../stores/trackStore";
import IconButton from "../components/buttons/IconButton.vue";
import { useRouter } from "vue-router";
import useAlbums from "../stores/albumStore";
import usePlaylist from "../stores/playlistStore";

const SidebarStore = useSidebar();
const TrackStore = useTracks();
const AlbumStore = useAlbums();
const PlaylistStore = usePlaylist();
const router = useRouter();

const highlightPosition = ref(0);
const highlightExpanded = ref(true);
const entries = ref([]) as Ref<any>;
const sections = ref([]) as Ref<any>;
const activeEntry = ref({}) as Ref<any>;
const activeSection = ref({}) as Ref<any>;

onMounted(() => {
    TrackStore.fetchAllTracks();
    AlbumStore.fetchAllAlbums();
    PlaylistStore.fetchAllPlaylists();
});

const toggleSection = (element: any, section: ISidebarSection) => {
    section.open = !section.open;
    nextTick(() => {
        activeEntry.value = entries.value.find((entry: any) => entry.$el.dataset.active == "true");
        activeSection.value = sections.value.find((section: any) => section.dataset.active == "true");
        moveHighlight(
            true,
            activeSection.value.dataset.open === "true"
                ? activeEntry.value.$el.offsetTop
                : activeSection.value.offsetTop
        );
        if (activeSection.value.dataset.open === "true") {
            highlightExpanded.value = true;
        } else {
            highlightExpanded.value = false;
        }
    });
};

const moveHighlight = (active: boolean, yPos: number) => {
    if (active) {
        highlightPosition.value = yPos;
        highlightExpanded.value = true;
    }
};
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

        &::-webkit-scrollbar-track
            @apply mb-20

    .sidebar
        grid-area: sidebar
</style>
