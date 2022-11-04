import LibraryPath from "../database/model/LibraryPath";
import Track from "../database/model/Track";
import Artist from "../database/model/Artist";
import Genre from "../database/model/Genre";
import Album from "../database/model/Album";
import dataSource from "../database/database";
import mm from "music-metadata";

import { OmitTypeOrm, ParametersWithoutFirst } from "../utils/helpers";
import { walkIterator } from "../utils/utils";
import { splitTime } from "../utils/utils";
import Playlist from "../database/model/Playlist";
import PlaylistTrack from "../database/model/PlaylistTrack";

async function saveArtists(metaArtists: string[]): Promise<Artist[]> {
    const artists = (
        await Promise.all(
            metaArtists.map(async (artistName) => {
                return await Promise.all(
                    artistName
                        .split(/,|&|;/g)
                        .map((a) => a.trim())
                        .map(async (name) => {
                            console.log("Scanning/Creating Artist: " + name);
                            const artist =
                                (await Artist.findOne({ where: { name } })) ??
                                Artist.create({
                                    name,
                                    albums: [],
                                });
                            await artist.save();
                            return artist;
                        })
                );
            })
        )
    ).flat(2);
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
        (await Album.findOne({
            where: { title: metaAlbum },
            relations: { artists: true },
        })) ??
        Album.create({
            title: metaAlbum,
            artists: [],
        });
    album.artists = album.artists ?? [];
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

const libraryApi = () => ({
    scanLibrary: async () => {
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
        await dataSource.getRepository(Track).createQueryBuilder().delete().where("exists = false").execute();
        (
            await Artist.find({
                relations: {
                    albums: {
                        tracks: true,
                    },
                    tracks: true,
                },
            })
        ).forEach((artist) => {
            artist.albums.forEach((album) => {
                if (album.tracks.length === 0) {
                    album.remove();
                }
            });
            if (artist.tracks.length === 0) {
                artist.remove();
            }
        });
        (
            await Album.find({
                relations: {
                    tracks: true,
                },
            })
        ).forEach((album) => {
            if (album.tracks.length === 0) {
                album.remove();
            }
        });
        (
            await Genre.find({
                relations: {
                    tracks: true,
                },
            })
        ).forEach((genre) => {
            if (genre.tracks.length === 0) {
                genre.remove();
            }
        });
        console.log("Scanning done.");
    },
    addLibraryPath: async (_: any, { path, name }: { path: string; name: string }) => {
        const libraryPath = LibraryPath.create({
            path,
            name,
        }).save();
        return libraryPath;
    },
    deleteLibraryPath: async (_: any, id: string) => {
        LibraryPath.delete({
            id,
        });
    },
    updateLibraryPath: async (_: any, libraryPath: Pick<LibraryPath, "path" | "name" | "id">) => {
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
    getLibraryPaths: async (): Promise<LibraryPath[]> => {
        return await LibraryPath.find();
    },
    getTracks: async () => {
        return await Track.find({
            relations: {
                album: {
                    artists: true,
                },
                artists: true,
            },
        });
    },
    getArtists: async () => {
        return await Artist.find({
            relations: {
                albums: {
                    tracks: true,
                },
                tracks: true,
            },
        });
    },
    getAlbums: async () => {
        return await Album.find({
            relations: {
                artists: true,
                tracks: true,
            },
        });
    },
    getGenres: async () => {
        return await Genre.find({
            relations: {
                tracks: true,
            },
        });
    },
    getPlaylists: async () => {
        return await Playlist.find({
            relations: {
                playlistTracks: true,
            },
        });
    },
    getPlaylist: async (_: any, id: string) => {
        return await Playlist.findOne({
            where: {
                id,
            },
        });
    },
    getFavourites: async () => {
        return await Track.find({ where: { favourite: true } });
    },
    saveFavouriteForTrack: async (event: any, trackId: string, favourite: boolean) => {
        const trackInDatabase = await Track.findOne({ where: { id: trackId } });
        if (trackInDatabase) {
            trackInDatabase.favourite = favourite;
            return await trackInDatabase.save();
        } else {
            return null;
        }
    },
    increasePlayCountForTrack: async (event: any, trackId: string, timesPlayed: number) => {
        const trackInDatabase = await Track.findOne({ where: { id: trackId } });
        if (trackInDatabase) {
            trackInDatabase.timesPlayed = timesPlayed;
            return await trackInDatabase.save();
        } else {
            return null;
        }
    },
    createPlaylist: async (_: any, title: string) => {
        let playlist = new Playlist();
        playlist.title = title;
        await playlist.save();
        console.log("createPlaylist", playlist);
        return playlist;
    },
    addTracksToPlaylist: async (_: any, id: string, trackIds: string[]) => {
        const playlist = await Playlist.findOne({ where: { id }, relations: { playlistTracks: true } });
        if (playlist) {
            trackIds.forEach(async (tid, index) => {
                const track = await Track.findOne({ where: { id: tid } });
                const existingPlt = playlist.playlistTracks.find((plt) => plt.track.id === tid);
                console.log(playlist.playlistTracks, existingPlt);
                if (!existingPlt) {
                    let plt = new PlaylistTrack();
                    plt.track = track!;
                    plt.index = playlist.playlistTracks?.length + index;
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
    removeTracksFromPlaylist: async (_: any, id: string, pltIds: string[]) => {
        const playlist = await Playlist.findOne({ where: { id }, relations: { playlistTracks: true } });
        if (playlist) {
            await dataSource
                .getRepository(PlaylistTrack)
                .createQueryBuilder()
                .delete()
                .where("id IN (:ids)", { ids: pltIds })
                .execute();
            let highestIndex = -1;
            const plts = await PlaylistTrack.find({
                where: {
                    playlist: {
                        id,
                    },
                },
                relations: {
                    playlist: true,
                },
                order: {
                    index: "ASC",
                },
            });
            for (let plt of plts) {
                if (plt.index >= highestIndex + 1) {
                    plt.index = highestIndex + 1;
                    await plt.save();
                }
                highestIndex = plt.index;
            }
            return playlist;
        }
        return null;
    },
    updatePlaylist: async (_: any, id: string, data: Pick<Playlist, "title">) => {
        const playlist = await Playlist.findOne({ where: { id } });
        if (playlist) {
            playlist.title = data.title;
            await playlist.save();
            return playlist;
        }
        return null;
    },
    deletePlaylist: async (_: any, id: string) => {
        await dataSource.getRepository(Playlist).createQueryBuilder().delete().where("id = (:id)", { id }).execute();
    },
});

export type TLibraryApi = ReturnType<typeof libraryApi>;
export type InferLibraryApiOutput<T extends keyof TLibraryApi> = ReturnType<TLibraryApi[T]>;
export type InferLibraryApiInput<T extends keyof TLibraryApi> = ParametersWithoutFirst<TLibraryApi[T]>;

export default libraryApi;
