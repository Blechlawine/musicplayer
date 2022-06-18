<template>
    <div class="settingsLibrary flex flex-col gap-4 py-2 px-4">
        <section>
            <h2>Add Librarypath</h2>
            <div class="flex flex-row gap-2 items-end pb-2">
                <TextInput label="Path" v-model="path" />
                <TextInput label="Name" v-model="name" />
                <Button @click="addLibraryPath">Add</Button>
            </div>
        </section>
        <section>
            <div class="flex flex-row items-end justify-between">
                <h2>Librarypaths</h2>
                <Button color="plain" @click="scanLibrary">Scan Library</Button>
            </div>
            <LibraryPath v-for="path in LibraryStore.libraryPaths" :LibraryPath="path" :key="path.id"></LibraryPath>
        </section>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import LibraryPath from "../../components/settings/Librarypath.vue";
import useLibary from "../../stores/libraryStore";
import TextInput from "../../components/inputs/TextInput.vue";
import Button from "../../components/buttons/Button.vue";

const LibraryStore = useLibary();

const path = ref("");
const name = ref("");

onMounted(() => {
    LibraryStore.getLibraryPaths();
});

const addLibraryPath = () => {
    LibraryStore.addLibraryPath(path.value, name.value);
    name.value = "";
    path.value = "";
};

const scanLibrary = async () => {
    await window.api.scanLibrary();
};
</script>
<style scoped lang="sass">
section
    @apply flex flex-col gap-2
    
h2
    @apply headline
</style>