import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: "true",
  },
  description: {
    type: "String",
    required: "true",
  },
  price: {
    type: "Number",
    required: "true",
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const foodItem =
  mongoose.models.foodItem || mongoose.model("foodItem", foodSchema);
