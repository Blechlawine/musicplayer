import { Sequelize } from "sequelize";
import { app } from "electron";
import path from "path";

const sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: path.join(app.getPath("userData"), "database.sqlite"),
    query: {
        raw: true,
    }
});

export default sequelize;
