const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const City = require("../../models/city");
const Place = require("../../models/places");
const Hotel = require("../../models/hotels");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createCity = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { city_name, state_name } = req.body;

    let city = await City.findOne({ where: { city_name } });

    if (!_.isEmpty(city)) {
      return res.status(400).send({
        message: "sorry city with the given name already exists",
      });
    }

    const city_id = uuidv4();

    city = await City.create({
      city_name,
      state_name,
      city_id,
    });

    return res.status(200).send({ message: "City created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getCityById = async (req, res, next) => {
  try {
    let { city_name } = req.params;
    console.log(req.params);
    let city = await City.findAll({
      where: { city_name },
    });
    if (_.isEmpty(city)) {
      return res
        .status(404)
        .send("No city exist in the database with given name");
    }
    let city_id = city[0].city_id;
    let popularPlaces = await Place.findAll({
      where: { city_id },
    });
    let hotels = await Hotel.findAll({
      where: { city_id },
    });
    let state_name = city[0].state_name;
    city_name = city_name[0].toUpperCase() + city_name.slice(1);
    let cities = {
      city_id,
      city_name,
      state_name,
      popularPlaces,
      hotels,
    };
    return res.status(200).json(cities);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};

module.exports.getAllCities = async (req, res, next) => {
  try {
    let cities = await City.findAll();
    if (_.isEmpty(cities)) {
      return res.status(404).send("No city exist in the database");
    }
    return res.status(200).json(cities);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
