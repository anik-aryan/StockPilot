const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const warehouseRoutes = require("./routes/warehouse.routes");
const productRoutes = require("./routes/product.routes");
const stockMovementRoutes = require("./routes/stockMovement.routes");
const inventoryRoutes = require("./routes/inventory.routes");

const notFound = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/warehouses", warehouseRoutes);
app.use("/api/v1/products", productRoutes);
app.use(
    "/api/v1/stock",
    stockMovementRoutes
);
app.use(
    "/api/v1/inventory",
    inventoryRoutes
);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;