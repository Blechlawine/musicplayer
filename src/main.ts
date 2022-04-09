import { createApp } from "vue";
import App from "./App.vue";

declare global {
    interface Window {
        api: {
            closeWindow: () => void;
        };
    }
}

createApp(App).mount("#app");
