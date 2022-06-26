import { defineStore } from "pinia";

interface IState {
    settings: Array<ISidebarLink>;
    main: Array<ISidebarSection>;
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
            {
                title: "Library",
                open: true,
                entries: [
                    {
                        label: "Tracks",
                        icon: "music_note",
                        link: "/tracks",
                    },
                    {
                        label: "Artists",
                        icon: "account_circle",
                        link: "/artists",
                    },
                    {
                        label: "Albums",
                        icon: "image",
                        link: "/albums",
                    },
                    {
                        label: "Genres",
                        icon: "star",
                        link: "/genres",
                    },
                ],
            },
        ],
    }),
    actions: {},
});

export default useSidebar;
