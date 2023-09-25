import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
  },
  category: {
    type: String,
    required: true,
    minLength: 2,
    enum: ["electronics", "clothes", "shoes"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export const Product = model("Product", productSchema);
