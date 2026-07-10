const mongoose = require("mongoose");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");


const generateProductSKU = async (name) => {
    const prefix = name.substring(0, 3).toUpperCase();

    const count = await Product.countDocuments({
        sku: {
            $regex: `^${prefix}`,
        },
    });

    return `${prefix}${String(count + 1).padStart(3, "0")}`;
};


const createProduct = async (productData) => {

    const existingProduct = await Product.findOne({
        name: productData.name,
        isActive: true,
    });

    if (existingProduct) {
        throw new ApiError(409, "Product already exists");
    }

    const sku = await generateProductSKU(productData.name);

    const product = await Product.create({
        ...productData,
        sku,
    });

    return product;
};


const getAllProducts = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = query.search || "";

    const filter = {
        isActive: true,
        $or: [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                sku: {
                    $regex: search,
                    $options: "i",
                },
            },
        ],
    };

    const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filter);

    return {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};


const getProductById = async (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Product Id");
    }

    const product = await Product.findById(id);

    if (!product || !product.isActive) {
        throw new ApiError(404, "Product not found");
    }

    return product;
};


const updateProduct = async (id, updateData) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Product Id");
    }

    delete updateData.sku;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const product = await Product.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return product;
};

const deleteProduct = async (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Product Id");
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    product.isActive = false;

    await product.save();

    return product;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};