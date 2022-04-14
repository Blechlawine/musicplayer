import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Artist extends Model {
    static Albums: any;
}

Artist.init(
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
        modelName: "artist",
    }
);

export default Artist;
