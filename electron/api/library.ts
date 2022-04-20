import { LibraryPath, Track } from "../database/model";
import { LibraryPath as LibraryPathType } from "../../shared/types/database";
import mm from "music-metadata";
import { walkIterator } from "../utils/utils";
import { splitTime } from "../utils/utils";

export default () => [
    {
        event: "scanLibrary",
        handler: async (): Promise<string[]> => {
            console.log("Reloading music library...");
            const libraryPaths = await LibraryPath.findAll();
            let trackPaths: string[] = [];
            const pathIterator = walkIterator(libraryPaths.map((lp) => lp.path));
            for (const path of pathIterator) {
                // const trackExists = await Track.findOne({ where: { path } });
                // const meta = await mm.parseFile(path);
                // const time = splitTime(meta.format.duration ?? 0);
                trackPaths.push(path);
            }
            console.log("Scanning done.");
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
