import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import PropertyController from "../controllers/property.controller";
import upload from "../utils/upload";



const router = Router();

router.post("/create", isAuthenticated,upload.array("images"), PropertyController.createProperty);
router.get("/:id", isAuthenticated, PropertyController.getPropertyById);
router.get("/", PropertyController.getAllProperties);
router.patch("/:id", isAuthenticated, PropertyController.updateProperty);
router.delete("/:id", isAuthenticated, PropertyController.deleteProperty);

const propertyRouter = router;
export default propertyRouter;