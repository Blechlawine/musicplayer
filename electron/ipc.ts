// electron context
import { BrowserWindow, ipcMain } from "electron";
import windowApi from "./api/window";
import libraryApi from "./api/library";
import filesApi from "./api/files";

export const registerIpcHandlers = (win: BrowserWindow) => {
    const windowEventHandlers = windowApi(win);
    windowEventHandlers.forEach(({ event, handler }) => {
        ipcMain.on(event, handler);
    });
    const libraryEventHandlers = libraryApi();
    libraryEventHandlers.forEach(({ event, handler }) => {
        ipcMain.handle(event, handler);
    });
    const filesEventHandlers = filesApi();
    filesEventHandlers.forEach(({ event, handler }) => {
        ipcMain.handle(event, handler);
    });
};
