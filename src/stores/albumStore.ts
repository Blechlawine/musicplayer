import { defineStore } from "pinia";

interface IState {
    albums: IAlbum[];
}

type TGetters = {
    getAlbum: (state: IState) => (id: string) => IAlbum | undefined;
    getAlbumsFromArtist: (state: IState) => (id: string) => IAlbum[];
};

interface IActions {
    fetchAllAlbums: () => void;
}

const useAlbums = defineStore<"albums", IState, TGetters, IActions>("albums", {
    state: (): IState => ({
        albums: [],
    }),
    getters: {
        getAlbum: (state) => (id) => state.albums.find((a) => a.id === id),
        getAlbumsFromArtist: (state) => (id) => {
            return state.albums.filter((a) => a.artists.some((a) => a.id === id));
        },
    },
    actions: {
        async fetchAllAlbums() {
            this.albums = await window.api.getAlbums();
        },
    },
});

export default useAlbums;
