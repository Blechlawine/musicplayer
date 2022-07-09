import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./styles/index.css";
import { IAudioMetadata } from "music-metadata";
import routes from "./router/index";
import { createRouter, createWebHistory } from "vue-router";
import persistedStatePlugin from "pinia-plugin-persistedstate";

declare global {
    interface Window {
        api: {
            closeWindow: () => void;
            minimizeWindow: () => void;
            maximizeWindow: () => void;
            scanLibrary: () => Promise<void>;
            addLibraryPath: ({}: { path: string; name: string }) => Promise<ILibraryPath>;
            getLibraryPaths: () => Promise<ILibraryPath[]>;
            getTracks: () => Promise<ITrack[]>;
            getArtists: () => Promise<IArtist[]>;
            getAlbums: () => Promise<IAlbum[]>;
            getGenres: () => Promise<IGenre[]>;
            getFavourites: () => Promise<ITrack[]>;
            readMetadata: (path: string) => Promise<IAudioMetadata>;
            saveFavouriteForTrack: (trackId: string, favourite: boolean) => Promise<ITrack | null>;
            increasePlayCountForTrack: (trackId: string, timesPlayed: number) => Promise<ITrack | null>;
        };
        events: {
            subscribe: (event: string, handler: (...args: any[]) => void) => void;
        };
    }
}

const pinia = createPinia();
pinia.use(persistedStatePlugin);

const router = createRouter({
    routes,
    history: createWebHistory(),
});

createApp(App).use(pinia).use(router).mount("#app");
