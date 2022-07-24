import LibraryPath from "../database/model/LibraryPath";
import Track from "../database/model/Track";
import Artist from "../database/model/Artist";
import Genre from "../database/model/Genre";
import Album from "../database/model/Album";
import dataSource from "../database/database";
import mm from "music-metadata";
import { walkIterator } from "../utils/utils";
import { splitTime } from "../utils/utils";
import Playlist from "../database/model/Playlist";
import PlaylistTrack from "../database/model/PlaylistTrack";

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
        event: "deleteLibraryPath",
        handler: async (_: any, id: string): Promise<void> => {
            LibraryPath.delete({
                id,
            });
        },
    },
    {
        event: "updateLibraryPath",
        handler: async (_: any, libraryPath: LibraryPath) => {
            let found = await LibraryPath.findOne({
                where: {
                    id: libraryPath.id,
                },
            });
            if (found) {
                found.name = libraryPath.name;
                found.path = libraryPath.path;
                found.save();
                return found;
            }
            return null;
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
        event: "getGenres",
        handler: async (): Promise<Genre[]> => {
            return await Genre.find({
                relations: {
                    tracks: true,
                },
            });
        },
    },
    {
        event: "getPlaylists",
        handler: async (): Promise<Playlist[]> => {
            return await Playlist.find({
                relations: {
                    playlistTracks: true,
                },
            });
        },
    },
    {
        event: "getPlaylist",
        handler: async (_: any, id: string): Promise<Playlist | null> => {
            return await Playlist.findOne({
                where: {
                    id,
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
    {
        event: "createPlaylist",
        handler: async (_: any, title: string): Promise<Playlist> => {
            let playlist = new Playlist();
            playlist.title = title;
            await playlist.save();
            console.log("createPlaylist", playlist);
            return playlist;
        },
    },
    {
        event: "addTracksToPlaylist",
        handler: async (_: any, id: string, trackIds: string[]): Promise<Playlist | null> => {
            const playlist = await Playlist.findOne({ where: { id }, relations: { playlistTracks: true } });
            if (playlist) {
                trackIds.forEach(async (tid, index) => {
                    const track = await Track.findOne({ where: { id: tid } });
                    const existingPlt = playlist.playlistTracks.find((plt) => plt.track.id === tid);
                    console.log(playlist.playlistTracks, existingPlt);
                    if (!existingPlt) {
                        let plt = new PlaylistTrack();
                        plt.track = track!;
                        plt.index = playlist.playlistTracks?.length || index;
                        plt.playlist = playlist;
                        await plt.save();
                        playlist.playlistTracks.push(plt);
                    }
                });
                await playlist.save();
                return playlist;
            }
            return null;
        },
    },
    {
        event: "removeTracksFromPlaylist",
        handler: async (_: any, id: string, pltIds: string[]) => {
            const playlist = await Playlist.findOne({ where: { id }, relations: { playlistTracks: true } });
            if (playlist) {
                await dataSource
                    .getRepository(PlaylistTrack)
                    .createQueryBuilder()
                    .delete()
                    .where("id IN (:ids)", { ids: pltIds })
                    .execute();
                return playlist;
            }
            return null;
        },
    },
    {
        event: "updatePlaylist",
        handler: async (_: any, id: string, data: Playlist) => {
            const playlist = await Playlist.findOne({ where: { id }});
            if (playlist) {
                playlist.title = data.title;
                await playlist.save();
                return playlist;
            }
            return null;
        },
    },
];
