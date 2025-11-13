import { Router } from "express";
import * as blogController from "../controllers/blogController.mjs";
import { isUser } from "../middleware/auth.mjs";

const router = Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(isUser, blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getOneBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

export default router;
