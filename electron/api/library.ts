import LibraryPath from "../database/model/LibraryPath";
import Track from "../database/model/Track";
import Artist from "../database/model/Artist";
import Genre from "../database/model/Genre";
import Album from "../database/model/Album";
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
                const trackExists = await Track.findOne({ where: { path } });
                console.log(trackExists);
                const meta = await mm.parseFile(path);
                const time = splitTime(meta.format.duration ?? 0);
                if (!trackExists) {
                    // Track does not exist, create it along with its album, genre, and artist
                    // check for album, genre, artist if they exist
                    let track = new Track();
                    track.path = path;
                    track.title = meta.common.title;
                    track.duration = meta.format.duration ?? 0;
                    track.seconds = time[2];
                    track.minutes = time[1];
                    track.hours = time[0];
                    track.trackNumber = meta.common.track.no;
                    track.diskNumber = meta.common.disk.no;
                    track.exists = true;
                    await track.save();
                    let metaArtists = meta.common.artists;
                    let metaAlbum = meta.common.album;
                    let metaGenres = meta.common.genre;
                    if (metaArtists === undefined) {
                        track.artists = [];
                    } else if (metaArtists?.length > 0) {
                        const artists = metaArtists.map(async (artistName) => {
                            let artist = await Artist.findOne({ where: { name: artistName } });
                            if (!artist) {
                                artist = Artist.create({
                                    name: artistName,
                                });
                            }
                            await artist.save();
                            return artist;
                        });
                        track.artists = await Promise.all(artists);
                    }
                    if (metaGenres === undefined) {
                        track.genres = [];
                    } else if (metaGenres.length > 0) {
                        const genres = metaGenres.map(async (genreName) => {
                            let genre = await Genre.findOne({ where: { name: genreName } });
                            if (!genre) {
                                genre = Genre.create({
                                    name: genreName,
                                });
                            }
                            await genre.save();
                            return genre;
                        });
                        track.genres = await Promise.all(genres);
                    }
                    if (metaAlbum) {
                        // TODO: read albumartists and create album for those artists
                    }
                    await track.save();
                } else {
                    // trackExists.title = meta.common.title;
                    // trackExists.duration = meta.format.duration ?? 0;
                    // trackExists.seconds = time[2];
                    // trackExists.minutes = time[1];
                    // trackExists.hours = time[0];
                    // trackExists.trackNumber = meta.common.track.no;
                    // trackExists.diskNumber = meta.common.disk.no;
                    // trackExists.exists = true;
                    // trackExists.save();
                }
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
