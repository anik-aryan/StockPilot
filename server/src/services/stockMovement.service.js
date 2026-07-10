const mongoose = require("mongoose");

const Inventory = require("../models/inventory.model");
const Product = require("../models/product.model");
const Warehouse = require("../models/warehouse.model");
const StockMovement = require("../models/stockMovement.model");

const ApiError = require("../utils/ApiError");

const generateReferenceNo = async () => {

    const count = await StockMovement.countDocuments();

    return `MOV-${String(count + 1).padStart(6, "0")}`;

};

const stockIn = async (data, userId) => {

    const {
        warehouse,
        product,
        quantity,
        reason,
        remarks,
    } = data;

    const warehouseExists = await Warehouse.findById(warehouse);

    if (!warehouseExists || !warehouseExists.isActive) {
        throw new ApiError(404, "Warehouse not found");
    }

    const productExists = await Product.findById(product);

    if (!productExists || !productExists.isActive) {
        throw new ApiError(404, "Product not found");
    }

    let inventory = await Inventory.findOne({
        warehouse,
        product,
    });

    if (!inventory) {

        inventory = await Inventory.create({
            warehouse,
            product,
            quantity,
        });

    } else {

        inventory.quantity += quantity;

        await inventory.save();
    }

    await StockMovement.create({

        referenceNo: await generateReferenceNo(),

        warehouse,

        product,

        type: "IN",

        quantity,

        reason,

        remarks,

        performedBy: userId,
    });

    return inventory;
};


const stockOut = async (data, userId) => {

    const {
        warehouse,
        product,
        quantity,
        reason,
        remarks,
    } = data;

    const inventory = await Inventory.findOne({
        warehouse,
        product,
    });

    if (!inventory) {
        throw new ApiError(404, "Inventory not found");
    }

    if (inventory.quantity < quantity) {
        throw new ApiError(
            400,
            "Insufficient stock available"
        );
    }

    inventory.quantity -= quantity;

    await inventory.save();

    await StockMovement.create({

        referenceNo: await generateReferenceNo(),

        warehouse,

        product,

        type: "OUT",

        quantity,

        reason,

        remarks,

        performedBy: userId,
    });

    return inventory;
};

const getMovementHistory = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {};

    if (query.type)
        filter.type = query.type;

    if (query.warehouse)
        filter.warehouse = query.warehouse;

    if (query.product)
        filter.product = query.product;

    const history = await StockMovement.find(filter)

        .populate("warehouse", "name code")

        .populate("product", "name sku")

        .populate(
            "performedBy",
            "firstName lastName"
        )

        .sort({
            createdAt: -1,
        })

        .skip(skip)

        .limit(limit);

    const total =
        await StockMovement.countDocuments(filter);

    return {

        history,

        total,

        page,

        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    stockIn,
    stockOut,
    getMovementHistory,
};