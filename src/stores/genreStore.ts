import { defineStore } from "pinia";

interface IState {
    genres: IGenre[];
}

type TGetters = {
    getGenre: (state: IState) => (id: string) => IGenre | undefined;
};

interface IActions {
    fetchAllGenres: () => void;
}

const useGenres = defineStore<"genres", IState, TGetters, IActions>("genres", {
    state: (): IState => ({
        genres: [],
    }),
    getters: {
        getGenre: (state: IState) => (id: string) => state.genres.find((g) => g.id === id),
    },
    actions: {
        async fetchAllGenres() {
            this.genres = await window.api.getGenres();
        }
    }
});

export default useGenres;
