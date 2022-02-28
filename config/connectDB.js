const { Sequelize } = require("sequelize");
require("dotenv").config();
user = process.env.dbUser;
password = process.env.dbPassword;
dbName_local = process.env.dbName_local;

const sequelize = new Sequelize(dbName_local, user, password, {
  dialect: "mysql",
  host: "localhost",
  dialectOptions: {
    // ssl: {
    //   require: true,
    // },
  },
});

const connectSQLDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to MySQL");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sequelize, connectSQLDB };
