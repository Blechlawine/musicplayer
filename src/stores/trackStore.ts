import { defineStore } from "pinia";

interface IState {
    tracks: Array<ITrack>;
}

type TGetters = {
    getTrackById: (state: IState) => (id: string | undefined) => ITrack | undefined;
    getTracksByIds: (state: IState) => (ids: string[]) => ITrack[];
    favourites: (state: IState) => ITrack[];
    getTracksFromArtist: (state: IState) => (artistId: string) => ITrack[];
};

interface IActions {
    fetchAllTracks: () => Promise<void>;
    switchFavourite: (trackId: string) => void;
    increasePlayCountForTrack: (trackId: string | undefined) => void;
}

const useTracks = defineStore<"tracks", IState, TGetters, IActions>("tracks", {
    state: () => ({
        tracks: [],
    }),
    getters: {
        getTrackById: (state) => (id) => {
            if (id) {
                return state.tracks.find((track) => track.id === id);
            } else {
                return undefined;
            }
        },
        getTracksByIds: (state) => (ids) => {
            return state.tracks.filter((track) => ids.includes(track.id));
        },
        favourites: (state) => {
            return state.tracks.filter((track) => track.favourite);
        },
        getTracksFromArtist: (state) => (artistId: string) => {
            return state.tracks.filter((track) => track.artists.some((artist) => artist.id === artistId));
        },
    },
    actions: {
        async fetchAllTracks() {
            this.tracks = await window.api.getTracks();
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
        increasePlayCountForTrack(trackId) {
            if (trackId) {
                let track = this.tracks.find((track) => track.id === trackId);
                if (track) {
                    track.timesPlayed++;
                    window.api.increasePlayCountForTrack(trackId, track.timesPlayed);
                } else {
                    console.error("Track not found");
                }
            }
        },
    },
});

export default useTracks;
