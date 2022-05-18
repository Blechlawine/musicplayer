import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { LibraryPath, Track } from "./types/database";
import "./styles/index.css";
import { IAudioMetadata } from "music-metadata";

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
            readMetadata: (path: string) => Promise<IAudioMetadata>;
        };
    }
}

const store = createPinia();

createApp(App).use(store).mount("#app");
