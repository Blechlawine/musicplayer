<script setup lang="ts">
import { reactive, onMounted, PropType, ref, nextTick, Ref, computed } from "vue";
import List from "./List.vue";
import TrackListItem from "./items/TrackListItem.vue";
import MenuItem from "../menus/MenuItem.vue";
import ContextMenu from "../window/ContextMenu.vue";
import DropdownMenu from "../menus/DropdownMenu.vue";
import EditModal from "../modals/EditModal.vue";
import TextInput from "../inputs/TextInput.vue";
import usePlayer from "../../stores/playerStore";
import useTracks from "../../stores/trackStore";
import usePlaylist from "../../stores/playlistStore";
import useSelection from "../../composables/useSelection";
import useListColumns from "../../composables/useListColumns";

const playerStore = usePlayer();
const TrackStore = useTracks();
const PlaylistStore = usePlaylist();
const isAddToPlaylistMenuOpen = ref(false);
const contextMenuOpen = ref(false);
const contextSubMenuOpen = ref("");
const isNewPlaylistModalOpen = ref(false);
const newPlaylistTitle = ref("");

const props = defineProps({
    tracks: {
        type: Array as PropType<ITrack[]>,
        required: true,
    },
    maxAmount: {
        type: Number,
        default: -1,
    },
});

const columns = useListColumns(reactive<IColumn<ITrack>[]>([
    {
        name: "track",
        width: 1,
        sorted: 1,
        field: (track) => track.trackNumber ?? 0,
    },
    {
        name: "title",
        width: 20,
        sorted: 0,
        field: (track) => track.title ?? "",
    },
    {
        name: "album",
        width: 10,
        sorted: 0,
        field: (track) => track.album?.title ?? "",
    },
    {
        name: "artists",
        width: 10,
        sorted: 0,
        field: (track) => track.artists?.map((a: IArtist) => a.name).join(", ") ?? "",
    },
    {
        name: "duration",
        width: 2,
        sorted: 0,
        field: (track) => track.duration ?? 0,
    },
    {
        name: "path",
        width: 10,
        sorted: 0,
        field: (track) => track.path,
    },
]));

onMounted(() => {
    const sortedColumn = columns.columns.find((c) => c.sorted != 0) ?? columns.columns[0];
    columns.sortBy(sortedColumn, sortedColumn?.sorted === 1, props.tracks);
});

const selection = useSelection(computed(() => props.tracks));
const currentTrackIndex = ref(0);

const shownTracks = computed(() => {
    if (props.maxAmount <= 0) {
        return props.tracks;
    } else {
        return props.tracks.slice(0, props.maxAmount);
    }
});

const playTrack = (track: ITrack) => {
    if (selection.data.value.length === 0) {
        selection.click(track);
    }
    currentTrackIndex.value = selection.data.value.indexOf(track);
    playTracks(selection.data.value);
};

const playTracks = (tracks: ITrack[]) => {
    playerStore.queue = tracks.map((t) => t.id);
    playerStore.currentTrackIndex = currentTrackIndex.value;
    nextTick(() => {
        playerStore.play();
    });
};

const favouriteTracks = (tracks: ITrack[]) => {
    console.log("Favourite tracks", tracks);
    tracks.forEach((track) => {
        TrackStore.switchFavourite(track.id);
    });
};

const addSelectionToPlaylist = (playlist: IPlaylist) => {
    PlaylistStore.addTracksToPlaylist(
        playlist.id,
        selection.data.value.map((t) => t.id)
    );
};

const openTrackContextMenu = (track: ITrack) => {
    if (selection.data.value.length === 0) {
        selection.click(track);
    }
    currentTrackIndex.value = selection.data.value.indexOf(track);
    contextMenuOpen.value = true;
};

const openNewPlaylistModal = () => {
    isNewPlaylistModalOpen.value = true;
    isAddToPlaylistMenuOpen.value = false;
};

const createNewPlaylistAndAddSelection = async () => {
    const playlist = await PlaylistStore.createPlaylist(newPlaylistTitle.value);
    addSelectionToPlaylist(playlist);
    isNewPlaylistModalOpen.value = false;
};
</script>

<template>
    <ContextMenu :open="contextMenuOpen" @close="() => (contextMenuOpen = false)">
        <MenuItem @click="() => playTracks(selection.data.value)"> Play selected Tracks </MenuItem>
        <MenuItem @click="() => favouriteTracks(selection.data.value)"> Favourite </MenuItem>
        <div class="flex flex-row">
            <MenuItem @mousein="() => (contextSubMenuOpen = 'playlist')"> Add to playlist </MenuItem>
            <DropdownMenu
                :open="contextSubMenuOpen == 'playlist'"
                :clickAway="false"
                @close="() => (contextSubMenuOpen = '')"
            >
                <MenuItem @click="() => openNewPlaylistModal()"> Create new </MenuItem>
                <MenuItem
                    v-for="playlist in PlaylistStore.playlists"
                    :key="playlist.id"
                    @click="() => addSelectionToPlaylist(playlist)"
                >
                    {{ playlist.title }}
                </MenuItem>
            </DropdownMenu>
        </div>
    </ContextMenu>
    <List :columns="columns.columns" @columnHeaderClick="columns.columnHeaderClick">
        <template #items>
            <TrackListItem
                v-for="track in shownTracks"
                :key="track.id"
                :track="track"
                :columns="columns.columns"
                :selected="selection.data.value.includes(track)"
                @click="selection.click"
                @doubleClick="playTrack"
                @shiftClick="selection.shiftClick"
                @ctrlClick="selection.ctrlClick"
                @contextMenu="openTrackContextMenu"
            >
            </TrackListItem>
        </template>
    </List>
    <EditModal
        :open="isNewPlaylistModalOpen"
        @close="
            () => {
                isNewPlaylistModalOpen = false;
            }
        "
        @save="createNewPlaylistAndAddSelection"
        title="Create new playlist"
    >
        <TextInput label="Title" v-model="newPlaylistTitle"></TextInput>
    </EditModal>
</template>
