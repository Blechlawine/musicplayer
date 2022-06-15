import Home from "../pages/Home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/favourites",
        name: "favourites",
        component: () => import("../pages/Favourites.vue"),
    },
];

export default routes;
