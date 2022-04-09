// This file just starts the electron app
import { app, BrowserWindow } from "electron";
import Main from "./main";

Main.main(app, BrowserWindow);