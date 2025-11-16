import { Router } from "express";
import * as blogController from "../controllers/blogController.mjs";
import { isUser, isAuth, isAuthor } from "../middleware/auth.mjs";
import { checkSchema } from "express-validator";
import { blogValidation, blogPatch } from "../helpers/validation.mjs";
import { validate } from "../middleware/validate.mjs";

const router = Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(isAuth, checkSchema(blogValidation), validate, blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getOneBlog)
  .patch(isAuth, isAuthor, checkSchema(blogPatch), validate, blogController.updateBlog)
  .delete(isAuth, isAuthor, blogController.deleteBlog);

router
  .route("/:id/like")
  .patch(isAuth, blogController.toggleLike)

export default router;
