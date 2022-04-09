// electron context
import { BrowserWindow, ipcMain } from "electron";

export const registerIpcHandlers = (win: BrowserWindow | null) => {
    ipcMain.on("closeWindow", () => {
        if (win) {
            win.close();
        }
    });
};
