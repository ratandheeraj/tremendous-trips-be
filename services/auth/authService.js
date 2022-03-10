const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = require("../../models/user");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../config/connectDB");

module.exports.userLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (_.isEmpty(user)) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).send({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
};
