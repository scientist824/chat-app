import mongoose, { Mongoose } from "mongoose";

const userModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },

    username: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    profilephoto: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      require: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userModel);
