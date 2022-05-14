export type LibraryPath = {
    id: string;
    name: string;
    path: string;
};

export type Track = {
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
    libraryPath: LibraryPath;
    artists: Artist[];
    album: Album | null;
    genres: Genre[];
    createdAt: Date;
    updatedAt: Date;
};

export type Artist = {
    id: string;
    name: string;
    tracks: Track[];
    createdAt: Date;
    updatedAt: Date;
};

export type Album = {
    id: string;
    title: string;
    artists: Artist[];
    tracks: Track[];
    createdAt: Date;
    updatedAt: Date;
};

export type Genre = {
    id: string;
    name: string;
    tracks: Track[];
    createdAt: Date;
    updatedAt: Date;
};
