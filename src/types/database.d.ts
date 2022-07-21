interface ILibraryPath {
    id: string;
    name: string;
    path: string;
    tracks?: any; // TODO: needs to be tracks, when relation between tracks and library path is made
    updatedAt: Date;
    createdAt: Date;
}

interface ITrack {
    id: string;
    title: string;
    path: string;
    timesPlayed: number;
    duration: number | null;
    seconds: number;
    minutes: number;
    hours: number;
    favourite: boolean;
    trackNumber: number | null;
    diskNumber: number | null;
    libraryPath: ILibraryPath;
    artists: IArtist[];
    album: IAlbum | null;
    genres: IGenre[];
    createdAt: Date;
    updatedAt: Date;
}

interface IArtist {
    id: string;
    name: string;
    tracks: ITrack[];
    albums: IAlbum[];
    createdAt: Date;
    updatedAt: Date;
}

interface IAlbum {
    id: string;
    title: string;
    artists: IArtist[];
    tracks: ITrack[];
    createdAt: Date;
    updatedAt: Date;
}

interface IGenre {
    id: string;
    name: string;
    tracks: ITrack[];
    createdAt: Date;
    updatedAt: Date;
}
