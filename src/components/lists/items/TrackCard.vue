<template>
    <Card
        :image="cover"
        clickable
        :class="computedClasses"
        @click.prevent.exact="(e) => emit('click', props.track)"
        @click.shift.exact="(e) => emit('shiftClick', props.track)"
        @click.ctrl.exact="(e) => emit('ctrlClick', props.track)"
        @dblclick.prevent="(e) => emit('doubleClick', props.track)"
        @contextmenu="(e) => emit('contextMenu', props.track)"
    >
        <template #title>
            <span class="material-icons small" v-if="playing">volume_up</span>
            {{ props.track.title || (props.track.path.match(/[\w\.-]*\.(mp3|wav|ogg)$/gm)?.[0] ?? "unknown") }}
        </template>
        <template #details>
            {{ props.track.artists.map((a) => a.name).join(" ,") }}
        </template>
    </Card>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch, computed } from "vue";
import Card from "./Card.vue";
import usePlayer from "../../../stores/playerStore";
import useTracks from "../../../stores/trackStore";

const PlayerStore = usePlayer();
const TrackStore = useTracks();

const emit = defineEmits(["click", "shiftClick", "doubleClick", "ctrlClick", "contextMenu"]);

const props = defineProps({
    track: {
        type: Object as PropType<ITrack>,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});

const cover = ref("");

const playing = computed(() => PlayerStore.playing && isCurrentTrack.value);
const isCurrentTrack = computed(
    () => TrackStore.getTrackById(PlayerStore.getCurrentTrackId)?.path === props.track.path
);

const computedClasses = computed(() => ({
    "bg-highlight": props.selected,
    "text-accent": isCurrentTrack.value,
}));

onMounted(() => {
    updateCover();
});

watch(
    () => props.track,
    () => updateCover()
);

const updateCover = async () => {
    const metadata = await window.api.readMetadata(props.track.path);
    const covers = metadata.common.picture;
    if (covers && covers.length > 0) {
        cover.value = `data:${covers[0].format};base64,${covers[0].data.toString("base64")}`;
    } else {
        cover.value = "";
    }
};
</script>
