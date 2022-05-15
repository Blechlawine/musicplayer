import { BrowserWindow } from "electron";

export default (win: BrowserWindow) => [
    {
        event: "closeWindow",
        handler: () => {
            if (win) {
                win.close();
            }
        },
    },
    {
        event: "minimizeWindow",
        handler: () => {
            if (win) {
                win.minimize();
            }
        },
    },
    {
        event: "maximizeWindow",
        handler: () => {
            if (win) {
                win.maximize();
            }
        },
    },
];
