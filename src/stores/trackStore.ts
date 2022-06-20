import { defineStore } from "pinia";
import { Track } from "../types/database";

interface IState {
    tracks: Array<Track>;
}

type TGetters = {
    getTrackById: (state: IState) => (id: string | undefined) => Track | undefined;
    getTracksByIds: (state: IState) => (ids: string[]) => Track[];
};

interface IActions {
    fetchAllTracks: () => Promise<void>;
    fetchFavourites: () => Promise<void>;
    switchFavourite: (trackId: string) => void;
}

const useTracks = defineStore<"tracks", IState, TGetters, IActions>("tracks", {
    state: () => ({
        tracks: [],
    }),
    getters: {
        getTrackById: (state) => (id) => {
            if (id) {
                return state.tracks.find((track) => track.id === id)
            } else {
                return undefined;
            }
        },
        getTracksByIds: (state) => (ids) => {
            return state.tracks.filter((track) => ids.includes(track.id));
        },
    },
    actions: {
        async fetchAllTracks() {
            this.tracks = await window.api.getTracks();
        },
        async fetchFavourites() {
            this.tracks = await window.api.getFavourites();
        },
        switchFavourite(trackId) {
            let track = this.tracks.find((track) => track.id === trackId);
            if (track) {
                track.favourite = !track.favourite;
                window.api.saveFavouriteForTrack(trackId, track.favourite);
            } else {
                console.error("Track not found");
            }
        },
    },
});

export default useTracks;
