<template>
    <div class="albums">
        <AlbumCardList :albums="AlbumStore.albums"></AlbumCardList>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import AlbumCardList from "../../components/lists/AlbumCardList.vue";

import useAlbums from "../../stores/albumStore";

const AlbumStore = useAlbums();

onMounted(() => {
    AlbumStore.fetchAllAlbums();
});
</script>
