import mongoose, { model, models } from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Kindly provide a username"],
    unique: true,
    maxlength: [20, "Username cannot be more than 20 characters"],
    minlength: [3, "Username cannot be less than 3 characters"],
  },
  password: {
    type: String,
    required: [true, "Kindly provide a username"],
    minlength: [6, "Username cannot be less than 6 characters"],
    maxlength: [60, "Username cannot be more than 20 characters"],
  },
});

export default models.User || model("User", UserSchema);
