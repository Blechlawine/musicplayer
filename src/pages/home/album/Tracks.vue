<template>
    <div class="albumTracks">
        <TrackList :tracks="albumTracks" />
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

const albumTracks = computed(() => TrackStore.getTracksFromAlbum(props.id));
</script>
