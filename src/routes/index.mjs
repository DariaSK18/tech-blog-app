import { Router } from "express";
import blogRoutes from "./blogRoutes.mjs";
import userRoutes from "./userRoutes.mjs";

const router = Router()

router.use('/blog', blogRoutes)
router.use('/user', userRoutes)

export default router