<template>
    <div class="genre" v-if="genre">
        <Hero :title="genre!.name"></Hero>
        <router-view></router-view>
    </div>
    <div v-else>
        Loading...
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import Hero from "../../../components/Hero.vue";
import useGenres from "../../../stores/genreStore";

const GenreStore = useGenres();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const genre = computed(() => GenreStore.getGenre(props.id));

onMounted(() => {
    GenreStore.fetchAllGenres();
});
</script>
