import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: [2, "User Name must be at least 2 characters long"],
      maxLength: [50, "User Name must be less than 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: [6, "User Password must be at least 6 characters long"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
