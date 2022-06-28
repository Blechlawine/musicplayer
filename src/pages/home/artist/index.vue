<template>
    <div class="artist" v-if="artist">
        <Hero :title="artist!.name"></Hero>
        <router-view></router-view>
    </div>
    <div v-else>
        Loading...
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import Hero from "../../../components/Hero.vue";
import useArtists from "../../../stores/artistStore";

const ArtistStore = useArtists();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const artist = computed(() => ArtistStore.getArtist(props.id));

onMounted(() => {
    ArtistStore.fetchAllArtists();
});
</script>
