<template>
    <CardList>
        <template #items>
            <Card
                v-for="genre in props.genres"
                :key="genre.id"
                @click="
                    () => {
                        genreClick(genre);
                    }
                "
            >
                <template #title>
                    {{ genre.name }}
                </template>
                <template #details>
                    {{ `${genre.tracks.length} Tracks` }}
                </template>
            </Card>
        </template>
    </CardList>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import CardList from "./CardList.vue";
import Card from "./items/Card.vue";
import { useRouter } from "vue-router";

const Router = useRouter();

const props = defineProps({
    genres: {
        type: Array as PropType<IGenre[]>,
        required: true,
    },
});

const genreClick = (genre: IGenre) => {
    Router.push(`/genre/${genre.id}/tracks`);
};
</script>
