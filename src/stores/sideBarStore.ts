import { defineStore } from "pinia";
import { SidebarLink, SidebarSection } from "../types/ui";

interface IState {
    settings: Array<SidebarLink>;
    main: Array<SidebarSection>;
}

type TGetters = {};

interface IActions {}

const useSidebar = defineStore<"sidebar", IState, TGetters, IActions>("sidebar", {
    state: () => ({
        settings: [
            {
                label: "Library",
                icon: "music_note",
                link: "/settings/library",
            },
            {
                label: "Window",
                icon: "web_asset",
                link: "/settings/window",
            },
            {
                label: "Exit Settings",
                icon: "exit_to_app",
                link: "/",
            },
        ],
        main: [
            {
                title: "Recommended",
                open: true,
                entries: [
                    { label: "Home", icon: "home", link: "/landing" },
                    {
                        label: "Favourites",
                        icon: "favorite",
                        link: "/favourites",
                    },
                ],
            },
        ],
    }),
    actions: {},
});

export default useSidebar;
