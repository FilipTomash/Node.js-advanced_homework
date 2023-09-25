import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (error) => `${error.value} is not a valid email!!!`,
    },
  },
  country: {
    type: String,
    required: true,
    minLength: 2,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    value: null,
  },
});
userSchema.statics.findAndValidate = async function (data) {
  const { email, password } = data;
  const foundUser = await this.findOne({ email });
  if (!foundUser) throw new Error("Invalid user");
  // console.log(foundUser);
  const isValid = await bcrypt.compare(password, foundUser.password);
  // console.log(isValid);
  return isValid ? foundUser : false;
}; // very usefull method for keeping logic with logging in one place
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
}); //because it gives pending on bcrypt.hash if i set async function directly in password property of the schema - took time to find the solution
export const User = model("User", userSchema);
