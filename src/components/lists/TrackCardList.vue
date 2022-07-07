<template>
    <CardList :singleRow="props.singleRow">
        <template #items>
            <TrackCard
                v-for="track in props.tracks"
                :key="track.id"
                :track="track"
                :selected="selection.includes(track)"
                @click="selectTrack"
                @doubleClick="playTrack"
                @shiftClick="shiftClickTrack"
                @ctrlClick="ctrlClickTrack"
                @contextMenu="openTrackContextMenu"
            >
            </TrackCard>
        </template>
    </CardList>
</template>

<script setup lang="ts">
import { PropType, ref, Ref, nextTick, onMounted } from "vue";
import CardList from "./CardList.vue";
import TrackCard from "./items/TrackCard.vue";
import usePlayer from "../../stores/playerStore";
import useTracks from "../../stores/trackStore";
import useContextMenu from "../../stores/contextMenuStore";

const PlayerStore = usePlayer();
const TrackStore = useTracks();
const contextMenu = useContextMenu();
const contextMenuContent = ref([]) as Ref<IContextMenuEntry[]>;

const props = defineProps({
    tracks: {
        type: Array as PropType<ITrack[]>,
        required: true,
    },
    singleRow: {
        type: Boolean,
        default: false,
    },
});

onMounted(() => {
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
    PlayerStore.queue = tracks.map((t) => t.id);
    PlayerStore.currentTrackIndex = currentTrackIndex.value;
    nextTick(() => {
        PlayerStore.play();
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
