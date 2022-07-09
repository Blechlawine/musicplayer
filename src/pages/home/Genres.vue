<template>
    <div class="landing">
        <GenreCardList :genres="GenreStore.genres"></GenreCardList>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import GenreCardList from "../../components/lists/GenreCardList.vue";
import useGenres from "../../stores/genreStore";

const GenreStore = useGenres();

onMounted(() => {
    GenreStore.fetchAllGenres();
});
</script>
