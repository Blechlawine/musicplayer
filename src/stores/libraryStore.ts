import { defineStore, StoreDefinition } from "pinia";

interface IState {
    libraryPaths: Array<ILibraryPath>;
};

type TGetters = {};

interface IActions {
    addLibraryPath(path: string, name: string): void;
    getLibraryPaths(): void;
}

// This store manages scanning, loading and saving of the music library.
const useLibary = defineStore<"library", IState, TGetters, IActions>("library", {
    state: () => ({
        libraryPaths: [],
    }),
    actions: {
        async addLibraryPath(path, name) {
            await window.api.addLibraryPath({ path, name });
            this.libraryPaths = await window.api.getLibraryPaths();
        },
        async getLibraryPaths() {
            this.libraryPaths = await window.api.getLibraryPaths();
        },
    },
});

export default useLibary;
