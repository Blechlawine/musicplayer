import { BrowserWindow } from "electron";

const windowApi = (win: BrowserWindow) => ({
    closeWindow: () => {
        if (win) {
            win.close();
        }
    },
    minimizeWindow: () => {
        if (win) {
            win.minimize();
        }
    },
    maximizeWindow: () => {
        if (win) {
            win.maximize();
        }
    },
});

export default windowApi;

export type TWindowApi = ReturnType<typeof windowApi>;
export type InferWindowApiOutput<T extends keyof TWindowApi> = ReturnType<TWindowApi[T]>;
