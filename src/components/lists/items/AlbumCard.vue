<template>
    <Card @click="emit('click')" :image="cover" clickable>
        <template #title>
            {{ props.album.title }}
        </template>
        <template #details>
            {{ props.album.artists.map((a) => a.name).join(" ,") }}
        </template>
    </Card>
</template>

<script setup lang="ts">
import { PropType, ref, computed, onMounted, watch } from "vue";
import Card from "./Card.vue";

const emit = defineEmits(["click"]);

const props = defineProps({
    album: {
        type: Object as PropType<IAlbum>,
        required: true,
    },
});

const firstTrack = computed(() => props.album.tracks[0]);

const cover = ref("");

onMounted(() => {
    updateCover();
});

watch(
    () => props.album,
    () => updateCover()
);

const updateCover = async () => {
    if (firstTrack.value) {
        const metaData = await window.api.readMetadata(firstTrack.value.path);
        const covers = metaData.common.picture;
        if (covers && covers.length > 0) {
            cover.value = `data:${covers[0].format};base64,${covers[0].data.toString("base64")}`;
        } else {
            cover.value = "";
        }
    } else {
        cover.value = "";
    }
};
</script>
