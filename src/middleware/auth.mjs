import { catchAsync } from "../utils/catchAsync.mjs";
import AppError from "../utils/AppError.mjs";

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  if (req.originalUrl.startsWith("/api"))
    return next(new AppError("Not authenticated", 401));
  return res.redirect("/login");
};
