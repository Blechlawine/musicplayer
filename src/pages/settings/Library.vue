<template>
    <div class="settingsLibrary">
        <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
        <input type="text" v-model="path" id="" />
        <input type="text" v-model="name" id="" />
        <button @click="addLibraryPath">Add</button>
        <button @click="scanLibrary">Scan Library</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LibraryPath from "../../components/settings/Librarypath.vue";
import useLibary from "../../stores/libraryStore";

const LibraryStore = useLibary();

const path = ref("");
const name = ref("");

onMounted(() => {
    LibraryStore.getLibraryPaths();
})

const addLibraryPath = () => {
    LibraryStore.addLibraryPath(path.value, name.value);
    name.value = "";
    path.value = "";
};

const scanLibrary = async () => {
    await window.api.scanLibrary();
};
</script>