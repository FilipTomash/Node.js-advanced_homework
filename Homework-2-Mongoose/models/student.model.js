import { Schema, model } from "mongoose";
import validator from "validator";

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide valid first name"],
    minLength: 2,
  },
  lastName: {
    type: String,
    required: [true, "Please provide valid last name"],
    minLength: 2,
  },
  age: {
    type: Number,
    required: [true, "we accept persons 18+"],
    min: 18,
    max: 120,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (error) => `${error.value} is not a valid email`,
    },
  },
  courses: [
    {
      _id: { id: false },
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export const Student = model("Student", studentSchema);
