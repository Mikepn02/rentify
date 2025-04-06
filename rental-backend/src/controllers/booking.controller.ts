import { Request, Response } from "express";
import BookingService from "../services/booking.service";

export default class BookingController {
  /*
    #swagger.tags = ['Booking']
     */

  public static bookProperty = async (req: Request, res: Response) => {
    try {
      const booking = await BookingService.createBooking(req.body);
      res.status(201).json({
        success: true,
        booking,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static getBookingById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const booking = await BookingService.findBookingById(id);
      res.status(200).json({
        success: true,
        booking,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static getBookingsByRenter = async (req: Request, res: Response) => {

    if(!req.user){
      throw new Error("User not found")
    }
    const id = req.user;

    try {
      const bookings = await BookingService.getBookingsByRenter(id);
      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  public static updateBookingStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const booking = await BookingService.updateBookingStatus(id, req.body);
      res.status(200).json({
        success: true,
        booking,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
