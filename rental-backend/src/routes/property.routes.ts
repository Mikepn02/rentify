import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import PropertyController from "../controllers/property.controller";
import upload from "../utils/upload";
import restrictTo from "../middlewares/host.middleware";



const router = Router();

router.post("/create", isAuthenticated, restrictTo("HOST"),upload.array("images"), PropertyController.createProperty);
router.get("/host/:hostId", isAuthenticated, PropertyController.getAllPropertiesByHost);
router.get("/:id", isAuthenticated, PropertyController.getPropertyById);
router.get("/", PropertyController.getAllProperties);
router.patch("/:id", isAuthenticated, PropertyController.updateProperty);
router.delete("/:id", isAuthenticated, PropertyController.deleteProperty);

const propertyRouter = router;
export default propertyRouter;