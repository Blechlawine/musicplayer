import { defineStore, StoreDefinition } from "pinia";
import { Track } from "../types/database";
import { nextTick } from "vue";

interface IState {
    queue: Array<Track>;
    volume: number;
    playing: boolean;
    currentTrackIndex: number;
    audioElement?: HTMLAudioElement;
    repeat: 0 | 1 | 2;
    shuffle: boolean;
};

type TGetters = {
    currentTrack: (state: IState) => Track | undefined;
}

interface IActions {
    play(): void;
    pause(): void;
    nextTrack(): void;
    previousTrack(): void;
    onPlayBackEnded(): void;
    setVolume(volume: number): void;
}

const usePlayer: StoreDefinition = defineStore<"player", IState, TGetters, IActions>("player", {
    state: () => ({
        queue: [],
        volume: 1,
        playing: false,
        currentTrackIndex: -1,
        audioElement: undefined,
        repeat: 0,
        shuffle: false,
    }),
    getters: {
        currentTrack: (state) => state.queue[state.currentTrackIndex] || {},
    },
    actions: {
        play() {
            if (this.audioElement && this.queue.length > 0) {
                this.audioElement.play().then(() => {
                    this.playing = true;
                });
            }
        },
        pause() {
            console.log("pause");
            if (this.audioElement) {
                this.audioElement.pause();
                this.playing = false;
            }
        },
        nextTrack() {
            if (!this.shuffle) {
                if (this.currentTrackIndex < this.queue.length - 1) {
                    this.currentTrackIndex++;
                } else {
                    this.currentTrackIndex = 0;
                }
            } else {
                this.currentTrackIndex = Math.floor(Math.random() * this.queue.length);
            }
        },
        previousTrack() {
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.queue.length - 1;
            }
        },
        onPlayBackEnded() {
            if (this.repeat === 2 || this.currentTrackIndex < this.queue.length - 1) {
                this.nextTrack();
                nextTick(this.play);
            } else if (this.repeat === 1) {
                this.audioElement!.currentTime = 0;
                nextTick(this.play);
            } else {
                this.pause();
            }
        },
        setVolume(volume) {
            this.volume = volume;
            if (this.audioElement) {
                this.audioElement.volume = volume;
            }
        },
    },
});

export default usePlayer;
