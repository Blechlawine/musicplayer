import { defineStore } from "pinia";

interface IState {
    settings: Array<ISidebarLink>;
    main: Array<ISidebarSection>;
}

type TGetters = {};

interface IActions {
    setPlaylistEntries: (entries: Array<ISidebarLink>) => void;
}

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
                        icon: "album",
                        link: "/albums",
                    },
                    {
                        label: "Genres",
                        icon: "star",
                        link: "/genres",
                    },
                    {
                        label: "Playlists",
                        icon: "queue_music",
                        link: "/playlists",
                    },
                ],
            },
            {
                title: "Playlists",
                open: true,
                entries: [], // this gets filled with an entry for each playlist
            },
        ],
    }),
    actions: {
        setPlaylistEntries(entries) {
            let section = this.main.find(s => s.title === "Playlists");
            if (section) section.entries = entries;
        },
    },
});

export default useSidebar;
