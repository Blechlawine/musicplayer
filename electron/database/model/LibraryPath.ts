import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class LibraryPath extends Model {
    static Tracks: any;
}

LibraryPath.init(
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
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "libraryPath",
    }
);

export default LibraryPath;
