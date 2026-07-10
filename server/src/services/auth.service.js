const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

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

module.exports = {
  signup,
};