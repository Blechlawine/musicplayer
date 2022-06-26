<script setup lang="ts">
import TrackList from "../../components/lists/TrackList.vue";
import useTracks from "../../stores/trackStore";

const TrackStore = useTracks();
</script>

<template>
    <div class="favourites">
        <TrackList :tracks="TrackStore.favourites"></TrackList>
    </div>
</template>
