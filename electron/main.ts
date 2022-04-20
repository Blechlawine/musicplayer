import { BrowserWindow } from "electron";
import path from "path";
import sequelize from "./database/database";
import { registerIpcHandlers } from "./ipc";
import "./database/model"; // Just for initializing the models in sequelize

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

    private static async onReady() {
        const isDev = process.env.ENVIRONMENT == "development" ? true : false;

        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                contextIsolation: true,
                preload: path.join(__dirname, "preload.js"),
                webSecurity: false, // Enables reading local files in the web context
            },
        });

        Main.mainWindow.loadURL(
            isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`
        );

        if (isDev) {
            Main.mainWindow.webContents.setDevToolsWebContents(new Main.BrowserWindow().webContents);
            Main.mainWindow.webContents.openDevTools();
        }

        
        await sequelize.sync();
        registerIpcHandlers(Main.mainWindow);
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
