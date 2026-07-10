const { body } = require("express-validator");

const stockMovementValidator = [

    body("warehouse")
        .isMongoId()
        .withMessage("Invalid warehouse id"),

    body("product")
        .isMongoId()
        .withMessage("Invalid product id"),

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0"),

    body("reason")
        .trim()
        .notEmpty()
        .withMessage("Reason is required"),

    body("remarks")
        .optional()
        .trim(),
];

module.exports = {
    stockMovementValidator,
};