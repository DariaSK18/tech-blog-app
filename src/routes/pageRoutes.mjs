import { Router } from "express";
import { isAuth, isUser } from "../middleware/auth.mjs";
import * as pageController from "../controllers/pageController.mjs";

const router = Router()

router.get('/', isUser, pageController.homePage)
router.get('/login', pageController.loginPage)
router.get('/register', pageController.registerPage)
router.get('/profile', isAuth, isUser, pageController.profilePage)

export default router