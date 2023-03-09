import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  "meta.category": Schema.Types.Mixed,
});

ProductSchema.pre("save", async function () {
  const category = await Category.findById(this.category);
  this.set("meta.category", category);
});

export const Product = model("Product", ProductSchema);
