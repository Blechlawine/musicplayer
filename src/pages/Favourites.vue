<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import useLibary from "../stores/libraryStore";
import TrackList from "../components/lists/TrackList.vue";
import { Track } from "../types/database";
import useTracks from "../stores/trackStore";

const LibraryStore = useLibary();
const TrackStore = useTracks();

onMounted(async () => {
    LibraryStore.getLibraryPaths();
    TrackStore.fetchFavourites();
});
</script>

<template>
    <div class="favourites">
        <TrackList :tracks="TrackStore.tracks"></TrackList>
    </div>
</template>
