import { BrowserWindow } from "electron";
import path from "path";

export default class Main {
    static mainWindow: BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== "darwin") {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onReady() {
        const isDev = process.env.ENVIRONMENT == "development" ? true : false;

        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                // nodeIntegration: true,
            },
        });

        Main.mainWindow.loadURL(
            isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`
        );

        if (isDev) {
            Main.mainWindow.webContents.openDevTools();
        }

        Main.mainWindow.on("closed", Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for

        Main.BrowserWindow = browserWindow;
        Main.application = app;

        app.on("window-all-closed", Main.onWindowAllClosed);

        app.on("ready", Main.onReady);
    }
}