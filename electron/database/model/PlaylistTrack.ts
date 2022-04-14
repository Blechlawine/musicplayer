import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class PlaylistTrack extends Model {
    static Playlist: any;
    static Track: any;
}

PlaylistTrack.init(
    {
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "playlistTrack",
    }
);

export default PlaylistTrack;
