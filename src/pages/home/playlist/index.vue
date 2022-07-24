<template>
    <div class="playlist" v-if="playlist">
        <Hero :title="playlist!.title">
            <IconButton @click="play">play_arrow</IconButton>
            <IconButton @click="playShuffled">shuffle</IconButton>
        </Hero>
        <router-view></router-view>
    </div>
    <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from "vue";
import Hero from "../../../components/Hero.vue";
import IconButton from "../../../components/buttons/IconButton.vue";
import usePlaylist from "../../../stores/playlistStore";
import usePlayer from "../../../stores/playerStore";
import useTracks from "../../../stores/trackStore";

const PlaylistStore = usePlaylist();
const PlayerStore = usePlayer();
const TrackStore = useTracks();

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

const play = () => {
    if (playlist) {
        PlayerStore.shuffle = false;
        PlayerStore.queue = playlist.value!.playlistTracks.map(plt => TrackStore.getTrackById(plt.track.id)!.id);
        nextTick(() => PlayerStore.play());
    }
};

const playShuffled = () => {
    if (playlist) {
        PlayerStore.shuffle = true;
        PlayerStore.queue = playlist.value!.playlistTracks.map(plt => TrackStore.getTrackById(plt.track.id)!.id);
        nextTick(() => PlayerStore.play());
    }
};
</script>
