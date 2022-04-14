import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class AlbumArtist extends Model {
    static Albums: any;
    static Artists: any;
}

AlbumArtist.init(
    {},
    {
        sequelize,
        modelName: "albumArtist",
    }
);

export default AlbumArtist;
