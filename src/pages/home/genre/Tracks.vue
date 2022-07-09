<template>
    <div class="genreTracks">
        <TrackList :tracks="genreTracks" />
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import TrackList from "../../../components/lists/TrackList.vue";
import useTracks from "../../../stores/trackStore";

const TrackStore = useTracks();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const genreTracks = computed(() => TrackStore.getTracksFromGenre(props.id));
</script>
