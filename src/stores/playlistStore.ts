import { defineStore } from "pinia";
import useSidebar from "./sideBarStore";

interface IState {
    playlists: IPlaylist[];
}

type TGetters = {
    getPlaylist: (state: IState) => (id: string) => IPlaylist | undefined;
};

interface IActions {
    updatePlaylistsInSidebar: () => void;
    addPlaylist: (playlist: IPlaylist) => void;
    fetchAllPlaylists: () => Promise<void>;
    addTracksToPlaylist: (id: string, trackIds: string[]) => Promise<void>;
    createPlaylist: (title: string) => Promise<IPlaylist>;
    removeTracksFromPlaylist: (id: string, trackIds: string[]) => Promise<void>;
    updatePlaylist: (id: string, data: TMakeOptional<IPlaylist>) => Promise<void>;
    deletePlaylist: (id: string) => Promise<void>;
}

const usePlaylist = defineStore<"playlist", IState, TGetters, IActions>("playlist", {
    state: () => ({
        playlists: [],
    }),
    getters: {
        getPlaylist: (state) => (id) => state.playlists.find((pl) => pl.id === id),
    },
    actions: {
        updatePlaylistsInSidebar() {
            const SidebarStore = useSidebar();
            SidebarStore.setPlaylistEntries(
                this.playlists.map((pl) => ({
                    label: pl.title,
                    icon: "queue_music",
                    link: `/playlist/${pl.id}/tracks`,
                }))
            );
        },
        addPlaylist(playlist) {
            this.playlists.push(playlist);
            this.updatePlaylistsInSidebar();
        },
        async fetchAllPlaylists() {
            this.playlists = await window.api.getPlaylists();
            this.updatePlaylistsInSidebar();
        },
        async addTracksToPlaylist(id, trackIds) {
            await window.api.addTracksToPlaylist(id, trackIds);
            this.fetchAllPlaylists();
        },
        async createPlaylist(title) {
            const playlist = await window.api.createPlaylist(title);
            this.addPlaylist(playlist);
            this.updatePlaylistsInSidebar();
            return playlist;
        },
        async removeTracksFromPlaylist(id, pltIds) {
            await window.api.removeTracksFromPlaylist(id, pltIds);
            this.fetchAllPlaylists();
        },
        async updatePlaylist(id, data) {
            await window.api.updatePlaylist(id, data);
            this.fetchAllPlaylists();
        },
        async deletePlaylist(id) {
            await window.api.deletePlaylist(id);
            this.fetchAllPlaylists();
        },
    },
});

export default usePlaylist;
