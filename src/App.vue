<script setup lang="ts">
import LibraryPath from "./components/settings/Librarypath.vue";
import useLibary from "./stores/libraryStore";
import { onMounted, Ref, ref } from "vue";

const LibraryStore = useLibary();

const path = ref('');
const name = ref('');

onMounted(() => {
    LibraryStore.getLibraryPaths();
});

const addLibraryPath = () => {
    LibraryStore.addLibraryPath(path.value, name.value);
    name.value = '';
    path.value = '';
};

let tracks: Ref<string[]> = ref([]);

const scanLibrary = async () => {
    tracks.value = await window.api.scanLibrary();
};
</script>

<template>
    <div>
        <h1>Hallo</h1>
        <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
        <input type="text" v-model="path" id="">
        <input type="text" v-model="name" id="">
        <button @click="addLibraryPath">Add</button><br>
        <button @click="scanLibrary">Scan Library</button>
        <audio controls v-for="track in tracks" :src="track" :key="track"></audio>
    </div>
</template>
