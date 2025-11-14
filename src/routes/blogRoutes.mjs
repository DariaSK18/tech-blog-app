import { Router } from "express";
import * as blogController from "../controllers/blogController.mjs";
import { isUser, isAuth, isAuthor } from "../middleware/auth.mjs";
import { checkSchema } from "express-validator";
import { blogValidation, blogPatch } from "../helpers/validation.mjs";

const router = Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(isAuth, checkSchema(blogValidation), blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getOneBlog)
  .patch(isAuth, isAuthor, checkSchema(blogPatch), blogController.updateBlog)
  .delete(isAuth, isAuthor, blogController.deleteBlog);

export default router;
