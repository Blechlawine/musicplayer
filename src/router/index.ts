import Landing from "../pages/home/Landing.vue";
import Home from "../pages/Home.vue";
import Favourites from "../pages/home/Favourites.vue";
import Tracks from "../pages/home/Tracks.vue";
import Artists from "../pages/home/Artists.vue";
import Artist from "../pages/home/artist/index.vue";
import ArtistTracks from "../pages/home/artist/Tracks.vue";
import ArtistAlbums from "../pages/home/artist/Albums.vue";
import Albums from "../pages/home/Albums.vue";
import Album from "../pages/home/album/index.vue";
import AlbumTracks from "../pages/home/album/Tracks.vue";
import Genres from "../pages/home/Genres.vue";
import Genre from "../pages/home/genre/index.vue";
import GenreTracks from "../pages/home/genre/Tracks.vue";
import Settings from "../pages/Settings.vue";
import SettingsLibrary from "../pages/settings/Library.vue";
import SettingsWindow from "../pages/settings/Window.vue";
import Playlists from "../pages/home/Playlists.vue";
import Playlist from "../pages/home/playlist/index.vue";
import PlaylistTracks from "../pages/home/playlist/Tracks.vue";

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
                component: Favourites,
            },
            {
                path: "/tracks",
                name: "Tracks",
                component: Tracks,
            },
            {
                path: "/artists",
                name: "Artists",
                component: Artists,
            },
            {
                path: "/albums",
                name: "Albums",
                component: Albums,
            },
            {
                path: "/genres",
                name: "Genres",
                component: Genres,
            },
            {
                path: "/playlists",
                name: "Playlists",
                component: Playlists,
            },
            {
                path: "/artist/:id",
                name: "Artist",
                component: Artist,
                props: true,
                children: [
                    {
                        path: "/artist/:id/tracks",
                        name: "Artisttracks",
                        component: ArtistTracks,
                        props: true,
                    },
                    {
                        path: "/artist/:id/albums",
                        name: "Artistalbums",
                        component: ArtistAlbums,
                        props: true,
                    },
                ],
            },
            {
                path: "/album/:id",
                name: "Album",
                component: Album,
                props: true,
                children: [
                    {
                        path: "/album/:id/tracks",
                        name: "Albumtracks",
                        component: AlbumTracks,
                        props: true,
                    },
                ],
            },
            {
                path: "/genre/:id",
                name: "Genre",
                component: Genre,
                props: true,
                children: [
                    {
                        path: "/genre/:id/tracks",
                        name: "Genretracks",
                        component: GenreTracks,
                        props: true,
                    },
                ],
            },
            {
                path: "/playlist/:id",
                name: "Playlist",
                component: Playlist,
                props: true,
                children: [
                    {
                        path: "/playlist/:id/tracks",
                        name: "Playlisttracks",
                        component: PlaylistTracks,
                        props: true,
                    }
                ]
            }
        ],
    },
    {
        path: "/settings",
        name: "settings",
        component: Settings,
        children: [
            {
                path: "/settings",
                redirect: "/settings/library",
            },
            {
                path: "/settings/library",
                name: "library",
                component: SettingsLibrary,
            },
            {
                path: "/settings/window",
                name: "window",
                component: SettingsWindow,
            },
        ],
    },
];

export default routes;
