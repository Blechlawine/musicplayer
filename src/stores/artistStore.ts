import { defineStore } from "pinia";

interface IState {
    artists: Array<IArtist>;
}

type TGetters = {
    getArtist: (state: IState) => (id: string) => IArtist | undefined;
};

interface IActions {
    fetchAllArtists: () => void;
}

const useArtists = defineStore<"artists", IState, TGetters, IActions>("artists", {
    state: () => ({
        artists: [],
    }),
    getters: {
        getArtist: (state) => (id) => state.artists.find((a) => a.id === id),
    },
    actions: {
        async fetchAllArtists() {
            this.artists = await window.api.getArtists();
        },
    },
});

export default useArtists;
