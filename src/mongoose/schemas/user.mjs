import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
