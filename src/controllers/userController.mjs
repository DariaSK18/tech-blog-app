// import * as User from "../models/userModel.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { Blog } from "../mongoose/schemas/blog.mjs";
import AppError from "../utils/AppError.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";
import { hashPassword, compareHashedPassword } from "../helpers/helpers.mjs";
import passport from "passport";

// --- get all users ---
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// --- register user ---
export const createUser = catchAsync(async (req, res, next) => {
  const {username, email, password} = req.body;
  if (!username || !email || !password) return next(new AppError("All fields required", 400));
  const hashed = hashPassword(password)
  const saved = await User.create({username, email, password: hashed});
  res.status(201).json(saved);
});

// --- get single user by id ---
export const getOneUser = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json(user);
});

// --- update profile ---
export const updateUser = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  const updated = await User.findByIdAndUpdate(id, body, {new: true});
  if (!updated) return next(new AppError("User not found", 404));
  res.status(200).json(updated);
});

// --- delete account ---
export const deleteUser = catchAsync(async (req, res, next) => {
  const {
    user: { id },
  } = req;

  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) return next(new AppError("User not found", 404));
  res.status(204).send();
});
