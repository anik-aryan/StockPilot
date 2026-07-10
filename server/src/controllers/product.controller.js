const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const productService = require("../services/product.service");

const createProduct = asyncHandler(async (req, res) => {

    const product = await productService.createProduct(req.body);

    return res.status(201).json(
        new ApiResponse(201, "Product created successfully", product)
    );
});

const getAllProducts = asyncHandler(async (req, res) => {

    const result = await productService.getAllProducts(req.query);

    return res.status(200).json(
        new ApiResponse(200, "Products fetched successfully", result)
    );
});

const getProductById = asyncHandler(async (req, res) => {

    const product = await productService.getProductById(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Product fetched successfully", product)
    );
});

const updateProduct = asyncHandler(async (req, res) => {

    const product = await productService.updateProduct(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(200, "Product updated successfully", product)
    );
});

const deleteProduct = asyncHandler(async (req, res) => {

    await productService.deleteProduct(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "Product deleted successfully")
    );
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};