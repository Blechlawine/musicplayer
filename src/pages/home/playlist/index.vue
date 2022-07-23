<template>
    <div class="playlist" v-if="playlist">
        <Hero :title="playlist!.title"></Hero>
        <router-view></router-view>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Hero from "../../../components/Hero.vue";
import usePlaylist from "../../../stores/playlistStore";

const PlaylistStore = usePlaylist();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const playlist = computed(() => PlaylistStore.getPlaylist(props.id));

onMounted(() => {
    PlaylistStore.fetchAllPlaylists();
});
</script>
