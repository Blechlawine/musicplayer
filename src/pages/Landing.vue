<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import TrackList from "../components/lists/TrackList.vue";
import useTracks from "../stores/trackStore";

const TrackStore = useTracks();

onMounted(async () => {
    TrackStore.fetchAllTracks();
});
</script>

<template>
    <div class="landing">
        <TrackList :tracks="TrackStore.tracks"></TrackList>
    </div>
</template>
