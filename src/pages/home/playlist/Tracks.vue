<template>
    <div class="playlist">
        <PlaylistTrackList :playlist="playlist!" :playlistTracks="playlistTracks" />
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

const playlist = computed(() => PlaylistStore.getPlaylist(props.id));
const playlistTracks = computed(() => playlist.value?.playlistTracks ?? []);
</script>
