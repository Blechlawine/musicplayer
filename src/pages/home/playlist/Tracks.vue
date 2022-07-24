<template>
    <div class="playlist">
        <TrackList :tracks="playlistTracks" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TrackList from "../../../components/lists/TrackList.vue";
import usePlaylist from "../../../stores/playlistStore";
import useTracks from "../../../stores/trackStore";

const TrackStore = useTracks();
const PlaylistStore = usePlaylist();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const playlistTracks = computed(() => {
    const playlist = PlaylistStore.getPlaylist(props.id);
    if (playlist)
        return playlist.playlistTracks.map((plt) => {
            return TrackStore.getTrackById(plt.track.id);
        });
    else return [];
});
</script>
