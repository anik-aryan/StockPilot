const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");

const signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      user
    )
  );
});

module.exports = {
  signup,
};