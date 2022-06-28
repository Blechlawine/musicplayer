<template>
    <div class="landing">
        <ArtistList :artists="ArtistStore.artists" />
    </div>
</template>
<script setup lang="ts">
import ArtistList from "../../components/lists/ArtistList.vue";
import { onMounted } from "vue";
import useArtists from "../../stores/artistStore";

const ArtistStore = useArtists();

onMounted(() => {
    ArtistStore.fetchAllArtists();
});
</script>
