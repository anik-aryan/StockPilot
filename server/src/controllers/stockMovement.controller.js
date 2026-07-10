const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const stockMovementService = require("../services/stockMovement.service");

/**
 * Stock IN
 */
const stockIn = asyncHandler(async (req, res) => {

    const inventory = await stockMovementService.stockIn(
        req.body,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Stock added successfully",
            inventory
        )
    );

});

/**
 * Stock OUT
 */
const stockOut = asyncHandler(async (req, res) => {

    const inventory = await stockMovementService.stockOut(
        req.body,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Stock removed successfully",
            inventory
        )
    );

});

/**
 * Movement History
 */
const getMovementHistory = asyncHandler(async (req, res) => {

    const history = await stockMovementService.getMovementHistory(
        req.query
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Movement history fetched successfully",
            history
        )
    );

});

module.exports = {
    stockIn,
    stockOut,
    getMovementHistory,
};