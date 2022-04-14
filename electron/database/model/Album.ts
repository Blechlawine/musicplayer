import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Album extends Model {
    declare id: string;
    declare title: string;
    static Artists: any;
}

Album.init(
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
        modelName: "album",
    }
);

export default Album;
