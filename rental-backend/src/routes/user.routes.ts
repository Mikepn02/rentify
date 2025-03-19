import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import UserController from "../controllers/user.controller";




const router = Router();

router.get("/:id", isAuthenticated , UserController.getUserById)

const userRouter = router;
export default userRouter;