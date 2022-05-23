<script setup lang="ts">
import { computed, PropType } from "vue";
import usePlayer from "../../../stores/playerStore";
import { Track } from "../../../types/database";
import { formatTime } from "../../../utils/utils";

const emit = defineEmits(["click", "shiftClick", "ctrlClick", "doubleClick"]);

const playerStore = usePlayer();

const props = defineProps({
    track: {
        type: Object as PropType<Track>,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});

const playing = computed(() => playerStore.playing && isCurrentTrack.value);
const time = computed(() => formatTime(props.track.hours, props.track.minutes, props.track.seconds));
const isCurrentTrack = computed(() => playerStore.currentTrack.path === props.track.path);
const selectedClasses = computed(() => ({
    "rounded-lg": props.selected,
    "bg-highlight": props.selected,
}));
</script>

<template>
    <div
        class="listItem grid items-start relative gap-x-0 gap-y-2 w-full cursor-pointer px-3 py-2 border-b border-bg hover:rounded-lg hover:bg-highlight"
        :class="selectedClasses"
        @click.prevent.exact="(e) => emit('click', props.track)"
        @click.shift.exact="(e) => emit('shiftClick', props.track)"
        @click.ctrl.exact="(e) => emit('ctrlClick', props.track)"
        @dblclick.prevent="(e) => emit('doubleClick', props.track)"
    >
        <p class="title text-ellipsis whitespace-nowrap overflow-x-hidden font-medium">
            {{ props.track.title }}
        </p>
        <span class="playingIcon material-icons text-accent" v-if="playing"> volume_up </span>
        <p class="artistsAndAlbum text-ellipsis whitespace-nowrap overflow-x-hidden font-light text-xs">
            {{
                `${props.track.album?.title ?? "Unknown Album"} by ${props.track.artists.map((a) => a.name).join(", ")}`
            }}
        </p>
        <p class="duration">{{ time }}</p>
    </div>
</template>

<style lang="sass" scoped>

.listItem
    grid-template-columns: 1fr 24px min-content
    grid-template-rows: 2fr 1fr
    grid-template-areas: "title playingIcon duration" "artistsAndAlbum artistsAndAlbum artistsAndAlbum"

    .title
        grid-area: title

    .duration
        grid-area: duration

    .artistsAndAlbum
        grid-area: artistsAndAlbum

    .playingIcon
        font-size: 1rem
        grid-area: playingIcon
</style>