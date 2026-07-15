const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { generateAccessToken } = require("../utils/jwt");
const Warehouse = require("../models/warehouse.model");
const signup = async (userData) => {

    const existingUser = await User.findOne({
        email: userData.email,
    });

    if (existingUser) {
        throw new ApiError(409, "Email already exists");
    }

   
    if (
        ["manager", "staff"].includes(userData.role) &&
        !userData.warehouse
    ) {
        throw new ApiError(
            400,
            "Warehouse is required for manager and staff"
        );
    }

    
    if (userData.warehouse) {

        const warehouseExists =
            await Warehouse.findById(userData.warehouse);

        if (!warehouseExists) {
            throw new ApiError(
                404,
                "Warehouse not found"
            );
        }
    }

    const createdUser =
        await User.create(userData);

    const user = await User.findById(
        createdUser._id
    )
        .populate(
            "warehouse",
            "name code city"
        )
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

    const userData = await User.findById(user._id)
    .populate("warehouse", "name code city")
    .select("-password");

    return {
        token,
        user: userData,
    };
};

const logout = async () => {
    return true;
};

const getCurrentUser = async (userId) => {

    return await User.findById(userId)
        .populate("warehouse", "name code city");

};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};