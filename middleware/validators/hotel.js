const { check } = require("express-validator");

module.exports.createHotelValidator = [
  check("hotel_name", "name of the hotel is required").not().isEmpty(),
  check("hotel_description", "description of the hotel is required")
    .not()
    .isEmpty(),
  check("hotel_photo", "name of the hotel is required").not().isEmpty(),
  check("city_id", "city_id of the hotel is required").isUUID(),
];
