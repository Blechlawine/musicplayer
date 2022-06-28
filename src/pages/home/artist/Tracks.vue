<template>
    <div class="artistTracks">
        <TrackList :tracks="artistTracks" />
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import TrackList from "../../../components/lists/TrackList.vue";
import useTracks from "../../../stores/trackStore";

const TrackStore = useTracks();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const artistTracks = computed(() => TrackStore.getTracksFromArtist(props.id));
</script>
