import { PrismaClient } from "@prisma/client";
import { bookingSchema, validateBooking } from "../utils/validator";

const prisma = new PrismaClient();
export default class BookingService {
  public static createBooking = async (renterId: string, data: any) => {
    try {
      const bookProperty = validateBooking(data);
      const property = await prisma.property.findUnique({
        where: {
          id: bookProperty.propertyId,
        },
      });

      if (!property?.available) {
        throw new Error("Property is not available");
      }
      const totalAmount = property.price * bookProperty.guests;

      const booking = await prisma.booking.create({
        data: {
          renterId: renterId,
          propertyId: bookProperty.propertyId,
          checkInDate: bookProperty.checkInDate,
          checkoutDate: bookProperty.checkoutDate,
          guests: bookProperty.guests,
          totalAmount: totalAmount,
          status: "PENDING",
        },
      });

      return booking;
    } catch (error: any) {
      console.error("Error while booking property: ", error);
    }
  };

  public static findBookingById = async (id: string) => {
    try {
      const booking = await prisma.booking.findUnique({
        where: {
          id,
        },
        include: { payment: true, property: true },
      });
      return booking;
    } catch (error: any) {
      console.error("Error while finding booking: ", error?.message);
    }
  };

  public static getBookingsByRenter = async (renterId: string) => {
    try {
      const booking = await prisma.booking.findMany({
        where: {
          renterId,
        },
        include: {
          property: {
            select: {
              title: true,
            },
          },
          renter: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });
      return booking;
    } catch (error: any) {
      console.error("Error while finding booking: ", error?.message);
    }
  };

  public static updateBookingStatus = async (
    bookingId: string,
    status: "CONFIRMED" | "CANCELED"
  ) => {
    try {
      const booking = await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status,
        },
      });
      return booking;
    } catch (error: any) {
      console.error("Error while updating status: ", error?.message);
    }
  };

  public static getBookingByHost = async (hostId: string) => {
    try{
      const bookings = await prisma.booking.findMany({
        where: {
          property: {
            hostId,
          },
        },
        include: {
          property: true,
          renter: true,
        },
      });
      return bookings;
    }catch(error: any){
      console.error("Error while finding booking: ", error?.message);

    }
  }

  public static getBookingByProperty = async(propertyId: string) => {
     try{
      const bookings = await prisma.booking.findMany({
        where: {
          propertyId
        },
        include: {
          renter: true
        }
      })
      return bookings;
     }catch(error: any){
      console.error("Error while finding booking: ", error?.message);
     }
  }

  public static getBookingsByStatus = async (
    userId: string,
    status: "PENDING" | "CONFIRMED" | "CANCELED"
  ) => {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          renterId: userId,
          status,
        },
        include: {
          property: true,
        },
      });
      return bookings;
    } catch (error: any) {
      console.error("Error fetching bookings by status: ", error.message);
    }
  };

  public static confirmBooking = async(bookingId: string) => {
    return this.updateBookingStatus(bookingId, "CONFIRMED");
  }

  public static cancelBooking = async(bookingId: string) => {
    return this.updateBookingStatus(bookingId, "CANCELED");
  }

  public static deleteBooking = async(bookingId: string) => {
    try {
      const booking = await prisma.booking.delete({
        where: {
          id: bookingId,
        },
      });
      return booking;
    } catch (error: any) {
      console.error("Error while deleting booking: ", error?.message);
    }
  }
  public static getAllBookings = async() => {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          renter: true,
          property: true,
        },
      });
      return bookings;
    } catch (error: any) {
      console.error("Error while fetching all bookings: ", error?.message);
    }
  }

  public static checkAvailability = async (propertyId: string, checkInDate: Date, checkOutDate: Date) => {
    try{
       const overlapping = await prisma.booking.findFirst({
        where: {
          propertyId,
          OR: [
            {
              checkInDate: {
                lte: checkOutDate,
              },
              checkoutDate: {
                gte: checkInDate,
              },
            },
            {
              checkInDate: {
                gte: checkInDate,
              },
              checkoutDate: {
                lte: checkOutDate,
              },
            },
          ],
        }
       })

       return !overlapping;
    }catch(error: any){
      console.error("Error while checking availability: ", error?.message);
    }
  }
}
