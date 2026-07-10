const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const ROLES = require("../constants/roles");

const {

    getAllInventory,

    getInventoryById,

} = require("../controllers/inventory.controller");

router.use(protect);

router.get(

    "/",

    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER
    ),

    getAllInventory

);

router.get(

    "/:id",

    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER
    ),

    getInventoryById

);

module.exports = router;