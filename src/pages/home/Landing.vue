<script setup lang="ts">
import TrackList from "../../components/lists/TrackList.vue";
import TrackCardList from "../../components/lists/TrackCardList.vue";
import Button from "../../components/buttons/Button.vue";
import useTracks from "../../stores/trackStore";
import { useRouter } from "vue-router";

const TrackStore = useTracks();
const Router = useRouter();

const navigateToFavourites = () => {
    Router.push("/favourites");
};
</script>

<template>
    <div class="landing">
        <section>
            <div class="flex flex-row gap-4 items-center py-2 px-3">
                <h2 class="headline">Most Listened</h2>
            </div>
            <TrackCardList :tracks="TrackStore.getMostListened.slice(0, 10)" singleRow></TrackCardList>
        </section>
        <section>
            <div class="flex flex-row gap-4 items-center px-3 py-2">
                <h2 class="headline">Favourites</h2>
                <Button color="plain" dense icon="read_more" @click="navigateToFavourites">More</Button>
            </div>
            <TrackList :tracks="TrackStore.favourites" :maxAmount="10"></TrackList>
        </section>
    </div>
</template>
