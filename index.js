import express from "express";
import dbConnect from "./conn/conn.js";
import ProductModel from "./Modal/ProductModal.js";

const app = express();

app.use(express.json());

const removeFields = (obj, fields) => {
  fields.forEach((field) => {
    delete obj[field];
  });
};

app.post("/", async (req, res) => {
  try {
    const data = new ProductModel({ ...req.body });
    await data.save();
    const responseData = data.toObject();
    const fieldsToRemove = ["_id", "name"];

    removeFields(responseData, fieldsToRemove);

    return res.status(201).json({ success: true, msg: responseData });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, msg: error.message });
    }
    return res.status(500).json({ success: false, msg: error.message });
  }
});
app.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();

    return res.status(201).json({ success: true, data });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, msg: error.message });
    }
    return res.status(500).json({ success: false, msg: error.message });
  }
});
app.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res.status(201).json({ success: true, data });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, msg: error.message });
    }
    return res.status(500).json({ success: false, msg: error.message });
  }
});
app.get("/:id", async (req, res) => {
  try {
    const data = await ProductModel.findById(req.params.id);

    return res.status(201).json({ success: true, data });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, msg: error.message });
    }
    return res.status(500).json({ success: false, msg: error.message });
  }
});

app.listen(4000, () => {
  dbConnect();
  console.log(`Server is working on 4000`);
});
