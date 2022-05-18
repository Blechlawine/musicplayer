<script setup lang="ts">
import usePlayer from "../stores/playerStore";
import IconButton from "./buttons/IconButton.vue";
import Slider from "./inputs/Slider.vue";
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { Artist, Track } from "../types/database";
import { splitTime } from "../../electron/utils/utils";
import { formatTime } from "../utils/utils";

const playerStore = usePlayer();

const cover = ref("/album.svg");
const audioElement = ref(null);
const playPosition = ref(0);
const displayArtists = computed(() => playerStore.currentTrack?.artists?.map((a: Artist) => a.name).join(", "));
const currentTime = computed(() => formatTime(...splitTime(playPosition.value)));
const trackLength = computed(() =>
    formatTime(
        playerStore.currentTrack.hours || 0,
        playerStore.currentTrack.minutes || 0,
        playerStore.currentTrack.seconds || 0
    )
);
const repeatIcon = computed(() => {
    if (playerStore.repeat === 0) {
        return "repeat";
    } else if (playerStore.repeat === 1) {
        return "repeat_one_on";
    } else if (playerStore.repeat === 2) {
        return "repeat_on";
    }
});

onMounted(() => {
    playerStore.audioElement = audioElement.value;
});

watch(
    () => playerStore.currentTrack,
    async (track: Track) => {
        if (track) {
            const metadata = await window.api.readMetadata(track.path);
            const covers = metadata.common.picture;
            if (covers && covers.length > 0) {
                cover.value = `data:${covers[0].format};base64,${covers[0].data.toString("base64")}`;
            } else {
                cover.value = "/album.svg";
            }
        }
    }
);

const playOrPause = () => {
    if (playerStore.playing) {
        playerStore.pause();
    } else {
        playerStore.play();
    }
};

const onPlaybackEnded = () => {
    playerStore.onPlayBackEnded();
};
const updatePlayPosition = () => {
    playPosition.value = playerStore.audioElement.currentTime;
};
const updatePlayerTime = (value: number) => {
    playPosition.value = value;
    playerStore.audioElement.currentTime = value;
};
const checkPlayingStatus = () => {
    if (!playerStore.isPlaying) {
        playerStore.play();
    }
};
const checkPausedStatus = () => {
    if (playerStore.isPlaying) {
        playerStore.pause();
    }
};
const switchRepeat = () => {
    playerStore.repeat--;
    if (playerStore.repeat < 0) {
        playerStore.repeat = 2;
    }
};
const switchShuffle = () => {
    playerStore.shuffle = !playerStore.shuffle;
};
const switchFavourite = () => {
    playerStore.switchFavourite(playerStore.currentTrack);
};
</script>

<template>
    <div
        class="musicplayer grid items-center p-3 gap-3 bottom-0 w-full h-20 bg-overlay backdrop-blur-2xl fixed select-none border-t-2 border-divider"
    >
        <div class="hidden">
            <audio
                :src="playerStore.currentTrack.path"
                preload="auto"
                ref="audioElement"
                @ended="onPlaybackEnded"
                @timeupdate="updatePlayPosition"
                @play="checkPlayingStatus"
                @pause="checkPausedStatus"
            ></audio>
        </div>
        <div class="stats grid gap-x-3 w-full">
            <div class="cover w-14 h-14 rounded-md object-cover relative">
                <img class="w-14 h-14 rounded-md blur-lg absolute left-0 top-0" :src="cover" />
                <img class="w-14 h-14 rounded-md absolute left-0 top-0" :src="cover" />
            </div>
            <p class="title font-medium text-sm text-ellipsis whitespace-nowrap overflow-x-hidden w-full">
                {{ playerStore.currentTrack.title }}
            </p>
            <p class="artists text-xs">{{ displayArtists }}</p>
        </div>
        <div class="controls flex flex-row gap-1 items-center">
            <IconButton size="medium">skip_previous</IconButton>
            <IconButton size="large" @click="playOrPause">{{
                playerStore.playing ? "pause" : "play_arrow"
            }}</IconButton>
            <IconButton size="medium">skip_next</IconButton>
        </div>
        <p class="currentTime">{{ currentTime }}</p>
        <div class="playerProgress w-full">
            <Slider
                :value="playPosition"
                :min="0"
                :max="playerStore.currentTrack.duration"
                @update:value="updatePlayerTime"
            ></Slider>
        </div>
        <p class="trackLength">{{ trackLength }}</p>
        <IconButton size="small" @click="switchRepeat">{{ repeatIcon }}</IconButton>
        <IconButton size="small" @click="switchShuffle">
            {{ playerStore.shuffle ? "shuffle_on" : "shuffle" }}
        </IconButton>
        <IconButton size="small" @click="switchFavourite">
            {{ playerStore.currentTrack?.favourite ? "favorite" : "favorite_border" }}
        </IconButton>
    </div>
</template>

<style lang="sass">
.musicplayer
    grid-template-columns: var(--sideBarWidth) min-content max-content 1fr max-content min-content min-content min-content

.stats
    grid-template-areas: "cover title" "cover artists"
    grid-template-columns: 56px auto
    grid-template-rows: 1fr 1fr

    .cover
        grid-area: cover

    .title
        grid-area: title

    .artists
        grid-area: artists
</style>
