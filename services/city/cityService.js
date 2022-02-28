const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const City = require("../../models/city");
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
