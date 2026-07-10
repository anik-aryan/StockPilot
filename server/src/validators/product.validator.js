const { body } = require("express-validator");

const createProductValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .optional()
        .trim(),

    body("unit")
        .optional()
        .isIn(["pcs", "kg", "box", "litre", "meter"])
        .withMessage("Invalid unit"),

    body("reorderLevel")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Reorder level must be greater than or equal to 0"),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than or equal to 0"),
];

const updateProductValidator = [

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("description")
        .optional()
        .trim(),

    body("unit")
        .optional()
        .isIn(["pcs", "kg", "box", "litre", "meter"])
        .withMessage("Invalid unit"),

    body("reorderLevel")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Reorder level must be greater than or equal to 0"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than or equal to 0"),
];

module.exports = {
    createProductValidator,
    updateProductValidator,
};