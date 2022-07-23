<template>
    <div class="playlists">
        <PlaylistCardList :playlists="PlaylistStore.playlists"></PlaylistCardList>
    </div>
</template>

<script setup lang="ts">
import usePlaylist from "../../stores/playlistStore";
import PlaylistCardList from "../../components/lists/PlaylistCardList.vue";

const PlaylistStore = usePlaylist();
</script>
