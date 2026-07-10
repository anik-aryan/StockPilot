const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const inventoryService = require("../services/inventory.service");

const getAllInventory = asyncHandler(async (req, res) => {

    const inventory =
        await inventoryService.getAllInventory(
            req.query
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            "Inventory fetched successfully",

            inventory

        )

    );

});

const getInventoryById = asyncHandler(async (req, res) => {

    const inventory =
        await inventoryService.getInventoryById(
            req.params.id
        );

    return res.status(200).json(

        new ApiResponse(

            200,

            "Inventory fetched successfully",

            inventory

        )

    );

});

module.exports = {

    getAllInventory,

    getInventoryById,

};