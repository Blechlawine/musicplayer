<template>
    <CardList>
        <template #items>
            <Card
                v-for="album in props.albums"
                :key="album.id"
                @click="
                    () => {
                        albumClick(album);
                    }
                "
            >
                <template #title>
                    {{ album.title }}
                </template>
                <template #details>
                    {{ album.artists.map((a) => a.name).join(" ,") }}
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
