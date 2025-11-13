import * as Blog from "../models/blogModel.mjs";
import AppError from "../utils/AppError.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
});

export const createBlog = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (!data.title) return next(new AppError("Title required", 400));
  const saved = await Blog.createBlog(data);
  res.status(201).json(saved);
});

export const getOneBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const blog = await Blog.findById(id);
  if (!blog) return next(new AppError("Blog not found", 404));
  res.status(200).json(blog);
});

export const updateBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  const updated = await Blog.updateById(id, body);
  if (!updated) return next(new AppError("Blog not found", 404));
  res.status(200).json(updated);
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const removed = await Blog.deleteById(id);
  if (!removed) return next(new AppError("Blog not found", 404));
  res.status(204).send();
});
