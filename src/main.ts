import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { LibraryPath, Track } from "./types/database";
import "./styles/index.css";
import { IAudioMetadata } from "music-metadata";
import routes from "./router/index";
import { createRouter, createWebHistory } from "vue-router";

declare global {
    interface Window {
        api: {
            closeWindow: () => void;
            minimizeWindow: () => void;
            maximizeWindow: () => void;
            scanLibrary: () => Promise<void>;
            addLibraryPath: ({}: { path: string; name: string }) => Promise<LibraryPath>;
            getLibraryPaths: () => Promise<LibraryPath[]>;
            getTracks: () => Promise<Track[]>;
            getFavourites: () => Promise<Track[]>;
            readMetadata: (path: string) => Promise<IAudioMetadata>;
            saveFavouriteForTrack: (trackId: string, favourite: boolean) => Promise<Track | null>;
        };
    }
}

const store = createPinia();

const router = createRouter({
    routes,
    history: createWebHistory(),
});

createApp(App).use(store).use(router).mount("#app");
