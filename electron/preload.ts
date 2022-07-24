// Render context
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    closeWindow: () => {
        ipcRenderer.send("closeWindow");
    },
    minimizeWindow: () => {
        ipcRenderer.send("minimizeWindow");
    },
    maximizeWindow: () => {
        ipcRenderer.send("maximizeWindow");
    },
    addLibraryPath: (data: { path: string; name: string }) => {
        return ipcRenderer.invoke("addLibraryPath", data);
    },
    deleteLibraryPath: (id: string) => {
        return ipcRenderer.invoke("deleteLibraryPath", id);
    },
    updateLibraryPath: (libraryPath: { id: string; name: string; path: string }) => {
        return ipcRenderer.invoke("updateLibraryPath", libraryPath);
    },
    getLibraryPaths: () => {
        return ipcRenderer.invoke("getLibraryPaths");
    },
    scanLibrary: () => {
        return ipcRenderer.invoke("scanLibrary");
    },
    getTracks: () => {
        return ipcRenderer.invoke("getTracks");
    },
    getArtists: () => {
        return ipcRenderer.invoke("getArtists");
    },
    getAlbums: () => {
        return ipcRenderer.invoke("getAlbums");
    },
    getGenres: () => {
        return ipcRenderer.invoke("getGenres");
    },
    getPlaylists: () => {
        return ipcRenderer.invoke("getPlaylists");
    },
    getPlaylist: (id: string) => {
        return ipcRenderer.invoke("getPlaylist", id);
    },
    getFavourites: () => {
        return ipcRenderer.invoke("getFavourites");
    },
    readMetadata: (path: string) => {
        return ipcRenderer.invoke("readMetadata", path);
    },
    saveFavouriteForTrack: (trackId: string, favourite: boolean) => {
        return ipcRenderer.invoke("saveFavouriteForTrack", trackId, favourite);
    },
    increasePlayCountForTrack: (trackId: string, timesPlayed: number) => {
        return ipcRenderer.invoke("increasePlayCountForTrack", trackId, timesPlayed);
    },
    createPlaylist: (title: string) => {
        return ipcRenderer.invoke("createPlaylist", title);
    },
    addTracksToPlaylist: (id: string, tracksIds: string[]) => {
        return ipcRenderer.invoke("addTracksToPlaylist", id, tracksIds);
    },
    removeTracksFromPlaylist: (id: string, trackIds: string[]) => {
        return ipcRenderer.invoke("removeTracksFromPlaylist", id, trackIds);
    },
});

contextBridge.exposeInMainWorld("events", {
    subscribe(event: string, handler: (...args: any[]) => void) {
        ipcRenderer.on(event, handler);
    },
});
