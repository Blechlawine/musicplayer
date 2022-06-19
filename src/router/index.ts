import Landing from "../pages/Landing.vue";
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
                component: () => import("../pages/Favourites.vue"),
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
            }
        ]
    },
];

export default routes;
