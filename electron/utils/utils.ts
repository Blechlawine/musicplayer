import fs from "fs";
import p from "path";

export const splitTime = (secondsIn: number): [number, number, number] => {
    let seconds = Math.floor(secondsIn % 60);
    let minutes = Math.floor(secondsIn / 60) % 60;
    let hours = Math.floor(secondsIn / 60 / 60);
    return [hours, minutes, seconds];
};

export function* walkIterator(path: string | string[]): Generator<string, void, void> {
    // walk directory tree starting from path
    let walkStack = Array.isArray(path) ? path : [path];
    while (walkStack.length) {
        const dirPath = walkStack.pop();
        if (dirPath) {
            let files = fs.readdirSync(dirPath);
            for (const file of files) {
                let filePath = p.join(dirPath, file);
                let stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    walkStack.push(filePath);
                } else {
                    yield filePath;
                }
            }
        }
    }
}
