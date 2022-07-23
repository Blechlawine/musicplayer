import { defineStore } from "pinia";

interface IState {
    tracks: Array<ITrack>;
}

type TGetters = {
    getTrackById: (state: IState) => (id: string | undefined) => ITrack | undefined;
    getTracksByIds: (state: IState) => (ids: string[]) => ITrack[];
    favourites: (state: IState) => ITrack[];
    getTracksFromArtist: (state: IState) => (artistId: string) => ITrack[];
    getTracksFromAlbum: (state: IState) => (albumId: string) => ITrack[];
    getTracksFromGenre: (state: IState) => (genreId: string) => ITrack[];
    getTracksFromPlaylist: (state: IState) => (playlist: IPlaylist) => ITrack[];
    getMostListened: (state: IState) => ITrack[];
};

interface IActions {
    fetchAllTracks: () => Promise<void>;
    switchFavourite: (trackId: string) => void;
    increasePlayCountForTrack: (trackId: string | undefined) => void;
}

const useTracks = defineStore<"tracks", IState, TGetters, IActions>("tracks", {
    state: () => ({
        tracks: [],
    }),
    getters: {
        getTrackById: (state) => (id) => {
            if (id) {
                return state.tracks.find((track) => track.id === id);
            } else {
                return undefined;
            }
        },
        getTracksByIds: (state) => (ids) => {
            return state.tracks.filter((track) => ids.includes(track.id));
        },
        favourites: (state) => {
            return state.tracks.filter((track) => track.favourite);
        },
        getTracksFromArtist: (state) => (artistId) => {
            return state.tracks.filter((track) => track.artists.some((artist) => artist.id === artistId));
        },
        getTracksFromAlbum: (state) => (albumId) => {
            return state.tracks.filter((track) => track.album?.id === albumId);
        },
        getTracksFromGenre: (state) => (genreId) => {
            return state.tracks.filter((track) => track.genres.some((genre) => genre.id === genreId));
        },
        getTracksFromPlaylist: (state) => (playlist) => {
            const trackIds = playlist.playlistTracks.map((plt) => plt.track.id);
            return state.tracks.filter((track) => trackIds.includes(track.id));
        },
        getMostListened: (state) => {
            return Array.from(state.tracks).sort((t1, t2) => t2.timesPlayed - t1.timesPlayed);
        },
    },
    actions: {
        async fetchAllTracks() {
            this.tracks = await window.api.getTracks();
        },
        switchFavourite(trackId) {
            let track = this.tracks.find((track) => track.id === trackId);
            if (track) {
                track.favourite = !track.favourite;
                window.api.saveFavouriteForTrack(trackId, track.favourite);
            } else {
                console.error("Track not found");
            }
        },
        increasePlayCountForTrack(trackId) {
            if (trackId) {
                let track = this.tracks.find((track) => track.id === trackId);
                if (track) {
                    track.timesPlayed++;
                    window.api.increasePlayCountForTrack(trackId, track.timesPlayed);
                } else {
                    console.error("Track not found");
                }
            }
        },
    },
});

export default useTracks;
