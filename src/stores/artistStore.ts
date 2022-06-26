import { defineStore } from "pinia";

interface IState {
    artists: Array<IArtist>;
}

type TGetters = {};

interface IActions {
    fetchAllArtists: () => void;
}

const useArtists = defineStore<"artists", IState, TGetters, IActions>("artists", {
    state: () => ({
        artists: [],
    }),
    actions: {
        async fetchAllArtists() {
            this.artists = await window.api.getArtists();
        },
    },
});

export default useArtists;
