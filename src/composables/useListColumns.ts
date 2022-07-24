export default function useListColumns<T extends ITrack | IAlbum | IArtist | IPlaylistTrack>(columns: IColumn<T>[]) {

    const sortBy = (column: IColumn<T>, ascending: boolean, list: T[]) => {
        columns.forEach((c) => (c.sorted = 0));
        column.sorted = ascending ? 1 : -1;
        list.sort((a, b) => {
            const fieldA = column.field(a);
            const fieldB = column.field(b);
            if (fieldA < fieldB) return ascending ? -1 : 1;
            if (fieldA > fieldB) return ascending ? 1 : -1;
            return 0;
        });
    };

    const columnHeaderClick = (column: IColumn<T>, list: T[]) => {
        sortBy(column, column.sorted !== 1, list);
    };

    return {
        columns,
        sortBy,
        columnHeaderClick,
    }
};