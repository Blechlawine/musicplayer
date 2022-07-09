import LibraryPath from "../database/model/LibraryPath";
import Track from "../database/model/Track";
import Artist from "../database/model/Artist";
import Genre from "../database/model/Genre";
import Album from "../database/model/Album";
import dataSource from "../database/database";
import mm from "music-metadata";
import { walkIterator } from "../utils/utils";
import { splitTime } from "../utils/utils";

async function saveArtists(metaArtists: string[]): Promise<Artist[]> {
    const artists = await Promise.all(
        metaArtists.map(async (artistName) => {
            let artist =
                (await Artist.findOne({ where: { name: artistName } })) ??
                Artist.create({
                    name: artistName,
                    albums: [],
                });
            await artist.save();
            return artist;
        })
    );
    return artists;
}

async function saveGenres(metaGenres: string[]): Promise<Genre[]> {
    const genres = metaGenres.map(async (genreName) => {
        let genre =
            (await Genre.findOne({ where: { name: genreName } })) ??
            Genre.create({
                name: genreName,
            });
        await genre.save();
        return genre;
    });
    return await Promise.all(genres);
}

async function saveAlbumWithArtists(artists: Artist[], metaAlbum: string): Promise<Album> {
    let album =
        (await Album.findOne({ where: { title: metaAlbum } })) ??
        Album.create({
            title: metaAlbum,
        });
    album.artists = [];
    await album.save();
    artists.forEach(async (artist) => {
        if (!album.artists.includes(artist)) {
            album.artists.push(artist);
        }
        await artist.save();
    });
    await album.save();
    return album;
}

export default () => [
    {
        event: "scanLibrary",
        handler: async (): Promise<void> => {
            console.log("Reloading music library...");
            await dataSource
                .getRepository(Track)
                .createQueryBuilder()
                .update({
                    exists: false,
                })
                .execute();
            const libraryPaths = await LibraryPath.find();
            if (libraryPaths.length > 0) {
                const pathIterator = walkIterator(libraryPaths.map((lp: LibraryPath) => lp.path));
                for (const path of pathIterator) {
                    if (/\.(mp3|wav|ogg)$/.test(path)) {
                        const track = (await Track.findOne({ where: { path } })) ?? new Track();
                        const meta = await mm.parseFile(path);
                        const time = splitTime(meta.format.duration ?? 0);
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
                        let artists: Artist[];
                        if (metaArtists === undefined) {
                            artists = [];
                        } else {
                            artists = await saveArtists(metaArtists);
                        }
                        track.artists = artists;
                        if (metaGenres === undefined) {
                            track.genres = [];
                        } else if (metaGenres.length > 0) {
                            track.genres = await saveGenres(metaGenres);
                        }
                        if (metaAlbum) {
                            track.album = await saveAlbumWithArtists(artists, metaAlbum);
                        }
                        await track.save();
                    }
                }
            }
            // TODO: remove albums and artists without tracks from the database
            console.log("Scanning done.");
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
    {
        event: "getTracks",
        handler: async (): Promise<Track[]> => {
            return await Track.find({
                relations: {
                    album: {
                        artists: true,
                    },
                    artists: true,
                },
            });
        },
    },
    {
        event: "getArtists",
        handler: async (): Promise<Artist[]> => {
            return await Artist.find({
                relations: {
                    albums: {
                        tracks: true,
                    },
                    tracks: true,
                },
            });
        },
    },
    {
        event: "getAlbums",
        handler: async (): Promise<Album[]> => {
            return await Album.find({
                relations: {
                    artists: true,
                    tracks: true,
                },
            });
        },
    },
    {
        event: "getFavourites",
        handler: async (): Promise<Track[]> => {
            return await Track.find({ where: { favourite: true } });
        },
    },
    {
        event: "saveFavouriteForTrack",
        handler: async (event: any, trackId: string, favourite: boolean): Promise<Track | null> => {
            const trackInDatabase = await Track.findOne({ where: { id: trackId } });
            if (trackInDatabase) {
                trackInDatabase.favourite = favourite;
                return await trackInDatabase.save();
            } else {
                return null;
            }
        },
    },
    {
        event: "increasePlayCountForTrack",
        handler: async (event: any, trackId: string, timesPlayed: number): Promise<Track | null> => {
            const trackInDatabase = await Track.findOne({ where: { id: trackId } });
            if (trackInDatabase) {
                trackInDatabase.timesPlayed = timesPlayed;
                return await trackInDatabase.save();
            } else {
                return null;
            }
        },
    },
];
