// import * as Blog from "../models/blogModel.mjs";
import { Blog } from "../mongoose/schemas/blog.mjs";
import AppError from "../utils/AppError.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";

// --- get all blogs ---
export const getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate('author', 'username email');
  res.status(200).json(blogs);
});

// --- create a blog ---
export const createBlog = catchAsync(async (req, res, next) => {
  const{user, body: {title, content, tags}} = req;
  if (!title || !content) return next(new AppError("Title and content required", 400));
  const saved = await Blog.create({title, content, author: user._id, tags});
  res.status(201).json(saved);
});

// --- get one blog by id ---
export const getOneBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const blog = await Blog.findById(id).populate('author', 'username email');
  if (!blog) return next(new AppError("Blog not found", 404));
  res.status(200).json(blog);
});

// --- update a field ---
export const updateBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  const updated = await Blog.findByIdAndUpdate(id, body, {
    new: true
  });
  if (!updated) return next(new AppError("Blog not found", 404));
  res.status(200).json(updated);
});

// --- delete blog by id ---
export const deleteBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleted = await Blog.findByIdAndDelete(id);
  if (!deleted) return next(new AppError("Blog not found", 404));
  res.status(204).send();
});
