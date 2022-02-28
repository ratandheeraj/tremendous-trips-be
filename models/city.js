const { Sequelize, UUIDV4, BOOLEAN, STRING } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const City = sequelize.define("City", {
  city_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  city_name: {
    type: STRING,
    allowNull: false,
  },
  state_name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = City;
