import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import BookingController from "../controllers/booking.controller";
import restrictTo from "../middlewares/host.middleware";

const router = Router();


router.post("/create", isAuthenticated, restrictTo("RENTER"), BookingController.bookProperty);
router.get("/", isAuthenticated, restrictTo("RENTER"), BookingController.getBookingsByRenter);
router.get("/status/:status", isAuthenticated, restrictTo("RENTER"), BookingController.getBookingsByStatus);
router.post("/check-availability", isAuthenticated, BookingController.checkAvailability);

router.get("/host", isAuthenticated, restrictTo("HOST"), BookingController.getBookingsByHost);
router.get("/property/:propertyId", isAuthenticated, restrictTo("HOST"), BookingController.getBookingsByProperty);
router.patch("/:id/confirm", isAuthenticated, restrictTo("HOST"), BookingController.confirmBooking);
router.patch("/:id/cancel", isAuthenticated, BookingController.cancelBooking); // Both roles could use


router.get("/:id", isAuthenticated, BookingController.getBookingById);
router.patch("/:id", isAuthenticated, BookingController.updateBookingStatus);

const bookingRouter = router;
export default bookingRouter;
