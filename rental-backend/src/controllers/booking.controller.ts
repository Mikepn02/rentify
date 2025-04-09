import { Request, Response } from "express";
import BookingService from "../services/booking.service";

export default class BookingController {
  /*
    #swagger.tags = ['Booking']
     */

  public static bookProperty = async (req: Request, res: Response) => {
    if(!req.user){
      throw new Error("User not authorized")
    }
     //@ts-ignore
    const renterId = req.user.id
    try {
      const booking = await BookingService.createBooking(renterId ,req.body);
      res.status(201).json({
        success: true,
        booking,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error?.message,
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
     //@ts-ignore
    const id = req.user.id;

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
  public static getBookingsByHost = async (req: Request, res: Response) => {
    if(!req.user){
      throw new Error("User not found")
    }
     //@ts-ignore
    const hostId = req.user.id;
    try {
      const bookings = await BookingService.getBookingByHost(hostId);
      res.status(200).json({ success: true, bookings });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getBookingsByProperty = async (req: Request, res: Response) => {
    const { propertyId } = req.params;
    try {
      const bookings = await BookingService.getBookingByProperty(propertyId);
      res.status(200).json({ success: true, bookings });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getBookingsByStatus = async (req: Request, res: Response) => {
    if(!req.user){
      throw new Error("User not found")
    }
     //@ts-ignore
    const userId = req.user.id;
    const { status } = req.params;
    try {
      const bookings = await BookingService.getBookingsByStatus(userId, status.toUpperCase() as any);
      res.status(200).json({ success: true, bookings });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public static confirmBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const booking = await BookingService.confirmBooking(id);
      res.status(200).json({ success: true, booking });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public static cancelBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const booking = await BookingService.cancelBooking(id);
      res.status(200).json({ success: true, booking });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public static checkAvailability = async (req: Request, res: Response) => {
    const { propertyId, checkInDate, checkoutDate } = req.body;
    try {
      const isAvailable = await BookingService.checkAvailability(
        propertyId,
        new Date(checkInDate),
        new Date(checkoutDate)
      );
      res.status(200).json({ success: true, available: isAvailable });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
}
