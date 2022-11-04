import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./styles/index.css";
import { IAudioMetadata } from "music-metadata";
import routes from "./router/index";
import { createRouter, createWebHistory } from "vue-router";
import persistedStatePlugin from "pinia-plugin-persistedstate";
import type { InferLibraryApiOutput, InferLibraryApiInput, TLibraryApi } from "../electron/api/library";
import type { InferWindowApiOutput, TWindowApi } from "../electron/api/window";
import type { InferFilesApiInput, InferFilesApiOutput, TFilesApi } from "../electron/api/files";

declare global {
    interface Window {
        api: {
            [K in keyof TLibraryApi]: (...value: InferLibraryApiInput<K>) => InferLibraryApiOutput<K>;
        } & {
            [K in keyof TWindowApi]: () => InferWindowApiOutput<K>;
        } & {
            [K in keyof TFilesApi]: (...value: InferFilesApiInput<K>) => InferFilesApiOutput<K>;
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

router.beforeEach((to, from) => {
    console.log("route changed from: ", from.fullPath, " to:", to.fullPath);
});

createApp(App).use(pinia).use(router).mount("#app");
