interface IColumn<T extends ITrack | IArtist | IAlbum | IPlaylistTrack> {
    name: string;
    width: number;
    sorted: -1 | 0 | 1;
    field: (item: T) => string | number;
}

interface IContextMenuEntry {
    label: string;
    action: () => void;
    children?: IContextMenuEntry[];
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
