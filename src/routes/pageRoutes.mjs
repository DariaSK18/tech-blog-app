import { Router } from "express";
import { isAuth, isUser } from "../middleware/auth.mjs";
import * as pageController from "../controllers/pageController.mjs";

const router = Router()

router.get('/', isUser, pageController.homePage)
router.get('/login', pageController.loginPage)
router.get('/register', pageController.registerPage)
router.get('/profile', isAuth, isUser, pageController.profilePage)
router.get('/blogs', isUser, pageController.blogsPage)
router.get('/change-psw', isAuth, isUser, pageController.changePswPage)
router.get('/write-blog', isAuth, isUser, pageController.writeBlogPage)
router.get('/write-blog/:id', isAuth, isUser, pageController.writeBlogPage)

export default router