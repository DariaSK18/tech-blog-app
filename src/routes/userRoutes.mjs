import { Router } from "express";
import * as userController from "../controllers/userController.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(isAuth, userController.updateUser)
  .delete(isAuth, userController.deleteUser);

router
  .route("/auth")
  .post(userController.loginUser)

router
  .route("/logout")
  .post(isAuth, userController.logoutUser)

export default router;
