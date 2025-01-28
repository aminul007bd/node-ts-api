import { Sequelize } from "sequelize";

const sequelize = new Sequelize("coreITDB", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Disable logging; default: console.log
});

export default sequelize;
