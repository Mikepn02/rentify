import { PrismaClient } from "@prisma/client";
import { validateBooking } from "../utils/validator";

const primsa = new PrismaClient();
export default class BookingService {
  public static createBooking = async (data: any) => {
    try {
      const bookProperty = validateBooking(data);
      const property = await primsa.property.findUnique({
        where: {
          id: bookProperty.propertyId,
        },
      });

      if (!property?.available) {
        throw new Error("Property is not available");
      }

      const booking = await primsa.booking.create({
        data: {
          renterId: bookProperty.renterId,
          propertyId: bookProperty.propertyId,
          checkInDate: bookProperty.checkInDate,
          checkoutDate: bookProperty.checkoutDate,
          guests: bookProperty.guests,
          totalAmount: bookProperty.totalAmount,
          status: "PENDING",
        },
      });

      return booking;
    } catch (error: any) {
      console.error("Error while booking property: ", error?.message);
    }
  };


  public static findBookingById = async(id: string) => {
     try{
        const booking = await primsa.booking.findUnique({
            where: {
                id
            },
            include: { payment: true, property: true },
        })
        return booking;
     }catch(error: any){
        console.error("Error while finding booking: ", error?.message)
     }
  }

  public static getBookingsByRenter = async(renterId: string) => {
    try{
        const booking = await primsa.booking.findMany({
            where: {
                renterId
            },
            include: { property: true },
        })
        return booking;
     }catch(error: any){
        console.error("Error while finding booking: ", error?.message)
     }
  }

  public static updateBookingStatus = async(bookingId: string, status: "CONFIRMED" | "CANCELED") => {
    try{
        const booking = await primsa.booking.update({
            where: {
                id: bookingId
            },
            data: {
                status
            }
        })
        return booking;
    }catch(error: any){
        console.error("Error while updating status: ", error?.message)
    }
  }
}
