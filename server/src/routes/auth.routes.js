const express = require("express");

const router = express.Router();

const { signup , login , logout , getCurrentUser } = require("../controllers/auth.controller");

const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validator");

const validate = require("../middlewares/validation.middleware");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

router.post(
  "/signup",
  signupValidator,
  validate,
  signup
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.get(
    "/me",
    protect,
    getCurrentUser
);

router.post("/logout", logout);

module.exports = router;