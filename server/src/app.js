const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const warehouseRoutes = require("./routes/warehouse.routes");
const productRoutes = require("./routes/product.routes");

const notFound = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "StockPilot API is running successfully",
    });
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/warehouses", warehouseRoutes);
app.use("/api/v1/products", productRoutes);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;