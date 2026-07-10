const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");
const cookieOptions = require("../utils/cookieOptions");

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

const login = asyncHandler(async (req, res) => {

    const { token, user } = await authService.login(req.body);

    res.cookie("accessToken", token, cookieOptions);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login successful",
            user
        )
    );

});

const logout = asyncHandler(async (req, res) => {

    await authService.logout();

    res.clearCookie("accessToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            "Logout successful"
        )
    );

});

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await authService.getCurrentUser(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Current user fetched successfully",
            user
        )
    );

});

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};