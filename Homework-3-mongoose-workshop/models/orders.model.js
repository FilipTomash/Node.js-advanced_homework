import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Use iso strings here ex: 2022-03-10"],
  },
  user: {
    type: String,
    required: [true, "Blabla"],
    minLength: 2,
  },
  // user: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     // required: true,
  //     minLength: 2,
  //     ref: "User",
  //   },
  // ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
export const Order = model("Order", orderSchema);
