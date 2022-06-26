<template>
    <div class="landing">
        <TrackList :tracks="TrackStore.tracks"></TrackList>
    </div>
</template>
<script setup lang="ts">
import TrackList from "../../components/lists/TrackList.vue";
import useTracks from "../../stores/trackStore";

const TrackStore = useTracks();
</script>
