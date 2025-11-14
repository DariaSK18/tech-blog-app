import { Router } from "express";
import * as userController from "../controllers/userController.mjs";
import { isAuth } from "../middleware/auth.mjs";
import { validate } from "../middleware/validate.mjs";
import { userPatch, signupValidation, userLogin } from "../helpers/validation.mjs";
import { checkSchema } from "express-validator";

const router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(checkSchema(signupValidation), validate, userController.createUser);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(isAuth, checkSchema(userPatch), validate, userController.updateUser)
  .delete(isAuth, userController.deleteUser);

router.route("/auth").post(checkSchema(userLogin), validate, userController.loginUser);

router.route("/logout").post(isAuth, userController.logoutUser);

export default router;
