// import * as Blog from "../models/blogModel.mjs";
import { Blog } from "../mongoose/schemas/blog.mjs";
import AppError from "../utils/AppError.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate('author', 'username email');
  res.status(200).json(blogs);
});

export const createBlog = catchAsync(async (req, res, next) => {
  const {title, content, author, tags} = req.body;
  if (!title || !content || !author) return next(new AppError("Title, content and author required", 400));
  const saved = await Blog.create({title, content, author: User._id, tags});
  res.status(201).json(saved);
});

export const getOneBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const blog = await Blog.findById(id).populate('author', 'username email');
  if (!blog) return next(new AppError("Blog not found", 404));
  res.status(200).json(blog);
});

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

export const deleteBlog = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const deleted = await Blog.findByIdAndDelete(id);
  if (!deleted) return next(new AppError("Blog not found", 404));
  res.status(204).send();
});
