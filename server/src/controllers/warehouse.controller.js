const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const warehouseService = require("../services/warehouse.service");


const createWarehouse = asyncHandler(async (req, res) => {
    const warehouse = await warehouseService.createWarehouse(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "Warehouse created successfully",
            warehouse
        )
    );
});


const getAllWarehouses = asyncHandler(async (req, res) => {
    const result = await warehouseService.getAllWarehouses(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Warehouses fetched successfully",
            result
        )
    );
});


const getWarehouseById = asyncHandler(async (req, res) => {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Warehouse fetched successfully",
            warehouse
        )
    );
});


const updateWarehouse = asyncHandler(async (req, res) => {
    const warehouse = await warehouseService.updateWarehouse(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Warehouse updated successfully",
            warehouse
        )
    );
});


const deleteWarehouse = asyncHandler(async (req, res) => {
    await warehouseService.deleteWarehouse(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Warehouse deleted successfully"
        )
    );
});

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse,
};