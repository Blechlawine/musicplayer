<script setup lang="ts">
import LibraryPath from "./components/settings/Librarypath.vue";
import useLibary from "./stores/libraryStore";
import usePlayer from "./stores/playerStore";
import { onMounted, Ref, ref, nextTick, reactive } from "vue";
import { Track } from "./types/database";
import WindowHeader from "./components/window/WindowHeader.vue";
import Musicplayer from "./components/Musicplayer.vue";
import TrackList from "./components/lists/TrackList.vue";
import ContextMenu from "./components/window/ContextMenu.vue";
import useContextMenu from "./stores/contextMenuStore";
import Sidebar from "./components/Sidebar.vue";
import { SidebarSection } from "./types/ui";
import IconButton from "./components/buttons/IconButton.vue";

const LibraryStore = useLibary();
const PlayerStore = usePlayer();
const contextMenu = useContextMenu();

const path = ref("");
const name = ref("");

let tracks: Ref<Track[]> = ref([]);

const sidebarSections: SidebarSection[] = reactive([ // TODO: turn into store
    {
        title: "Recommended",
        open: true,
        entries: [{ label: "Home", icon: "home", link: "" }],
    },
]) as SidebarSection[];

onMounted(async () => {
    LibraryStore.getLibraryPaths();
    fetchTracks();
});

const addLibraryPath = () => {
    LibraryStore.addLibraryPath(path.value, name.value);
    name.value = "";
    path.value = "";
};

const scanLibrary = async () => {
    await window.api.scanLibrary();
    fetchTracks();
};

const fetchTracks = async () => {
    tracks.value = await window.api.getTracks();
};

const playTrack = async (track: Track) => {
    PlayerStore.queue = [track];
    PlayerStore.currentTrackIndex = 0;
    await nextTick();
    PlayerStore.play();
};
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
                    <div class="entry flex flex-row gap-4 p-3 rounded-md hover:bg-highlight" v-for="entry in section.entries" :key="entry.label">
                        <span class="material-icons">{{ entry.icon }}</span>
                        <div class="label">{{ entry.label }}</div>
                    </div>
                </div>
            </div>
        </Sidebar>
        <div class="routerView overflow-y-auto">
            <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
            <input type="text" v-model="path" id="" />
            <input type="text" v-model="name" id="" />
            <button @click="addLibraryPath">Add</button>
            <button @click="scanLibrary">Scan Library</button>
            <TrackList :tracks="tracks"></TrackList>
        </div>
        <Musicplayer class="musicplayer"></Musicplayer>
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
    grid-template-rows: 52px 1fr 80px
    grid-template-areas: "windowHeader windowHeader" "sidebar routerview" "musicplayer musicplayer"
    gap: 0

    .windowHeader
        grid-area: windowHeader

    .routerView
        grid-area: routerview
        height: calc(100vh - 52px - 80px)

    .musicplayer
        grid-area: musicplayer

    .sidebar
        grid-area: sidebar
</style>
