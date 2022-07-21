import { defineStore, StoreDefinition } from "pinia";

interface IState {
    libraryPaths: Array<ILibraryPath>;
}

type TGetters = {};

interface IActions {
    addLibraryPath(path: string, name: string): void;
    deleteLibraryPath(libraryPath: ILibraryPath): void;
    updateLibraryPath(libraryPath: ILibraryPath, data: TMakeOptional<ILibraryPath>): Promise<ILibraryPath | null>;
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
        async deleteLibraryPath(libraryPath) {
            this.libraryPaths.splice(this.libraryPaths.indexOf(libraryPath), 1);
            window.api.deleteLibraryPath(libraryPath.id);
        },
        async updateLibraryPath(libraryPath, data) {
            let temp = this.libraryPaths.find((lp) => lp.id === libraryPath.id);
            if (temp) {
                Object.entries(data).forEach((e) => {
                    temp![e[0] as keyof ILibraryPath] = e[1];
                });
                await window.api.updateLibraryPath({ ...temp });
                return temp;
            }
            return null;
        },
        async getLibraryPaths() {
            this.libraryPaths = await window.api.getLibraryPaths();
        },
    },
});

export default useLibary;
