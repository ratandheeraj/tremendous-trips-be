const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const Hotel = require("../../models/hotels");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.createHotel = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { hotel_name, hotel_description, hotel_photo, city_id } = req.body;

    let hotel = await Hotel.findOne({ where: { hotel_name } });

    if (!_.isEmpty(hotel)) {
      return res.status(400).send({
        message: "Sorry hotel with the given name already exists",
      });
    }

    const hotel_id = uuidv4();

    hotel = await Hotel.create({
      hotel_name,
      hotel_description,
      hotel_photo,
      city_id,
      hotel_id,
    });

    return res.status(200).send({ message: "Hotel created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
