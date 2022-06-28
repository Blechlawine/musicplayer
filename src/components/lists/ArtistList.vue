<template>
    <CardList>
        <template #items>
            <Card
                v-for="artist in props.artists"
                :key="artist.id"
                @click="
                    () => {
                        artistClick(artist);
                    }
                "
            >
                <template #title>
                    {{ artist.name }}
                </template>
                <template #details>
                    {{ `${artist.tracks.length} Tracks & ${artist.albums.length} Albums` }}
                </template>
            </Card>
        </template>
    </CardList>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import CardList from "./CardList.vue";
import Card from "./items/Card.vue";

const router = useRouter();

const props = defineProps({
    artists: {
        type: Array as PropType<IArtist[]>,
        required: true,
    },
});

const artistClick = (artist: IArtist) => {
    router.push(`/artist/${artist.id}/tracks`);
};
</script>
