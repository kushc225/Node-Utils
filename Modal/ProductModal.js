import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value < this.originPrice;
      },
      message: "Discount price should be less than the original price",
    },
  },
  originPrice: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
