<script setup lang="ts">
import LibraryPath from "./components/settings/Librarypath.vue";
import useLibary from "./stores/libraryStore";
import { onMounted, Ref, ref } from "vue";
import { Track } from "./types/database";

const LibraryStore = useLibary();

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
</script>

<template>
    <div>
        <h1>Hallo</h1>
        <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
        <input type="text" v-model="path" id="" />
        <input type="text" v-model="name" id="" />
        <button @click="addLibraryPath">Add</button><br />
        <button @click="scanLibrary">Scan Library</button>
        <div class="track" v-for="track in tracks" :key="track.id">
            <p>{{ track.title }}</p>
            <audio controls :src="track.path"></audio>
        </div>
    </div>
</template>
