// import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";
import { Blog } from "../mongoose/schemas/blog.mjs";

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  if (req.originalUrl.startsWith("/api"))
    return next(new AppError("Not authenticated", 401));
  return res.redirect("/login");
};

export const isUser = (req, res, next) => {
  res.locals.user = req.user || null;
  next();
};

export const isAuthor = (req, res, next) => {
  const {params: {id}, user} = req
  const blog = await Blog.findById(id)
  if(!blog) return next(new AppError('Blog not found', 404))
  if(!user || blog.author.toString() !== user._id.toString()) return next(new AppError('Not the author of the blog', 403))
  next()
};
