<template>
    <div class="artist" v-if="artist">
        <Hero :title="artist!.name">
            <Tabs>
                <Tab :to="`/artist/${artist.id}/tracks`">Tracks</Tab>
                <Tab :to="`/artist/${artist.id}/albums`">Albums</Tab>
            </Tabs>
        </Hero>
        <router-view></router-view>
    </div>
    <div v-else>Loading...</div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import Hero from "../../../components/Hero.vue";
import useArtists from "../../../stores/artistStore";
import Tab from "../../../components/tabs/Tab.vue";
import Tabs from "../../../components/tabs/Tabs.vue";

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
