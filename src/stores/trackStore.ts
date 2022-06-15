import { defineStore } from "pinia";
import { Track } from "../types/database";

interface IState {
    tracks: Array<Track>;
}

type TGetters = {}

interface IActions {
    fetchAllTracks: () => Promise<void>;
    fetchFavourites: () => Promise<void>;
    switchFavourite: (trackId: string) => void;
}

const useTracks = defineStore<"tracks", IState, TGetters, IActions>("tracks", {
    state: () => ({
        tracks: [],
    }),
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