const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const notFound = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

app.use(notFound);
app.use(errorMiddleware);

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

module.exports = app;