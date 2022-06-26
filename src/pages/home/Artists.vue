<template>
    <div class="landing">
        {{ ArtistStore.artists }}
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import useArtists from "../../stores/artistStore";

const ArtistStore = useArtists();

onMounted(() => {
    ArtistStore.fetchAllArtists();
});
</script>
