const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },

        description: {
            type: String,
            default: "",
        },

        unit: {
            type: String,
            enum: [
                "pcs",
                "kg",
                "box",
                "litre",
                "meter",
            ],
            default: "pcs",
        },

        reorderLevel: {
            type: Number,
            default: 10,
            min: 0,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


productSchema.index({ name: 1 });

module.exports = mongoose.model("Product", productSchema);