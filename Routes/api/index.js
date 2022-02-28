const express = require("express");
const router = express.Router();

const UserService = require("../../services/user/userService");
const { createUserValidator } = require("../../middleware/validators/user");

const PlaceService = require("../../services/place/placeService");
const { createPlaceValidator } = require("../../middleware/validators/places");

const HotelService = require("../../services/hotel/hotelService");
const { createHotelValidator } = require("../../middleware/validators/hotel");

const CityService = require("../../services/city/cityService");
const { createCityValidator } = require("../../middleware/validators/city");

//All routes related to user
router.post("/user", createUserValidator, (req, res, next) => {
  return UserService.createUser(req, res, next);
});

//Routes related to place

router.post("/place", createPlaceValidator, (req, res, next) => {
  return PlaceService.createPlace(req, res, next);
});

//Routes related to hotel

router.post("/hotel", createHotelValidator, (req, res, next) => {
  return HotelService.createHotel(req, res, next);
});

//Routes related to city

router.post("/city", createCityValidator, (req, res, next) => {
  return CityService.createCity(req, res, next);
});

module.exports = router;
