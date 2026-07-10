const express = require("express");

const router = express.Router();

const { signup } = require("../controllers/auth.controller");

const {
  signupValidator,
} = require("../validators/auth.validator");

const validate = require("../middlewares/validation.middleware");

router.post(
  "/signup",
  signupValidator,
  validate,
  signup
);

module.exports = router;