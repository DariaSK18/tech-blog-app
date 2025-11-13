import { Router } from "express";
import { isAuth, isUser } from "../middleware/auth.mjs";
import * as pageController from "../controllers/pageController.mjs";

const router = Router()

router.get('/', isUser, pageController.homePage)
router.get('/login', isUser, pageController.loginPage)
router.get('/register', isUser, pageController.registerPage)

export default router