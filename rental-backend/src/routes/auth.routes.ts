import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();



router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me",isAuthenticated,AuthController.getLoggedInUser)
router.get("/google", AuthController.googleAuth);
router.get("/google/callback", AuthController.googleAuthCallback);
router.post("/logout", AuthController.logout);


const authRouter = router;
export default authRouter;
