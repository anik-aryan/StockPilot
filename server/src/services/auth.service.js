const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { generateAccessToken } = require("../utils/jwt");

const signup = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

const createdUser = await User.create(userData);

const user = await User.findById(createdUser._id)
    .select("-password");

return user;
};

const login = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateAccessToken(user._id);

    const userData = await User.findById(user._id).select("-password");

    return {
        token,
        user: userData,
    };
};

const logout = async () => {
    return true;
};

const getCurrentUser = async (userId) => {

    return await User.findById(userId);

};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};