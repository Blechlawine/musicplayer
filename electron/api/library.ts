import LibraryPath from "../database/model/LibraryPath";
import database from "../database/database";
import mm from "music-metadata";
import { walkIterator } from "../utils/utils";
import { splitTime } from "../utils/utils";

export default () => [
    {
        event: "scanLibrary",
        handler: async (): Promise<string[]> => {
            console.log("Reloading music library...");
            const libraryPaths = await LibraryPath.find();
            let trackPaths: string[] = [];
            const pathIterator = walkIterator(libraryPaths.map((lp: LibraryPath) => lp.path));
            for (const path of pathIterator) {
                trackPaths.push(path);
            }
            console.log("Scanning done.");
            return trackPaths;
        },
    },
    {
        event: "addLibraryPath",
        handler: async (_: any, { path, name }: { path: string; name: string }): Promise<LibraryPath> => {
            const libraryPath = LibraryPath.create({
                path,
                name,
            }).save();
            return libraryPath;
        },
    },
    {
        event: "getLibraryPaths",
        handler: async (): Promise<LibraryPath[]> => {
            return await LibraryPath.find();
        },
    },
];
