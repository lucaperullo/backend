import mongoose from "mongoose";
import { ExperienceSchema } from "./ExperienceModel.js";

const { Schema, model } = mongoose;
const validateEmail = function (email) {
  const re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A name is required"],
    },
    surname: {
      type: String,
      required: [true, "A surname is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    bio: {
      type: String,
      required: [
        true,
        "Come on! everyone wants to know a little more about you!",
      ],
      minLength: 10,
      maxLength: 500,
    },
    title: {
      type: String,
      required: [true, "A title is required"],
    },
    area: {
      type: String,
      required: [true, "An area is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    image: {
      type: String,
      default: function () {
        if (this.gender === "male") {
          return "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
        } else if (this.gender === "N/D") {
          return "http://simpleicon.com/wp-content/uploads/user1.svg";
        } else if (this.gender === "female") {
          return "https://media.discordapp.net/attachments/841212509343580162/841650806557114418/4043251-avatar-female-girl-woman_113291.png?width=480&height=480";
        }
      },
    },
    username: {
      type: String,
      required: [true, "A username is required"],
      maxLength: 15,
    },
    password: { type: String, select: false, required: true },
    experiences: [ExperienceSchema],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
