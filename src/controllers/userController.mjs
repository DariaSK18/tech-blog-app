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
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(new AppError("All fields required", 400));
  const hashed = hashPassword(password);
  const saved = await User.create({ username, email, password: hashed });
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
    body: { username, password, currentPsw },
  } = req;

  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found", 404));
  if (currentPsw) {
    const isMatch = compareHashedPassword(currentPsw, user.password);
    if (!isMatch) return next(new AppError("Current password incorrect", 400));
  }

  if (username) user.username = username;
  if (password) user.password = hashPassword(password);

  // const updated = await User.findByIdAndUpdate(id, user, {new: true});
  const updated = await user.save();
  if (!updated) return next(new AppError("User not found", 404));
  res.status(200).json(updated);
});

// --- delete account ---
export const deleteUser = catchAsync(async (req, res, next) => {
  const {
    user: { id },
  } = req;
  await Blog.deleteMany({ author: id });
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) return next(new AppError("User not found", 404));
  req.logout((err) => {
    if (err) return next(new AppError("Logout failed", 400));
    res.json({ msg: "Account deleted and logged out" });
  });
});

// --- login user ---
export const loginUser = (req, res, next) => {
  const { username, password } = req.validatedData;
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        msg: "Successfully logged in",
        user: { id: user._id, username: user.username, email: user.email },
      });
    });
  })(req, res, next);
};

// --- logout user ---
export const logoutUser = catchAsync(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(new AppError("Logout failed", 400));
    res.status(200).json({ msg: "Successfully logged out" });
  });
});
