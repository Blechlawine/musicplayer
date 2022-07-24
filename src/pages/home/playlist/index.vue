<template>
    <div class="playlist" v-if="playlist">
        <Hero :title="playlist!.title">
            <IconButton @click="openEditModal">edit</IconButton>
            <IconButton @click="play">play_arrow</IconButton>
            <IconButton @click="playShuffled">shuffle</IconButton>
        </Hero>
        <router-view></router-view>
    </div>
    <div v-else>Loading...</div>
    <EditModal :open="editModalOpen" title="Edit playlist" @save="savePlaylist" @close="() => (editModalOpen = false)">
        <TextInput label="Title" v-model="playlistTitle"></TextInput>
    </EditModal>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick, ref } from "vue";
import Hero from "../../../components/Hero.vue";
import IconButton from "../../../components/buttons/IconButton.vue";
import EditModal from "../../../components/modals/EditModal.vue";
import TextInput from "../../../components/inputs/TextInput.vue";
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

const editModalOpen = ref(false);
const playlistTitle = ref(playlist.value?.title ?? "");

onMounted(() => {
    PlaylistStore.fetchAllPlaylists();
});

const play = () => {
    if (playlist) {
        PlayerStore.shuffle = false;
        PlayerStore.queue = playlist.value!.playlistTracks.map((plt) => TrackStore.getTrackById(plt.track.id)!.id);
        nextTick(() => PlayerStore.play());
    }
};

const playShuffled = () => {
    if (playlist) {
        PlayerStore.shuffle = true;
        PlayerStore.queue = playlist.value!.playlistTracks.map((plt) => TrackStore.getTrackById(plt.track.id)!.id);
        nextTick(() => PlayerStore.play());
    }
};

const openEditModal = () => {
    if (playlist) editModalOpen.value = true;
};

const savePlaylist = () => {
    PlaylistStore.updatePlaylist(playlist.value!.id, { title: playlistTitle.value });
};
</script>
