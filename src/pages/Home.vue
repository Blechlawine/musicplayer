<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import LibraryPath from "../components/settings/Librarypath.vue";
import useLibary from "../stores/libraryStore";
import TrackList from "../components/lists/TrackList.vue";
import { Track } from "../types/database";
import useTracks from "../stores/trackStore";

const LibraryStore = useLibary();
const TrackStore = useTracks();

const path = ref("");
const name = ref("");

const addLibraryPath = () => {
    LibraryStore.addLibraryPath(path.value, name.value);
    name.value = "";
    path.value = "";
};

const scanLibrary = async () => {
    await window.api.scanLibrary();
    TrackStore.fetchAllTracks();
};

onMounted(async () => {
    LibraryStore.getLibraryPaths();
    TrackStore.fetchAllTracks();
});
</script>

<template>
    <div class="home">
        <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
        <input type="text" v-model="path" id="" />
        <input type="text" v-model="name" id="" />
        <button @click="addLibraryPath">Add</button>
        <button @click="scanLibrary">Scan Library</button>
        <TrackList :tracks="TrackStore.tracks"></TrackList>
    </div>
</template>
