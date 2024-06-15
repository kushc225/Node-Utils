import express from "express";
import dbConnect from "./conn/conn.js";
import ProductModel from "./Modal/productModal.js";
import logger from "./logger.js"; // Import the logger

const app = express();

app.use(express.json());

const removeFields = (obj, fields) => {
  fields.forEach((field) => {
    delete obj[field];
  });
};

app.post("/", async (req, res, next) => {
  try {
    const data = new ProductModel({ ...req.body });
    await data.save();
    const responseData = data.toObject();
    const fieldsToRemove = ["_id", "name"];

    removeFields(responseData, fieldsToRemove);

    logger.info("⏭️ New product created: ", responseData); // Logging info message

    return res.status(201).json({ success: true, msg: responseData });
  } catch (error) {
    logger.error("❌ Error creating product:", error); // Logging error message
    next(new AppError("ValidationError", error.message, 400, true));
  }
});

app.get("/", async (req, res, next) => {
  try {
    throw new AppError("ResourceNotFound", "No products found", 404, true);
  } catch (error) {
    logger.error("❌ Error retrieving products:", error); // Logging error message
    next(error);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const data = await ProductModel.findById(req.params.id);

    if (!data) {
      logger.warn(`Product with id ${req.params.id} not found`);
      throw new AppError(
        "ResourceNotFound",
        `Product with id ${req.params.id} not found`,
        404,
        true
      );
    }

    logger.info(`Retrieved product with id ${req.params.id}`); // Logging info message
    return res.status(200).json({ success: true, data });
  } catch (error) {
    logger.error(
      `❌ Error retrieving product with id ${req.params.id}:`,
      error
    ); // Logging error message
    next(error);
  }
});

// Define AppError class
class AppError extends Error {
  constructor(name, description, httpCode, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.httpCode)
      .json({ success: false, name: err.name, message: err.message });
  }

  logger.error("An unexpected error occurred:", err);
  return res
    .status(500)
    .json({ success: false, message: "An unexpected error occurred" });
});

app.listen(4000, () => {
  dbConnect();
  logger.info("Server is running on port 4000"); // Logging info message
});
