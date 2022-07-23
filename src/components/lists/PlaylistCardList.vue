<template>
    <CardList>
        <template #items>
            <Card v-for="playlist in props.playlists" :key="playlist.id" @click="() => playlistClick(playlist)">
                <template #title>
                    {{ playlist.title }}
                </template>
                <template #details>
                    {{ `${playlist.playlistTracks.length} tracks` }}
                </template>
            </Card>
        </template>
    </CardList>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import Card from "./items/Card.vue";
import CardList from "./CardList.vue";

const Router = useRouter();

const props = defineProps({
    playlists: {
        type: Array as PropType<IPlaylist[]>,
        required: true,
    },
});

const playlistClick = (playlist: IPlaylist) => {
    Router.push(`/playlist/${playlist.id}/tracks`);
};
</script>
