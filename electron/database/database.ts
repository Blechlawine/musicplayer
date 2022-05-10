import { DataSource } from "typeorm";
import { app } from "electron";
import path from "path";
import LibraryPath from "./model/LibraryPath";
import Track from "./model/Track";
import Album from "./model/Album";
import Artist from "./model/Artist";
import Genre from "./model/Genre";
import Playlist from "./model/Playlist";
import PlaylistTrack from "./model/PlaylistTrack";

const datasource = new DataSource({
    type: "sqlite",
    database: path.join(app.getPath("userData"), "database.sqlite"),
    synchronize: true,
    logging: true,
    entities: [
        LibraryPath,
        Track,
        Album,
        Artist,
        Genre,
        Playlist,
        PlaylistTrack
    ],
});

export default datasource;
