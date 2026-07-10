const { body } = require("express-validator");

const createWarehouseValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Warehouse name is required"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),

    body("manager")
        .optional()
        .isMongoId()
        .withMessage("Invalid manager id"),
];

const updateWarehouseValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Warehouse name cannot be empty"),

    body("address")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Address cannot be empty"),

    body("city")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("City cannot be empty"),

    body("state")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("State cannot be empty"),

    body("manager")
        .optional()
        .isMongoId()
        .withMessage("Invalid manager id"),
];

module.exports = {
    createWarehouseValidator,
    updateWarehouseValidator,
};