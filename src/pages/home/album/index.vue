<template>
    <div class="album" v-if="album">
        <Hero :title="album!.title" :subTitle="subTitle"></Hero>
        <router-view></router-view>
    </div>
    <div v-else>Loading...</div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import Hero from "../../../components/Hero.vue";
import useAlbums from "../../../stores/albumStore";

const AlbumStore = useAlbums();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const album = computed(() => AlbumStore.getAlbum(props.id));
const subTitle = computed(() => album.value?.artists.map((a) => a.name).join(" ,"));

onMounted(() => {
    AlbumStore.fetchAllAlbums();
});
</script>
