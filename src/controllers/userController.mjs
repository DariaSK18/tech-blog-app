import * as User from "../models/userModel.mjs";
import AppError from "../utils/AppError.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

export const createUser = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (!data.username) return next(new AppError("Username required", 400));
  const saved = await User.createUser(data);
  res.status(201).json(saved);
});

export const getOneUser = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  const updated = await User.updateById(id, body);
  if (!updated) return next(new AppError("User not found", 404));
  res.status(200).json(updated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const removed = await User.deleteById(id);
  if (!removed) return next(new AppError("User not found", 404));
  res.status(204).send();
});
