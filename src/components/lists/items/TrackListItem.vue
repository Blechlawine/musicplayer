<script setup lang="ts">
import { PropType, computed } from "vue";
import usePlayer from "../../../stores/playerStore";
import useTracks from "../../../stores/trackStore";
import { formatTime } from "../../../utils/utils";

const emit = defineEmits(["click", "shiftClick", "doubleClick", "ctrlClick", "contextMenu"]);

const playerStore = usePlayer();
const TrackStore = useTracks();

const props = defineProps({
    track: {
        type: Object as PropType<ITrack>,
        required: true,
    },
    columns: {
        type: Array as PropType<IColumn<ITrack>[]>,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});

const playing = computed(() => playerStore.playing && isCurrentTrack.value);
const isCurrentTrack = computed(
    () => TrackStore.getTrackById(playerStore.getCurrentTrackId)?.path === props.track.path
);
const time = computed(() => formatTime(props.track.hours, props.track.minutes, props.track.seconds));
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

const trackFilename = computed(() => props.track.path.match(/[\w\.\-~\s]*\.(mp3|wav|ogg)$/gm)?.[0]);
</script>

<template>
    <div
        class="listItem grid items-center relative w-full cursor-pointer px-3 py-2 border-b border-bg hover:rounded-lg hover:bg-highlight"
        :class="[selectedClasses, listItemClasses]"
        :style="listItemStyles"
        @click.prevent.exact="(e) => emit('click', props.track)"
        @click.shift.exact="(e) => emit('shiftClick', props.track)"
        @click.ctrl.exact="(e) => emit('ctrlClick', props.track)"
        @dblclick.prevent="(e) => emit('doubleClick', props.track)"
        @contextmenu="(e) => emit('contextMenu', props.track)"
    >
        <p class="track">{{ props.track.trackNumber }}</p>
        <p class="title flex flex-row items-center gap-1">
            <span class="material-icons small" v-if="playing">volume_up</span>
            <span v-if="props.track.title">{{ props.track.title }}</span>
            <i v-else>{{ trackFilename ?? "unknown" }}</i>
        </p>
        <p class="album text-ellipsis whitespace-nowrap overflow-hidden">{{ props.track.album?.title ?? "" }}</p>
        <p class="artists text-ellipsis whitespace-nowrap overflow-hidden">
            {{ props.track.artists.map((a) => a.name).join(", ") }}
        </p>
        <p class="duration">{{ time }}</p>
        <p class="path text-ellipsis whitespace-nowrap overflow-hidden">{{ props.track.path }}</p>
    </div>
</template>

<style lang="sass">
.track
    grid-area: track

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
