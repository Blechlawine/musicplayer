<script setup lang="ts">
import LibraryPath from "./components/settings/Librarypath.vue";
import useLibary from "./stores/libraryStore";
import usePlayer from "./stores/playerStore";
import { onMounted, Ref, ref, nextTick } from "vue";
import { Track } from "./types/database";
import WindowHeader from "./components/window/WindowHeader.vue";
import Musicplayer from "./components/Musicplayer.vue";
import TrackList from "./components/lists/TrackList.vue";

const LibraryStore = useLibary();
const PlayerStore = usePlayer();

const path = ref("");
const name = ref("");

let tracks: Ref<Track[]> = ref([]);

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
        <WindowHeader class="windowHeader"></WindowHeader>
        <div class="routerView overflow-y-auto">
            <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
            <input type="text" v-model="path" id="" />
            <input type="text" v-model="name" id="" />
            <button @click="addLibraryPath">Add</button><br />
            <button @click="scanLibrary">Scan Library</button>
            <!-- <div class="track px-4 py-2 hover:bg-divider cursor-pointer" v-for="track in tracks" :key="track.id" @click="() => playTrack(track)">
                <p>{{ track.title }} - {{ track.artists.map((a) => a.name).join(", ") }}</p>
            </div> -->
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
    display: grid
    grid-template-columns: 1fr
    grid-template-rows: 52px 1fr 80px
    grid-template-areas: "windowHeader" "routerview" "musicplayer"
    gap: 0
    --sideBarWidth: 300px

    .windowHeader
        grid-area: windowHeader

    .routerView
        grid-area: routerview
        height: calc(100vh - 52px - 80px)

    .musicplayer
        grid-area: musicplayer
</style>
