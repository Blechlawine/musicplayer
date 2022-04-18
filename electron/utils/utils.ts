import fs from "fs";
import p from "path";

export const splitTime = (secondsIn: number): [number, number, number] => {
    let seconds = Math.floor(secondsIn % 60);
    let minutes = Math.floor(secondsIn / 60) % 60;
    let hours = Math.floor(secondsIn / 60 / 60);
    return [hours, minutes, seconds];
};

export const walk = (path: string, callback: (path: string, dirent: fs.Stats) => void) => {
    // walk directory tree starting from path
    let walkStack = [path];
    while (walkStack.length) {
        const dirPath = walkStack.pop();
        if (dirPath) {
            let files = fs.readdirSync(dirPath);
            files.forEach((file) => {
                let filePath = p.join(dirPath, file);
                let stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    walkStack.push(filePath);
                } else {
                    callback(filePath, stat);
                }
            });
        }
    }
};
