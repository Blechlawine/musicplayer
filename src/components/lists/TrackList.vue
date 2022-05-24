<script setup lang="ts">
import { reactive, onMounted, PropType, ref, nextTick, Ref, computed } from "vue";
import { Track } from "../../types/database";
import { ContextMenuEntry, TrackListColumn as Column } from "../../types/ui";
import TrackListItem from "./items/TrackListItem.vue";
import usePlayer from "../../stores/playerStore";
import useContextMenu from "../../stores/contextMenuStore";

const playerStore = usePlayer();
const contextMenu = useContextMenu();
const contextMenuContent = ref([]) as Ref<ContextMenuEntry[]>;

const props = defineProps({
    tracks: {
        type: Array as PropType<Track[]>,
        required: true,
    },
});

const columns = reactive([
    {
        name: "track",
        width: 1,
        sorted: 1,
        field: (track: Track) => track.trackNumber,
    },
    {
        name: "title",
        width: 20,
        sorted: 0,
        field: (track: Track) => track.title,
    },
    {
        name: "album",
        width: 10,
        sorted: 0,
        field: (track: Track) => track.album?.title ?? "",
    },
    {
        name: "artists",
        width: 10,
        sorted: 0,
        field: (track: Track) => track.artists?.map((a) => a.name).join(", ") ?? "",
    },
    {
        name: "duration",
        width: 2,
        sorted: 0,
        field: (track: Track) => track.duration,
    },
    {
        name: "path",
        width: 10,
        sorted: 0,
        field: (track: Track) => track.path,
    },
]) as Column[];

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
        }
    ]
});

const sortTracks = (column: Column, ascending: boolean) => {
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

const columnHeaderClick = (column: Column) => {
    sortTracks(column, column.sorted !== 1);
};

// Columnstuff
const gridTemplateAreas = computed(() => columns.map((c) => c.name).join(" "));
const gridTemplateColumns = computed(() => columns.map((c) => `${c.width}fr`).join(" "));

const listItemStyles = computed(() => ({
    "grid-template-areas": `"${gridTemplateAreas.value}"`,
    "grid-template-columns": gridTemplateColumns.value,
}));

const firstSelectedIndex = ref(0);
const selection = ref([]) as Ref<Track[]>;
const currentTrackIndex = ref(0);

const addTrackToSelection = (track: Track) => {
    if (!selection.value.includes(track)) {
        selection.value.push(track);
    }
};

const selectTrack = (track: Track) => {
    selection.value = [];
    firstSelectedIndex.value = props.tracks.indexOf(track);
    addTrackToSelection(track);
};

const playTrack = (track: Track) => {
    if (selection.value.length === 0) {
        selection.value.push(track);
    }
    currentTrackIndex.value = selection.value.indexOf(track);
    playTracks(selection.value);
};

const shiftClickTrack = (track: Track) => {
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

const ctrlClickTrack = (track: Track) => {
    addTrackToSelection(track);
    firstSelectedIndex.value = props.tracks.indexOf(track);
};

const playTracks = (tracks: Track[]) => {
    playerStore.queue = tracks;
    playerStore.currentTrackIndex = currentTrackIndex.value;
    nextTick(() => {
        playerStore.play();
    });
};

const favouriteTracks = (tracks: Track[]) => {
    console.log("Favourite tracks", tracks);
    tracks.forEach((track) => {
        playerStore.switchFavourite(track);
    });
};

const openTrackContextMenu = (track: Track) => {
    if (selection.value.length === 0) {
        selection.value.push(track);
    }
    currentTrackIndex.value = selection.value.indexOf(track);
    contextMenu.open(contextMenuContent.value);
};
</script>

<template>
    <div class="listWrapper w-full select-none">
        <div class="listHeader grid sticky top-0 bg-bg gap-2 px-3" :style="listItemStyles">
            <div
                class="columnHeader py-1 grid cursor-pointer border-r border-divider w-full"
                v-for="col in columns"
                :key="col.name"
                @click="() => columnHeaderClick(col)"
            >
                <p class="text-ellipsis whitespace-nowrap overflow-hidden w-full">
                    {{ col.name }}
                </p>
                <span class="material-icons" v-if="col.sorted === -1"> arrow_drop_up </span>
                <span class="material-icons" v-if="col.sorted === 1"> arrow_drop_down </span>
            </div>
        </div>
        <div class="list grid">
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
        </div>
    </div>
</template>

<style lang="sass" scoped>
.listHeader
    z-index: 1    
</style>
