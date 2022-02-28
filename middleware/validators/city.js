const { check } = require("express-validator");

module.exports.createCityValidator = [
  check("city_name", "name of the city is required").not().isEmpty(),
  check("state_name", "name of the state is required").not().isEmpty(),
];
