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
});

contextBridge.exposeInMainWorld("events", {
    subscribe(event: string, handler: (...args: any[]) => void) {
        ipcRenderer.on(event, handler);
    },
});
