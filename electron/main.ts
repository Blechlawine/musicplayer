import { BrowserWindow } from "electron";
import path from "path";
import datasource from "./database/database";
import { registerIpcHandlers } from "./ipc";
import fs from "fs";

let windowSettings = {
    width: 1000,
    height: 600,
    maximized: false,
    minimized: false,
};
export default class Main {
    static mainWindow: BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;

    private static async loadLastWindowSettings(): Promise<any> {
        const exists = fs.existsSync(path.join(Main.application.getPath("userData"), "window.json"));
        if (!exists) {
            await Main.saveWindowSettings()
                .then(() => {
                    console.log("Saved window settings");
                })
                .catch((err) => {
                    console.error(err);
                });
            return Promise.resolve(windowSettings);
        } else {
            return new Promise((resolve, reject) => {
                fs.readFile(path.join(Main.application.getPath("userData"), "window.json"), "utf8", (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Loaded window settings", data);
                        resolve(JSON.parse(data));
                    }
                });
            });
        }
    }

    private static async saveWindowSettings() {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(Main.application.getPath("userData"), "window.json"),
                JSON.stringify(windowSettings),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }

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
        windowSettings = await Main.loadLastWindowSettings().catch((err) => {
            console.error(err);
        });
        console.log(windowSettings);
        const isDev = process.env.ENVIRONMENT == "development" ? true : false;

        Main.mainWindow = new Main.BrowserWindow({
            width: windowSettings.width,
            height: windowSettings.height,
            frame: false,
            backgroundColor: "#121418",
            webPreferences: {
                contextIsolation: true,
                preload: path.join(__dirname, "preload.js"),
                webSecurity: false, // Enables reading local files in the web context
            },
        });

        if (windowSettings.maximized) {
            Main.mainWindow.maximize();
        } else if (windowSettings.minimized) {
            Main.mainWindow.minimize();
        }

        const win = Main.mainWindow;
        win.on("resize", () => {
            windowSettings.width = win.getBounds().width;
            windowSettings.height = win.getBounds().height;
        });

        win.on("maximize", () => {
            windowSettings.maximized = true;
            windowSettings.minimized = false;
        });

        win.on("unmaximize", () => {
            windowSettings.maximized = false;
        });

        win.on("minimize", () => {
            windowSettings.minimized = true;
            windowSettings.maximized = false;
        });

        win.on("close", async () => {
            await Main.saveWindowSettings();
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
