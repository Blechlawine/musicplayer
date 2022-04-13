import { BrowserWindow } from "electron";

export default (win: BrowserWindow) => [
    {
        event: "closeWindow",
        handler: () => {
            if (win) {
                win.close();
            }
        }
    }
]