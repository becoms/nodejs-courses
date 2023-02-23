import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "archived"],
    },
    color: {
      type: [String],
    }
  },
  { timestamps: true }
);

ItemSchema.path("createdAt").immutable(true);

export const Item = mongoose.model("Item", ItemSchema);
