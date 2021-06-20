import mongoose from "mongoose";

const { Schema, model } = mongoose; //mongoose

export const ExperienceSchema = new Schema({
  role: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
    minlength: [5, "Minimum length should be 5 characters"],
  },
  area: {
    type: String,
    required: true,
  },
  // experience_username: {
  //   type: String,
  //   required: true,
  // },
  image: {
    type: String,
    default:
      "https://www.mindmeister.com/blog/wp-content/uploads/2019/03/Document-Writing.png",
  },
  created_At: {
    type: Date,
  },
  updated_At: {
    type: Date,
  },
});

export default model("Experience", ExperienceSchema);
