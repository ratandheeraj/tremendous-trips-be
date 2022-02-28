const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const Place = require("../../models/places");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createPlace = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { place_name, place_description, place_photo, city_id } = req.body;

    let place = await Place.findOne({ where: { place_name } });

    if (!_.isEmpty(place)) {
      return res.status(400).send({
        message: "Sorry place with the given name already exists",
      });
    }

    const place_id = uuidv4();

    place = await Place.create({
      place_name,
      place_description,
      place_photo,
      city_id,
      place_id,
    });

    return res.status(200).send({ message: "Place created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
