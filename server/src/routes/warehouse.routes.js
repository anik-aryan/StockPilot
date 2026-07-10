const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const ROLES = require("../constants/roles");

const validate = require("../middlewares/validation.middleware");

const {
    createWarehouseValidator,
    updateWarehouseValidator,
} = require("../validators/warehouse.validator");

const {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse,
} = require("../controllers/warehouse.controller");


router.use(protect);


router.get(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getAllWarehouses
);

router.get(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getWarehouseById
);


router.post(
    "/",
    authorize(ROLES.ADMIN),
    createWarehouseValidator,
    validate,
    createWarehouse
);

router.patch(
    "/:id",
    authorize(ROLES.ADMIN),
    updateWarehouseValidator,
    validate,
    updateWarehouse
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deleteWarehouse
);

module.exports = router;