import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Track extends Model {
    static LibraryPath: any;
    static Album: any;
    static Genre: any;
    static Playlists: any;
    static PlaylistTracks: any;
}

Track.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timesPlayed: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        seconds: {
            type: DataTypes.INTEGER,
        },
        minutes: {
            type: DataTypes.INTEGER,
        },
        hours: {
            type: DataTypes.INTEGER,
        },
        favourite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        trackNumber: {
            type: DataTypes.INTEGER,
        },
        discNumber: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: "track",
    }
);

export default Track;
