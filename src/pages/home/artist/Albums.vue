<template>
    <div class="artistAlbums">
        <AlbumCardList :albums="artistAlbums"></AlbumCardList>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import AlbumCardList from "../../../components/lists/AlbumCardList.vue";

import useAlbums from "../../../stores/albumStore";

const AlbumStore = useAlbums();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const artistAlbums = computed(() => AlbumStore.getAlbumsFromArtist(props.id));
</script>
