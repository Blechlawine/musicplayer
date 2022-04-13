import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

declare global {
    interface Window {
        api: {
            closeWindow: () => void;
        };
    }
}

const store = createPinia();

createApp(App).use(store).mount("#app");
