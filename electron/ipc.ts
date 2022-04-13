// electron context
import { BrowserWindow, ipcMain } from "electron";
import windowApi from "./api/window";

export const registerIpcHandlers = (win: BrowserWindow) => {
    const windowEventHandlers = windowApi(win);
    windowEventHandlers.forEach(({ event, handler }) => {
        ipcMain.on(event, handler);
    });
};
