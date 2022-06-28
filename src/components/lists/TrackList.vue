<script setup lang="ts">
import { reactive, onMounted, PropType, ref, nextTick, Ref, computed } from "vue";
import List from "./List.vue";
import TrackListItem from "./items/TrackListItem.vue";
import usePlayer from "../../stores/playerStore";
import useContextMenu from "../../stores/contextMenuStore";
import useTracks from "../../stores/trackStore";

const playerStore = usePlayer();
const contextMenu = useContextMenu();
const TrackStore = useTracks();
const contextMenuContent = ref([]) as Ref<IContextMenuEntry[]>;

const props = defineProps({
    tracks: {
        type: Array as PropType<ITrack[]>,
        required: true,
    },
});

const columns = reactive([
    {
        name: "track",
        width: 1,
        sorted: 1,
        field: (track: ITrack) => track.trackNumber,
    },
    {
        name: "title",
        width: 20,
        sorted: 0,
        field: (track: ITrack) => track.title,
    },
    {
        name: "album",
        width: 10,
        sorted: 0,
        field: (track: ITrack) => track.album?.title ?? "",
    },
    {
        name: "artists",
        width: 10,
        sorted: 0,
        field: (track: ITrack) => track.artists?.map((a: IArtist) => a.name).join(", ") ?? "",
    },
    {
        name: "duration",
        width: 2,
        sorted: 0,
        field: (track: ITrack) => track.duration,
    },
    {
        name: "path",
        width: 10,
        sorted: 0,
        field: (track: ITrack) => track.path,
    },
]) as IColumn[];

onMounted(() => {
    const sortedColumn = columns.find((c) => c.sorted != 0) ?? columns[0];
    sortTracks(sortedColumn, sortedColumn?.sorted === 1);
    contextMenuContent.value = [
        {
            label: "Play selected tracks",
            action: () => playTracks(selection.value),
        },
        {
            label: "Favourite",
            action: () => favouriteTracks(selection.value),
        },
    ];
});

const sortTracks = (column: IColumn, ascending: boolean) => {
    columns.forEach((c) => (c.sorted = 0));
    column.sorted = ascending ? 1 : -1;
    props.tracks.sort((a, b) => {
        const fieldA = column.field(a);
        const fieldB = column.field(b);
        if (fieldA < fieldB) return ascending ? -1 : 1;
        if (fieldA > fieldB) return ascending ? 1 : -1;
        return 0;
    });
};

const columnHeaderClick = (column: IColumn) => {
    sortTracks(column, column.sorted !== 1);
};

const firstSelectedIndex = ref(0);
const selection = ref([]) as Ref<ITrack[]>;
const currentTrackIndex = ref(0);

const addTrackToSelection = (track: ITrack) => {
    if (!selection.value.includes(track)) {
        selection.value.push(track);
    }
};

const selectTrack = (track: ITrack) => {
    selection.value = [];
    firstSelectedIndex.value = props.tracks.indexOf(track);
    addTrackToSelection(track);
};

const playTrack = (track: ITrack) => {
    if (selection.value.length === 0) {
        selection.value.push(track);
    }
    currentTrackIndex.value = selection.value.indexOf(track);
    playTracks(selection.value);
};

const shiftClickTrack = (track: ITrack) => {
    const selectionEndIndex = props.tracks.indexOf(track);
    if (firstSelectedIndex.value == -1) firstSelectedIndex.value = 0;
    if (selectionEndIndex > firstSelectedIndex.value) {
        for (let i = firstSelectedIndex.value; i <= selectionEndIndex; i++) {
            addTrackToSelection(props.tracks[i]);
        }
    } else {
        for (let i = firstSelectedIndex.value; i >= selectionEndIndex; i--) {
            addTrackToSelection(props.tracks[i]);
        }
    }
};

const ctrlClickTrack = (track: ITrack) => {
    addTrackToSelection(track);
    firstSelectedIndex.value = props.tracks.indexOf(track);
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

const openTrackContextMenu = (track: ITrack) => {
    if (selection.value.length === 0) {
        selection.value.push(track);
    }
    currentTrackIndex.value = selection.value.indexOf(track);
    contextMenu.open(contextMenuContent.value);
};
</script>

<template>
    <List :columns="columns" @columnHeaderClick="columnHeaderClick">
        <template #items>
            <TrackListItem
                v-for="track in props.tracks"
                :key="track.id"
                :track="track"
                :columns="columns"
                :selected="selection.includes(track)"
                @click="selectTrack"
                @doubleClick="playTrack"
                @shiftClick="shiftClickTrack"
                @ctrlClick="ctrlClickTrack"
                @contextMenu="openTrackContextMenu"
            >
            </TrackListItem>
        </template>
    </List>
</template>
