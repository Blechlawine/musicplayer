<template>
    <CardList>
        <template #items>
            <AlbumCard
                v-for="album in props.albums"
                :key="album.id"
                :album="album"
                @click="
                    () => {
                        albumClick(album);
                    }
                "
            ></AlbumCard>
        </template>
    </CardList>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import CardList from "./CardList.vue";
import AlbumCard from "./items/AlbumCard.vue";

const Router = useRouter();

const props = defineProps({
    albums: {
        type: Array as PropType<IAlbum[]>,
        required: true,
    },
});

const albumClick = (album: IAlbum) => {
    Router.push(`/album/${album.id}/tracks`);
};
</script>
