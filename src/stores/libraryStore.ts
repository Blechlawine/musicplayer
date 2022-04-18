import { defineStore, StoreDefinition } from "pinia";
import { LibraryPath } from "../../shared/types/database";

type LibraryState = {
    libraryPaths: Array<LibraryPath>;
};

// This store manages scanning, loading and saving of the music library.
const useLibary: StoreDefinition = defineStore("library", {
    state: (): LibraryState => ({
        libraryPaths: [],
    }),
    actions: {
        async addLibraryPath(path: string, name: string) {
            await window.api.addLibraryPath({ path, name });
            this.libraryPaths = await window.api.getLibraryPaths();
        },
        async getLibraryPaths() {
            this.libraryPaths = await window.api.getLibraryPaths();
        },
    },
});

export default useLibary;
