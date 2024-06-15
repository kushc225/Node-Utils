import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    originPrice: {
      type: Number,
      required: true,
    },
    deprecated: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("totalSavings").get(function () {
  return this.originPrice - this.discountPrice;
});

// Pre-save middleware
productSchema.pre("save", function (next) {
  console.log("manipulate the data....");
  // Any data manipulation here
  next(); // Ensure to call next() to proceed with the save operation
});

// Post-save middleware
productSchema.post("save", function () {
  console.log("inside the post one");
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
