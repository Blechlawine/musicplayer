import Landing from "../pages/Landing.vue";
import Home from "../pages/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: "",
                redirect: "landing",
            },
            {
                path: "landing",
                name: "landing",
                component: Landing,
            },
            {
                path: "favourites",
                name: "favourites",
                component: () => import("../pages/Favourites.vue"),
            },
        ]
    },
];

export default routes;
