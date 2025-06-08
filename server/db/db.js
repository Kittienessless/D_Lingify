const { Sequelize } = require("sequelize");
const connections = require("./connections.js");

let db;
require("dotenv").config();

const initDb = async () => {
  if (!db) {
    db = new Sequelize({
      dialect: "postgres",
      database: process.env.DB_DATABASENAME,
      username: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      ssl: true,
      pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
      },
    });
    const modules = [
      require("../modules/user.js").User,
      require("../modules/tokens.js").Token,
       require("../modules/lang.js").Language,
       require("../modules/role.js").Role,

    ];
    for (const model of modules) {
      model(db);
    }
    connections(db);

    db.sync();
  }
};

const getDb = () => db;

module.exports = {
  initDb,
  getDb,
};
