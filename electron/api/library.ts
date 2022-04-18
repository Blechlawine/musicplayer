import { LibraryPath, Track } from "../database/model";
import { LibraryPath as LibraryPathType } from "../../shared/types/database";
import fs from "fs";
import mm from "music-metadata";
import { walk } from "../utils/utils";
import { splitTime } from "../utils/utils";

export default () => [
    {
        event: "scanLibrary",
        handler: async () => {
            console.log("Reloading music library...");
            const libraryPaths = await LibraryPath.findAll();
            let trackPaths: string[] = [];
            libraryPaths.forEach(async (libraryPath) => {
                walk(libraryPath.path, async (path: string, stats: fs.Stats) => {
                    if (stats.isFile()) {
                        const trackExists = await Track.findOne({ where: { path } });
                        const meta = await mm.parseFile(path);
                        const time = splitTime(meta.format.duration ?? 0);
                        console.log(path);
                        trackPaths.push(path);
                    }
                });
            });
            return trackPaths;
        },
    },
    {
        event: "addLibraryPath",
        handler: async (_: any, { path, name }: { path: string; name: string }): Promise<LibraryPathType> => {
            return await LibraryPath.create({ path, name });
        },
    },
    {
        event: "getLibraryPaths",
        handler: async (): Promise<LibraryPathType[]> => {
            return await LibraryPath.findAll();
        },
    },
];
