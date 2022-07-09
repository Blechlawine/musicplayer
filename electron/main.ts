import { BrowserWindow } from "electron";
import path from "path";
import datasource from "./database/database";
import { registerIpcHandlers } from "./ipc";
import windowStateKeeper from "electron-window-state";
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

        let mainWindowState = windowStateKeeper({
            defaultWidth: 1000,
            defaultHeight: 600,
        });

        Main.mainWindow = new Main.BrowserWindow({
            icon: path.join(__dirname, "../assets/icon.png"),
            width: mainWindowState.width,
            height: mainWindowState.height,
            x: mainWindowState.x,
            y: mainWindowState.y,
            frame: false,
            backgroundColor: "#121418",
            webPreferences: {
                contextIsolation: true,
                preload: path.join(__dirname, "preload.js"),
                webSecurity: false, // Enables reading local files in the web context
            },
        });

        mainWindowState.manage(Main.mainWindow);

        const win = Main.mainWindow;
        win.on("resize", () => {
            Main.mainWindow?.webContents.send("windowResize", Main.mainWindow.getBounds().width, Main.mainWindow.getBounds().height);
        });

        win.on("maximize", () => {
            Main.mainWindow?.webContents.send("windowMaximize");
        });

        win.on("unmaximize", () => {
            Main.mainWindow?.webContents.send("windowUnmaximize");
        });

        win.on("minimize", () => {
            Main.mainWindow?.webContents.send("windowMinimize");
        });

        Main.mainWindow.loadURL(
            isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`
        );

        if (isDev) {
            Main.mainWindow.webContents.setDevToolsWebContents(new Main.BrowserWindow().webContents);
            Main.mainWindow.webContents.openDevTools();
        }

        await datasource.initialize();
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
