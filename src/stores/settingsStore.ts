import { defineStore } from "pinia";

interface IState {
    window: {
        windowBar: {
            buttonLocation: "left" | "right";
            buttonStyle: "trafficLights" | "icons",
            buttonLocations: Array<"left" | "right">;
            buttonStyles: Array<"trafficLights" | "icons">;
        }
    }
}

type TGetters = {};

interface IActions {}

const useSettings = defineStore<"settings", IState, TGetters, IActions>("settings", {
    state: () => ({
        window: {
            windowBar: {
                buttonLocation: "right",
                buttonStyle: "trafficLights",
                buttonLocations: ["left", "right"],
                buttonStyles: ["icons", "trafficLights"],
            },
        },
    }),
    persist: {
        key: "settings",
        paths: ["window.windowBar.buttonLocation", "window.windowBar.buttonStyle"],
    },
    actions: {},
});

export default useSettings;
