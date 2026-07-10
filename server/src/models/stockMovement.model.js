const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
    {
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        remarks: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

stockMovementSchema.index({
    warehouse: 1,
    createdAt: -1,
});

stockMovementSchema.index({
    product: 1,
    createdAt: -1,
});

module.exports = mongoose.model(
    "StockMovement",
    stockMovementSchema
);