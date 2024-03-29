<script setup lang="ts">
import usePlayer from "../stores/playerStore";
import IconButton from "./buttons/IconButton.vue";
import Slider from "./inputs/Slider.vue";
import TrackListCompact from "./lists/TrackListCompact.vue";
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { splitTime } from "../../electron/utils/utils";
import { formatTime } from "../utils/utils";
import useTracks from "../stores/trackStore";
import albumIcon from "../assets/album.svg";

const playerStore = usePlayer();
const TrackStore = useTracks();

const cover = ref(albumIcon);
const audioElement = ref(null);
const playPosition = ref(0);
const queueOpen = ref(false); // TODO: move this into a store, to save it in settings
const currentTrack = computed(() => TrackStore.getTrackById(playerStore.getCurrentTrackId));
const queue = computed(() => TrackStore.getTracksByIds(playerStore.queue));
const displayArtists = computed(
    () => currentTrack.value?.artists?.map((a: IArtist) => a.name).join(", ") || "Unkown artist"
);
const currentTime = computed(() => formatTime(...splitTime(playPosition.value)));
const trackLength = computed(() =>
    formatTime(currentTrack.value?.hours || 0, currentTrack.value?.minutes || 0, currentTrack.value?.seconds || 0)
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
const trackFilename = computed(() => currentTrack.value?.path.match(/[\w\.,\-~\s]*\.(mp3|wav|ogg)$/gm)?.[0]);

onMounted(() => {
    playerStore.audioElement = audioElement.value;
});

watch(
    () => currentTrack.value!,
    async (track: ITrack) => {
        if (track) {
            const metadata = await window.api.readMetadata(track.path);
            const covers = metadata.common.picture;
            if (covers && covers.length > 0) {
                cover.value = `data:${covers[0].format};base64,${covers[0].data.toString("base64")}`;
            } else {
                cover.value = albumIcon;
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
    playPosition.value = playerStore.audioElement!.currentTime;
};
const updatePlayerTime = (value: number) => {
    playPosition.value = value;
    playerStore.audioElement!.currentTime = value;
};
const checkPlayingStatus = () => {
    playerStore.play();
};
const checkPausedStatus = () => {
    playerStore.pause();
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
    if (playerStore.getCurrentTrackId) {
        TrackStore.switchFavourite(playerStore.getCurrentTrackId);
    }
};
const toggleQueue = () => {
    queueOpen.value = !queueOpen.value;
};

const next = () => {
    playerStore.nextTrack();
    nextTick(playerStore.play);
};
const previous = () => {
    if (playPosition.value < 1) {
        // TODO: make this a setting
        playerStore.previousTrack();
        nextTick(playerStore.play);
    } else {
        updatePlayerTime(0);
    }
};
</script>

<template>
    <div
        class="musicplayer fixed flex items-center p-3 pr-6 gap-3 bottom-0 w-full h-20 bg-overlay backdrop-blur-xl select-none border-t-2 border-divider"
    >
        <div class="hidden">
            <audio
                :src="`file://${currentTrack?.path || ''}`"
                preload="auto"
                ref="audioElement"
                @ended="onPlaybackEnded"
                @timeupdate="updatePlayPosition"
                @play="checkPlayingStatus"
                @pause="checkPausedStatus"
            ></audio>
        </div>
        <div class="stats flex gap-x-3 w-[var(--sideBarWidth)] items-center">
            <div class="cover w-14 h-14 rounded-md object-cover relative">
                <img class="w-14 h-14 rounded-md blur-lg absolute left-0 top-0" :src="cover" />
                <img class="w-14 h-14 rounded-md absolute left-0 top-0" :src="cover" />
            </div>
            <div class="statsText">
                <p class="title font-medium text-sm text-ellipsis whitespace-nowrap overflow-x-hidden w-full">
                    <span v-if="currentTrack?.title">{{ currentTrack.title }}</span>
                    <i v-else>{{ trackFilename ?? "unkown" }}</i>
                </p>
                <p class="artists text-xs w-full max-w-[200px]">{{ displayArtists }}</p>
            </div>
        </div>
        <div class="controls flex flex-row gap-1 items-center">
            <IconButton size="medium" @click="previous">skip_previous</IconButton>
            <IconButton size="large" @click="playOrPause">
                {{ playerStore.playing ? "pause" : "play_arrow" }}
            </IconButton>
            <IconButton size="medium" @click="next">skip_next</IconButton>
        </div>
        <p class="currentTime">{{ currentTime }}</p>
        <div class="playerProgress w-full">
            <Slider
                :value="playPosition"
                :min="0"
                :max="currentTrack?.duration || 0"
                @update:value="updatePlayerTime"
            ></Slider>
        </div>
        <p class="trackLength">{{ trackLength }}</p>
        <div class="dividerVert"></div>
        <div class="volumeWrapper grid items-center">
            <span class="material-icons">volume_up</span>
            <div class="volume w-full">
                <Slider
                    :value="playerStore.volume"
                    :min="0"
                    :max="1"
                    handleSize="small"
                    :alwaysShowHandle="false"
                    @update:value="(value) => playerStore.setVolume(value)"
                ></Slider>
            </div>
        </div>
        <IconButton size="small" @click="switchRepeat">{{ repeatIcon }}</IconButton>
        <IconButton size="small" @click="switchShuffle">
            {{ playerStore.shuffle ? "shuffle_on" : "shuffle" }}
        </IconButton>
        <IconButton size="small" @click="switchFavourite">
            {{ currentTrack?.favourite ? "favorite" : "favorite_border" }}
        </IconButton>
        <IconButton size="small" :highlight="queueOpen" @click="toggleQueue">queue_music</IconButton>
    </div>
    <div
        v-if="queueOpen"
        class="queue absolute right-3 bottom-3 mb-20 p-3 bg-overlay border-divider border-2 rounded-lg backdrop-blur-xl w-[300px] z-10 overflow-y-auto select-none"
    >
        <TrackListCompact :tracks="queue" :selectable="false" />
    </div>
</template>

<style lang="sass">
.musicplayer
    grid-template-columns: var(--sideBarWidth) min-content max-content 1fr max-content 2px max-content min-content min-content min-content min-content
    z-index: 10

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

    .statsText
        width: calc(var(--sideBarWidth) - 3.5rem - 0.75rem)

.queue
    max-height: calc(100vh - 200px)

.volumeWrapper
    grid-template-columns: 24px 156px
</style>
