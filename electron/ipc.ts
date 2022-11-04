// electron context
import { BrowserWindow, ipcMain } from "electron";
import windowApi from "./api/window";
import libraryApi from "./api/library";
import filesApi from "./api/files";

export const registerIpcHandlers = (win: BrowserWindow) => {
    const windowEventHandlers = windowApi(win);
    Object.entries(windowEventHandlers).forEach(([event, handler]) => {
        ipcMain.on(event, handler);
    });
    const libraryEventHandlers = libraryApi();
    Object.entries(libraryEventHandlers).forEach(([event, handler]) => {
        ipcMain.handle(event, handler);
    });
    const filesEventHandlers = filesApi();
    Object.entries(filesEventHandlers).forEach(([event, handler]) => {
        ipcMain.handle(event, handler);
    });
};
