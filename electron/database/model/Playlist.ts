import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Playlist extends Model {
    declare id: string;
    declare title: string;
    static Tracks: any;
    static PlaylistTracks: any;
}

Playlist.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "playlist",
    }
);

export default Playlist;
