import { Track } from "./database";

export type TrackListColumn = {
    name: string;
    width: number;
    sorted: -1 | 0 | 1;
    field: (track: Track) => string | number;
};
