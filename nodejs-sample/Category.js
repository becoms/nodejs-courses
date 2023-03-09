const CategorySchema = new Schema({
  name: String,
});

CategorySchema.post("save", async function () {
  await ProductSchema.updateMany(
    { category: this._id },
    { $set: { "meta.category": this } }
  );
});

export const Category = model("Category", CategorySchema);
