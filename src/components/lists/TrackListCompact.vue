<script setup lang="ts">
import { ref, PropType, Ref, nextTick } from "vue";
import TrackListItemCompact from "./items/TrackListItemCompact.vue";
import usePlayer from "../../stores/playerStore";

const playerStore = usePlayer();

const props = defineProps({
    tracks: {
        type: Array as PropType<ITrack[]>,
        default: [],
    },
    isQueue: {
        type: Boolean,
        default: false,
    },
    selectable: {
        type: Boolean,
        default: true,
    },
    reorderable: {
        type: Boolean,
        default: true,
    },
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
    currentTrackIndex.value = (props.selectable ? selection.value.indexOf(track) : props.tracks.indexOf(track)) || 0;
    playTracks(props.selectable ? selection.value : props.tracks);
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
</script>

<template>
    <div class="list flex flex-col">
        <TrackListItemCompact
            v-for="track in props.tracks"
            :key="track.id"
            :track="track"
            :selected="props.selectable && selection.includes(track)"
            @click="selectTrack"
            @doubleClick="playTrack"
            @shiftClick="shiftClickTrack"
            @ctrlClick="ctrlClickTrack"
        ></TrackListItemCompact>
    </div>
</template>
