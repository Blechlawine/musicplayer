<template>
    <ContextMenu :open="contextMenuOpen" @close="() => (contextMenuOpen = false)">
        <MenuItem @click="() => playTracks(selection.data.value)"> Play selected Tracks </MenuItem>
        <MenuItem @click="() => favouriteTracks(selection.data.value)"> Favourite </MenuItem>
        <MenuItem @click="() => removeFromPlaylist(selection.data.value)"> Remove from playlist </MenuItem>
    </ContextMenu>
    <List :columns="columns.columns" @columnHeaderClick="columns.columnHeaderClick">
        <template #items>
            <PlaylistTrackItem
                v-for="plt in shownTracks"
                :key="plt.id"
                :playlistTrack="plt"
                :columns="columns.columns"
                :selected="selection.data.value.findIndex((it) => it.id === plt.id) !== -1"
                @click="selection.click"
                @doubleClick="playTrack"
                @shiftClick="selection.shiftClick"
                @ctrlClick="selection.ctrlClick"
                @contextMenu="openTrackContextMenu"
            >
            </PlaylistTrackItem>
        </template>
    </List>
</template>

<script setup lang="ts">
import { PropType, computed, ref, reactive, nextTick, onMounted } from "vue";
import List from "./List.vue";
import PlaylistTrackItem from "./items/PlaylistTrackItem.vue";
import ContextMenu from "../window/ContextMenu.vue";
import MenuItem from "../menus/MenuItem.vue";
import usePlayer from "../../stores/playerStore";
import useTracks from "../../stores/trackStore";
import useSelection from "../../composables/useSelection";
import useListColumns from "../../composables/useListColumns";
import usePlaylist from "../../stores/playlistStore";

const PlayerStore = usePlayer();
const TrackStore = useTracks();
const PlaylistStore = usePlaylist();

const props = defineProps({
    playlistTracks: {
        type: Array as PropType<IPlaylistTrack[]>,
        required: true,
    },
    playlist: {
        type: Object as PropType<IPlaylist>,
        required: true,
    },
});

onMounted(() => {
    const sortedColumn = columns.columns.find((c) => c.sorted != 0) ?? columns.columns[0];
    columns.sortBy(sortedColumn, sortedColumn?.sorted === 1, props.playlistTracks);
});

const selection = useSelection(computed(() => props.playlistTracks));
const columns = useListColumns(
    reactive<IColumn<IPlaylistTrack>[]>([
        {
            name: "index",
            width: 1,
            sorted: 1,
            field: (plt) => plt.index,
        },
        {
            name: "title",
            width: 20,
            sorted: 0,
            field: (plt) => plt.track.title ?? "",
        },
        {
            name: "album",
            width: 10,
            sorted: 0,
            field: (plt) => plt.track.album?.title ?? "",
        },
        {
            name: "artists",
            width: 10,
            sorted: 0,
            field: (plt) => plt.track.artists?.map((a: IArtist) => a.name).join(", ") ?? "",
        },
        {
            name: "duration",
            width: 2,
            sorted: 0,
            field: (plt) => plt.track.duration ?? 0,
        },
        {
            name: "path",
            width: 10,
            sorted: 0,
            field: (plt) => plt.track.path,
        },
    ])
);

const shownTracks = computed(() => {
    return props.playlistTracks
        .sort((a, b) => a.index - b.index)
        .map((plt) => {
            const track = TrackStore.getTrackById(plt.track.id)!;
            return {
                ...plt,
                track,
            };
        });
});

const currentTrackIndex = ref(0);
const contextMenuOpen = ref(false);

const playTrack = (track: IPlaylistTrack) => {
    if (selection.data.value.length === 0) {
        selection.click(track);
    }
    currentTrackIndex.value = selection.data.value.indexOf(track);
    playTracks(selection.data.value);
};

const playTracks = (playlistTracks: IPlaylistTrack[]) => {
    PlayerStore.queue = playlistTracks.map((plt) => plt.track.id);
    PlayerStore.currentTrackIndex = currentTrackIndex.value;
    nextTick(() => {
        PlayerStore.play();
    });
};

const favouriteTracks = (tracks: IPlaylistTrack[]) => {
    console.log("Favourite tracks", tracks);
    tracks.forEach((track) => {
        TrackStore.switchFavourite(track.id);
    });
};

const openTrackContextMenu = (track: IPlaylistTrack) => {
    if (selection.data.value.length <= 1) {
        selection.click(track);
    }
    currentTrackIndex.value = selection.data.value.indexOf(track);
    contextMenuOpen.value = true;
};

const removeFromPlaylist = (playlistTracks: IPlaylistTrack[]) => {
    PlaylistStore.removeTracksFromPlaylist(
        props.playlist.id,
        playlistTracks.map((plt) => plt.id)
    );
    selection.data.value = [];
};
</script>
