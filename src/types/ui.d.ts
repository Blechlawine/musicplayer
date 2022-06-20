interface ITrackListColumn {
    name: string;
    width: number;
    sorted: -1 | 0 | 1;
    field: (track: ITrack) => string | number;
}

interface IContextMenuEntry {
    label: string;
    action: () => void;
}

interface ISidebarSection {
    title: string;
    open: boolean;
    entries: ISidebarLink[];
}

interface ISidebarLink {
    label: string;
    icon: string;
    link: string;
}
