<script setup lang="ts">
import { PropType, computed } from "vue";
import usePlayer from "../../../stores/playerStore";
import useTracks from "../../../stores/trackStore";
import { formatTime } from "../../../utils/utils";

const emit = defineEmits(["click", "shiftClick", "doubleClick", "ctrlClick", "contextMenu"]);

const playerStore = usePlayer();
const TrackStore = useTracks();

const props = defineProps({
    playlistTrack: {
        type: Object as PropType<IPlaylistTrack>,
        required: true,
    },
    columns: {
        type: Array as PropType<IColumn<IPlaylistTrack>[]>,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});

const track = computed(() => TrackStore.getTrackById(props.playlistTrack.track.id)!);
const playing = computed(() => playerStore.playing && isCurrentTrack.value);
const isCurrentTrack = computed(
    () => TrackStore.getTrackById(playerStore.getCurrentTrackId)?.path === track.value.path
);
const time = computed(() => formatTime(props.playlistTrack.track.hours, track.value.minutes, track.value.seconds));
const selectedClasses = computed(() => ({
    "rounded-lg": props.selected,
    "bg-highlight": props.selected,
}));
const listItemClasses = computed(() => ({
    "text-accent": isCurrentTrack.value,
}));

// Columnstuff
const gridTemplateAreas = computed(() => props.columns.map((c) => c.name).join(" "));
const gridTemplateColumns = computed(() => props.columns.map((c) => `${c.width}fr`).join(" "));

const listItemStyles = computed(() => ({
    "grid-template-areas": `"${gridTemplateAreas.value}"`,
    "grid-template-columns": gridTemplateColumns.value,
}));

const trackFilename = computed(() => track.value.path.match(/[\w\.\-~\s]*\.(mp3|wav|ogg)$/gm)?.[0]);
</script>

<template>
    <div
        class="listItem grid items-center relative w-full cursor-pointer px-3 py-2 border-b border-bg hover:rounded-lg hover:bg-highlight"
        :class="[selectedClasses, listItemClasses]"
        :style="listItemStyles"
        @click.prevent.exact="(e) => emit('click', props.playlistTrack)"
        @click.shift.exact="(e) => emit('shiftClick', props.playlistTrack)"
        @click.ctrl.exact="(e) => emit('ctrlClick', props.playlistTrack)"
        @dblclick.prevent="(e) => emit('doubleClick', props.playlistTrack)"
        @contextmenu="(e) => emit('contextMenu', props.playlistTrack)"
    >
        <p class="index">{{ props.playlistTrack.index }}</p>
        <p class="title flex flex-row items-center gap-1">
            <span class="material-icons small" v-if="playing">volume_up</span>
            <span v-if="track.title">{{ track.title }}</span>
            <i v-else>{{ trackFilename ?? "unknown" }}</i>
        </p>
        <p class="album text-ellipsis whitespace-nowrap overflow-hidden">{{ track.album?.title ?? "" }}</p>
        <p class="artists text-ellipsis whitespace-nowrap overflow-hidden">
            {{ track.artists.map((a) => a.name).join(", ") }}
        </p>
        <p class="duration">{{ time }}</p>
        <p class="path text-ellipsis whitespace-nowrap overflow-hidden">{{ track.path }}</p>
    </div>
</template>

<style lang="sass">
.index
    grid-area: index

.title
    grid-area: title

.album
    grid-area: album

.artists
    grid-area: artists

.duration
    grid-area: duration

.path
    grid-area: path
</style>
