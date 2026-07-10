const mongoose = require("mongoose");

const Inventory = require("../models/inventory.model");

const ApiError = require("../utils/ApiError");

const getAllInventory = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {};

    if (query.warehouse) {
        filter.warehouse = query.warehouse;
    }

    if (query.product) {
        filter.product = query.product;
    }

    const inventories = await Inventory.find(filter)
        .populate(
            "warehouse",
            "name code city state"
        )
        .populate(
            "product",
            "name sku price reorderLevel"
        )
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const formattedInventory = inventories.map((item) => {

        const availableQuantity =
            item.quantity - item.reservedQuantity;

        const inventoryValue =
            item.quantity * item.product.price;

        const status =
            item.quantity <= item.product.reorderLevel
                ? "LOW STOCK"
                : "IN STOCK";

        return {

            ...item.toObject(),

            availableQuantity,

            inventoryValue,

            status,
        };

    });

    const total =
        await Inventory.countDocuments(filter);

    return {

        inventory: formattedInventory,

        total,

        page,

        totalPages: Math.ceil(total / limit),
    };

};

const getInventoryById = async (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            400,
            "Invalid Inventory Id"
        );
    }

    const inventory =
        await Inventory.findById(id)

            .populate(
                "warehouse",
                "name code city state"
            )

            .populate(
                "product",
                "name sku price reorderLevel"
            );

    if (!inventory) {
        throw new ApiError(
            404,
            "Inventory not found"
        );
    }

    const availableQuantity =
        inventory.quantity -
        inventory.reservedQuantity;

    const inventoryValue =
        inventory.quantity *
        inventory.product.price;

    const status =
        inventory.quantity <=
        inventory.product.reorderLevel
            ? "LOW STOCK"
            : "IN STOCK";

    return {

        ...inventory.toObject(),

        availableQuantity,

        inventoryValue,

        status,
    };

};

module.exports = {

    getAllInventory,

    getInventoryById,

};