const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const validate = require("../middlewares/validation.middleware");

const ROLES = require("../constants/roles");

const {
    stockMovementValidator,
} = require("../validators/stockMovement.validator");

const {
    stockIn,
    stockOut,
    getMovementHistory,
} = require("../controllers/stockMovement.controller");

router.use(protect);


router.post(
    "/in",
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.STAFF
    ),
    stockMovementValidator,
    validate,
    stockIn
);


router.post(
    "/out",
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.STAFF
    ),
    stockMovementValidator,
    validate,
    stockOut
);


router.get(
    "/history",
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER
    ),
    getMovementHistory
);

module.exports = router;