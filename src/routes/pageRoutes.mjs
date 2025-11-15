import { Router } from "express";
import { isAuth, isUser } from "../middleware/auth.mjs";
import * as pageController from "../controllers/pageController.mjs";

const router = Router()

router.get('/', isUser, pageController.homePage)
router.get('/login', pageController.loginPage)
router.get('/register', pageController.registerPage)
router.get('/profile', isAuth, isUser, pageController.profilePage)
router.get('/blogs', isUser, pageController.blogsPage)
router.get('/change-psw', pageController.changePswPage)
router.get('/write-blog', pageController.writeBlogPage)

export default router