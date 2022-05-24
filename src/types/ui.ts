import { Track } from "./database";

export type TrackListColumn = {
    name: string;
    width: number;
    sorted: -1 | 0 | 1;
    field: (track: Track) => string | number;
};

export type ContextMenuEntry = {
    label: string;
    action: () => void;
};

export type SidebarSection = {
    title: string;
    open: boolean;
    entries: SidebarLink[];
};

export type SidebarLink = {
    label: string;
    icon: string;
    link: string;
};
