import Landing from "../pages/home/Landing.vue";
import Home from "../pages/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: "/",
                redirect: "/landing",
            },
            {
                path: "/landing",
                name: "landing",
                component: Landing,
            },
            {
                path: "/favourites",
                name: "favourites",
                component: () => import("../pages/home/Favourites.vue"),
            },
            {
                path: "/tracks",
                name: "Tracks",
                component: () => import("../pages/home/Tracks.vue"),
            },
            {
                path: "/artists",
                name: "Artists",
                component: () => import("../pages/home/Artists.vue"),
            },
            {
                path: "/albums",
                name: "Albums",
                component: () => import("../pages/home/Albums.vue"),
            },
            {
                path: "/genres",
                name: "Genres",
                component: () => import("../pages/home/Genres.vue"),
            },
            {
                path: "/artist/:id",
                name: "Artist",
                component: () => import("../pages/home/artist/index.vue"),
                props: true,
                children: [
                    {
                        path: "/artist/:id/tracks",
                        name: "Artisttracks",
                        component: () => import("../pages/home/artist/Tracks.vue"),
                        props: true,
                    },
                ],
            },
        ],
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("../pages/Settings.vue"),
        children: [
            {
                path: "/settings",
                redirect: "/settings/library",
            },
            {
                path: "/settings/library",
                name: "library",
                component: () => import("../pages/settings/Library.vue"),
            },
            {
                path: "/settings/window",
                name: "window",
                component: () => import("../pages/settings/Window.vue"),
            },
        ],
    },
];

export default routes;
