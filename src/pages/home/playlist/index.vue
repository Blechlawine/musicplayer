<template>
    <div class="playlist" v-if="playlist">
        <Hero :title="playlist!.title">
            <div class="flex flex-col">
                <IconButton @click="openMoreMenu">more_vert</IconButton>
                <DropdownMenu :open="moreMenuOpen">
                    <MenuItem @click="openEditModal">Edit</MenuItem>
                    <MenuItem @click="deleteMe">Delete</MenuItem>
                </DropdownMenu>
            </div>
            <div class="dividerVert"></div>
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
import DropdownMenu from "../../../components/menus/DropdownMenu.vue";
import MenuItem from "../../../components/menus/MenuItem.vue";
import TextInput from "../../../components/inputs/TextInput.vue";
import usePlaylist from "../../../stores/playlistStore";
import usePlayer from "../../../stores/playerStore";
import useTracks from "../../../stores/trackStore";
import { useRouter } from "vue-router";

const PlaylistStore = usePlaylist();
const PlayerStore = usePlayer();
const TrackStore = useTracks();
const Router = useRouter();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const playlist = computed(() => PlaylistStore.getPlaylist(props.id));
const moreMenuOpen = ref(false);
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

const openMoreMenu = () => {
    moreMenuOpen.value = true;
};

const openEditModal = () => {
    if (playlist) editModalOpen.value = true;
};

const deleteMe = () => {
    PlaylistStore.deletePlaylist(playlist.value!.id);
    Router.push("/playlists");
};

const savePlaylist = () => {
    PlaylistStore.updatePlaylist(playlist.value!.id, { title: playlistTitle.value });
};
</script>
