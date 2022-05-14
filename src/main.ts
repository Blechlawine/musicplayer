import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { LibraryPath, Track } from "./types/database";

declare global {
    interface Window {
        api: {
            closeWindow: () => void;
            scanLibrary: () => Promise<void>;
            addLibraryPath: ({}: { path: string; name: string }) => Promise<LibraryPath>;
            getLibraryPaths: () => Promise<LibraryPath[]>;
            getTracks: () => Promise<Track[]>;
        };
    }
}

const store = createPinia();

createApp(App).use(store).mount("#app");
