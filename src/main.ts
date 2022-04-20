import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { LibraryPath } from "../shared/types/database";

declare global {
    interface Window {
        api: {
            closeWindow: () => void;
            scanLibrary: () => Promise<string[]>;
            addLibraryPath: ({}: { path: string; name: string }) => Promise<LibraryPath>;
            getLibraryPaths: () => Promise<LibraryPath[]>;
        };
    }
}

const store = createPinia();

createApp(App).use(store).mount("#app");
