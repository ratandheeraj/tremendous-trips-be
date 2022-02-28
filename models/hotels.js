const { Sequelize, UUIDV4, BOOLEAN, STRING } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const Hotel = sequelize.define("Hotel", {
  hotel_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  hotel_name: {
    type: STRING,
    allowNull: false,
  },
  hotel_description: {
    type: STRING,
    allowNull: false,
  },
  hotel_photo: {
    type: STRING,
    allowNull: false,
  },
  city_id: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

module.exports = Hotel;
