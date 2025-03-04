import { BookingStatus } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
      interface Request {
        user: User;
      }
    }
}


export interface User extends JwtPayload{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}


export interface Property{
    title: string;
    description: string;
    pricePerNight: string;
    renterId: string
    location: string;
    imageUrl?: string
}



export interface Booking {
    id: string;
    renterId: string;
    propertyId: string;
    checkInDate: Date;
    checkoutDate: Date;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
  }
  