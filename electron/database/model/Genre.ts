import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Genre extends Model {
    static Tracks: any;
}

Genre.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "genre",
    }
);

export default Genre;
