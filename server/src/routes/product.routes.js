const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const validate = require("../middlewares/validation.middleware");

const ROLES = require("../constants/roles");

const {
    createProductValidator,
    updateProductValidator,
} = require("../validators/product.validator");

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

router.use(protect);

router.get(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getAllProducts
);

router.get(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getProductById
);

router.post(
    "/",
    authorize(ROLES.ADMIN),
    createProductValidator,
    validate,
    createProduct
);

router.patch(
    "/:id",
    authorize(ROLES.ADMIN),
    updateProductValidator,
    validate,
    updateProduct
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deleteProduct
);

module.exports = router;