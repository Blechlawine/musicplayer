<template>
    <div class="playlist">
        <PlaylistTrackList :playlistTracks="playlistTracks" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import usePlaylist from "../../../stores/playlistStore";
import PlaylistTrackList from "../../../components/lists/PlaylistTrackList.vue";

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
        return playlist.playlistTracks;
    else return [];
});
</script>
