const { check } = require("express-validator");

module.exports.createPlaceValidator = [
  check("place_name", "name of the place is required").not().isEmpty(),
  check("place_description", "description of the place is required")
    .not()
    .isEmpty(),
  check("place_photo", "name of the place is required").not().isEmpty(),
  check("city_id", "city_id of the place is required").isUUID(),
];
