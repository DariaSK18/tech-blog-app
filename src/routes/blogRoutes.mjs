import { Router } from "express";
import * as blogController from "../controllers/blogController.mjs";

const router = Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getOneBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

export default router;
