import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  size: {
    type: Number,
    min: 20
  },
  price: {
    type: Number,
    min: [40, "Minimum IS 40 !"]
  }
});

export const Product = model("Product", ProductSchema);

