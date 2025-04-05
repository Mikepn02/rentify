import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import BookingController from "../controllers/booking.controller";



const router = Router();

router.post("/create", isAuthenticated , BookingController.bookProperty);
router.get("/:id", isAuthenticated, BookingController.getBookingById);
router.get("/renter/:renterId", isAuthenticated, BookingController.getBookingsByRenter);
router.patch("/:id",isAuthenticated, BookingController.updateBookingStatus)

const bookingRouter = router;
export default bookingRouter;
