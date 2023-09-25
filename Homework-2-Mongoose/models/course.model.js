import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  numberOfClasses: {
    type: Number,
    required: true,
    min: 0,
  },
  trainer: {
    type: String,
    required: true,
    minLength: 2,
  },
  assistant: {
    type: String,
    required: true,
    minLength: 2,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export const Course = new model("Course", courseSchema);
