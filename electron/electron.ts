// This file just starts the electron app
import { app, BrowserWindow } from "electron";
import Main from "./main";
console.log("Starting electron");
Main.main(app, BrowserWindow);
