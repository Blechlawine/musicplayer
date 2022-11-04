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

export function convertBuffersToBase64(object: any): any {
    // Iterate over object and convert keys with type buffer to base64 strings and keep everything else as is
    let result: any = {};
    if (Array.isArray(object)) {
        result = object.map((item: any) => convertBuffersToBase64(item));
    } else if (typeof object === "object") {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element: any = object[key];
                if (element instanceof Buffer) {
                    result[key] = element.toString("base64");
                } else if (typeof element === "object") {
                    result[key] = convertBuffersToBase64(element);
                } else if (Array.isArray(element)) {
                    result[key] = element.map((e: any) => convertBuffersToBase64(e));
                } else {
                    result[key] = element;
                }
            }
        }
    } else if (object instanceof Buffer) {
        result = object.toString("base64");
    } else {
        result = object;
    }
    return result;
}