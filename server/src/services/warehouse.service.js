const Warehouse = require("../models/warehouse.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");


const generateWarehouseCode = async (city) => {
    const prefix = city.substring(0, 3).toUpperCase();

    const warehouseCount = await Warehouse.countDocuments({
        code: { $regex: `^${prefix}` },
    });

    const sequence = String(warehouseCount + 1).padStart(3, "0");

    return `${prefix}${sequence}`;
};


const createWarehouse = async (warehouseData) => {

    const { name, address, city, state, manager } = warehouseData;

   
    const existingWarehouse = await Warehouse.findOne({
        name,
        isActive: true,
    });

    if (existingWarehouse) {
        throw new ApiError(409, "Warehouse already exists");
    }

  
    if (manager) {

        const managerExists = await User.findById(manager);

        if (!managerExists) {
            throw new ApiError(404, "Manager not found");
        }
    }

    const code = await generateWarehouseCode(city);

    const warehouse = await Warehouse.create({
        name,
        code,
        address,
        city,
        state,
        manager,
    });

    return await Warehouse.findById(warehouse._id)
        .populate("manager", "firstName lastName email");
};


const getAllWarehouses = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";

    const filter = {
        isActive: true,
        $or: [
            { name: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { code: { $regex: search, $options: "i" } },
        ],
    };

    const warehouses = await Warehouse.find(filter)
        .populate("manager", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Warehouse.countDocuments(filter);

    return {
        warehouses,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};

const getWarehouseById = async (id) => {

    const warehouse = await Warehouse.findById(id)
        .populate("manager", "firstName lastName email");

    if (!warehouse || !warehouse.isActive) {
        throw new ApiError(404, "Warehouse not found");
    }

    return warehouse;
};


const updateWarehouse = async (id, updateData) => {

    if (updateData.manager) {

        const managerExists = await User.findById(updateData.manager);

        if (!managerExists) {
            throw new ApiError(404, "Manager not found");
        }
    }

    const warehouse = await Warehouse.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).populate("manager", "firstName lastName email");

    if (!warehouse) {
        throw new ApiError(404, "Warehouse not found");
    }

    return warehouse;
};


const deleteWarehouse = async (id) => {

    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
        throw new ApiError(404, "Warehouse not found");
    }

    warehouse.isActive = false;

    await warehouse.save();

    return warehouse;
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse,
};