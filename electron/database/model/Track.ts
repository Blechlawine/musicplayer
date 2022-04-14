import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Track extends Model {
    declare id: string;
    declare title: string;
    declare path: string;
    declare timesPlayed: number;
    declare duration: number;
    declare seconds: number;
    declare minutes: number;
    declare hours: number;
    declare favourite: boolean;
    declare trackNumber: number;
    declare discNumber: number;
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
