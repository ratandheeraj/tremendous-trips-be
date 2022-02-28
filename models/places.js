const { Sequelize, UUIDV4, BOOLEAN, STRING } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const Places = sequelize.define("Places", {
  place_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  place_name: {
    type: STRING,
    allowNull: false,
  },
  place_description: {
    type: STRING,
    allowNull: false,
  },
  place_photo: {
    type: STRING,
    allowNull: false,
  },
  city_id: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

module.exports = Places;
